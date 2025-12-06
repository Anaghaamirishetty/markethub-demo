import { useState } from 'react';
import { User, Mail, Lock, Trash2, Camera, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

export default function UserSettings() {
  const { activeUserData, updateUser } = useAuthStore();
  const { toast } = useToast();
  
  const [name, setName] = useState(activeUserData?.name || '');
  const [email, setEmail] = useState(activeUserData?.email || '');
  const [bio, setBio] = useState(activeUserData?.bio || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = () => {
    updateUser({ name, email, bio });
    toast({ title: 'Profile updated!', description: 'Your changes have been saved.' });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    toast({ title: 'Password changed!', description: 'Your password has been updated.' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={activeUserData?.avatar} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline">
              <Camera className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          <Button onClick={handleSaveProfile}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button onClick={handleChangePassword} variant="secondary">
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
