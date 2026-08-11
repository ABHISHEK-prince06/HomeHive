import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const demoUsers = {
  'customer@homehive.demo': { password: 'HomeHive123', role: 'CUSTOMER', name: 'Vinay' },
  'provider@homehive.demo': { password: 'HomeHive123', role: 'PROVIDER', name: 'Arun Kumar' },
  'admin@homehive.demo': { password: 'HomeHive123', role: 'ADMIN', name: 'Admin' },
};

export default function LoginPage() {
  const [email, setEmail] = useState('customer@homehive.demo');
  const [password, setPassword] = useState('HomeHive123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const demo = demoUsers[email?.toLowerCase()];

    if (demo && demo.password === password) {
      localStorage.setItem('homehiveToken', 'demo-token');
      localStorage.setItem('homehiveUser', JSON.stringify({ name: demo.name, role: demo.role, email }));
      navigate('/dashboard');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('homehiveToken', response.data.token);
      localStorage.setItem('homehiveUser', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-[0_35px_90px_rgba(15,23,42,0.08)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(135deg,#f0fdf4_0%,#ecfeff_35%,#f8fafc_100%)] p-8 sm:p-10">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-200/40 blur-3xl" />
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600">Welcome to HomeHive</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Your trusted home service network.</h1>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
              Book vetted professionals for repairs, cleaning, care, and everyday tasks with a premium, stress-free experience.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {['5k+', '4.9/5', '24/7'].map((value, index) => (
                <div key={value} className="rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-slate-900">{value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {['Professionals', 'Rating', 'Support'][index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <form action="" className="form">
            <p>
              Welcome,<span>sign in to continue</span>
            </p>

            <button type="button" className="oauthButton">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Continue with Google
            </button>

            <button type="button" className="oauthButton">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"></path>
              </svg>
              Continue with Github
            </button>

            <div className="separator">
              <div></div>
              <span>OR</span>
              <div></div>
            </div>

            <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <div className="mt-1 rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</div>}

            <button type="button" onClick={handleSubmit} className="oauthButton">
              Continue
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 17 5-5-5-5" />
                <path d="m13 17 5-5-5-5" />
              </svg>
            </button>

            <p className="mt-2 text-center text-sm text-slate-600">
              New here? <Link to="/register" className="font-semibold text-emerald-700 hover:text-emerald-600">Create account</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
