import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import type { Browser, Page } from "playwright";
import { ScrapedProduct } from "../types";

chromium.use(StealthPlugin());

export const scrapeAjioProduct = async (
	rawUrl: string
): Promise<ScrapedProduct> => {
	let browser: Browser | null = null;

	try {
		const cleanUrl = rawUrl.split("?")[0];

		console.log("🟦 Scraping Ajio:", cleanUrl);

		browser = await chromium.launch({
			headless: true,
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-dev-shm-usage",
			],
		});

		const context = await browser.newContext({
			viewport: { width: 1366, height: 768 },
			userAgent:
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
		});

		const page = await context.newPage();

		await page.goto(cleanUrl, {
			waitUntil: "domcontentloaded",
			timeout: 60000,
		});

		// Wait for JS to execute
		await page.waitForTimeout(3000);

		const html = await page.content();
		if (html.includes("captcha") || html.includes("Access Denied")) {
			console.log("❌ Blocked by Ajio");
			await browser.close();
			return {
				title: "Blocked",
				price: 0,
				rating: 0,
				reviews: 0,
				image: "",
				url: cleanUrl,
			};
		}

		await autoScroll(page);

		// Ajio specific selectors
		const title = await getText(
			page,
			'.prod-title, h1[class*="prod-name"], .pdp-product-title-price h1'
		);
		const priceText = await getText(
			page,
			'.prod-sp, span[class*="prod-sp"], .prod-price span'
		);
		const ratingText = await getText(
			page,
			'.prod-rating-value, span[class*="rating-value"]'
		);
		const reviewsText = await getText(
			page,
			'.prod-rating-count, span[class*="rating-count"]'
		);

		// Extract image
		let image = "";
		try {
			const imgLocator = page
				.locator(
					'.rilrtl-image img, img[class*="product-image"], .preview-image img'
				)
				.first();
			image = (await imgLocator.getAttribute("src")) || "";
		} catch {
			image = "";
		}

		// Parse price
		let numericPrice = 0;
		if (priceText && priceText !== "N/A") {
			const digitsOnly = priceText.replace(/[^\d]/g, "");
			numericPrice = parseInt(digitsOnly) || 0;
		}

		// Parse rating
		const ratingNumber =
			ratingText && ratingText !== "N/A" ? parseFloat(ratingText) : 0;

		// Parse reviews
		const reviewNumber =
			reviewsText && reviewsText !== "N/A"
				? parseInt(reviewsText.replace(/[^\d]/g, ""))
				: 0;

		await browser.close();

		return {
			title,
			price: numericPrice,
			rating: ratingNumber,
			reviews: reviewNumber,
			image,
			url: cleanUrl,
		};
	} catch (err) {
		console.log("❌ AJIO SCRAPER ERROR:", err);
		if (browser) await browser.close();
		return {
			title: "Error",
			price: 0,
			rating: 0,
			reviews: 0,
			image: "",
			url: rawUrl,
			error: "Scraping failed",
			details: err,
		};
	}
};

// Helper functions
async function getText(page: Page, selector: string): Promise<string> {
	try {
		const selectors = selector.split(",").map((s) => s.trim());
		for (const sel of selectors) {
			try {
				const element = page.locator(sel).first();
				const text = await element.textContent();
				if (text && text.trim() !== "") return text.trim();
			} catch {
				continue;
			}
		}
		return "N/A";
	} catch {
		return "N/A";
	}
}

async function autoScroll(page: Page): Promise<void> {
	await page.evaluate(async () => {
		await new Promise((resolve) => {
			let totalHeight = 0;
			const distance = 500;
			const timer = setInterval(() => {
				const scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;

				if (totalHeight >= scrollHeight - window.innerHeight) {
					clearInterval(timer);
					resolve(true);
				}
			}, 400);
		});
	});
}
