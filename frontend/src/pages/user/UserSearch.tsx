import { useState } from "react";
import { Search, Filter, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/common/ProductCard";
import { useAppStore } from "@/store/appStore";
import { scrapeProduct } from "@/api/productApi";

export default function UserSearch() {
  const { addSearchHistory } = useAppStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrapedProduct, setScrapedProduct] = useState<any | null>(null);

  // UI filters (we keep them)
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [selectedRating, setSelectedRating] = useState(0);

  /* -------------------- SEARCH + SCRAPING LOGIC -------------------- */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;
    addSearchHistory(searchQuery);

    if (!searchQuery.includes("amazon.in")) {
      alert("Paste a valid Amazon link");
      return;
    }

    // Extract ASIN
    const asinMatch = searchQuery.match(/\/dp\/([A-Z0-9]+)/i);
    const asin = asinMatch ? asinMatch[1] : null;

    if (!asin) {
      alert("ASIN not found in URL.");
      return;
    }

    try {
      setLoading(true);
      setScrapedProduct(null);

      const data = await scrapeProduct(searchQuery);

      // Parse price
      const price =
        typeof data.price === "string"
          ? Number(data.price.replace(/[^0-9]/g, ""))
          : Number(data.price);

      // Build a FULL VALID PRODUCT OBJECT (no TS errors)
      const productObj = {
        id: asin,
        name: data.title || "Unknown Product",
        image:
          data.image ||
          "https://via.placeholder.com/300?text=No+Image", // fallback image
        category: "Amazon Product",
        rating: Number(data.rating) || 0,
        reviewCount: 0,

        prices: {
          amazon: {
            price,
            url: searchQuery,
            lastUpdated: new Date().toISOString(),
          },
          flipkart: undefined,
          meesho: undefined,
          myntra: undefined,
          ajio: undefined,
        },

        buyRecommendation:
          data.recommendation === "Buy Now"
            ? "good"
            : data.recommendation === "Overpriced"
            ? "high"
            : "neutral",
      };

      setScrapedProduct(productObj);
    } catch (err) {
      console.error(err);
      alert("Scraping failed");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- FILTER SIDEBAR (unchanged) -------------------- */
  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Price Range</Label>
        <Slider value={priceRange} onValueChange={setPriceRange} max={150000} step={1000} />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Minimum Rating</Label>
        <div className="flex gap-2">
          {[0, 3, 3.5, 4, 4.5].map((r) => (
            <Button
              key={r}
              variant={selectedRating === r ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRating(r)}
            >
              {r === 0 ? "All" : `${r} ★`}
            </Button>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          setPriceRange([0, 150000]);
          setSelectedRating(0);
        }}
      >
        <X className="w-4 h-4 mr-2" /> Clear Filters
      </Button>
    </div>
  );

  /* -------------------- UI -------------------- */
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-3xl font-display font-bold">Search Products</h1>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Paste Amazon product link..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button type="submit" size="lg">
            Search
          </Button>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Filter className="w-5 h-5" /> Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FilterContent />
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <div className="flex-1 space-y-4">

          {/* Loading */}
          {loading && (
            <div className="text-center py-12 text-muted-foreground">
              Scraping product details...
            </div>
          )}

          {/* Single Product Result */}
          {scrapedProduct && !loading && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <ProductCard product={scrapedProduct} />
            </div>
          )}

          {/* Empty */}
          {!scrapedProduct && !loading && (
            <div className="text-center py-12 text-muted-foreground">
              Search to see product results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
