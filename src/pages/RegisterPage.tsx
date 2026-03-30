import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    password: '',
    role: 'Doctor' as Role,
    departmentId: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const isRegistered = await register(
        {
          username: formData.username,
          fullName: formData.fullName,
          role: formData.role,
          departmentId: formData.role === 'Doctor' ? formData.departmentId : undefined,
        },
        formData.password
      );

      if (isRegistered) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        setError('Username already exists. Please choose another.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 font-manrope">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-8 group"
        >
          <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">chevron_left</span>
          Back to Admin Dashboard
        </button>

        <div className="bg-surface-container-lowest rounded-3xl p-10 border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <span className="material-symbols-outlined text-4xl">person_add</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-on-surface">Register Staff</h1>
              <p className="text-on-surface-variant">Create new accounts for Doctors or Receptionists.</p>
            </div>
          </div>

          {success ? (
            <div className="bg-secondary/10 border border-secondary/20 p-8 rounded-2xl text-center space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="inline-flex items-center justify-center p-3 bg-secondary/20 rounded-full text-secondary mb-2">
                <span className="material-symbols-outlined text-5xl">check_circle</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface">Staff Registered Successfully</h3>
              <p className="text-on-surface-variant">Redirecting back to dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1.5 ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-on-surface-variant">person</span>
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="block w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant/50 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
                      placeholder="e.g. Dr. John Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1.5 ml-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-on-surface-variant">mail</span>
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="block w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant/50 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
                      placeholder="e.g. jsmith"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1.5 ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-on-surface-variant">lock</span>
                  </div>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant/50 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1.5 ml-1">
                    Staff Role
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-on-surface-variant">group</span>
                    </div>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
                      className="block w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant/50 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface appearance-none"
                    >
                      <option value="Doctor">Doctor</option>
                      <option value="Receptionist">Receptionist</option>
                    </select>
                  </div>
                </div>

                {formData.role === 'Doctor' && (
                  <div className="animate-in slide-in-from-right-2 duration-300">
                    <label className="block text-sm font-medium text-on-surface-variant mb-1.5 ml-1">
                      Department
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-on-surface-variant">apartment</span>
                      </div>
                      <select
                        required
                        value={formData.departmentId}
                        onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                        className="block w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant/50 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface appearance-none"
                      >
                        <option value="">Select Department</option>
                        <option value="General">General Medicine</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Maternity">Maternity</option>
                        <option value="Emergency">Emergency</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-error-container/40 text-on-error-container text-sm p-4 rounded-2xl border border-error/10">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="px-6 py-3 border border-outline-variant text-on-surface font-semibold rounded-2xl hover:bg-surface-container-low transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-primary text-on-primary font-semibold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  ) : (
                    <>
                      Register Staff
                      <span className="material-symbols-outlined transition-transform group-hover:scale-110">check_circle</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

