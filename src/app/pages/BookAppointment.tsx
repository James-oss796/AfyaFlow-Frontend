import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Activity, ArrowLeft, Check } from 'lucide-react';
import { toast } from 'sonner';
import {
  getDepartmentsApi,
  getDoctorsByDepartmentApi,
  getAvailableSlotsApi,
  bookAppointmentApi,
  Doctor,
  Department
} from '../../lib/api';

type BookingStep = 'department' | 'doctor' | 'date' | 'time' | 'confirm';

export function BookAppointment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<BookingStep>('department');

  const [departments, setDepartments] = useState<Department[]>([]);
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Load departments
  useEffect(() => {
    getDepartmentsApi()
      .then(setDepartments)
      .catch(() => toast.error('Failed to load departments'));
  }, []);

  // Load doctors for selected department
  useEffect(() => {
    if (!selectedDepartment) return;

    setLoadingDoctors(true);
    getDoctorsByDepartmentApi(selectedDepartment)
      .then(setAvailableDoctors)
      .catch(() => {
        toast.error('Failed to load doctors for this department');
        setAvailableDoctors([]);
      })
      .finally(() => setLoadingDoctors(false));
  }, [selectedDepartment]);

  // Load available slots for selected doctor + date
  useEffect(() => {
    if (!selectedDoctor || !selectedDate) return;

    setLoadingSlots(true);
    getAvailableSlotsApi(selectedDoctor, selectedDate)
      .then(setTimeSlots)
      .catch(() => {
        toast.error('Failed to load available time slots');
        setTimeSlots([]);
      })
      .finally(() => setLoadingSlots(false));
  }, [selectedDoctor, selectedDate]);

  const handleConfirmBooking = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;

    try {
      await bookAppointmentApi({ doctorId: selectedDoctor, date: selectedDate, time: selectedTime });
      toast.success('Appointment booked successfully!');
      navigate('/patient'); // back to patient dashboard
    } catch {
      toast.error('Failed to book appointment');
    }
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
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-primary animate-spin-slow" />
            <h1 className="text-2xl font-bold text-foreground">Book Appointment</h1>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-6 flex justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  step.completed ? 'bg-secondary text-white' :
                  currentStep === step.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {step.completed ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <p className={`text-sm mt-2 ${currentStep === step.id ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 && <div className={`h-1 flex-1 transition-colors duration-300 ${step.completed ? 'bg-secondary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* Step 1: Department */}
        {currentStep === 'department' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select Department</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {departments.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => { setSelectedDepartment(dept.id); setCurrentStep('doctor'); }}
                  className="bg-white rounded-xl border-2 border-border p-6 hover:border-primary hover:shadow-lg transition-all text-left flex flex-col justify-center"
                >
                  <h3 className="font-semibold text-lg mb-2">{dept.name}</h3>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Doctor */}
        {currentStep === 'doctor' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select Doctor</h2>
            {loadingDoctors ? (
              <p className="text-center text-muted-foreground mt-6">Loading doctors...</p>
            ) : availableDoctors.length ? (
              <div className="grid md:grid-cols-2 gap-4">
                {availableDoctors.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => { setSelectedDoctor(doc.id); setCurrentStep('date'); }}
                    className="bg-white rounded-xl border-2 border-border p-6 hover:border-primary hover:shadow-lg transition-all text-left flex items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-semibold">
                      {doc.name.split(' ')[1]?.[0] || doc.name[0]}
                    </div>
                   
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground mt-6">No doctors available for this department.</p>
            )}
          </div>
        )}

        {/* Step 3: Date */}
        {currentStep === 'date' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select Date</h2>
            <input
              type="date"
              min={minDate}
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="w-full p-4 border-2 border-border rounded-lg text-lg"
            />
            {selectedDate && (
              <button
                className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                onClick={() => setCurrentStep('time')}
              >
                Next
              </button>
            )}
          </div>
        )}

        {/* Step 4: Time */}
        {currentStep === 'time' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select Time Slot</h2>
            {loadingSlots ? (
              <p className="text-center text-muted-foreground mt-6">Loading available slots...</p>
            ) : timeSlots.length ? (
              <div className="grid grid-cols-4 gap-3">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => { setSelectedTime(slot); setCurrentStep('confirm'); }}
                    className="bg-white rounded-lg border-2 border-border p-4 hover:border-primary hover:shadow-md transition-all font-medium"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground mt-6">No time slots available for this doctor on the selected date.</p>
            )}
          </div>
        )}

        {/* Step 5: Confirm */}
        {currentStep === 'confirm' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Confirm Appointment</h2>
            <div className="bg-white rounded-xl border border-border p-8 space-y-4 shadow-md">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Department</span>
                <span className="font-semibold">{departments.find(d => d.id === selectedDepartment)?.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Doctor</span>
                <span className="font-semibold">{availableDoctors.find(d => d.id === selectedDoctor)?.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Date</span>
                <span className="font-semibold">{new Date(selectedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Time</span>
                <span className="font-semibold">{selectedTime}</span>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setCurrentStep('department')}
                  className="flex-1 px-6 py-3 border-2 border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Start Over
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
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