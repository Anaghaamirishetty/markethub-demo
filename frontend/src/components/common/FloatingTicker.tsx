import { Sparkles, TrendingDown, Tag, Flame, Bell } from 'lucide-react';

interface TickerItem {
  icon: React.ReactNode;
  text: string;
  highlight?: boolean;
}

const defaultTickerItems: TickerItem[] = [
  { icon: <Flame className="w-4 h-4 text-destructive" />, text: "🔥 Flipkart Big Billion Days Sale Coming Soon!", highlight: true },
  { icon: <TrendingDown className="w-4 h-4 text-success" />, text: "iPhone 15 Pro dropped ₹5,000 on Amazon" },
  { icon: <Tag className="w-4 h-4 text-accent" />, text: "Sony WH-1000XM5 at lowest price ever!" },
  { icon: <Sparkles className="w-4 h-4 text-warning" />, text: "✨ New: Track prices from Ajio & Myntra" },
  { icon: <Bell className="w-4 h-4 text-info" />, text: "Over 45,000 products tracked today" },
  { icon: <TrendingDown className="w-4 h-4 text-success" />, text: "MacBook Air M3 - Best time to buy!" },
];

interface FloatingTickerProps {
  items?: TickerItem[];
  className?: string;
}

export function FloatingTicker({ items = defaultTickerItems, className }: FloatingTickerProps) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className={`floating-bar ${className}`}>
      <div className="ticker-content">
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium ${
              item.highlight 
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'text-muted-foreground'
            }`}
          >
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
