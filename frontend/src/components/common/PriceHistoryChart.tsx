import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown } from 'lucide-react';

interface PriceData {
  date: string;
  amazon?: number;
  flipkart?: number;
  meesho?: number;
  myntra?: number;
  ajio?: number;
}

interface PriceHistoryChartProps {
  data: PriceData[];
  title?: string;
  showLegend?: boolean;
}

export function PriceHistoryChart({ data, title = "Price History", showLegend = true }: PriceHistoryChartProps) {
  const storeColors = {
    amazon: '#FF9900',
    flipkart: '#2874F0',
    meesho: '#F43397',
    myntra: '#FF3F6C',
    ajio: '#D5A249',
  };

  const formatPrice = (value: number) => `₹${value.toLocaleString()}`;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingDown className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              {Object.entries(storeColors).map(([store, color]) => (
                <linearGradient key={store} id={`gradient-${store}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-IN', { month: 'short' });
              }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-md)',
              }}
              formatter={(value: number, name: string) => [formatPrice(value), name.charAt(0).toUpperCase() + name.slice(1)]}
              labelFormatter={(label) => new Date(label).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            />
            {showLegend && (
              <Legend 
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            )}
            {Object.entries(storeColors).map(([store, color]) => (
              <Area
                key={store}
                type="monotone"
                dataKey={store}
                stroke={color}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#gradient-${store})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
