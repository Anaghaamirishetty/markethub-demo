import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SimpleCaptcha } from '@/components/common/SimpleCaptcha';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';
import API from "@/api"; // ⭐ ADD THIS

export default function UserRegister() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      return;
    }

    if (!captchaVerified) {
      toast({ title: 'Please complete the CAPTCHA', variant: 'destructive' });
      return;
    }

    try {
      // ⭐ BACKEND REGISTER
      await API.post("/auth/register", {
        name,
        email,
        password
      });

      // ⭐ BACKEND LOGIN
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      // ⭐ Save user to Zustand
      login("user", {
        id: res.data.user._id,
        name: res.data.user.name,
        email: res.data.user.email,
        role: "user",
      });

      toast({ title: 'Welcome to MarketHub!', description: 'Account created successfully.' });

      navigate('/user/dashboard');
    } catch (err: any) {
      toast({
        title: "Registration failed",
        description: err?.response?.data?.message || "Try again",
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
            <UserPlus className="w-8 h-8 text-primary-foreground" />
          </div>

          <div>
            <CardTitle className="text-2xl font-display">Create Account</CardTitle>
            <CardDescription>Start tracking prices and saving money</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <SimpleCaptcha onVerify={setCaptchaVerified} />

            <Button type="submit" className="w-full" size="lg">
              Create Account
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login/user" className="text-primary hover:underline font-medium">
              Sign in
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
