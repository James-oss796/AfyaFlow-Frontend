import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Activity, ArrowLeft, Calendar, Check } from 'lucide-react';
import { toast } from 'sonner';

type BookingStep = 'department' | 'doctor' | 'date' | 'time' | 'confirm';

const departments = [
  { id: 1, name: 'General Medicine', doctors: 5 },
  { id: 2, name: 'Cardiology', doctors: 3 },
  { id: 3, name: 'Pediatrics', doctors: 4 },
  { id: 4, name: 'Dental', doctors: 2 },
  { id: 5, name: 'Orthopedics', doctors: 3 },
  { id: 6, name: 'Dermatology', doctors: 2 },
];

const doctors = {
  1: [
    { id: 1, name: 'Dr. James Smith', specialization: 'General Physician' },
    { id: 2, name: 'Dr. Linda Johnson', specialization: 'General Physician' },
    { id: 3, name: 'Dr. Robert Davis', specialization: 'General Physician' },
  ],
  2: [
    { id: 4, name: 'Dr. Sarah Williams', specialization: 'Cardiologist' },
    { id: 5, name: 'Dr. Michael Brown', specialization: 'Cardiologist' },
    { id: 6, name: 'Dr. Jennifer Lee', specialization: 'Cardiologist' },
  ],
  3: [
    { id: 7, name: 'Dr. Emily Wilson', specialization: 'Pediatrician' },
    { id: 8, name: 'Dr. David Martinez', specialization: 'Pediatrician' },
    { id: 9, name: 'Dr. Lisa Anderson', specialization: 'Pediatrician' },
  ],
  4: [
    { id: 10, name: 'Dr. Thomas Taylor', specialization: 'Dentist' },
    { id: 11, name: 'Dr. Amanda White', specialization: 'Dentist' },
  ],
  5: [
    { id: 12, name: 'Dr. Christopher Moore', specialization: 'Orthopedic Surgeon' },
    { id: 13, name: 'Dr. Jessica Harris', specialization: 'Orthopedic Surgeon' },
    { id: 14, name: 'Dr. Kevin Clark', specialization: 'Orthopedic Surgeon' },
  ],
  6: [
    { id: 15, name: 'Dr. Michelle Robinson', specialization: 'Dermatologist' },
    { id: 16, name: 'Dr. Daniel Lewis', specialization: 'Dermatologist' },
  ],
};

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

export function BookAppointment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<BookingStep>('department');
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Memoize the minimum date to prevent recalculation on every render
  const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleConfirmBooking = () => {
    toast.success('Appointment booked successfully!');
    navigate('/patient');
  };

  const steps = [
    { id: 'department', label: 'Department', completed: selectedDepartment !== null },
    { id: 'doctor', label: 'Doctor', completed: selectedDoctor !== null },
    { id: 'date', label: 'Date', completed: selectedDate !== '' },
    { id: 'time', label: 'Time', completed: selectedTime !== '' },
    { id: 'confirm', label: 'Confirm', completed: false },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <Activity className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Book Appointment</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-secondary text-white' 
                      : currentStep === step.id 
                      ? 'bg-primary text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.completed ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <p className={`text-sm mt-2 ${
                    currentStep === step.id ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 ${step.completed ? 'bg-secondary' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Step 1: Select Department */}
        {currentStep === 'department' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select Department</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => {
                    setSelectedDepartment(dept.id);
                    setCurrentStep('doctor');
                  }}
                  className="bg-white rounded-xl border-2 border-border p-6 hover:border-primary hover:shadow-md transition-all text-left"
                >
                  <h3 className="font-semibold text-lg mb-2">{dept.name}</h3>
                  <p className="text-sm text-muted-foreground">{dept.doctors} doctors available</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Doctor */}
        {currentStep === 'doctor' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select Doctor</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {(doctors[selectedDepartment as keyof typeof doctors] || []).map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => {
                    setSelectedDoctor(doc.id);
                    setCurrentStep('date');
                  }}
                  className="bg-white rounded-xl border-2 border-border p-6 hover:border-primary hover:shadow-md transition-all text-left flex items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-semibold">
                    {doc.name.split(' ')[1][0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">{doc.specialization}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select Date */}
        {currentStep === 'date' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select Date</h2>
            <div className="bg-white rounded-xl border border-border p-6">
              <input
                type="date"
                min={minDate}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  if (e.target.value) {
                    setTimeout(() => setCurrentStep('time'), 500);
                  }
                }}
                className="w-full p-4 border-2 border-border rounded-lg text-lg"
              />
            </div>
          </div>
        )}

        {/* Step 4: Select Time */}
        {currentStep === 'time' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select Time Slot</h2>
            <div className="grid grid-cols-4 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => {
                    setSelectedTime(slot);
                    setCurrentStep('confirm');
                  }}
                  className="bg-white rounded-lg border-2 border-border p-4 hover:border-primary hover:shadow-md transition-all font-medium"
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {currentStep === 'confirm' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Confirm Appointment</h2>
            <div className="bg-white rounded-xl border border-border p-8">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Department</span>
                  <span className="font-semibold">
                    {departments.find(d => d.id === selectedDepartment)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Doctor</span>
                  <span className="font-semibold">
                    {doctors[selectedDepartment as keyof typeof doctors]?.find(d => d.id === selectedDoctor)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold">
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-semibold">{selectedTime}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep('department')}
                  className="flex-1 px-6 py-3 border-2 border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Start Over
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}