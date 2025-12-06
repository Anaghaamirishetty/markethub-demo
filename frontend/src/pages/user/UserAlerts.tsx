import { Bell, Trash2, Mail, MailX, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAppStore } from '@/store/appStore';

export default function UserAlerts() {
  const { alerts, removeAlert, toggleAlertEmail } = useAppStore();

  const activeAlerts = alerts.filter(a => a.status === 'active');
  const triggeredAlerts = alerts.filter(a => a.status === 'triggered');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Price Alerts</h1>
          <p className="text-muted-foreground">Get notified when prices drop to your target</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          <Bell className="w-4 h-4 mr-2" />
          {activeAlerts.length} active
        </Badge>
      </div>

      {alerts.length === 0 ? (
        <Card className="py-12">
          <CardContent className="text-center space-y-4">
            <Bell className="w-12 h-12 mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold">No alerts set</h2>
            <p className="text-muted-foreground">Create price alerts on products you want to buy</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Active Alerts */}
          {activeAlerts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5 text-warning" />
                Active Alerts
              </h2>
              <div className="grid gap-4">
                {activeAlerts.map((alert) => (
                  <Card key={alert.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{alert.productName}</h3>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground">
                              Target: <span className="font-medium text-foreground">₹{alert.targetPrice.toLocaleString()}</span>
                            </span>
                            <span className="text-muted-foreground">
                              Current: <span className="font-medium text-foreground">₹{alert.currentPrice.toLocaleString()}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Created {new Date(alert.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={alert.emailEnabled}
                              onCheckedChange={() => toggleAlertEmail(alert.id)}
                            />
                            {alert.emailEnabled ? (
                              <Mail className="w-4 h-4 text-primary" />
                            ) : (
                              <MailX className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeAlert(alert.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-primary h-full rounded-full transition-all"
                              style={{
                                width: `${Math.min(100, (alert.targetPrice / alert.currentPrice) * 100)}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {Math.round(((alert.currentPrice - alert.targetPrice) / alert.currentPrice) * 100)}% to go
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Triggered Alerts */}
          {triggeredAlerts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-success" />
                Triggered Alerts
              </h2>
              <div className="grid gap-4">
                {triggeredAlerts.map((alert) => (
                  <Card key={alert.id} className="border-success/30 bg-success/5">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{alert.productName}</h3>
                            <Badge className="bg-success">Price Dropped!</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Target: ₹{alert.targetPrice.toLocaleString()} | Current: ₹{alert.currentPrice.toLocaleString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAlert(alert.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
