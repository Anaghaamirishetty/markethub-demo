import { useState } from 'react';
import { Bug, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { useToast } from '@/hooks/use-toast';

export default function SellerReport() {
  const { activeUserData } = useAuthStore();
  const { addReport } = useAppStore();
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReport({ userId: activeUserData?.id || '', userRole: 'seller', userName: activeUserData?.name || '', subject, category, description });
    setSubmitted(true);
    toast({ title: 'Report submitted!' });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <CheckCircle2 className="w-16 h-16 text-success mb-4" />
        <h2 className="text-2xl font-bold">Report Submitted!</h2>
        <Button className="mt-4" onClick={() => { setSubmitted(false); setSubject(''); setCategory(''); setDescription(''); }}>Submit Another</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div><h1 className="text-3xl font-display font-bold">Report an Issue</h1></div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Bug className="w-5 h-5" />New Report</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2"><Label>Subject</Label><Input value={subject} onChange={(e) => setSubject(e.target.value)} required /></div>
            <div className="space-y-2"><Label>Category</Label><Select value={category} onValueChange={setCategory}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="bug">Bug</SelectItem><SelectItem value="feature">Feature Request</SelectItem><SelectItem value="data">Data Issue</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[120px]" required /></div>
            <Button type="submit" className="w-full"><Send className="w-4 h-4 mr-2" />Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
