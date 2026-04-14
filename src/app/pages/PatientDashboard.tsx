import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router';
import { Activity, Calendar, Clock, Bell, LogOut, Plus } from 'lucide-react';
import { AppointmentCard } from '../components/AppointmentCard';
import { getCurrentRole, getCurrentUserId, clearAccessToken } from '../../lib/authStorage';
import { apiRequest } from '../../lib/api';

type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber?: string;
  dob?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
};

type Appointment = {
  id: number;
  patientId: number;
  patientName?: string;
  department?: string;
  doctor?: string;
  date?: string;
  time?: string;
  status?: 'waiting' | 'called' | 'completed' | 'missed' | 'confirmed' | 'cancelled' | 'in-progress';
  queueNumber?: string;
};

export function PatientDashboard() {
  const navigate = useNavigate();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [upcomingAppointment, setUpcomingAppointment] = useState<Appointment | null>(null);
  const [appointmentHistory, setAppointmentHistory] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getCurrentRole() !== 'PATIENT') {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      const userId = getCurrentUserId();
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        const patientData = await apiRequest<Patient>(`/patients/me`);
        setPatient(patientData);

        const appointments = await apiRequest<Appointment[]>(`/appointments?patientId=${userId}`);

        const now = new Date();
        const upcoming = appointments.find(a => a.date && new Date(a.date) >= now) || null;
        const history = appointments.filter(a => a.date && new Date(a.date) < now);

        setUpcomingAppointment(upcoming);
        setAppointmentHistory(history);
      } catch (err) {
        console.error('Error fetching patient dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  const patientInitials = patient
    ? `${patient.firstName?.charAt(0) || ''}${patient.lastName?.charAt(0) || ''}` || 'JD'
    : 'JD';

  // Safe defaults for upcoming appointment
  const safeUpcoming: Appointment = {
    patientName: upcomingAppointment?.patientName || `${patient?.firstName || 'Patient'} ${patient?.lastName || ''}`,
    department: upcomingAppointment?.department || '—',
    doctor: upcomingAppointment?.doctor || '—',
    date: upcomingAppointment?.date || '—',
    time: upcomingAppointment?.time || '—',
    status: upcomingAppointment?.status || 'waiting',
    queueNumber: upcomingAppointment?.queueNumber || '—',
    id: upcomingAppointment?.id || 0,
    patientId: upcomingAppointment?.patientId || 0,
  };

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
                {patientInitials}
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {patient ? `${patient.firstName} ${patient.lastName}` : 'Patient'}
                </p>
                <p className="text-sm text-muted-foreground">Patient</p>
              </div>
            </div>
            <button
              onClick={() => {
                clearAccessToken();
                navigate('/');
              }}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {patient?.firstName || 'Patient'}!
          </h2>
          <p className="text-muted-foreground">
            Here's an overview of your appointments and queue status
          </p>
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
            <h3 className="font-semibold text-lg mb-1">
              {appointmentHistory.length + (upcomingAppointment ? 1 : 0)} Total Appointments
            </h3>
            <p className="text-sm text-muted-foreground">This month</p>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <Clock className="w-8 h-8 text-accent mb-3" />
            <h3 className="font-semibold text-lg mb-1">Queue Position: #{safeUpcoming.queueNumber}</h3>
            <p className="text-sm text-muted-foreground">Estimated wait: —</p>
          </div>
        </div>

        {/* Upcoming Appointment */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Next Appointment</h3>
          {upcomingAppointment ? (
            <AppointmentCard {...safeUpcoming} />
          ) : (
            <p className="text-sm text-muted-foreground">No upcoming appointments</p>
          )}
        </div>

        {/* Appointment History */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Appointment History</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {appointmentHistory.length ? (
              appointmentHistory.map((appt, index) => (
                <AppointmentCard
                  key={index}
                  patientName={appt.patientName || `${patient?.firstName} ${patient?.lastName}`}
                  department={appt.department || '—'}
                  doctor={appt.doctor || '—'}
                  date={appt.date || '—'}
                  time={appt.time || '—'}
                  status={appt.status || 'waiting'}
                  queueNumber={appt.queueNumber || '—'}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No appointment history</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}