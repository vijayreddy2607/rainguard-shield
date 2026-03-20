import {
  CloudRain, Shield, Zap, Brain, MapPin, TrendingUp, AlertTriangle,
  Smartphone, CreditCard, BarChart3, ChevronRight, Menu, X,
  CheckCircle, Wifi, Star
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-rider.jpg";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Link } from "react-router-dom";

/* ─── Rain effect ─── */
function RainEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-px bg-primary-foreground/20 animate-rain"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${12 + Math.random() * 24}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1.2 + Math.random() * 1}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <CloudRain className="h-7 w-7 text-primary" />
          <span className="font-display font-bold text-lg text-foreground">RainGuard<span className="text-primary"> AI</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#persona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Problem</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#tech" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tech Stack</a>
          <Link to="/dashboard">
            <Button size="sm">Rider Login</Button>
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          <a href="#persona" className="block text-sm" onClick={() => setOpen(false)}>Problem</a>
          <a href="#how-it-works" className="block text-sm" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#features" className="block text-sm" onClick={() => setOpen(false)}>Features</a>
          <a href="#tech" className="block text-sm" onClick={() => setOpen(false)}>Tech Stack</a>
          <Link to="/dashboard"><Button className="w-full" size="sm">Rider Login</Button></Link>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[hsl(var(--hero-overlay))]">
      <img src={heroImage} alt="Delivery rider in monsoon rain" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <RainEffect />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay))]/90 via-[hsl(var(--hero-overlay))]/60 to-transparent" />
      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 text-sm text-secondary animate-reveal-up">
            <Shield className="h-4 w-4" />
            Adaptive Income Protection for Kerala Riders
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-primary-foreground animate-reveal-up" style={{ animationDelay: "100ms" }}>
            Predicting rain.<br />
            Adapting protection.<br />
            Securing income.
          </h1>
          <p className="text-lg text-primary-foreground/75 max-w-lg text-pretty animate-reveal-up" style={{ animationDelay: "200ms" }}>
            Kerala's Zomato, Swiggy & Zepto riders lose 25–40% of weekly earnings during the monsoon. RainGuard AI forecasts disruptions and provides intelligent, adaptive income protection — so you earn even when the rain stops orders.
          </p>
          <div className="flex flex-wrap gap-4 animate-reveal-up" style={{ animationDelay: "300ms" }}>
            <Link to="/dashboard">
              <Button variant="hero" size="xl">
                Get Protected <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="heroOutline" size="xl">
                Learn More
              </Button>
            </a>
          </div>
          <div className="flex gap-8 pt-4 animate-reveal-up" style={{ animationDelay: "400ms" }}>
            {[
              { label: "Weekly Premium", value: "₹89+" },
              { label: "Max Cover", value: "₹3,000/wk" },
              { label: "Payout Speed", value: "Instant UPI" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xl font-bold text-secondary">{stat.value}</div>
                <div className="text-xs text-primary-foreground/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id={id} ref={ref} className={`${className} ${isVisible ? "animate-reveal-up" : "opacity-0"}`}>
      {children}
    </section>
  );
}

/* ─── Persona & Problem ─── */
function PersonaSection() {
  return (
    <RevealSection id="persona" className="py-24 md:py-32 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">👨‍🍳 Meet Rahul — Kochi Delivery Rider</h2>
          <p className="mt-4 text-muted-foreground">The persona behind RainGuard AI. Real problem. Real loss. No protection.</p>
        </div>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          {/* Profile */}
          <div className="rounded-2xl border bg-card p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">R</div>
              <div>
                <div className="text-xl font-bold">Rahul</div>
                <div className="text-sm text-muted-foreground">Delivery Rider · Kochi, Kerala</div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Works</span><span className="font-medium">10 AM – 8 PM</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Daily Earnings</span><span className="font-medium">₹600/day</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Weekly Earnings</span><span className="font-medium">₹4,800/week</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Platforms</span><span className="font-medium">Zomato, Swiggy, Zepto</span></div>
            </div>
          </div>
          {/* Problem during monsoon */}
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 space-y-4">
            <div className="font-bold text-destructive text-lg flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> During Monsoon</div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background border">
                <span className="text-xl">🌧️</span>
                <div><div className="font-medium">Zero Orders</div><div className="text-muted-foreground text-xs">Stays online for hours — no demand due to heavy rain</div></div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background border">
                <span className="text-xl">🌊</span>
                <div><div className="font-medium">Unrideable Conditions</div><div className="text-muted-foreground text-xs">Flooded roads — cannot deliver safely</div></div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <span className="text-xl">💸</span>
                <div>
                  <div className="font-medium text-destructive">Income Loss: ₹400/day</div>
                  <div className="text-muted-foreground text-xs">Earns ₹200 instead of ₹600 — ❌ No safety net exists</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}


/* ─── Features ─── */
function Features() {
  const features = [
    { icon: MapPin, title: "Hyperlocal H3 Hex-Grid", desc: "Zone-level precision using Uber's H3 spatial indexing. Predictions are specific to your riding hex-zone, not generic city-wide." },
    { icon: Shield, title: "Adaptive Income Protection", desc: "Compensation adjusts based on Zero-Order Hours + Unrideable Conditions severity. Always stays within your ₹3,000/week limit." },
    { icon: AlertTriangle, title: "48-Hour Lock-In", desc: "Premiums set every Monday. No last-minute buying when you see rain — keeps the risk pool fair." },
    { icon: Brain, title: "AI Risk Prediction (XGBoost)", desc: "Forecasts weekly disruption hours using Open-Meteo data and historical order patterns from your zone." },
    { icon: BarChart3, title: "Income Gap Calculation", desc: "Expected vs Actual earnings formula with partial compensation capped at ₹3,000/week." },
    { icon: Wifi, title: "8-Signal Fraud Detection", desc: "Accelerometer, GPS, app activity, weather reality, mock location check, network signals, reliability score, and zone validation." },
    { icon: Activity, title: "Disruption Modeling", desc: "Models real earning disruptions — both Zero-Order Hours (no demand) and Unrideable Conditions (flooded roads)." },
    { icon: Zap, title: "Instant UPI Payout", desc: "When fraud check passes, 100% approved or 50% provisional payout credited to UPI instantly." },
    { icon: CloudRain, title: "Predictive Alerts", desc: "Get 48-hour advance warnings about high-risk weather periods so you can plan your week." },
  ];
  return (
    <RevealSection id="features" className="py-24 md:py-32 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">🔥 Key Features</h2>
          <p className="mt-4 text-muted-foreground text-pretty">Every feature built for the specific challenges Kerala riders face during the monsoon season.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="p-5 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-1 text-sm">{f.title}</h3>
                <p className="text-xs text-muted-foreground text-pretty">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Premium Model ─── */
function PremiumModel() {
  return (
    <RevealSection className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">💰 Weekly Premium Model</h2>
          <p className="mt-4 text-muted-foreground">Transparent pricing that matches the rider's weekly earning cycle.</p>
        </div>
        <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-5">
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="text-3xl font-bold text-primary">₹89</div>
            <div className="text-sm font-medium mt-1">Base Premium</div>
            <div className="text-xs text-muted-foreground mt-2">Fixed component, same for all riders weekly</div>
          </div>
          <div className="rounded-xl border bg-secondary/10 border-secondary/30 p-5 text-center">
            <div className="text-3xl font-bold text-secondary">₹40–₹85</div>
            <div className="text-sm font-medium mt-1">Dynamic Risk</div>
            <div className="text-xs text-muted-foreground mt-2">XGBoost-calculated based on your zone's forecast</div>
          </div>
          <div className="rounded-xl border bg-primary/5 border-primary/20 p-5 text-center">
            <div className="text-3xl font-bold text-foreground">₹129–₹174</div>
            <div className="text-sm font-medium mt-1">Total/ Week</div>
            <div className="text-xs text-muted-foreground mt-2">Covers up to ₹3,000/week income protection</div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-6 rounded-xl border bg-muted/50 p-5">
          <div className="font-semibold text-sm mb-3">⚡ Parametric Triggers — Automatic Payout Conditions</div>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-start gap-2"><span className="text-primary font-bold">1</span><span>Rainfall ≥ 15mm in 3 hours + activity drop</span></div>
            <div className="flex items-start gap-2"><span className="text-primary font-bold">2</span><span>&gt;60% order drop in your H3 hex-grid zone</span></div>
            <div className="flex items-start gap-2"><span className="text-primary font-bold">3</span><span>Hyperlocal flood risk making roads unrideable</span></div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Tech Stack ─── */
function TechStack() {
  const stack = [
    { label: "Frontend", value: "React (Vite)", icon: "⚛️" },
    { label: "Backend", value: "FastAPI", icon: "⚡" },
    { label: "Database", value: "Supabase", icon: "🗄️" },
    { label: "Weather API", value: "Open-Meteo", icon: "🌦️" },
    { label: "ML Models", value: "XGBoost + Isolation Forest", icon: "🤖" },
    { label: "Spatial", value: "Uber H3 Grid", icon: "🗺️" },
    { label: "Payments", value: "Razorpay (Test Mode)", icon: "💳" },
    { label: "Mobile (Phase 2)", value: "Flutter", icon: "📱" },
  ];
  return (
    <RevealSection id="tech" className="py-24 md:py-32 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">🛠️ Tech Stack</h2>
          <p className="mt-4 text-muted-foreground">Built for rapid development, real-world reliability, and AI-first architecture.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stack.map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-4 flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="text-sm font-semibold">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto mt-8 grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border bg-card p-5">
            <div className="font-semibold text-sm mb-2 text-primary">🤖 AI/ML Integration</div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• XGBoost — risk prediction & premium calculation</li>
              <li>• Isolation Forest — fraud anomaly detection</li>
              <li>• Regression — income estimation</li>
              <li>• scikit-learn — feature engineering pipeline</li>
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <div className="font-semibold text-sm mb-2 text-secondary">📅 Development Roadmap</div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✅ Phase 1: Research, design, prototype</li>
              <li>⏳ Phase 2: Full app, weather, prediction engine</li>
              <li>⏳ Phase 3: Fraud layer, dashboards, alerts</li>
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <div className="font-semibold text-sm mb-2 text-success">🌐 Platform Choice</div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Web app — faster to prototype & demo</li>
              <li>• No device dependency for hackathon</li>
              <li>• Flutter mobile for Phase 2 production</li>
              <li>• Real sensor data in mobile for fraud check</li>
            </ul>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Dashboard Preview ─── */
function DashboardPreview() {
  return (
    <RevealSection id="dashboard" className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">📊 Your Protection Dashboard</h2>
          <p className="mt-4 text-muted-foreground text-pretty">Real-time visibility into your policy, weather forecasts, earnings, and fraud validation — all in one place.</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border bg-card shadow-xl overflow-hidden">
            <div className="bg-primary px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CloudRain className="h-5 w-5 text-primary-foreground" />
                <span className="font-display font-semibold text-primary-foreground text-sm">RainGuard AI — Rahul's Dashboard (Kochi)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-primary-foreground/70">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
                Policy Active
              </div>
            </div>
            <div className="p-6 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Weekly Premium", value: "₹134", sub: "Base ₹89 + Risk ₹45", color: "text-primary" },
                { label: "Coverage Left", value: "₹2,640", sub: "of ₹3,000 max", color: "text-success" },
                { label: "Risk Level", value: "🔴 High", sub: "Rain ≥15mm Thu-Fri", color: "text-destructive" },
              ].map((c) => (
                <div key={c.label} className="rounded-xl border p-4">
                  <div className="text-xs text-muted-foreground mb-1">{c.label}</div>
                  <div className={`text-2xl font-bold tabular-nums ${c.color}`}>{c.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.sub}</div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border p-4">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">48-Hour Weather Forecast</h4>
                <div className="space-y-2">
                  {[
                    { day: "Thu", rain: "32mm", risk: "🔴 High — Trigger Activates" },
                    { day: "Fri", rain: "28mm", risk: "🔴 High — Trigger Activates" },
                    { day: "Sat", rain: "8mm", risk: "🟡 Medium" },
                    { day: "Sun", rain: "3mm", risk: "🟢 Low" },
                  ].map((r) => (
                    <div key={r.day} className="flex items-center justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                      <span className="font-medium">{r.day}</span>
                      <span className="text-muted-foreground">{r.rain}</span>
                      <span className="text-xs font-semibold">{r.risk}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border p-4">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Recent Payouts</h4>
                <div className="space-y-2">
                  {[
                    { date: "Mar 14", amount: "₹360", reason: "5.2 Zero-Order Hrs" },
                    { date: "Mar 07", amount: "₹180", reason: "2.8 Zero-Order Hrs" },
                    { date: "Feb 28", amount: "₹540", reason: "Unrideable + 4 Hrs" },
                  ].map((p) => (
                    <div key={p.date} className="flex items-center justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{p.date}</span>
                      <span className="font-semibold text-success">{p.amount}</span>
                      <span className="text-xs text-muted-foreground">{p.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link to="/dashboard">
            <Button size="lg">
              Open Full Dashboard <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── CTA ─── */
function CtaSection() {
  return (
    <RevealSection className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <RainEffect />
      <div className="container relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">Don't Let the Rain Wash Away Your Earnings</h2>
        <p className="mt-4 text-primary-foreground/70 text-pretty">Join Kerala delivery riders who protect their income with AI-powered adaptive coverage. Starting at just ₹89/week.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/dashboard">
            <Button variant="hero" size="xl">Start Protection Now</Button>
          </Link>
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-foreground text-background/60 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CloudRain className="h-6 w-6 text-secondary" />
              <span className="font-display font-bold text-lg text-background">RainGuard AI</span>
            </div>
            <p className="text-sm max-w-xs">Predictive Adaptive Income Protection for Kerala's delivery riders.</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="space-y-2">
              <div className="font-semibold text-background">Platform</div>
              <a href="#persona" className="block hover:text-background transition-colors">Problem</a>
              <a href="#how-it-works" className="block hover:text-background transition-colors">How It Works</a>
              <Link to="/dashboard" className="block hover:text-background transition-colors">Dashboard</Link>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-background">Coverage</div>
              <span className="block">Thiruvananthapuram</span>
              <span className="block">Kochi</span>
              <span className="block">Kozhikode</span>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 mt-8 pt-6 text-xs text-center">
          © 2026 RainGuard AI. Phase 1 Hackathon Prototype — Not a licensed insurance product.
        </div>
      </div>
    </footer>
  );
}

/* ─── Landing Page ─── */
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <PersonaSection />
      <PremiumModel />
      <Features />
      <DashboardPreview />
      <TechStack />
      <CtaSection />
      <Footer />
    </div>
  );
}
