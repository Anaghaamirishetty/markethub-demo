import { Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import sellersData from '@/data/sellers.json';

export default function SellerTrending() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold">Trending Items</h1>
        <p className="text-muted-foreground">Hot products in your category</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sellersData.trendingInCategory.map((item, index) => (
          <Card key={index} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <Badge variant={item.demand === 'High' ? 'default' : 'secondary'}>{item.demand} Demand</Badge>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-lg font-bold ${item.priceChange < 0 ? 'text-success' : 'text-destructive'}`}>
                  {item.priceChange < 0 ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                  {item.priceChange}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
