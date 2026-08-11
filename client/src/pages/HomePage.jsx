import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockProviders, searchSuggestions, serviceCategories } from '../data/mockData';

const filterGroups = {
  service: ['Electrician', 'Plumber', 'Cleaner', 'Cook', 'Gardener', 'Driver', 'Home Nurse', 'Childcare'],
  availability: ['Today', 'This week', 'Weekend', 'Emergency'],
  budget: ['Under ₹300', '₹300-₹600', '₹600-₹1000', '₹1000+'],
  distance: ['Within 1 km', 'Within 3 km', 'Within 5 km', 'Any distance'],
  rating: ['4.5+', '4.8+', '4.9+', '5.0'],
  extras: ['Verified', 'Insured', 'Same-day', 'Top rated'],
};

const serviceClassMap = {
  Electrician: 'service-logo--electrician',
  Plumber: 'service-logo--plumber',
  Cleaner: 'service-logo--cleaner',
  Cook: 'service-logo--cook',
  Gardener: 'service-logo--gardener',
  Driver: 'service-logo--driver',
  'Home Nurse': 'service-logo--nurse',
  Childcare: 'service-logo--care',
};

const personVisualMap = {
  'Arun Kumar': 'person-visual--a',
  'Karthik Nair': 'person-visual--b',
  'Jayan Thomas': 'person-visual--c',
};

