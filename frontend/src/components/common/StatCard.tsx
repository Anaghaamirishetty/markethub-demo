import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info';
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: StatCardProps) {
  const variantStyles = {
    default: 'bg-card',
    primary: 'bg-primary/5 border-primary/20',
    success: 'bg-success/5 border-success/20',
    warning: 'bg-warning/5 border-warning/20',
    info: 'bg-info/5 border-info/20',
  };

  const iconStyles = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    info: 'bg-info/10 text-info',
  };

  return (
    <Card className={`${variantStyles[variant]} hover-lift transition-all duration-300`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <p className={`text-sm font-medium ${trend.positive ? 'text-success' : 'text-destructive'}`}>
                {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
                <span className="text-muted-foreground ml-1">vs last month</span>
              </p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${iconStyles[variant]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
