import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: '₹499',
    description: 'Perfect for occasional home fixes and quick tasks.',
    features: ['1 service request at a time', 'Basic booking management', 'Verified local professionals', 'Priority support'],
    featured: false,
  },
  {
    name: 'Popular',
    price: '₹999',
    description: 'Best for frequent household support and regular bookings.',
    features: ['Unlimited quick bookings', 'Priority matching with top pros', 'Saved favorite providers', 'Smart reminders and follow-ups'],
    featured: true,
  },
  {
    name: 'Premium',
    price: '₹1,999',
    description: 'For homes that need dedicated care and premium scheduling.',
    features: ['Dedicated account manager', 'Premium professional access', 'Flexible recurring subscriptions', 'VIP support & monthly savings'],
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-600">Simple pricing</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Choose the plan that fits your home.</h1>
        <p className="mt-4 text-lg text-slate-600">
          Transparent pricing for dependable services, premium professionals, and stress-free home support.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-[2rem] border p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(15,23,42,0.08)] ${
              plan.featured
                ? 'border-emerald-500 bg-emerald-600 text-white'
                : 'border-slate-200 bg-white text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className={`text-xl font-semibold ${plan.featured ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h2>
              {plan.featured && (
                <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-50">
                  Most popular
                </span>
              )}
            </div>

            <div className="mt-8 flex items-end gap-2">
              <span className={`text-4xl font-semibold ${plan.featured ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
              <span className={`${plan.featured ? 'text-emerald-50' : 'text-slate-500'}`}>/ month</span>
            </div>

            <p className={`mt-4 text-sm leading-6 ${plan.featured ? 'text-emerald-50' : 'text-slate-600'}`}>
              {plan.description}
            </p>

            <ul className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full ${plan.featured ? 'bg-white/15 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                    ✓
                  </span>
                  <span className={plan.featured ? 'text-emerald-50' : 'text-slate-700'}>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/register"
              className={`mt-10 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                plan.featured
                  ? 'bg-white text-emerald-700 hover:bg-emerald-50'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {plan.featured ? 'Get started' : 'Choose plan'}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-[2rem] border border-slate-200 bg-slate-900 px-6 py-8 text-white shadow-[0_25px_60px_rgba(15,23,42,0.18)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-emerald-300">Need custom help?</p>
            <h3 className="mt-2 text-2xl font-semibold">Ask for a tailored household service plan.</h3>
          </div>
          <Link to="/login" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
            Talk to sales
          </Link>
        </div>
      </div>
    </main>
  );
}
