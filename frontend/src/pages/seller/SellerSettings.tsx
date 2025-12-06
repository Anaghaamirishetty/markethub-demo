import { useState } from 'react';
import { User, Mail, Building2, Save, Camera, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

export default function SellerSettings() {
  const { activeUserData, updateUser } = useAuthStore();
  const { toast } = useToast();
  const [name, setName] = useState(activeUserData?.name || '');
  const [email, setEmail] = useState(activeUserData?.email || '');
  const [businessName, setBusinessName] = useState(activeUserData?.businessName || '');
  const [bio, setBio] = useState(activeUserData?.bio || '');

  const handleSave = () => {
    updateUser({ name, email, businessName, bio });
    toast({ title: 'Settings saved!' });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div><h1 className="text-3xl font-display font-bold">Settings</h1></div>
      <Card>
        <CardHeader><CardTitle>Business Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20"><AvatarFallback className="text-2xl bg-accent/10 text-accent">{name.charAt(0)}</AvatarFallback></Avatar>
            <Button variant="outline"><Camera className="w-4 h-4 mr-2" />Change Photo</Button>
          </div>
          <div className="space-y-2"><Label>Full Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="space-y-2"><Label>Business Name</Label><Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} /></div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="space-y-2"><Label>Bio</Label><Textarea value={bio} onChange={(e) => setBio(e.target.value)} /></div>
          <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
