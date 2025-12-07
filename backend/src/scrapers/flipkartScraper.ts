import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import type { Browser, Page } from "playwright";
import { ScrapedProduct } from "../types";

chromium.use(StealthPlugin());

export const scrapeFlipkartProduct = async (
	rawUrl: string
): Promise<ScrapedProduct> => {
	let browser: Browser | null = null;

	try {
		// Clean the URL
		const cleanUrl = rawUrl.split("?")[0];

		console.log("🟦 Scraping Flipkart:", cleanUrl);

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

		// Load page
		await page.goto(cleanUrl, {
			waitUntil: "domcontentloaded",
			timeout: 60000,
		});

		// Wait for JS to execute
		await page.waitForTimeout(3000);

		// Check if blocked
		const html = await page.content();
		if (
			html.includes("captcha") ||
			html.includes("Access Denied") ||
			html.includes("Page Not Found")
		) {
			console.log("❌ Blocked by Flipkart");
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

		// Extract data - Flipkart specific selectors
		const title = await getText(page, ".VU-ZEz, .B_NuCI, span.B_NuCI, .yhB1nd");
		const priceText = await getText(page, "._30jeq3, ._30jeq3._16Jk6d");
		const ratingText = await getText(page, "._3LWZlK, div._3LWZlK");
		const reviewsText = await getText(
			page,
			"._2_R_DZ span, span._2_R_DZ, ._13vcmD span"
		);

		// Extract product image
		let image = "";
		try {
			const imgLocator = page
				.locator("._396cs4._2amPTt img, ._1Nyybr img, img._396cs4")
				.first();
			image =
				(await imgLocator.getAttribute("src")) ||
				(await imgLocator.getAttribute("data-src")) ||
				"";
		} catch {
			image = "";
		}

		// Parse price - "₹3,999" → 3999
		let numericPrice = 0;
		if (priceText && priceText !== "N/A") {
			const digitsOnly = priceText.replace(/[^\d]/g, "");
			numericPrice = parseInt(digitsOnly) || 0;
		}

		// Parse rating - "4.1" → 4.1
		const ratingNumber =
			ratingText && ratingText !== "N/A" ? parseFloat(ratingText) : 0;

		// Parse reviews - "4,864 Ratings" → 4864
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
		console.log("❌ FLIPKART SCRAPER ERROR:", err);
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
		// Try multiple selectors separated by comma
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
