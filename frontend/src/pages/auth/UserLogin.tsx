import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SimpleCaptcha } from '@/components/common/SimpleCaptcha';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import API from "@/api"; // ⭐ IMPORT BACKEND API

export default function UserLogin() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaVerified) {
      toast({ title: 'Please complete the CAPTCHA', variant: 'destructive' });
      return;
    }

    try {
      // ⭐ CALL BACKEND LOGIN API
      const res = await API.post("/auth/login", { email, password });

      // ⭐ Save JWT token
      localStorage.setItem("token", res.data.token);

      // ⭐ Store user in Zustand (your existing flow)
      login("user", {
        id: res.data.user._id,
        name: res.data.user.name,
        email: res.data.user.email,
        role: "user",
      });

      toast({ title: "Welcome back!", description: "Logged in successfully." });

      navigate("/user/dashboard"); // your original path
    } 
    catch (err: any) {
      toast({
        title: "Login failed",
        description: err?.response?.data?.message || "Please check email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-display">User Login</CardTitle>
            <CardDescription>Track prices, set alerts, save money</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            <Button type="submit" className="w-full" size="lg">
              Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/register/user" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to home
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
