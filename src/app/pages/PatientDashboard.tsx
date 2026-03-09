import { useNavigate } from 'react-router';
import { Activity, Calendar, Clock, User, Bell, LogOut, Plus } from 'lucide-react';
import { AppointmentCard } from '../components/AppointmentCard';

export function PatientDashboard() {
  const navigate = useNavigate();

  // Mock data
  const upcomingAppointment = {
    patientName: 'John Doe',
    department: 'Cardiology',
    doctor: 'Dr. Sarah Williams',
    date: 'March 10, 2026',
    time: '10:00 AM',
    status: 'confirmed' as const,
    queueNumber: '12',
  };

  const appointmentHistory = [
    {
      patientName: 'John Doe',
      department: 'General Medicine',
      doctor: 'Dr. James Smith',
      date: 'February 15, 2026',
      time: '2:00 PM',
      status: 'completed' as const,
    },
    {
      patientName: 'John Doe',
      department: 'Dental',
      doctor: 'Dr. Emily Brown',
      date: 'January 20, 2026',
      time: '11:30 AM',
      status: 'completed' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AfyaFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <Bell className="w-6 h-6 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                JD
              </div>
              <div>
                <p className="font-medium text-foreground">John Doe</p>
                <p className="text-sm text-muted-foreground">Patient</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h2>
          <p className="text-muted-foreground">Here's an overview of your appointments and queue status</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button 
            onClick={() => navigate('/book-appointment')}
            className="bg-primary text-primary-foreground rounded-xl p-6 hover:bg-primary/90 transition-colors text-left"
          >
            <Plus className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Book New Appointment</h3>
            <p className="text-sm opacity-90">Schedule your next visit</p>
          </button>

          <div className="bg-white rounded-xl border border-border p-6">
            <Calendar className="w-8 h-8 text-secondary mb-3" />
            <h3 className="font-semibold text-lg mb-1">3 Total Appointments</h3>
            <p className="text-sm text-muted-foreground">This month</p>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <Clock className="w-8 h-8 text-accent mb-3" />
            <h3 className="font-semibold text-lg mb-1">Queue Position: #12</h3>
            <p className="text-sm text-muted-foreground">Estimated wait: 25 mins</p>
          </div>
        </div>

        {/* Current Queue Status */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-8 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Your Current Queue Number</p>
              <h2 className="text-6xl font-bold mb-4">#12</h2>
              <p className="text-lg mb-2">Cardiology Department</p>
              <p className="opacity-90">Dr. Sarah Williams</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">Estimated Wait Time</p>
              <p className="text-4xl font-bold mb-2">25 min</p>
              <p className="text-sm opacity-90">Current: #8</p>
            </div>
          </div>
        </div>

        {/* Upcoming Appointment */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Next Appointment</h3>
          <AppointmentCard {...upcomingAppointment} />
        </div>

        {/* Appointment History */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Appointment History</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {appointmentHistory.map((appointment, index) => (
              <AppointmentCard key={index} {...appointment} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
