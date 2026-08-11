export default function DashboardPage() {
  const userName = 'Vinay';

  const stats = [
    { label: 'Upcoming jobs', value: '3' },
    { label: 'Saved experts', value: '12' },
    { label: 'Total spend', value: '₹6,200' },
    { label: 'Response time', value: '15 min' },
  ];

  const upcoming = [
    { title: 'Electrician inspection', date: 'Today, 3:00 PM', provider: 'Arun Kumar' },
    { title: 'Plumber visit', date: 'Tomorrow, 10:30 AM', provider: 'Sathish Ram' },
    { title: 'Home cleaning', date: 'Sat, 9:00 AM', provider: 'Priya Venkat' },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_20px_45px_rgba(15,23,42,0.05)] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">Customer dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Good morning, {userName}.</h1>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">You have 3 upcoming bookings.</div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <p className="text-3xl font-semibold tracking-tight text-slate-900">{item.value}</p>
              <p className="mt-2 text-sm text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-semibold text-slate-900">Upcoming bookings</h2>
            <div className="mt-6 space-y-4">
              {upcoming.map((item) => (
                <div key={item.title} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.date}</p>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">{item.provider}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.8rem] border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">Saved professionals</h3>
              <div className="mt-4 space-y-3">
                {['Arun Kumar', 'Meera Nair', 'Sathish Ram'].map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">{item}</div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-slate-200 bg-slate-900 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Recommended</p>
              <p className="mt-4 text-3xl font-semibold">Home cleaning</p>
              <div className="mt-4 h-2 rounded-full bg-slate-700">
                <div className="h-2 w-[72%] rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
