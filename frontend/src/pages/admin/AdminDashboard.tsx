import { Users, Package, TrendingUp, Search, Bell, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/common/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import adminData from '@/data/admin.json';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--info))', 'hsl(var(--accent))'];

export default function AdminDashboard() {
  const { analytics, userGrowth, categoryPopularity } = adminData;

  return (
    <div className="space-y-6 animate-fade-in">
      <div><h1 className="text-3xl font-display font-bold">Admin Dashboard</h1><p className="text-muted-foreground">Platform overview and analytics</p></div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Users" value={analytics.totalUsers.toLocaleString()} icon={Users} variant="primary" />
        <StatCard title="Sellers" value={analytics.totalSellers.toLocaleString()} icon={Package} variant="success" />
        <StatCard title="Products" value={analytics.trackedProducts.toLocaleString()} icon={TrendingUp} variant="info" />
        <StatCard title="Searches" value={`${(analytics.totalSearches/1000).toFixed(0)}k`} icon={Search} variant="warning" />
        <StatCard title="Alerts" value={analytics.activeAlerts.toLocaleString()} icon={Bell} variant="default" />
        <StatCard title="Revenue" value={`₹${(analytics.revenueSimulation/100000).toFixed(1)}L`} icon={DollarSign} variant="success" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>User Growth</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={userGrowth}>
                <defs>
                  <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/><stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#usersGrad)" name="Users" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Category Popularity</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={categoryPopularity} dataKey="percentage" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={(e) => `${e.name}: ${e.percentage}%`}>
                  {categoryPopularity.map((_, index) => (<Cell key={index} fill={COLORS[index % COLORS.length]} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
