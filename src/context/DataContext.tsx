import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNotification } from './NotificationContext';

export type PatientStatus = 'queued' | 'in-progress' | 'served' | 'admitted';
export type AppointmentStatus = 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
export type DoctorStatus = 'available' | 'in-surgery' | 'on-call' | 'off-duty';
export type Priority = 'standard' | 'urgent' | 'emergency';

export interface Vitals {
    temperature: number;
    bloodPressure: string;
    heartRate: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    weight?: number;
    recordedAt: string;
}

export interface Prescription {
    id: string;
    medicineName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    prescribedAt: string;
    prescribedBy: string;
}

export interface Referral {
    id: string;
    toSpecialty: string;
    reason: string;
    urgency: 'routine' | 'urgent' | 'emergency';
    referredAt: string;
    referredBy: string;
}

export interface Patient {
    id: string;
    tokenId: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    phone: string;
    nationalId: string;
    reason: string;
    assignedDoctor?: string;
    status: PatientStatus;
    registeredAt: string;
    servedAt?: string;
    diagnosis?: string;
    consultationNotes?: string;
    department: string;
    priority: Priority;
    vitals?: Vitals[];
    prescriptions?: Prescription[];
    referrals?: Referral[];
}

export interface Appointment {
    id: string;
    patientName: string;
    patientId?: string;
    doctorName: string;
    department: string;
    date: string;
    time: string;
    type: 'scheduled' | 'walk-in' | 'follow-up';
    status: AppointmentStatus;
    notes?: string;
}

export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    station: string;
    shift: string;
    status: DoctorStatus;
    patientsSeenToday: number;
    phone: string;
    email: string;
    departmentId: string;
}

export interface InventoryItem {
    id: string;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    reorderLevel: number;
    lastUpdated: string;
    supplier: string;
}

export const getInventoryStatus = (item: InventoryItem): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    if (item.quantity === 0) return 'out-of-stock';
    if (item.quantity <= item.reorderLevel) return 'low-stock';
    return 'in-stock';
};

