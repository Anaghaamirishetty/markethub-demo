import { useState } from 'react';
import { Bug, Send, Upload, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { useToast } from '@/hooks/use-toast';

export default function UserReport() {
  const { activeUserData } = useAuthStore();
  const { addReport } = useAppStore();
  const { toast } = useToast();
  
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addReport({
      userId: activeUserData?.id || 'unknown',
      userRole: 'user',
      userName: activeUserData?.name || 'Anonymous',
      subject,
      category,
      description,
    });

    setSubmitted(true);
    toast({ title: 'Report submitted!', description: 'Our team will review it shortly.' });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-2">Report Submitted!</h2>
        <p className="text-muted-foreground mb-6">Thank you for your feedback. We'll look into it.</p>
        <Button onClick={() => {
          setSubmitted(false);
          setSubject('');
          setCategory('');
          setDescription('');
        }}>
          Submit Another Report
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Report an Issue</h1>
        <p className="text-muted-foreground">Help us improve by reporting bugs or issues</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="w-5 h-5" />
            New Report
          </CardTitle>
          <CardDescription>Describe the issue you're experiencing</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug / Error</SelectItem>
                  <SelectItem value="pricing">Incorrect Pricing</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="ui">UI / Design Issue</SelectItem>
                  <SelectItem value="performance">Performance Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide as much detail as possible..."
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Screenshot (optional)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop an image or click to upload
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Send className="w-4 h-4 mr-2" />
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
