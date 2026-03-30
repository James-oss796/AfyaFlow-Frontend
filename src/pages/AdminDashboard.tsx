import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import DashboardCard from '../components/ui/DashboardCard';
import SignatureButton from '../components/ui/SignatureButton';
import StatusChip from '../components/ui/StatusChip';

const data = [
  { name: '08:00', value: 15 },
  { name: '10:00', value: 25 },
  { name: '11:00', value: 35 },
  { name: '12:00', value: 45 },
  { name: '13:00', value: 60 },
  { name: '15:00', value: 40 },
  { name: '17:00', value: 25 },
  { name: '19:00', value: 10 },
];

const specialists = [
  { name: 'Dr. Anthony Maina', dept: 'Cardiologist', station: 'Emergency Room', shift: '08:00 - 16:00', status: 'In Surgery', variant: 'error' },
  { name: 'Dr. Linda Kamau', dept: 'Pediatrician', station: 'Outpatient', shift: '09:00 - 18:00', status: 'On Call', variant: 'success' },
  { name: 'Dr. Caleb Otieno', dept: 'Neurologist', station: 'Ward C (Neuro)', shift: '12:00 - 20:00', status: 'On Call', variant: 'success' },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      {/* Dashboard Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[2.75rem] font-extrabold text-primary tracking-tight leading-none mb-2">Hospital Overview</h1>
          <p className="text-on-surface-variant text-lg font-medium">Real-time clinical operations and revenue monitoring.</p>
        </div>
        <div className="flex gap-4">
          <SignatureButton 
            variant="clear"
            onClick={() => navigate('/register')}
          >
            Register Staff
          </SignatureButton>
          <SignatureButton variant="clear">Generate Report</SignatureButton>
          <SignatureButton icon="add">New Admission</SignatureButton>
        </div>
      </div>


      {/* 3-Column Bento KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <DashboardCard className="relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">group</span>
            </div>
            <span className="text-secondary font-bold text-sm bg-secondary-container/30 px-2 py-1 rounded">+12% vs yest.</span>
          </div>
          <p className="text-on-surface-variant font-medium text-sm mb-1 uppercase tracking-widest">Today's Patients</p>
          <p className="text-5xl font-extrabold text-primary">142</p>
          <div className="mt-6 flex gap-2">
            <div className="h-1 flex-1 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-3/4"></div>
            </div>
          </div>
          <p className="mt-2 text-xs text-on-surface-variant">Capacity: 75% utilized</p>
        </DashboardCard>

        <DashboardCard className="border-l-4 border-l-primary p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">hourglass_empty</span>
            </div>
            <span className="text-primary font-bold text-sm">Active</span>
          </div>
          <p className="text-on-surface-variant font-medium text-sm mb-1 uppercase tracking-widest">Active Queues</p>
          <p className="text-5xl font-extrabold text-primary">28</p>
          <div className="mt-6 text-sm text-on-surface-variant flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            Avg. wait time: 14 mins
          </div>
        </DashboardCard>

        <DashboardCard className="signature-gradient text-white relative border-none">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-8xl">payments</span>
          </div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
          </div>
          <p className="text-white/70 font-medium text-sm mb-1 uppercase tracking-widest">Revenue (KES)</p>
          <p className="text-4xl font-extrabold">842,500</p>
          <p className="mt-6 text-sm text-white/80">Net projection for Q3: KES 4.2M</p>
        </DashboardCard>
      </div>

      {/* High Density Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <DashboardCard variant="low" className="lg:col-span-8 p-8">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-bold text-primary">Patient Volume Trend</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white text-xs font-bold text-primary rounded shadow-sm">Today</span>
              <span className="px-3 py-1 text-xs font-medium text-on-surface-variant hover:bg-white/50 rounded transition-all cursor-pointer">Last 7 Days</span>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0, 80, 80, 0.05)' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.value === Math.max(...data.map(d => d.value)) ? '#005050' : '#0050504d'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-4">
            {[
              { label: 'Peak Volume', value: '48 p/hr' },
              { label: 'Morning Avg', value: '18 p/hr' },
              { label: 'Afternoon Avg', value: '32 p/hr' },
              { label: 'Est. Closing', value: '20:00' },
            ].map((metric) => (
              <div key={metric.label} className="border-l border-outline-variant pl-4">
                <p className="text-xs text-on-surface-variant mb-1">{metric.label}</p>
                <p className="text-lg font-bold">{metric.value}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Right Sidebar: Quick Actions */}
        <div className="lg:col-span-4 space-y-8">
          <DashboardCard className="p-6">
            <h4 className="font-bold text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">bolt</span>
              System Health
            </h4>
            <div className="space-y-4">
              {[
                { label: 'Lab Results Pending', value: '12', progress: 33, color: 'bg-primary' },
                { label: 'Bed Occupancy (Level 5)', value: '88%', progress: 88, color: 'bg-secondary' },
                { label: 'Ambulance Availability', value: '1/5', progress: 20, color: 'bg-error' },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant">{item.label}</span>
                    <span className="font-bold text-primary">{item.value}</span>
                  </div>
                  <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          <div className="bg-gradient-to-br from-secondary to-on-secondary-container p-6 rounded-xl text-white">
            <h4 className="font-bold mb-2">Staff Briefing</h4>
            <p className="text-sm opacity-80 mb-4">Mandatory hygiene protocol review today at 4:00 PM in Seminar Room A.</p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 transition-all rounded font-bold text-sm">Confirm Attendance</button>
          </div>
        </div>
      </div>

      {/* Doctor Schedule Table */}
      <DashboardCard className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-extrabold text-primary tracking-tight">On-Call Specialists</h3>
          <div className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-error"></span> In Surgery</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary"></span> On Call</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-300"></span> Off Duty</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-container-high">
                {['Doctor Name', 'Department', 'Shift Hours', 'Current Status', 'Contact'].map((h, i) => (
                  <th key={h} className={`pb-4 font-bold text-on-surface-variant text-xs uppercase tracking-widest ${i === 4 ? 'text-right' : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {specialists.map((doc) => (
                <tr key={doc.name} className="group hover:bg-surface-container-low transition-all">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary">
                        {doc.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{doc.name}</p>
                        <p className="text-xs text-on-surface-variant">{doc.dept}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 text-sm">{doc.station}</td>
                  <td className="py-5 text-sm">{doc.shift}</td>
                  <td className="py-5">
                    <StatusChip label={doc.status} variant={doc.variant as any} dot />
                  </td>
                  <td className="py-5 text-right">
                    <button className="text-primary hover:bg-primary-fixed p-2 rounded-lg transition-all">
                      <span className="material-symbols-outlined">call</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
};

export default AdminDashboard;