interface DataContextType {
    patients: Patient[];
    appointments: Appointment[];
    doctors: Doctor[];
    inventory: InventoryItem[];
    addPatient: (data: Omit<Patient, 'id' | 'tokenId' | 'registeredAt'>) => Patient;
    updatePatientStatus: (id: string, status: PatientStatus, extra?: Partial<Patient>) => void;
    addAppointment: (data: Omit<Appointment, 'id'>) => void;
    updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
    addPrescription: (patientId: string, prescription: Omit<Prescription, 'id' | 'prescribedAt'>) => void;
    addReferral: (patientId: string, referral: Omit<Referral, 'id' | 'referredAt'>) => void;
    updateVitals: (patientId: string, vitals: Omit<Vitals, 'recordedAt'>) => void;
    getDepartmentStats: () => Record<string, number>;
    ready: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const today = new Date().toISOString().split('T')[0];
const ago = (mins: number) => new Date(Date.now() - mins * 60000).toISOString();

const INITIAL_PATIENTS: Patient[] = [
    {
        id: 'p1', tokenId: 'AFY-084', name: 'Mzee Juma Bakari', age: 68, gender: 'Male',
        phone: '+254712345678', nationalId: '12345678',
        reason: 'Hypertension management — recurring headaches and lower limb edema',
        assignedDoctor: 'Dr. Anthony Maina', status: 'in-progress',
        registeredAt: ago(12), department: 'Cardiology', priority: 'standard',
        vitals: [{ temperature: 37.2, bloodPressure: '145/95', heartRate: 82, respiratoryRate: 18, oxygenSaturation: 97, weight: 78, recordedAt: ago(10) }]
    },
    {
        id: 'p2', tokenId: 'AFY-085', name: 'Kiptoo Korir', age: 34, gender: 'Male',
        phone: '+254722456789', nationalId: '23456789', reason: 'General consultation',
        status: 'queued', registeredAt: ago(8), department: 'General', priority: 'standard',
    },
    {
        id: 'p3', tokenId: 'AFY-086', name: 'Wambui Nyambura', age: 4, gender: 'Female',
        phone: '+254733567890', nationalId: '34567890', reason: 'Fever and cough for 3 days',
        status: 'queued', registeredAt: ago(15), department: 'Pediatrics', priority: 'urgent',
    },
    {
        id: 'p6', tokenId: 'AFY-079', name: 'Grace Otieno', age: 52, gender: 'Female',
        phone: '+254766890123', nationalId: '67890123',
        reason: 'Diabetes management', assignedDoctor: 'Dr. Linda Kamau', status: 'served',
        registeredAt: ago(180), servedAt: ago(120),
        diagnosis: 'Type 2 Diabetes — Controlled',
        consultationNotes: 'Metformin dosage adjusted. HbA1c improved to 7.2%. Next review in 3 months.',
        department: 'General', priority: 'standard',
        prescriptions: [
            { id: 'rx1', medicineName: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '90 days', instructions: 'Take with snacks', prescribedAt: ago(120), prescribedBy: 'Dr. Linda Kamau' }
        ]
    },
    {
        id: 'p9', tokenId: 'AFY-082', name: 'Samuel Waweru', age: 55, gender: 'Male',
        phone: '+254799123456', nationalId: '90123456',
        reason: 'Chest pain — acute onset, radiating to left arm',
        assignedDoctor: 'Dr. Anthony Maina', status: 'admitted',
        registeredAt: ago(360), department: 'Emergency', priority: 'emergency',
        vitals: [{ temperature: 36.8, bloodPressure: '160/105', heartRate: 110, respiratoryRate: 24, oxygenSaturation: 94, weight: 85, recordedAt: ago(355) }]
    },
];

const INITIAL_APPOINTMENTS: Appointment[] = [
    { id: 'a1', patientName: 'Sarah Mwangi', doctorName: 'Dr. Anthony Maina', department: 'Cardiology', date: today, time: '09:00', type: 'scheduled', status: 'completed', notes: 'ECG monitoring follow-up post-stent' },
    { id: 'a2', patientName: 'John Kamau', doctorName: 'Dr. Linda Kamau', department: 'Pediatrics', date: today, time: '10:30', type: 'follow-up', status: 'in-progress' },
];

const INITIAL_DOCTORS: Doctor[] = [
    { id: 'd1', name: 'Dr. Anthony Maina', specialization: 'Cardiologist', station: 'Emergency Room', shift: '08:00 - 16:00', status: 'in-surgery', patientsSeenToday: 8, phone: '+254712000001', email: 'a.maina@afyaflow.co.ke', departmentId: 'Cardiology' },
    { id: 'd2', name: 'Dr. Linda Kamau', specialization: 'Pediatrician', station: 'Outpatient', shift: '09:00 - 18:00', status: 'on-call', patientsSeenToday: 12, phone: '+254712000002', email: 'l.kamau@afyaflow.co.ke', departmentId: 'Pediatrics' },
    { id: 'd3', name: 'Dr. Caleb Otieno', specialization: 'Neurologist', station: 'Ward C (Neuro)', shift: '12:00 - 20:00', status: 'on-call', patientsSeenToday: 5, phone: '+254712000003', email: 'c.otieno@afyaflow.co.ke', departmentId: 'Neurology' },
    { id: 'd4', name: 'Dr. Faith Mutua', specialization: 'Gynecologist', station: 'Maternity Ward', shift: '08:00 - 16:00', status: 'available', patientsSeenToday: 7, phone: '+254712000004', email: 'f.mutua@afyaflow.co.ke', departmentId: 'Maternity' },
    { id: 'd5', name: 'Dr. James Odhiambo', specialization: 'General Physician', station: 'Outpatient Room 2', shift: '08:00 - 16:00', status: 'available', patientsSeenToday: 15, phone: '+254712000005', email: 'j.odhiambo@afyaflow.co.ke', departmentId: 'General' },
];

const INITIAL_INVENTORY: InventoryItem[] = [
    { id: 'i1', name: 'Amoxicillin 500mg', category: 'Antibiotics', quantity: 450, unit: 'Tablets', reorderLevel: 100, lastUpdated: today, supplier: 'Medivet Kenya' },
    { id: 'i2', name: 'Paracetamol 500mg', category: 'Analgesics', quantity: 1200, unit: 'Tablets', reorderLevel: 200, lastUpdated: today, supplier: 'Dawa Ltd' },
];

const STORAGE_KEY = 'afyaflow_app_data';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
    const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
    const [doctors] = useState<Doctor[]>(INITIAL_DOCTORS);
    const [inventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
    const [ready, setReady] = useState(false);
    const { notify } = useNotification();

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                if (data.patients?.length) setPatients(data.patients);
                if (data.appointments?.length) setAppointments(data.appointments);
            }
        } catch { /* ignore parse errors */ }
        setReady(true);

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                try {
                    const data = JSON.parse(e.newValue);
                    if (data.patients) setPatients(data.patients);
                    if (data.appointments) setAppointments(data.appointments);
                } catch { /* ignore parse errors */ }
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        if (!ready) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ patients, appointments }));
    }, [patients, appointments, ready]);

    const generateTokenId = useCallback((existing: Patient[]) => {
        const nums = existing.map(p => {
            const part = p.tokenId.split('-')[1];
            return part ? parseInt(part) : 0;
        }).filter(n => !isNaN(n));
        const max = nums.length > 0 ? Math.max(...nums) : 88;
        return `AFY-${String(max + 1).padStart(3, '0')}`;
    }, []);

    const addPatient = useCallback((data: Omit<Patient, 'id' | 'tokenId' | 'registeredAt'>): Patient => {
        const newPatient: Patient = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            tokenId: generateTokenId(patients),
            registeredAt: new Date().toISOString(),
        };
        setPatients(prev => [...prev, newPatient]);
        notify(`Patient ${newPatient.name} registered successfully. Token: ${newPatient.tokenId}`, 'success', 'Patient Registered');
        return newPatient;
    }, [patients, generateTokenId, notify]);

    const updatePatientStatus = useCallback((id: string, status: PatientStatus, extra?: Partial<Patient>) => {
        setPatients(prev => prev.map(p => p.id === id ? { ...p, status, ...extra } : p));
        if (status === 'served') {
            notify('Consultation completed and record updated.', 'success', 'Session Ended');
        }
    }, [notify]);

    const addAppointment = useCallback((data: Omit<Appointment, 'id'>) => {
        setAppointments(prev => [...prev, { ...data, id: Math.random().toString(36).substr(2, 9) }]);
        notify(`Appointment scheduled for ${data.patientName}.`, 'success', 'Appointment Created');
    }, [notify]);

    const updateAppointmentStatus = useCallback((id: string, status: AppointmentStatus) => {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    }, []);

    const addPrescription = useCallback((patientId: string, rx: Omit<Prescription, 'id' | 'prescribedAt'>) => {
        const newRx: Prescription = {
            ...rx,
            id: Math.random().toString(36).substr(2, 9),
            prescribedAt: new Date().toISOString(),
        };
        setPatients(prev => prev.map(p => 
            p.id === patientId 
                ? { ...p, prescriptions: [...(p.prescriptions || []), newRx] } 
                : p
        ));
        notify(`Prescribed ${newRx.medicineName} to patient.`, 'success', 'Prescription Added');
    }, [notify]);

    const addReferral = useCallback((patientId: string, ref: Omit<Referral, 'id' | 'referredAt'>) => {
        const newRef: Referral = {
            ...ref,
            id: Math.random().toString(36).substr(2, 9),
            referredAt: new Date().toISOString(),
        };
        setPatients(prev => prev.map(p => 
            p.id === patientId 
                ? { ...p, referrals: [...(p.referrals || []), newRef] } 
                : p
        ));
        notify(`Referral to ${newRef.toSpecialty} generated.`, 'info', 'Specialist Referral');
    }, [notify]);

    const updateVitals = useCallback((patientId: string, v: Omit<Vitals, 'recordedAt'>) => {
        const newVitals: Vitals = {
            ...v,
            recordedAt: new Date().toISOString(),
        };
        setPatients(prev => prev.map(p => 
            p.id === patientId 
                ? { ...p, vitals: [...(p.vitals || []), newVitals] } 
                : p
        ));
        notify('Vitals updated successfully.', 'success', 'Vitals Recorded');
    }, [notify]);

    const getDepartmentStats = useCallback(() => {
        const stats: Record<string, number> = {};
        patients.filter(p => p.status === 'queued' || p.status === 'in-progress').forEach(p => {
            stats[p.department] = (stats[p.department] || 0) + 1;
        });
        return stats;
    }, [patients]);

    return (
        <DataContext.Provider value={{
            patients,
            appointments,
            doctors,
            inventory,
            addPatient,
            updatePatientStatus,
            addAppointment,
            updateAppointmentStatus,
            addPrescription,
            addReferral,
            updateVitals,
            getDepartmentStats,
            ready
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error('useData must be within DataProvider');
    return ctx;
};