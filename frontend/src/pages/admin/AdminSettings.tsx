import { useState } from 'react';
import { User, Mail, Save, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettings() {
  const { activeUserData, updateUser } = useAuthStore();
  const { toast } = useToast();
  const [name, setName] = useState(activeUserData?.name || '');
  const [email, setEmail] = useState(activeUserData?.email || '');

  const handleSave = () => { updateUser({ name, email }); toast({ title: 'Settings saved!' }); };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div><h1 className="text-3xl font-display font-bold">Admin Settings</h1></div>
      <Card>
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20"><AvatarFallback className="text-2xl bg-destructive/10 text-destructive">{name.charAt(0)}</AvatarFallback></Avatar>
            <Button variant="outline"><Camera className="w-4 h-4 mr-2" />Change Photo</Button>
          </div>
          <div className="space-y-2"><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Save</Button>
        </CardContent>
      </Card>
    </div>
  );
}
