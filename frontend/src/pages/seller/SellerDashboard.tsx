import { Link } from 'react-router-dom';
import { 
  TrendingDown, TrendingUp, Users, Package, DollarSign, 
  BarChart3, ArrowRight, ChevronRight, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/common/StatCard';
import { useAuthStore } from '@/store/authStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import sellersData from '@/data/sellers.json';

const salesData = sellersData.salesInsights.monthlySales;
const competitorData = [
  { name: 'You', price: 124999, fill: 'hsl(var(--primary))' },
  { name: 'Digital World', price: 123999, fill: 'hsl(var(--success))' },
  { name: 'Gadget Zone', price: 125499, fill: 'hsl(var(--warning))' },
  { name: 'Electronics Hub', price: 124499, fill: 'hsl(var(--info))' },
];

export default function SellerDashboard() {
  const { activeUserData } = useAuthStore();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Welcome, {activeUserData?.businessName || activeUserData?.name}! 📊
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your business overview and competition insights.
          </p>
        </div>
        <Button asChild>
          <Link to="/seller/competition">
            View Competition
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`₹${(sellersData.salesInsights.revenue / 100000).toFixed(1)}L`}
          subtitle="this month"
          icon={DollarSign}
          variant="success"
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Total Sales"
          value={sellersData.salesInsights.totalSales}
          subtitle="orders"
          icon={Package}
          variant="primary"
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Avg. Order Value"
          value={`₹${sellersData.salesInsights.avgOrderValue.toLocaleString()}`}
          subtitle="per order"
          icon={BarChart3}
          variant="info"
        />
        <StatCard
          title="Conversion Rate"
          value={`${sellersData.salesInsights.conversionRate}%`}
          subtitle="of visitors"
          icon={Users}
          variant="warning"
          trend={{ value: 0.5, positive: true }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Sales Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
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
                <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#salesGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Competitor Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-accent" />
              Competitor Pricing (iPhone 15 Pro)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={competitorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Price']}
                />
                <Bar dataKey="price" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trending in Your Category */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-warning" />
              Trending in Your Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sellersData.trendingInCategory.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <Badge variant={item.demand === 'High' ? 'default' : 'secondary'}>
                        {item.demand} demand
                      </Badge>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${item.priceChange < 0 ? 'text-success' : 'text-destructive'}`}>
                    {item.priceChange < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                    <span className="font-medium">{item.priceChange}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/seller/competition">
                View Competition
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/seller/insights">
                Sales Insights
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/seller/interests">
                Product Interests
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/seller/trending">
                Trending Items
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
