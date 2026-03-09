import { useNavigate } from 'react-router';
import { useMemo } from 'react';
import { Activity, Bell, LogOut, Users, Calendar, Clock, TrendingUp, BarChart3 } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function AdminDashboard() {
  const navigate = useNavigate();

  // Mock data for charts - memoized to prevent recreation on every render
  const weeklyAppointments = useMemo(() => [
    { day: 'Mon', appointments: 45, completed: 40 },
    { day: 'Tue', appointments: 52, completed: 48 },
    { day: 'Wed', appointments: 48, completed: 45 },
    { day: 'Thu', appointments: 61, completed: 55 },
    { day: 'Fri', appointments: 55, completed: 50 },
    { day: 'Sat', appointments: 32, completed: 30 },
    { day: 'Sun', appointments: 20, completed: 18 },
  ], []);

  const departmentData = useMemo(() => [
    { name: 'General Medicine', value: 35, color: '#2F80ED' },
    { name: 'Cardiology', value: 25, color: '#27AE60' },
    { name: 'Pediatrics', value: 20, color: '#6FCF97' },
    { name: 'Dental', value: 10, color: '#F2994A' },
    { name: 'Orthopedics', value: 10, color: '#EB5757' },
  ], []);

  const waitTimeData = useMemo(() => [
    { hour: '8 AM', avgWait: 12 },
    { hour: '9 AM', avgWait: 18 },
    { hour: '10 AM', avgWait: 25 },
    { hour: '11 AM', avgWait: 22 },
    { hour: '12 PM', avgWait: 15 },
    { hour: '2 PM', avgWait: 20 },
    { hour: '3 PM', avgWait: 28 },
    { hour: '4 PM', avgWait: 16 },
  ], []);

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AfyaFlow</h1>
            <span className="ml-4 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <Bell className="w-6 h-6 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                AD
              </div>
              <div>
                <p className="font-medium text-foreground">Admin User</p>
                <p className="text-sm text-muted-foreground">Administrator</p>
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
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h2>
            <p className="text-muted-foreground">Hospital performance metrics and insights</p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Patients Today"
              value="156"
              icon={Users}
              trend="+12% from yesterday"
              iconColor="text-primary"
            />
            <StatCard 
              title="Appointments Today"
              value="89"
              icon={Calendar}
              trend="72 completed"
              iconColor="text-secondary"
            />
            <StatCard 
              title="Avg. Wait Time"
              value="18 min"
              icon={Clock}
              trend="-5 min from yesterday"
              iconColor="text-accent"
            />
            <StatCard 
              title="Satisfaction Rate"
              value="94%"
              icon={TrendingUp}
              trend="+2% this week"
              iconColor="text-secondary"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Weekly Appointments Chart */}
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Weekly Appointments</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyAppointments}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="appointments" fill="#2F80ED" name="Scheduled" />
                  <Bar dataKey="completed" fill="#27AE60" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Department Distribution */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="text-xl font-semibold mb-6">Department Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Average Wait Time by Hour */}
          <div className="bg-white rounded-xl border border-border p-6 mb-8">
            <h3 className="text-xl font-semibold mb-6">Average Wait Time by Hour</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={waitTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" />
                <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="avgWait" 
                  stroke="#2F80ED" 
                  strokeWidth={3}
                  name="Avg Wait Time (min)"
                  dot={{ fill: '#2F80ED', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { time: '10 min ago', action: 'New patient registered', user: 'Receptionist Mary Wilson' },
                { time: '15 min ago', action: 'Appointment completed', user: 'Dr. Sarah Williams' },
                { time: '23 min ago', action: 'New appointment booked', user: 'Patient John Doe' },
                { time: '35 min ago', action: 'Patient checked in', user: 'Receptionist Mary Wilson' },
                { time: '42 min ago', action: 'Consultation started', user: 'Dr. James Smith' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}