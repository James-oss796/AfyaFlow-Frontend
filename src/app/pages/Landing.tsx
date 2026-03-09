import { useNavigate } from 'react-router';
import { Calendar, Users, Clock, Activity, CheckCircle, Bell } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AfyaFlow</h1>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
                Modern Hospital Queue & Appointment Management
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                AfyaFlow digitizes hospital queues and streamlines appointment scheduling, 
                making healthcare more efficient for both patients and staff.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/book-appointment')}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg"
                >
                  Book Appointment
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors text-lg"
                >
                  Register
                </button>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzcyODkxNTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern Hospital"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose AfyaFlow?</h2>
            <p className="text-xl text-muted-foreground">
              Experience the future of healthcare management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Appointment Booking</h3>
              <p className="text-muted-foreground">
                Book appointments online 24/7. Choose your preferred doctor, date, and time slot.
              </p>
            </div>

            <div className="bg-muted rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Digital Queue Management</h3>
              <p className="text-muted-foreground">
                No more paper queues. Real-time updates on your position and estimated wait time.
              </p>
            </div>

            <div className="bg-muted rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Bell className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Notifications</h3>
              <p className="text-muted-foreground">
                Get instant notifications when it's your turn. Never miss your appointment.
              </p>
            </div>

            <div className="bg-muted rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Hospital Staff</h3>
              <p className="text-muted-foreground">
                Streamlined workflows for receptionists and doctors. Manage queues efficiently.
              </p>
            </div>

            <div className="bg-muted rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reduced Waiting Times</h3>
              <p className="text-muted-foreground">
                Smart scheduling algorithms minimize wait times and improve patient flow.
              </p>
            </div>

            <div className="bg-muted rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Activity className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics & Insights</h3>
              <p className="text-muted-foreground">
                Track performance metrics and optimize hospital operations with data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients experiencing better healthcare management
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate('/book-appointment')}
              className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Book Your Appointment
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors text-lg"
            >
              Staff Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="w-6 h-6" />
            <span className="font-semibold">AfyaFlow</span>
          </div>
          <p className="text-sm opacity-75">© 2026 AfyaFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
