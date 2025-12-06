import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SimpleCaptchaProps {
  onVerify: (verified: boolean) => void;
}

function generateCaptcha(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function SimpleCaptcha({ onVerify }: SimpleCaptchaProps) {
  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    onVerify(isVerified);
  }, [isVerified, onVerify]);

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setUserInput('');
    setIsVerified(false);
    setError(false);
  };

  const handleVerify = () => {
    if (userInput.toLowerCase() === captchaText.toLowerCase()) {
      setIsVerified(true);
      setError(false);
    } else {
      setError(true);
      refreshCaptcha();
    }
  };

  if (isVerified) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-xl bg-success/10 border border-success/30 text-success">
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-medium">Verified successfully</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Label>Security Check</Label>
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <div 
            className="h-12 rounded-xl bg-muted flex items-center justify-center font-mono text-xl tracking-widest select-none"
            style={{
              background: 'linear-gradient(45deg, hsl(var(--muted)) 25%, hsl(var(--secondary)) 50%, hsl(var(--muted)) 75%)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              letterSpacing: '0.3em',
            }}
          >
            {captchaText.split('').map((char, i) => (
              <span 
                key={i}
                style={{
                  transform: `rotate(${Math.random() * 20 - 10}deg)`,
                  display: 'inline-block',
                }}
                className="text-foreground"
              >
                {char}
              </span>
            ))}
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={refreshCaptcha}
          className="shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Enter the characters above"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className={error ? 'border-destructive' : ''}
        />
        <Button type="button" onClick={handleVerify} variant="secondary">
          Verify
        </Button>
      </div>
      {error && (
        <p className="text-sm text-destructive">Incorrect. Please try again.</p>
      )}
    </div>
  );
}
