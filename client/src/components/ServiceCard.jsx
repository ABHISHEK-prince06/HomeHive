import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from './BookingModal';

export default function ServiceCard({ data }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (!data) return null;

  const provider = data.provider || data;
  const name = provider.userId?.name || provider.name || 'Professional';
  const rating = provider.rating || 4.8;
  const experience = provider.experience || 3;
  const price = provider.hourlyRate || 350;
  const distance = Math.round(data.distance || provider.distance || 420);
  const bio = provider.bio || 'Experienced and trusted service professional.';
  const role = provider.serviceRoles?.[0] || provider.role || 'Service Provider';
  const id = provider.id || provider.userId?._id || provider._id || 'profile';

  return (
    <>
      <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.10)]">
        <div className="flex flex-col gap-5 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-[1.5rem] border border-slate-200 shadow-sm">
              <img src={provider.image} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-medium text-emerald-700">Verified</span>
                <span className="text-slate-500">★ {rating}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">{provider.reviews || 128} reviews</span>
              </div>

              <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">{name}</h3>
              <p className="mt-1 text-sm font-medium text-slate-600">{role}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{bio}</p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-700">{experience}+ years</div>
                <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-700">{distance}m away</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Starting at</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">₹{price}</p>
              <p className="text-sm text-slate-500">per hour</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to={`/provider/${id}`} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
                View Profile
              </Link>
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(16,185,129,0.24)] transition hover:bg-emerald-500"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </article>

      <BookingModal isOpen={isBookingOpen} provider={provider} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
