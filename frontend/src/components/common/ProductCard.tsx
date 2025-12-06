import { Star, TrendingDown, TrendingUp, ExternalLink, Bell, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface ProductPrice {
  price: number;
  url: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  prices: {
    amazon?: ProductPrice | null;
    flipkart?: ProductPrice | null;
    meesho?: ProductPrice | null;
    myntra?: ProductPrice | null;
    ajio?: ProductPrice | null;
  };
  buyRecommendation: 'good' | 'neutral' | 'high';
}

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  onAddAlert?: (productId: string) => void;
  onAddToTracklist?: (productId: string) => void;
}

export function ProductCard({ product, showActions = true, onAddAlert, onAddToTracklist }: ProductCardProps) {
  const navigate = useNavigate();
  
  const getLowestPrice = () => {
    const prices = Object.entries(product.prices)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(([store, value]) => ({ store, price: (value as ProductPrice).price, url: (value as ProductPrice).url }));
    
    if (prices.length === 0) return null;
    return prices.reduce((min, current) => current.price < min.price ? current : min);
  };

  const lowestPrice = getLowestPrice();
  const storeColors: Record<string, string> = {
    amazon: 'bg-orange-100 text-orange-700',
    flipkart: 'bg-blue-100 text-blue-700',
    meesho: 'bg-pink-100 text-pink-700',
    myntra: 'bg-rose-100 text-rose-700',
    ajio: 'bg-amber-100 text-amber-700',
  };

  const recommendationStyles = {
    good: 'price-good',
    neutral: 'price-neutral',
    high: 'price-high',
  };

  const recommendationText = {
    good: 'Good time to buy',
    neutral: 'Wait for drop',
    high: 'Price is high',
  };

  return (
    <Card className="group overflow-hidden hover-lift bg-card border-border/50">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <Badge className={recommendationStyles[product.buyRecommendation]}>
            {product.buyRecommendation === 'good' && <TrendingDown className="w-3 h-3 mr-1" />}
            {product.buyRecommendation === 'high' && <TrendingUp className="w-3 h-3 mr-1" />}
            {recommendationText[product.buyRecommendation]}
          </Badge>
        </div>
        {lowestPrice && (
          <div className="absolute top-3 right-3">
            <Badge className={`${storeColors[lowestPrice.store]} capitalize`}>
              {lowestPrice.store}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <Badge variant="secondary" className="mb-2 text-xs">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="font-medium text-sm">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {lowestPrice && (
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              ₹{lowestPrice.price.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">
              on {lowestPrice.store}
            </span>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => navigate(`/user/product/${product.id}`)}
            >
              <Eye className="w-4 h-4" />
              View
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={() => lowestPrice && window.open(lowestPrice.url, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              Buy
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
