import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProviderById } from '../data/mockData';

export default function ProviderProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('About');

  const profile = useMemo(() => getProviderById(id), [id]);
  const tabs = ['About', 'Skills', 'Portfolio', 'Reviews', 'Availability'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.05)]">
        <div className="h-56 bg-[linear-gradient(135deg,#d1fae5_0%,#dbeafe_30%,#f8fafc_100%)] p-6 sm:h-72">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur">✓ Verified Professional</span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">★ {profile.rating}</span>
          </div>
        </div>

        <div className="px-5 pb-8 sm:px-8 lg:px-10">
          <div className="-mt-16 flex flex-col gap-6 lg:-mt-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-28 w-28 items-center justify-center rounded-[1.75rem] border-4 border-white bg-[linear-gradient(135deg,#bbf7d0_0%,#e2e8f0_100%)] text-2xl font-bold text-slate-800 shadow-lg">
                {profile.image}
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{profile.name}</h1>
                <p className="mt-2 text-base text-slate-600">{profile.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Starting at</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">₹{profile.hourlyRate}</p>
              </div>
              <button className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(16,185,129,0.28)] transition hover:bg-emerald-500">
                Book Now
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      activeTab === tab ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                {activeTab === 'About' && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">About</h2>
                    <p className="mt-4 text-base leading-7 text-slate-600">{profile.bio}</p>
                  </div>
                )}

                {activeTab === 'Skills' && (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {activeTab === 'Portfolio' && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="h-28 rounded-[1.25rem] bg-[linear-gradient(135deg,#d1fae5_0%,#f1f5f9_100%)]" />
                    ))}
                  </div>
                )}

                {activeTab === 'Reviews' && (
                  <div className="space-y-4">
                    {[
                      { name: 'Riya S.', text: 'Very punctual and professional. The job was fixed cleanly and explained clearly.' },
                      { name: 'Harini M.', text: 'Helpful, respectful, and quick to respond. Highly recommended.' },
                    ].map((review) => (
                      <div key={review.name} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-medium text-slate-900">{review.name}</p>
                          <span className="text-amber-500">★★★★★</span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Availability' && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {profile.availability.map((slot) => (
                      <div key={slot} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                        {slot}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">Rating</p>
                  <p className="text-sm font-semibold text-slate-900">★ {profile.rating}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-slate-500">Experience</p>
                  <p className="text-sm font-semibold text-slate-900">{profile.experience}+ years</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-slate-500">Distance</p>
                  <p className="text-sm font-semibold text-slate-900">{profile.distance}m away</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="text-right text-sm font-semibold text-slate-900">{profile.city}</p>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">Service area</h3>
                <div className="mt-4 h-32 rounded-[1.25rem] bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.2),_transparent_40%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] p-4">
                  <div className="flex h-full items-center justify-center rounded-[1rem] border border-dashed border-slate-300 text-sm font-medium text-slate-500">
                    Radius map preview
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
