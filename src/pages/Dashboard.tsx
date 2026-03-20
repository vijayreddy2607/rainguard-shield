import {
  CloudRain, Shield, TrendingUp, AlertTriangle, MapPin, Clock,
  Wallet, Bell, User, BarChart3, Droplets, Wind, Thermometer,
  CheckCircle, XCircle, Smartphone, Wifi, Star, Activity, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`${className} ${isVisible ? "animate-reveal-up" : "opacity-0"}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Mock data (Rahul – Kochi) ─── */
const rider = {
  name: "Rahul",
  city: "Kochi",
  hours: "10 AM – 8 PM",
  dailyEarning: 600,
  weeklyEarning: 4800,
  platforms: "Zomato + Swiggy",
  zone: "Kochi Central — H3:8828a1",
  reliabilityScore: 87,
};

const weeklyData = {
  basePremium: 89,
  dynamicRisk: 45,
  get totalPremium() { return this.basePremium + this.dynamicRisk; },
  coverageUsed: 360,
  coverageMax: 3000,
  riskLevel: "High" as const,
  policyStatus: "Active",
  lockInEnd: "Wed, Mar 19 6:00 AM",
};

const weatherForecast = [
  { day: "Today", temp: 28, rain: 4, wind: 12, humidity: 78, risk: "Low" as const },
  { day: "Thu", temp: 26, rain: 32, wind: 28, humidity: 92, risk: "High" as const },
  { day: "Fri", temp: 25, rain: 28, wind: 25, humidity: 90, risk: "High" as const },
  { day: "Sat", temp: 29, rain: 8, wind: 14, humidity: 74, risk: "Medium" as const },
  { day: "Sun", temp: 30, rain: 3, wind: 10, humidity: 68, risk: "Low" as const },
  { day: "Mon", temp: 31, rain: 1, wind: 8, humidity: 65, risk: "Low" as const },
  { day: "Tue", temp: 29, rain: 12, wind: 16, humidity: 80, risk: "Medium" as const },
];

const alerts = [
  { id: 1, type: "warning" as const, message: "🌧️ Heavy rainfall 60mm+ predicted Thu-Fri. Parametric trigger likely to activate.", time: "2h ago" },
  { id: 2, type: "info" as const, message: "✅ Weekly premium of ₹134 deducted (Base ₹89 + Risk ₹45). Policy locked until Wed.", time: "Mon 6:00 AM" },
  { id: 3, type: "success" as const, message: "💸 Payout ₹360 credited to UPI — 5.2 Zero-Order Hours on Mar 14.", time: "Mar 14" },
];

const payoutHistory = [
  { date: "Mar 14", amount: 360, hours: 5.2, reason: "Zero-Order Hours", status: "Credited" },
  { date: "Mar 07", amount: 180, hours: 2.8, reason: "Zero-Order Hours", status: "Credited" },
  { date: "Feb 28", amount: 540, hours: 4.0, reason: "Unrideable + Zero-Order", status: "Credited" },
  { date: "Feb 21", amount: 0, hours: 0, reason: "No disruption", status: "N/A" },
  { date: "Feb 14", amount: 270, hours: 3.5, reason: "Zero-Order Hours", status: "Credited" },
];

const earningsComparison = [
  { week: "Mar 10–16", expected: 4800, actual: 4440, gap: 360, covered: 360 },
  { week: "Mar 03–09", expected: 4800, actual: 4620, gap: 180, covered: 180 },
  { week: "Feb 24–Mar 02", expected: 4800, actual: 4260, gap: 540, covered: 540 },
  { week: "Feb 17–23", expected: 4800, actual: 4800, gap: 0, covered: 0 },
];

// Fraud multi-signal data for Rahul's last claim
const fraudSignals = [
  { label: "Location Validation", icon: MapPin, status: "pass" as const, detail: "GPS matches Kochi Central zone" },
  { label: "Weather Reality Match", icon: CloudRain, status: "pass" as const, detail: "Open-Meteo confirms 32mm rain" },
  { label: "Accelerometer / Riding", icon: Activity, status: "pass" as const, detail: "Natural vibration pattern detected" },
  { label: "Delivery App Activity", icon: Smartphone, status: "pass" as const, detail: "Zomato app active, no orders received" },
  { label: "Network Signals", icon: Wifi, status: "pass" as const, detail: "Cell tower consistent with zone" },
  { label: "Mock Location Check", icon: Shield, status: "pass" as const, detail: "No tampering detected" },
  { label: "Zone Network Validation", icon: Wifi, status: "warn" as const, detail: "8 riders flagged in same hex — monitoring" },
  { label: "Rider Reliability Score", icon: Star, status: "pass" as const, detail: "87/100 — Excellent standing" },
];

/* ─── Shared Components ─── */
function StatCard({ icon: Icon, label, value, sub, variant = "default" }: {
  icon: typeof Shield;
  label: string;
  value: string;
  sub: string;
  variant?: "default" | "success" | "warning" | "danger";
}) {
  const variantStyles = {
    default: "border-border",
    success: "border-success/30 bg-success/5",
    warning: "border-secondary/30 bg-secondary/5",
    danger: "border-destructive/30 bg-destructive/5",
  };
  const valueStyles = {
    default: "text-foreground",
    success: "text-success",
    warning: "text-secondary",
    danger: "text-destructive",
  };
  return (
    <div className={`rounded-xl border p-5 ${variantStyles[variant]}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
      </div>
      <div className={`text-2xl font-bold tabular-nums ${valueStyles[variant]}`}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}

