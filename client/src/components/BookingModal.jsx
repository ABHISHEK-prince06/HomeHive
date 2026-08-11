import { useEffect, useState } from 'react';

const extraServices = ['Urgent repair', 'Monthly maintenance', 'Deep cleaning', 'Premium support'];

export default function BookingModal({ isOpen, provider, onClose }) {
  const [form, setForm] = useState({
    service: provider?.role || 'Service',
    date: '',
    time: '09:00',
    duration: '2 hours',
    phone: '',
    notes: '',
    selectedAddOns: ['Urgent repair'],
  });

  useEffect(() => {
    if (provider) {
      setForm((prev) => ({
        ...prev,
        service: provider.role || prev.service,
        selectedAddOns: prev.selectedAddOns.length ? prev.selectedAddOns : ['Urgent repair'],
      }));
    }
  }, [provider]);

  if (!isOpen || !provider) return null;

  const toggleAddOn = (value) => {
    setForm((prev) => ({
      ...prev,
      selectedAddOns: prev.selectedAddOns.includes(value)
        ? prev.selectedAddOns.filter((item) => item !== value)
        : [...prev.selectedAddOns, value],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.25)] sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="flex items-center gap-4">
            <img
              src={provider.image}
              alt={provider.name}
              className="h-16 w-16 rounded-2xl object-cover ring-4 ring-emerald-100"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-600">Book service</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-900">{provider.name}</h3>
              <p className="text-sm text-slate-600">{provider.role} • ₹{provider.hourlyRate}/hr</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-xl font-semibold text-slate-500 hover:text-slate-800">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Service
              <input
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Preferred date
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Time
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Duration
              <select
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500"
              >
                <option>1 hour</option>
                <option>2 hours</option>
                <option>3 hours</option>
                <option>Full day</option>
              </select>
            </label>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-slate-700">Add-ons</p>
            <div className="flex flex-wrap gap-2">
              {extraServices.map((item) => {
                const checked = form.selectedAddOns.includes(item);
                return (
                  <label
                    key={item}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                      checked ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAddOn(item)}
                      className="h-4 w-4 accent-emerald-600"
                    />
                    {item}
                  </label>
                );
              })}
            </div>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Contact number
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Additional details
            <textarea
              rows="4"
              placeholder="Describe your issue or preferred schedule"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500"
            />
          </label>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Confirm booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
