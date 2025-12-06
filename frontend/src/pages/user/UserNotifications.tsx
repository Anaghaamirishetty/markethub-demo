import { Bell, CheckCheck, TrendingDown, Package, Tag, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/appStore';

export default function UserNotifications() {
  const { notifications, markNotificationRead } = useAppStore();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'price_drop': return <TrendingDown className="w-5 h-5 text-success" />;
      case 'stock': return <Package className="w-5 h-5 text-info" />;
      case 'sale': return <Tag className="w-5 h-5 text-warning" />;
      case 'alert': return <Bell className="w-5 h-5 text-primary" />;
      default: return <AlertTriangle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const markAllRead = () => {
    notifications.forEach(n => {
      if (!n.read) markNotificationRead(n.id);
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on price changes and deals</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge variant="default" className="text-lg px-4 py-2">
              {unreadCount} unread
            </Badge>
          )}
          <Button variant="outline" onClick={markAllRead}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark all read
          </Button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <Card className="py-12">
          <CardContent className="text-center space-y-4">
            <Bell className="w-12 h-12 mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold">No notifications</h2>
            <p className="text-muted-foreground">You'll see price drops and updates here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all cursor-pointer hover:shadow-md ${
                !notification.read ? 'bg-primary/5 border-primary/20' : ''
              }`}
              onClick={() => !notification.read && markNotificationRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-xl ${
                    notification.type === 'price_drop' ? 'bg-success/10' :
                    notification.type === 'stock' ? 'bg-info/10' :
                    notification.type === 'sale' ? 'bg-warning/10' :
                    'bg-muted'
                  }`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{notification.title}</h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
