import { CloudRain, Shield, Zap, Brain, MapPin, TrendingUp, AlertTriangle, Smartphone, CreditCard, BarChart3, ChevronRight, Menu, X } from "lucide-react";
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
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</a>
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
          <a href="#how-it-works" className="block text-sm" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#features" className="block text-sm" onClick={() => setOpen(false)}>Features</a>
          <a href="#dashboard" className="block text-sm" onClick={() => setOpen(false)}>Dashboard</a>
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
            Kerala's delivery riders lose 25–40% of weekly earnings during monsoons. RainGuard AI forecasts disruptions and provides intelligent, adaptive income protection — so you earn even when the rain stops orders.
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

/* ─── Section wrapper with reveal ─── */
function RevealSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id={id} ref={ref} className={`${className} ${isVisible ? "animate-reveal-up" : "opacity-0"}`}>
      {children}
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const steps = [
    { icon: Smartphone, title: "Onboard in 2 min", desc: "Enter your zone, platform (Zomato/Swiggy/Zepto), working hours & average weekly income." },
    { icon: Brain, title: "AI Predicts Risk", desc: "Our ML model forecasts disruption hours using Open-Meteo weather data & historical order patterns." },
    { icon: CreditCard, title: "Pay Weekly Premium", desc: "₹89 base + risk component (₹40–₹85). Calculated every Monday. 48-hour lock-in prevents gaming." },
    { icon: Zap, title: "Get Instant Payout", desc: "When disruption hits, adaptive compensation calculates automatically. Approved payouts go straight to UPI." },
  ];
  return (
    <RevealSection id="how-it-works" className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">How RainGuard AI Works</h2>
          <p className="mt-4 text-muted-foreground text-pretty">From onboarding to instant payout — fully automated, AI-driven protection in four steps.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="group relative p-6 rounded-xl bg-card border shadow-sm hover:shadow-lg transition-shadow duration-[var(--duration-state)]" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="absolute -top-3 -left-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground shadow-md">
                  {i + 1}
                </div>
                <Icon className="h-8 w-8 text-primary mb-4 mt-2" />
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Features ─── */
function Features() {
  const features = [
    { icon: MapPin, title: "Hyperlocal H3 Hex-Grid", desc: "Zone-level precision using Uber's H3 spatial indexing. Predictions are specific to your riding zone, not generic city-wide." },
    { icon: TrendingUp, title: "Adaptive Compensation", desc: "Payouts adjust intelligently based on disruption severity — zero-order hours and unrideable conditions both count." },
    { icon: AlertTriangle, title: "48-Hour Lock-In", desc: "Premiums are set every Monday. No last-minute buys when you see rain coming — keeping the pool fair for everyone." },
    { icon: Shield, title: "Multi-Layer Fraud Defense", desc: "Accelerometer checks, GPS validation, weather reality matching, and Rider Reliability Score block coordinated spoofing." },
    { icon: BarChart3, title: "Income Gap Calculation", desc: "We compare your expected earnings vs actual, capping compensation at ₹3,000/week for fair, transparent coverage." },
    { icon: CloudRain, title: "Predictive Alerts", desc: "Get 48-hour advance warnings about high-risk weather periods so you can plan your week better." },
  ];
  return (
    <RevealSection id="features" className="py-24 md:py-32 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">Built for Kerala's Monsoon Reality</h2>
          <p className="mt-4 text-muted-foreground text-pretty">Every feature is designed around the specific challenges delivery riders face during Kerala's intense monsoon season.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow duration-[var(--duration-state)]" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{f.desc}</p>
              </div>
            );
          })}
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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">Your Protection Dashboard</h2>
          <p className="mt-4 text-muted-foreground text-pretty">Real-time visibility into your policy, weather forecasts, and earnings — all in one place.</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border bg-card shadow-xl overflow-hidden">
            {/* Mock top bar */}
            <div className="bg-primary px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CloudRain className="h-5 w-5 text-primary-foreground" />
                <span className="font-display font-semibold text-primary-foreground text-sm">RainGuard AI — Rider Dashboard</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-primary-foreground/70">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
                Policy Active
              </div>
            </div>
            {/* Mock dashboard content */}
            <div className="p-6 grid sm:grid-cols-3 gap-4">
              <DashCard label="This Week's Premium" value="₹134" sub="Paid Mon 6:00 AM" color="primary" />
              <DashCard label="Coverage Remaining" value="₹2,640" sub="of ₹3,000 max" color="success" />
              <DashCard label="Risk Level" value="High" sub="Heavy rain expected Thu-Fri" color="warning" />
            </div>
            <div className="px-6 pb-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border p-4">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">48-Hour Weather Forecast</h4>
                <div className="space-y-2">
                  {[
                    { day: "Thu", rain: "32mm", risk: "High", color: "text-destructive" },
                    { day: "Fri", rain: "28mm", risk: "High", color: "text-destructive" },
                    { day: "Sat", rain: "8mm", risk: "Low", color: "text-success" },
                    { day: "Sun", rain: "3mm", risk: "Low", color: "text-success" },
                  ].map((r) => (
                    <div key={r.day} className="flex items-center justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                      <span className="font-medium">{r.day}</span>
                      <span className="text-muted-foreground">{r.rain}</span>
                      <span className={`font-semibold text-xs ${r.color}`}>{r.risk}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border p-4">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Recent Payouts</h4>
                <div className="space-y-2">
                  {[
                    { date: "Mar 14", amount: "₹360", reason: "5.2 zero-order hrs" },
                    { date: "Mar 07", amount: "₹180", reason: "2.8 zero-order hrs" },
                    { date: "Feb 28", amount: "₹540", reason: "Unrideable + 4 hrs" },
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

function DashCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const colorMap: Record<string, string> = {
    primary: "text-primary",
    success: "text-success",
    warning: "text-secondary",
  };
  return (
    <div className="rounded-xl border p-4">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className={`text-2xl font-bold tabular-nums ${colorMap[color] || "text-foreground"}`}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}

/* ─── CTA ─── */
function CtaSection() {
  return (
    <RevealSection className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <RainEffect />
      <div className="container relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">Don't Let the Rain Wash Away Your Earnings</h2>
        <p className="mt-4 text-primary-foreground/70 text-pretty">Join thousands of Kerala delivery riders who protect their income with AI-powered adaptive coverage. Starting at just ₹89/week.</p>
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
            <p className="text-sm max-w-xs">Predictive Adaptive Income Protection for Kerala's delivery riders. A Phase 1 hackathon prototype.</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="space-y-2">
              <div className="font-semibold text-background">Platform</div>
              <a href="#how-it-works" className="block hover:text-background transition-colors">How It Works</a>
              <a href="#features" className="block hover:text-background transition-colors">Features</a>
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
          © 2026 RainGuard AI. Hackathon prototype — not a licensed insurance product.
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
      <HowItWorks />
      <Features />
      <DashboardPreview />
      <CtaSection />
      <Footer />
    </div>
  );
}
