import { AlertTriangle, CheckCircle2, Clock, User, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppStore } from '@/store/appStore';

export default function AdminReports() {
  const { reports, updateReportStatus } = useAppStore();

  const statusColors = { pending: 'bg-warning/10 text-warning', in_progress: 'bg-info/10 text-info', resolved: 'bg-success/10 text-success' };

  return (
    <div className="space-y-6 animate-fade-in">
      <div><h1 className="text-3xl font-display font-bold">Reported Issues</h1><p className="text-muted-foreground">All user and seller reports</p></div>

      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{report.subject}</h3>
                    <Badge className={statusColors[report.status]}>{report.status.replace('_', ' ')}</Badge>
                    <Badge variant="outline">{report.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">{report.userRole === 'user' ? <User className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}{report.userName}</span>
                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <Select value={report.status} onValueChange={(v) => updateReportStatus(report.id, v as any)}>
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="pending">Pending</SelectItem><SelectItem value="in_progress">In Progress</SelectItem><SelectItem value="resolved">Resolved</SelectItem></SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