function RiskBadge({ level }: { level: "Low" | "Medium" | "High" }) {
  const styles = {
    Low: "bg-success/10 text-success border-success/20",
    Medium: "bg-secondary/10 text-secondary border-secondary/20",
    High: "bg-destructive/10 text-destructive border-destructive/20",
  };
  const dot = {
    Low: "bg-success",
    Medium: "bg-secondary",
    High: "bg-destructive",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${styles[level]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[level]}`} />
      {level === "Low" ? "🟢 Low" : level === "Medium" ? "🟡 Medium" : "🔴 High"}
    </span>
  );
}

export default function RiderDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "weather" | "payouts" | "earnings" | "fraud">("overview");

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "weather" as const, label: "Weather", icon: CloudRain },
    { id: "payouts" as const, label: "Payouts", icon: Wallet },
    { id: "earnings" as const, label: "Earnings", icon: TrendingUp },
    { id: "fraud" as const, label: "Fraud Check", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <CloudRain className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="font-display font-bold text-lg leading-tight">RainGuard AI</h1>
              <p className="text-xs text-primary-foreground/60">Rider Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div className="hidden sm:block text-sm">
                <div className="font-semibold">{rider.name}</div>
                <div className="text-xs text-primary-foreground/60">{rider.city} · {rider.hours}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Policy Status Bar */}
      <div className="bg-success/10 border-b border-success/20">
        <div className="container py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="font-medium text-success">Policy Active</span>
            <span className="text-muted-foreground">· {rider.zone}</span>
            <span className="text-muted-foreground">· {rider.platforms}</span>
          </div>
          <span className="text-muted-foreground text-xs">48-hr Lock-in until {weeklyData.lockInEnd}</span>
        </div>
      </div>

      <div className="container py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap active:scale-[0.97] ${
                  activeTab === tab.id
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "weather" && <WeatherTab />}
        {activeTab === "payouts" && <PayoutsTab />}
        {activeTab === "earnings" && <EarningsTab />}
        {activeTab === "fraud" && <FraudTab />}
      </div>
    </div>
  );
}

/* ─── Overview Tab ─── */
function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Rahul's Persona Card */}
      <RevealDiv>
        <div className="rounded-xl border bg-gradient-to-r from-primary/5 to-accent p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
              R
            </div>
            <div>
              <div className="text-lg font-bold">👨‍🍳 Rahul — Delivery Rider, Kochi</div>
              <div className="text-sm text-muted-foreground flex flex-wrap gap-3 mt-1">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {rider.hours}</span>
                <span className="flex items-center gap-1"><Wallet className="h-3.5 w-3.5" /> ₹{rider.dailyEarning}/day</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {rider.city}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-xs text-muted-foreground">Rider Reliability Score</div>
            <div className="text-3xl font-bold text-primary">{rider.reliabilityScore}<span className="text-sm text-muted-foreground">/100</span></div>
            <div className="text-xs text-success font-medium">⭐ Excellent Standing</div>
          </div>
        </div>
      </RevealDiv>

      {/* Scenario Card */}
      <RevealDiv delay={60}>
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5">
          <div className="font-semibold text-sm text-destructive mb-3">⚠️ This Week's Disruption Scenario</div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-xl">🌧️</span>
              <div>
                <div className="font-medium">Zero Orders</div>
                <div className="text-muted-foreground text-xs">Rahul stays online for hours — no demand due to rain</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">🌊</span>
              <div>
                <div className="font-medium">Unrideable Conditions</div>
                <div className="text-muted-foreground text-xs">Roads flood — cannot deliver safely</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">💸</span>
              <div>
                <div className="font-medium">Income Loss</div>
                <div className="text-muted-foreground text-xs">Earns ₹200 instead of ₹600 — Loss of ₹400</div>
              </div>
            </div>
          </div>
        </div>
      </RevealDiv>

      {/* Stat Cards */}
      <RevealDiv delay={100}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border p-5">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Weekly Premium</span>
            </div>
            <div className="text-2xl font-bold tabular-nums text-foreground">₹{weeklyData.totalPremium}</div>
            <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
              <div>Base: ₹{weeklyData.basePremium} + Risk: ₹{weeklyData.dynamicRisk}</div>
              <div className="text-primary font-medium">Paid Mon 6:00 AM · 48-hr lock-in</div>
            </div>
          </div>
          <StatCard icon={Shield} label="Coverage Remaining" value={`₹${weeklyData.coverageMax - weeklyData.coverageUsed}`} sub={`of ₹${weeklyData.coverageMax}/week max`} variant="success" />
          <StatCard icon={AlertTriangle} label="Risk Level" value="🔴 High" sub="Heavy rain Thu-Fri · ≥15mm/3hr trigger" variant="danger" />
          <StatCard icon={TrendingUp} label="Reliability Score" value={`${rider.reliabilityScore}/100`} sub="Excellent · Fraud score: Safe" variant="success" />
        </div>
      </RevealDiv>

      {/* Alerts */}
      <RevealDiv delay={140}>
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            Predictive Alerts & Notifications
          </h3>
          <div className="space-y-3">
            {alerts.map((alert) => {
              const styles = {
                warning: "border-l-secondary bg-secondary/5",
                info: "border-l-info bg-info/5",
                success: "border-l-success bg-success/5",
              };
              return (
                <div key={alert.id} className={`border-l-4 rounded-r-lg p-3 ${styles[alert.type]}`}>
                  <p className="text-sm">{alert.message}</p>
                  <span className="text-xs text-muted-foreground mt-1 block">{alert.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </RevealDiv>
    </div>
  );
}

/* ─── Weather Tab ─── */
function WeatherTab() {
  return (
    <RevealDiv>
      <div className="space-y-4">
        {/* Trigger Info */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 font-medium text-primary">
            <Zap className="h-4 w-4" />
            Parametric Triggers
          </div>
          <div className="flex gap-4 text-muted-foreground flex-wrap">
            <span>⚡ Rainfall ≥ 15mm in 3 hours</span>
            <span>⚡ &gt;60% order drop in zone</span>
            <span>⚡ Flood risk detected</span>
          </div>
        </div>
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="p-5 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <CloudRain className="h-4 w-4 text-primary" />
              7-Day Forecast — {rider.zone}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Open-Meteo API · Hyperlocal H3 hex-grid precision</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Day</th>
                  <th className="text-center p-3 font-medium text-muted-foreground"><Thermometer className="h-3.5 w-3.5 inline" /> Temp</th>
                  <th className="text-center p-3 font-medium text-muted-foreground"><Droplets className="h-3.5 w-3.5 inline" /> Rain</th>
                  <th className="text-center p-3 font-medium text-muted-foreground"><Wind className="h-3.5 w-3.5 inline" /> Wind</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Humidity</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Risk</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Trigger?</th>
                </tr>
              </thead>
              <tbody>
                {weatherForecast.map((day) => (
                  <tr key={day.day} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium">{day.day}</td>
                    <td className="p-3 text-center tabular-nums">{day.temp}°C</td>
                    <td className="p-3 text-center tabular-nums font-medium">{day.rain}mm</td>
                    <td className="p-3 text-center tabular-nums">{day.wind} km/h</td>
                    <td className="p-3 text-center tabular-nums">{day.humidity}%</td>
                    <td className="p-3 text-center"><RiskBadge level={day.risk} /></td>
                    <td className="p-3 text-center text-xs font-semibold">
                      {day.rain >= 15 ? <span className="text-destructive">⚡ YES</span> : <span className="text-muted-foreground">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RevealDiv>
  );
}

/* ─── Payouts Tab ─── */
function PayoutsTab() {
  return (
    <RevealDiv>
      <div className="space-y-4">
        {/* Adaptive Protection Explainer */}
        <div className="rounded-xl border border-success/20 bg-success/5 p-4 text-sm">
          <div className="font-medium text-success mb-1 flex items-center gap-2"><Shield className="h-4 w-4" /> Adaptive Income Protection</div>
          <p className="text-muted-foreground">Compensation adjusts based on disruption severity (Zero-Order Hours + Unrideable Conditions), always within the ₹3,000/week policy limit. Approved amounts go straight to UPI instantly.</p>
        </div>
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Wallet className="h-4 w-4 text-primary" />
              Payout History
            </h3>
            <span className="text-sm text-muted-foreground">Total: ₹{payoutHistory.reduce((s, p) => s + p.amount, 0).toLocaleString()}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Week</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Hours Lost</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Reason</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Payout</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {payoutHistory.map((p) => (
                  <tr key={p.date} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium">{p.date}</td>
                    <td className="p-3 text-center tabular-nums">{p.hours > 0 ? `${p.hours}h` : "—"}</td>
                    <td className="p-3 text-muted-foreground">{p.reason}</td>
                    <td className="p-3 text-right font-semibold tabular-nums text-success">{p.amount > 0 ? `₹${p.amount}` : "—"}</td>
                    <td className="p-3 text-center">
                      {p.status === "Credited" ? (
                        <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-md">⚡ Credited UPI</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RevealDiv>
  );
}

/* ─── Earnings Tab ─── */
function EarningsTab() {
  return (
    <RevealDiv>
      <div className="space-y-4">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
          <div className="font-medium text-primary mb-1">📊 Partial Income Gap Calculation</div>
          <p className="text-muted-foreground">Formula: <strong>Expected Earnings – Actual Earnings</strong>. Capped at ₹3,000/week. Rahul's expected weekly earnings: ₹{rider.weeklyEarning.toLocaleString()}.</p>
        </div>
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="p-5 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Income Gap Analysis — {rider.name}, {rider.city}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Week</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Expected</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Actual</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Gap</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Covered</th>
                </tr>
              </thead>
              <tbody>
                {earningsComparison.map((e) => (
                  <tr key={e.week} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium text-xs">{e.week}</td>
                    <td className="p-3 text-right tabular-nums">₹{e.expected.toLocaleString()}</td>
                    <td className="p-3 text-right tabular-nums">₹{e.actual.toLocaleString()}</td>
                    <td className="p-3 text-right tabular-nums text-destructive font-medium">{e.gap > 0 ? `₹${e.gap}` : "—"}</td>
                    <td className="p-3 text-right tabular-nums text-success font-semibold">{e.covered > 0 ? `₹${e.covered}` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5 border-t bg-muted/30">
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Total Gap:</span>
                <span className="ml-2 font-semibold text-destructive">₹{earningsComparison.reduce((s, e) => s + e.gap, 0).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Covered:</span>
                <span className="ml-2 font-semibold text-success">₹{earningsComparison.reduce((s, e) => s + e.covered, 0).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Coverage Rate:</span>
                <span className="ml-2 font-semibold text-primary">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealDiv>
  );
}

/* ─── Fraud Detection Tab ─── */
function FraudTab() {
  const passCount = fraudSignals.filter(s => s.status === "pass").length;
  const warnCount = fraudSignals.filter(s => s.status === "warn").length;
  const failCount = fraudSignals.filter(s => s.status === "fail").length;

  return (
    <RevealDiv>
      <div className="space-y-4">
        {/* Decision Banner */}
        <div className="rounded-xl border border-success/30 bg-success/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-bold text-success text-lg"><CheckCircle className="h-5 w-5" /> Claim Approved</div>
            <div className="text-sm text-muted-foreground mt-1">Multi-Signal Decision Engine — {passCount}/8 signals passed. Threshold: ≥5 signals must pass.</div>
          </div>
          <div className="flex gap-3 text-sm font-semibold">
            <span className="text-success">✅ {passCount} Pass</span>
            <span className="text-secondary">⚠️ {warnCount} Warn</span>
            <span className="text-destructive">❌ {failCount} Fail</span>
          </div>
        </div>

        {/* Signal Grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          {fraudSignals.map((sig) => {
            const Icon = sig.icon;
            const statusStyles = {
              pass: { border: "border-success/20", bg: "bg-success/5", icon: <CheckCircle className="h-4 w-4 text-success" /> },
              warn: { border: "border-secondary/30", bg: "bg-secondary/5", icon: <AlertTriangle className="h-4 w-4 text-secondary" /> },
              fail: { border: "border-destructive/30", bg: "bg-destructive/5", icon: <XCircle className="h-4 w-4 text-destructive" /> },
            };
            const s = statusStyles[sig.status];
            return (
              <div key={sig.label} className={`rounded-xl border ${s.border} ${s.bg} p-4 flex items-start gap-3`}>
                <Icon className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium text-sm">{sig.label}</div>
                    {s.icon}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{sig.detail}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fair UX Info */}
        <div className="rounded-xl border p-5 bg-card">
          <div className="font-semibold mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Fair UX for Genuine Riders
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-xl">⚡</span>
              <div>
                <div className="font-medium">Instant 50% Provisional</div>
                <div className="text-muted-foreground text-xs">Released immediately on approval</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">📱</span>
              <div>
                <div className="font-medium">5-Second Shake Verify</div>
                <div className="text-muted-foreground text-xs">Only for suspicious claims</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xl">📡</span>
              <div>
                <div className="font-medium">Network Drop Fallback</div>
                <div className="text-muted-foreground text-xs">Last known location + strong weather proof</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealDiv>
  );
}