export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [hoveredProvider, setHoveredProvider] = useState('Arun Kumar');
  const [selectedFilters, setSelectedFilters] = useState({
    service: 'Electrician',
    availability: 'Today',
    budget: '₹300-₹600',
    distance: 'Within 5 km',
    rating: '4.8+',
    extras: 'Verified',
  });

  const heroProviders = useMemo(
    () => [
      { id: 'arun', name: 'Arun Kumar', role: 'Electrician', rating: 4.9, distance: 420, price: 350, accent: 'emerald', top: '18%', left: '50%' },
      { id: 'karthik', name: 'Karthik Nair', role: 'Electrician', rating: 4.8, distance: 280, price: 330, accent: 'sky', top: '46%', left: '73%' },
      { id: 'jayan', name: 'Jayan Thomas', role: 'Electrician', rating: 4.7, distance: 650, price: 310, accent: 'amber', top: '72%', left: '32%' },
    ],
    [],
  );

  const accentClasses = {
    emerald: 'bg-emerald-500',
    sky: 'bg-sky-500',
    amber: 'bg-amber-500',
  };

  const topProfessionals = useMemo(() => [
    { ...mockProviders[0], name: 'Arun Kumar' },
    { ...mockProviders[1], name: 'Karthik Nair' },
    { ...mockProviders[2], name: 'Jayan Thomas' },
  ], []);

  const submitSearch = (value) => {
    const term = value?.trim() || 'Electrician';
    navigate(`/search?service=${encodeURIComponent(term)}`);
  };

  const selectFilter = (group, value) => {
    setSelectedFilters((current) => ({ ...current, [group]: value }));
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <section className="grid items-center gap-10 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-12">
        <div>
          <div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Trusted home services
          </div>

          <h1 className="mt-6 max-w-xl text-4xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-5xl lg:text-6xl">
            Trusted help, right where you need it.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Find verified professionals for every job around your home — nearby, available, and ready when you are.
          </p>

          <div className="relative mt-8 max-w-2xl rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="grid gap-3 md:grid-cols-[1.25fr_0.8fr_auto] md:items-center">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  <span>🔍</span> What do you need help with?
                </div>
                <input
                  value={query}
                  onFocus={() => setFocused(true)}
                  onBlur={() => window.setTimeout(() => setFocused(false), 150)}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Electrician, plumber, cook..."
                  className="w-full bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  <span>📍</span> Location
                </div>
                <p className="text-sm font-medium text-slate-700">Dhanalakshmi Srinivasan College of Engineering</p>
              </div>

              <button
                type="button"
                onClick={() => submitSearch(query)}
                className="inline-flex h-[62px] items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(16,185,129,0.30)] transition hover:bg-emerald-500"
              >
                Find Help →
              </button>
            </div>

            {focused && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm animate-[fadeIn_0.25s_ease-out]">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Popular nearby</p>
                <div className="flex flex-wrap gap-2">
                  {searchSuggestions.slice(0, 8).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setQuery(item);
                        submitSearch(item);
                      }}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => submitSearch('Electrician')} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Search professionals
            </button>
            <Link to="/join-provider" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
              Become a Professional
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="hero-map-panel rounded-[2.25rem] border border-slate-200 bg-white p-4 shadow-[0_35px_90px_rgba(15,23,42,0.12)]">
            <div className="map-surface relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.12),_transparent_45%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] p-4">
              <div className="map-orbit map-orbit--outer" />
              <div className="map-orbit map-orbit--inner" />

              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
                Home
              </div>

              {heroProviders.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  onMouseEnter={() => setHoveredProvider(provider.name)}
                  onFocus={() => setHoveredProvider(provider.name)}
                  onMouseLeave={() => setHoveredProvider('Arun Kumar')}
                  className={`map-provider-pin map-provider-pin--${provider.accent} ${hoveredProvider === provider.name ? 'is-active' : ''}`}
                  style={{ top: provider.top, left: provider.left }}
                >
                  <span className="map-provider-pin__dot" />
                </button>
              ))}

              <div className="map-provider-popup">
                {heroProviders
                  .filter((provider) => provider.name === hoveredProvider)
                  .map((provider) => (
                    <div key={provider.id} className="map-provider-popup__inner">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${accentClasses[provider.accent]} text-sm font-bold text-white`}>
                          {provider.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{provider.name}</p>
                          <p className="text-xs text-slate-500">{provider.role}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                        <span>⭐ {provider.rating}</span>
                        <span>{provider.distance}m away</span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-600">From</span>
                        <span className="text-sm font-semibold text-slate-900">₹{provider.price}/hr</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.04)] sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[{ number: '8k+', text: 'Verified professionals' }, { number: '98%', text: 'Customer satisfaction' }, { number: '24/7', text: 'Booking support' }, { number: '15 min', text: 'Average response' }].map((item) => (
            <div key={item.text} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <p className="text-3xl font-semibold tracking-tight text-slate-900">{item.number}</p>
              <p className="mt-2 text-sm text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">Filter by</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Find the right professional in seconds</h2>
          </div>
          <button
            type="button"
            onClick={() => submitSearch(selectedFilters.service)}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Apply filters
          </button>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(filterGroups).map(([group, options]) => (
            <div key={group} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{group}</p>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                  const isSelected = selectedFilters[group] === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectFilter(group, option)}
                      className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-100'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-emerald-600">What we offer</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Whatever your home needs.</h2>
          </div>
          <Link to="/search?service=All" className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:inline-flex">
            Explore all services
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {serviceCategories.map((service) => (
            <button
              key={service.name}
              type="button"
              onClick={() => submitSearch(service.name)}
              className="role-card group"
            >
              <div className={`service-logo ${serviceClassMap[service.name] || 'service-logo--default'}`} aria-label={service.name}>
                <span className="service-logo__inner" />
              </div>
              <div className="role-card__content">
                <p className="role-card__title">{service.name}</p>
                <p className="role-card__description">{service.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-emerald-600">Top rated near you</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Available today</h2>
          </div>
          <Link to="/search?service=Electrician" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            View all
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {topProfessionals.map((person) => (
            <article key={person.id} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(15,23,42,0.09)]">
              <div className="h-52 bg-[linear-gradient(135deg,#d9f99d_0%,#a7f3d0_30%,#e2e8f0_100%)] p-5">
                <div className="flex items-start justify-between">
                  <div className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur">✓ Verified</div>
                  <div className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-700 backdrop-blur">⭐ {person.rating}</div>
                </div>
                <div className={`person-visual ${personVisualMap[person.name] || 'person-visual--a'} mt-12`} aria-label={person.name}>
                  <span className="person-visual__head" />
                  <span className="person-visual__body" />
                  <span className="person-visual__badge" />
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{person.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{person.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-slate-900">₹{person.hourlyRate}/hr</p>
                    <p className="text-xs text-slate-500">{person.distance}m away</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-sm text-slate-600">
                  <span>{person.experience} yrs experience</span>
                  <span>{person.reviews} reviews</span>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link to={`/provider/${person.id}`} className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
                    View Profile
                  </Link>
                  <button type="button" onClick={() => submitSearch(person.role)} className="flex-1 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
                    Book Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-[2.25rem] border border-slate-200 bg-slate-900 px-6 py-10 text-white shadow-[0_35px_80px_rgba(15,23,42,0.24)] sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-emerald-300">Are you a professional?</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Turn your skills into income with HomeHive.</h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-300">
              Join thousands of trusted professionals helping households every day with flexible bookings, verified profiles, and more customers nearby.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-700 bg-white/5 p-6">
            <ul className="space-y-4 text-sm text-slate-200">
              {['Flexible schedule', 'Verified customer trust', 'Simple booking management', 'More local customers', 'Transparent earnings'].map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800/60 px-4 py-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
