import { CloudRain, Shield, TrendingUp, AlertTriangle, MapPin, Clock, Wallet, ChevronRight, Bell, User, BarChart3, Droplets, Wind, Thermometer } from "lucide-react";
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

/* ─── Mock data ─── */
const weeklyData = {
  premium: 134,
  coverageUsed: 360,
  coverageMax: 3000,
  riskLevel: "High" as const,
  reliabilityScore: 87,
  zone: "Kochi Central — H3:8828a1",
  platform: "Zomato + Swiggy",
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
  { id: 1, type: "warning" as const, message: "Heavy rainfall predicted Thu-Fri. Expected 60mm+. Plan accordingly.", time: "2h ago" },
  { id: 2, type: "info" as const, message: "Your weekly premium of ₹134 has been deducted successfully.", time: "Mon 6:00 AM" },
  { id: 3, type: "success" as const, message: "Payout of ₹360 credited to UPI for 5.2 zero-order hours on Mar 14.", time: "Mar 14" },
];

const payoutHistory = [
  { date: "Mar 14", amount: 360, hours: 5.2, reason: "Zero-order hours", status: "Credited" },
  { date: "Mar 07", amount: 180, hours: 2.8, reason: "Zero-order hours", status: "Credited" },
  { date: "Feb 28", amount: 540, hours: 4.0, reason: "Unrideable + zero-order", status: "Credited" },
  { date: "Feb 21", amount: 0, hours: 0, reason: "No disruption", status: "N/A" },
  { date: "Feb 14", amount: 270, hours: 3.5, reason: "Zero-order hours", status: "Credited" },
];

const earningsComparison = [
  { week: "Mar 10-16", expected: 5200, actual: 4840, gap: 360, covered: 360 },
  { week: "Mar 03-09", expected: 5400, actual: 5220, gap: 180, covered: 180 },
  { week: "Feb 24-Mar 02", expected: 4800, actual: 4260, gap: 540, covered: 540 },
  { week: "Feb 17-23", expected: 5600, actual: 5600, gap: 0, covered: 0 },
];

/* ─── Components ─── */

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
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${styles[level]}`}>
      {level}
    </span>
  );
}

export default function RiderDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "weather" | "payouts" | "earnings">("overview");

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "weather" as const, label: "Weather", icon: CloudRain },
    { id: "payouts" as const, label: "Payouts", icon: Wallet },
    { id: "earnings" as const, label: "Earnings", icon: TrendingUp },
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
            <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <User className="h-5 w-5" />
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
            <span className="text-muted-foreground">· {weeklyData.zone}</span>
          </div>
          <span className="text-muted-foreground text-xs">Lock-in until {weeklyData.lockInEnd}</span>
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

        {/* Tab Content */}
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "weather" && <WeatherTab />}
        {activeTab === "payouts" && <PayoutsTab />}
        {activeTab === "earnings" && <EarningsTab />}
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <RevealDiv>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Wallet} label="Weekly Premium" value={`₹${weeklyData.premium}`} sub="Paid Mon 6:00 AM" />
          <StatCard icon={Shield} label="Coverage Remaining" value={`₹${weeklyData.coverageMax - weeklyData.coverageUsed}`} sub={`of ₹${weeklyData.coverageMax} max`} variant="success" />
          <StatCard icon={AlertTriangle} label="Risk Level" value={weeklyData.riskLevel} sub="Heavy rain Thu-Fri" variant="danger" />
          <StatCard icon={TrendingUp} label="Reliability Score" value={`${weeklyData.reliabilityScore}/100`} sub="Excellent standing" variant="success" />
        </div>
      </RevealDiv>

      <RevealDiv delay={100}>
        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            Recent Alerts
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

function WeatherTab() {
  return (
    <RevealDiv>
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="font-semibold flex items-center gap-2">
            <CloudRain className="h-4 w-4 text-primary" />
            7-Day Weather Forecast — {weeklyData.zone}
          </h3>
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
              </tr>
            </thead>
            <tbody>
              {weatherForecast.map((day) => (
                <tr key={day.day} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium">{day.day}</td>
                  <td className="p-3 text-center tabular-nums">{day.temp}°C</td>
                  <td className="p-3 text-center tabular-nums">{day.rain}mm</td>
                  <td className="p-3 text-center tabular-nums">{day.wind} km/h</td>
                  <td className="p-3 text-center tabular-nums">{day.humidity}%</td>
                  <td className="p-3 text-center"><RiskBadge level={day.risk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RevealDiv>
  );
}

function PayoutsTab() {
  return (
    <RevealDiv>
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
                <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
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
                      <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-md">Credited</span>
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
    </RevealDiv>
  );
}

function EarningsTab() {
  return (
    <RevealDiv>
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Income Gap Analysis
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Expected vs Actual earnings with RainGuard coverage</p>
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
    </RevealDiv>
  );
}
