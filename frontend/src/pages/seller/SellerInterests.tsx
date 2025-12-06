import { useState } from 'react';
import { Package, Plus, TrendingUp, TrendingDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import productsData from '@/data/products.json';

const trendData = [
  { month: 'Jan', smartphones: 85, electronics: 72, fashion: 65 },
  { month: 'Feb', smartphones: 88, electronics: 75, fashion: 68 },
  { month: 'Mar', smartphones: 82, electronics: 78, fashion: 72 },
  { month: 'Apr', smartphones: 90, electronics: 80, fashion: 70 },
  { month: 'May', smartphones: 95, electronics: 82, fashion: 75 },
];

export default function SellerInterests() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Smartphones', 'Electronics']);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold">Product Interests</h1>
        <p className="text-muted-foreground">Track categories and get personalized insights</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Category Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Your Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {productsData.categories.map((category) => (
              <div key={category} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label htmlFor={category} className="cursor-pointer">{category}</Label>
                </div>
                {selectedCategories.includes(category) && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Category Demand Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="smartphonesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="electronicsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                />
                <Area type="monotone" dataKey="smartphones" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#smartphonesGradient)" name="Smartphones" />
                <Area type="monotone" dataKey="electronics" stroke="hsl(var(--success))" fillOpacity={1} fill="url(#electronicsGradient)" name="Electronics" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <h4 className="font-semibold">Smartphones Trending Up</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Demand increased by 12% this month. Good time to stock up!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <TrendingDown className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h4 className="font-semibold">Price Drop Expected</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Electronics category likely to see 5-8% price drop next month.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-info/30 bg-info/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-info/10">
                <Package className="w-5 h-5 text-info" />
              </div>
              <div>
                <h4 className="font-semibold">New Opportunity</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Laptops category has low competition. Consider expanding.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
