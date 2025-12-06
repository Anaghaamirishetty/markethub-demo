import { BarChart3, TrendingDown, TrendingUp, Users, AlertTriangle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import sellersData from '@/data/sellers.json';

const competitorPricing = sellersData.competitorData;

const priceHistoryData = [
  { month: 'Jan', you: 126999, competitor1: 125999, competitor2: 127499 },
  { month: 'Feb', you: 125999, competitor1: 124999, competitor2: 126999 },
  { month: 'Mar', you: 124999, competitor1: 124499, competitor2: 125999 },
  { month: 'Apr', you: 124999, competitor1: 123999, competitor2: 125499 },
  { month: 'May', you: 124999, competitor1: 123999, competitor2: 125499 },
];

export default function SellerCompetition() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold">Competition Overview</h1>
        <p className="text-muted-foreground">Monitor your competitors and stay ahead</p>
      </div>

      {/* Competitor Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competitorPricing.map((product, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{product.productName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Your Price</span>
                <span className="text-xl font-bold">₹{product.yourPrice.toLocaleString()}</span>
              </div>
              <div className="space-y-2">
                {product.competitorPrices.map((comp, i) => {
                  const diff = product.yourPrice - comp.price;
                  return (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{comp.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">₹{comp.price.toLocaleString()}</span>
                        <Badge variant={diff > 0 ? 'destructive' : diff < 0 ? 'default' : 'secondary'} className="text-xs">
                          {diff > 0 ? `+₹${diff.toLocaleString()}` : diff < 0 ? `-₹${Math.abs(diff).toLocaleString()}` : 'Same'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center gap-2">
                  {product.priceTrend === 'decreasing' ? (
                    <>
                      <TrendingDown className="w-4 h-4 text-success" />
                      <span className="text-sm text-success">Prices decreasing</span>
                    </>
                  ) : product.priceTrend === 'increasing' ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-destructive" />
                      <span className="text-sm text-destructive">Prices increasing</span>
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 text-warning" />
                      <span className="text-sm text-warning">Prices stable</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Price Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Price Trend Comparison (iPhone 15 Pro)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceHistoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
              />
              <Line type="monotone" dataKey="you" stroke="hsl(var(--primary))" strokeWidth={3} name="Your Price" />
              <Line type="monotone" dataKey="competitor1" stroke="hsl(var(--success))" strokeWidth={2} name="Digital World" />
              <Line type="monotone" dataKey="competitor2" stroke="hsl(var(--warning))" strokeWidth={2} name="Gadget Zone" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Pricing Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-warning/10 border border-warning/30">
              <h4 className="font-semibold text-warning mb-2">Price Adjustment Suggested</h4>
              <p className="text-sm text-muted-foreground">
                Your iPhone 15 Pro price is ₹1,000 higher than the lowest competitor. Consider matching or undercutting to increase sales.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-success/10 border border-success/30">
              <h4 className="font-semibold text-success mb-2">Good Positioning</h4>
              <p className="text-sm text-muted-foreground">
                Your Sony WH-1000XM5 is competitively priced at ₹26,990. You're ₹500 above the lowest, but your rating is higher.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
