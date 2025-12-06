import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SimpleCaptcha } from '@/components/common/SimpleCaptcha';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import API from "@/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { toast } = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaVerified) {
      toast({ title: 'Please complete the CAPTCHA', variant: 'destructive' });
      return;
    }

    try {
      const res = await API.post("/auth/admin", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);

      login("admin", {
        id: res.data.user._id,
        name: res.data.user.name,
        email: res.data.user.email,
        role: "admin",
      });

      toast({ title: 'Welcome Admin', description: 'Logged in successfully.' });
      navigate('/admin/dashboard');

    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err?.response?.data?.message || "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-destructive/5 to-background">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-destructive/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-muted/20 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md glass-card">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center">
            <Shield className="w-8 h-8 text-destructive-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-display">Admin Login</CardTitle>
            <CardDescription>Access the admin control panel</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="admin"
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <SimpleCaptcha onVerify={setCaptchaVerified} />

            <Button type="submit" variant="destructive" className="w-full" size="lg">
              Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to home</Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
