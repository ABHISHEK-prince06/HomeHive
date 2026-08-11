import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MapView from '../components/MapView';
import ServiceCard from '../components/ServiceCard';
import { getProvidersByService } from '../data/mockData';

const defaultCenter = [11.015, 76.966];

const filterOptions = ['Recommended', 'Nearest', 'Top rated', 'Available today'];

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [radius, setRadius] = useState(1000);
  const [selectedFilter, setSelectedFilter] = useState('Recommended');
  const [showMap, setShowMap] = useState(false);
  const [activeChips, setActiveChips] = useState([]);

  const service = useMemo(() => {
    const param = searchParams.get('service') || 'Electrician';
    return param === 'All' ? 'All services' : param;
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    setShowMap(false);
    const timer = window.setTimeout(() => {
      const data = getProvidersByService(searchParams.get('service') || 'Electrician');
      setResults(data);
      setRadius(data.length > 0 ? 1000 : 0);
      setLoading(false);
    }, 1100);

    return () => window.clearTimeout(timer);
  }, [searchParams]);

  useEffect(() => {
    const nextChips = [
      { id: 'service', label: service },
      { id: 'rating', label: '4.5+' },
      { id: 'distance', label: 'Within 1km' },
      { id: 'availability', label: 'Available today' },
    ];

    setActiveChips(nextChips);
  }, [service]);

  const orderedResults = useMemo(() => {
    const sorted = [...results];
    if (selectedFilter === 'Nearest') {
      return sorted.sort((a, b) => a.distance - b.distance);
    }
    if (selectedFilter === 'Top rated') {
      return sorted.sort((a, b) => b.rating - a.rating);
    }
    if (selectedFilter === 'Available today') {
      return sorted.filter((provider) => provider.availability?.includes('Today'));
    }
    return sorted.sort((a, b) => (b.rating * 10 + b.reviews) - (a.rating * 10 + a.reviews));
  }, [results, selectedFilter]);

  const removeChip = (chipId) => {
    setActiveChips((current) => current.filter((chip) => chip.id !== chipId));
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600">Search results</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{service} near 641105</h1>
          <p className="mt-2 text-sm text-slate-600">{loading ? 'Finding the best professionals near you...' : `${orderedResults.length} professionals found near 641105`}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                filter === selectedFilter
                  ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-100'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              {activeChips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => removeChip(chip.id)}
                  className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
                >
                  <span>{chip.label}</span>
                  <span className="text-[10px] font-bold">×</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowMap((current) => !current)}
                className="ml-auto rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-slate-800"
              >
                {showMap ? 'Hide map' : 'Show map'}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="search-card-skeleton rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 animate-pulse rounded-[1.5rem] bg-slate-200" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-1/3 animate-pulse rounded-full bg-slate-200" />
                      <div className="h-6 w-2/5 animate-pulse rounded-full bg-slate-200" />
                      <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
                      <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-500">
              No results found. We could not find enough professionals nearby. Try broadening the search radius.
            </div>
          ) : (
            orderedResults.map((provider) => <ServiceCard key={provider.id} data={provider} />)
          )}
        </div>

        {showMap && !loading && results.length > 0 && (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_22px_50px_rgba(15,23,42,0.05)] sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Map view</h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{orderedResults.length} nearby</span>
            </div>
            <MapView center={defaultCenter} providers={orderedResults} radius={radius} />
          </div>
        )}
      </div>
    </main>
  );
}
