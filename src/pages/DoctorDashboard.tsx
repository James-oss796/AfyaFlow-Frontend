import React from 'react';
import DashboardCard from '../components/ui/DashboardCard';
import SignatureButton from '../components/ui/SignatureButton';
import StatusChip from '../components/ui/StatusChip';

const vitals = [
  { label: 'BP (Sys/Dia)', value: '142/90', unit: 'mmHg', trend: '+5 from baseline', status: 'error', icon: 'monitor_heart' },
  { label: 'Heart Rate', value: '72', unit: 'BPM', trend: 'Normal Range', status: 'success', icon: 'favorite' },
  { label: 'SpO2', value: '98', unit: '%', trend: 'Optimal', status: 'success', icon: 'air' },
  { label: 'Temp', value: '36.8', unit: '°C', trend: 'Stable', status: 'success', icon: 'thermostat' },
];

const prescriptions = [
  { name: 'Amlodipine Besylate', dose: '5mg • Once Daily • Morning' },
  { name: 'Hydrochlorothiazide', dose: '12.5mg • Once Daily • Morning' },
];

const queue = [
  { name: 'Sarah Mwangi', info: 'Emergency • Chest Pain', time: '02 MIN', variant: 'error', avatar: 'SM' },
  { name: 'John Kamau', info: 'Routine • Follow-up', time: '15 MIN', variant: 'info', avatar: 'JK' },
  { name: 'Amina Lesuda', info: 'Consult • Prenatal', time: '28 MIN', variant: 'neutral', avatar: 'AL' },
  { name: 'Brian Otieno', info: 'Labs • Malaria Screening', time: '45 MIN', variant: 'neutral', avatar: 'BO', opacity: true },
];

const DoctorDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Left Side: Patient Queue */}
      <section className="col-span-12 lg:col-span-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-primary">Patient Queue</h2>
            <p className="text-sm text-on-surface-variant">Today's Schedule & Walk-ins</p>
          </div>
          <SignatureButton variant="primary" icon="play_arrow" className="py-2.5 px-4 text-sm shadow-primary/20">
            Next Patient
          </SignatureButton>
        </div>

        {/* Bento Style Queue List */}
        <div className="space-y-3">
          {queue.map((patient, i) => (
            <div 
              key={i} 
              className={`p-4 bg-surface-container-lowest rounded-xl shadow-sm border-l-4 transition-colors group cursor-pointer hover:bg-surface-container-low text-on-surface
                ${patient.variant === 'error' ? 'border-error' : 'border-transparent'} 
                ${patient.opacity ? 'opacity-60' : ''}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                    ${patient.variant === 'error' ? 'bg-error-container text-on-error-container' : 
                      patient.variant === 'info' ? 'bg-secondary-container text-on-secondary-container' : 
                      'bg-surface-container-high'}`}
                  >
                    {patient.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{patient.name}</h4>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">{patient.info}</p>
                  </div>
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded 
                  ${patient.variant === 'error' ? 'bg-error-container text-on-error-container' : 'text-on-surface-variant'}`}
                >
                  {patient.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Efficiency Card */}
        <div className="bg-primary-container p-6 rounded-2xl text-on-primary-container relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs font-semibold opacity-80 mb-1">Clinic Performance</p>
            <h3 className="text-3xl font-extrabold">84%</h3>
            <p className="text-xs mt-2">Efficiency rating today. Keep it up!</p>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl opacity-10">medical_services</span>
        </div>
      </section>

      {/* Right Side: Active Consultation */}
      <section className="col-span-12 lg:col-span-8 space-y-6">
        <DashboardCard className="p-8">
          <div className="flex justify-between items-start mb-12">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img 
                  alt="Patient Avatar" 
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-surface-container-low border border-outline-variant/20" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFt5yIhrS1PmQePkNM6jNBca-R1-4jGBr0t2Bw9DKXnsOIWUV1OFcyD4k90hbhwXADvXa59nokDBrJkdnS23GCGt6hzW5q_tGqk4y_1d7DabmcGn_zL4Bok01xjxXiUJ_os0vs8_Hn3BIC3qfz6CcJaA1-fIBsHijKVuqeXD9L31JiLBJ0dp8OyDOJD3KeeqdpjVTqYf25LMkBy_e74_zdxxNuFAvxv4QC2GToIQGvFPmgclIqGJ0gYh5V-cRal3dDogrCqT0AlUk"
                />
                <span className="absolute -bottom-2 -right-2 bg-secondary text-white p-1 rounded-full text-[10px] px-2 font-bold uppercase tracking-widest">Active</span>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black text-primary tracking-tight">Mzee Juma Bakari</h1>
                  <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-xs font-bold">ID: AF-8829</span>
                </div>
                <p className="text-on-surface-variant font-medium mt-1">68 Years Old • Male • Hypertension Management</p>
                <div className="flex gap-4 mt-4">
                  <span className="flex items-center gap-1 text-xs text-secondary font-bold cursor-pointer hover:underline">
                    <span className="material-symbols-outlined text-sm">history</span>
                    Last Visit: 14 Days ago
                  </span>
                  <span className="flex items-center gap-1 text-xs text-primary font-bold cursor-pointer hover:underline">
                    <span className="material-symbols-outlined text-sm">description</span>
                    View Clinical Notes
                  </span>
                </div>
              </div>
            </div>
            <SignatureButton variant="secondary" icon="check_circle" className="bg-surface-container-low py-3 px-6 shadow-none hover:bg-primary-container hover:text-white">
              Mark as Served
            </SignatureButton>
          </div>

          {/* Vitals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {vitals.map((vital, i) => (
              <div key={i} className={`bg-surface-container-low p-5 rounded-2xl border-b-4 
                ${vital.status === 'error' ? 'border-error' : 'border-secondary'}`}
              >
                <div className="flex items-center justify-between mb-3 text-on-surface">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{vital.label}</span>
                  <span className={`material-symbols-outlined ${vital.status === 'error' ? 'text-error' : 'text-secondary'}`}>
                    {vital.icon}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-primary tracking-tighter">{vital.value}</span>
                  <span className="text-xs font-bold text-on-surface-variant">{vital.unit}</span>
                </div>
                <div className={`mt-3 flex items-center gap-1 text-[10px] font-bold 
                  ${vital.status === 'error' ? 'text-error' : 'text-secondary'}`}
                >
                  <span className="material-symbols-outlined text-[12px]">
                    {vital.status === 'error' ? 'trending_up' : 'check'}
                  </span>
                  {vital.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Consultation Workspace */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary">Patient Complaint</h3>
              <div className="bg-surface-container-low p-4 rounded-xl min-h-[120px] text-sm leading-relaxed text-on-surface-variant italic border border-outline-variant/10">
                "Patient reports recurring headaches in the morning and mild edema in the lower limbs. Compliant with Amlodipine 5mg but notes occasional fatigue after dosage."
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusChip label="HYPERTENSION" variant="info" />
                <StatusChip label="EDEMA" variant="error" />
                <StatusChip label="ADHERENCE CHECK" variant="neutral" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary">Active Prescriptions</h3>
              <div className="space-y-2">
                {prescriptions.map((med, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white border border-outline-variant/20 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">medication</span>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{med.name}</p>
                        <p className="text-[10px] text-on-surface-variant font-medium">{med.dose}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-sm cursor-pointer hover:text-primary transition-colors">info</span>
                  </div>
                ))}
                <button className="w-full py-2 border-2 border-dashed border-outline-variant rounded-lg text-[10px] font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all uppercase tracking-widest mt-2">
                  + Add New Prescription
                </button>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Bottom Layer Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-container-high/50 p-6 rounded-3xl border border-outline-variant/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-primary">Lab Results (Pending)</h3>
              <span className="material-symbols-outlined text-on-surface-variant">biotech</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Serum Creatinine', status: 'Processing' },
                { name: 'Lipid Profile', status: 'Processing' },
              ].map((lab, i) => (
                <div key={i} className="flex justify-between items-center text-xs text-on-surface">
                  <span className="font-medium">{lab.name}</span>
                  <span className="bg-secondary text-white px-2 py-0.5 rounded text-[10px] font-bold">{lab.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="signature-gradient p-6 rounded-3xl text-white relative shadow-xl shadow-primary/20">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-2">Internal Referral</h3>
            <p className="text-xs opacity-90 leading-relaxed mb-4">Patient should be scheduled for an Echocardiogram (ECG) next week to monitor ventricular wall thickness.</p>
            <button className="bg-white text-primary px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all">
              Request Cardiology
            </button>
            <span className="material-symbols-outlined absolute top-6 right-6 opacity-20">assignment_return</span>
          </div>
        </div>
      </section>

      {/* Primary Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="signature-gradient w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/40 hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
