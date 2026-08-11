import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const serviceRoles = ['Electrician', 'Plumber', 'Cook', 'Cleaner', 'Gardener', 'Driver', 'Home Nurse', 'Childcare Provider', 'Carpenter', 'Painter', 'Appliance Technician'];

export default function ProviderOnboardingPage() {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState('CUSTOMER');
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', gender: 'Male', location: '641105', serviceRole: 'Electrician' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleAccountSubmit(event) {
    event.preventDefault();
    if (mode === 'CUSTOMER') {
      await axios.post('http://localhost:5000/api/auth/register', { ...form, role: 'CUSTOMER' });
      navigate('/login');
      return;
    }
    setStep(2);
  }

  async function handleProviderSubmit(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { ...form, role: 'PROVIDER' });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">Join HomeHive</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Turn your skills into income.</h1>
          </div>
          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
            Step {step} of 2
          </div>
        </div>

        <div className="mt-6 h-2 w-full rounded-full bg-slate-100">
          <div className="h-2 w-[50%] rounded-full bg-emerald-500" />
        </div>

        {step === 1 ? (
          <form onSubmit={handleAccountSubmit} className="mt-8 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Account type</span>
                <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                  <option value="CUSTOMER">I need services</option>
                  <option value="PROVIDER">I want to offer services</option>
                </select>
              </label>
            </div>

            <button type="submit" className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleProviderSubmit} className="mt-8 space-y-4">
            {error && <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
                <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Gender</label>
                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Location</label>
                <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Primary service role</label>
              <select value={form.serviceRole} onChange={(e) => setForm({ ...form, serviceRole: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                {serviceRoles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Create provider account
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
