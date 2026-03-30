import React from 'react';
import DashboardCard from '../components/ui/DashboardCard';
import SignatureButton from '../components/ui/SignatureButton';
import Input from '../components/ui/Input';
import StatusChip from '../components/ui/StatusChip';

const ReceptionistDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Welcome Header */}
      <div className="col-span-12 mb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary">Reception Dashboard</h1>
        <p className="text-on-surface-variant mt-1">Nairobi West Medical Hub • Level 4 Facility</p>
      </div>

      {/* Left Column: Registration Form */}
      <div className="col-span-12 lg:col-span-5 space-y-8">
        <DashboardCard>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg signature-gradient flex items-center justify-center text-white">
              <span className="material-symbols-outlined fill-1">person_add</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-on-surface">Register Walk-in</h2>
              <p className="text-xs text-on-surface-variant">Capture essential patient details to start triage</p>
            </div>
          </div>
          
          <form className="space-y-6">
            <Input label="National ID / Passport" placeholder="e.g. 29384756" />
            <Input label="Full Name" placeholder="As per Identification Document" />
            <Input label="Phone Number (M-Pesa linked preferred)" prefix="+254" placeholder="712 345 678" type="tel" />
            
            <div className="pt-4 grid grid-cols-2 gap-4">
              <SignatureButton variant="clear" type="button">Clear</SignatureButton>
              <SignatureButton icon="qr_code_2" type="submit">Generate Token</SignatureButton>
            </div>
          </form>
        </DashboardCard>

        {/* Status Cards (Bento style) */}
        <div className="grid grid-cols-2 gap-4">
          <DashboardCard variant="low" className="p-6">
            <p className="text-xs text-on-surface-variant font-medium">Avg. Wait Time</p>
            <p className="text-2xl font-black text-primary mt-1">14 <span className="text-sm font-normal text-on-surface-variant">mins</span></p>
          </DashboardCard>
          <DashboardCard variant="low" className="p-6">
            <p className="text-xs text-on-surface-variant font-medium">Daily Tokens</p>
            <p className="text-2xl font-black text-primary mt-1">128</p>
          </DashboardCard>
        </div>
      </div>

      {/* Right Column: Queue Management & Token Display */}
      <div className="col-span-12 lg:col-span-7 space-y-6">
        {/* Highlighted Active Token Card */}
        <div className="signature-gradient rounded-3xl p-8 text-white flex justify-between items-center shadow-2xl shadow-primary-container/30 overflow-hidden relative">
          <div className="relative z-10">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80">Now Calling</span>
            <h3 className="text-7xl font-black tracking-tighter mt-2">AFY-084</h3>
            <div className="flex gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="text-xs font-bold">Room 04: Triage</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="text-xs font-bold">Nurse M. Adhiambo</span>
              </div>
            </div>
          </div>
          <div className="text-right relative z-10">
            <div className="h-24 w-24 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-5xl fill-1">volume_up</span>
            </div>
            <p className="text-xs font-bold opacity-80">Registered 12 mins ago</p>
          </div>
          {/* Decorative Background Element */}
          <div className="absolute -right-12 -top-12 h-64 w-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Real-time Queue List */}
        <DashboardCard noPadding className="bg-white overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest">
            <h3 className="font-bold text-on-surface">Live Queue (Waiting)</h3>
            <div className="flex gap-2">
              <StatusChip label="8 Active" variant="info" className="lowercase" />
              <StatusChip label="3 Delayed" variant="neutral" className="lowercase" />
            </div>
          </div>
          
          <div className="divide-y divide-outline-variant/10">
            {[
              { id: '085', name: 'Kiptoo Korir', info: 'General Consultation • 8 mins ago', status: 'Verified', variant: 'success' },
              { id: '086', name: 'Wambui Nyambura', info: 'Pediatrics • 15 mins ago', status: 'Urgent', variant: 'error' },
              { id: '087', name: 'Hassan Omar', info: 'Laboratory Tests • 21 mins ago', status: 'Standard', variant: 'neutral' },
              { id: '088', name: 'Zainab Abdi', info: 'Pharmacy Refill • 24 mins ago', status: 'Verified', variant: 'success' },
            ].map((patient) => (
              <div key={patient.id} className="px-6 py-5 flex items-center justify-between hover:bg-surface-container-lowest transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-surface-container-low flex items-center justify-center font-black text-primary border border-outline-variant/20">
                    {patient.id}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">{patient.name}</p>
                    <p className="text-[11px] text-on-surface-variant font-medium">{patient.info}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <StatusChip label={patient.status} variant={patient.variant as any} />
                  <button className="h-8 w-8 rounded-full flex items-center justify-center text-outline group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="px-6 py-4 bg-surface-container-low text-center">
            <button className="text-xs font-bold text-primary hover:underline">View All Patients in Queue</button>
          </div>
        </DashboardCard>
      </div>

      {/* Floating Action for Print */}
      <button className="fixed bottom-8 right-8 h-16 w-16 rounded-full signature-gradient text-white flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-105 transition-transform group z-50">
        <span className="material-symbols-outlined text-3xl">print</span>
        <span className="absolute right-20 bg-primary text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold uppercase tracking-widest pointer-events-none">
          Re-print Token
        </span>
      </button>
    </div>
  );
};

export default ReceptionistDashboard;
