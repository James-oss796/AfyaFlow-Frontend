import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState<'patient' | 'receptionist' | 'doctor' | 'admin'>('patient');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in production, this would authenticate with backend
    if (email && password) {
      toast.success('Login successful!');
      
      // Navigate based on role
      switch (userRole) {
        case 'patient':
          navigate('/patient');
          break;
        case 'receptionist':
          navigate('/receptionist');
          break;
        case 'doctor':
          navigate('/doctor');
          break;
        case 'admin':
          navigate('/admin');
          break;
      }
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">AfyaFlow</h1>
          </div>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Login As</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUserRole('patient')}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    userRole === 'patient' 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-white text-foreground border-border hover:bg-muted'
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole('receptionist')}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    userRole === 'receptionist' 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-white text-foreground border-border hover:bg-muted'
                  }`}
                >
                  Receptionist
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole('doctor')}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    userRole === 'doctor' 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-white text-foreground border-border hover:bg-muted'
                  }`}
                >
                  Doctor
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole('admin')}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    userRole === 'admin' 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-white text-foreground border-border hover:bg-muted'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="text-sm text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/register')}
                className="text-primary hover:underline font-medium"
              >
                Register here
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/')}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
