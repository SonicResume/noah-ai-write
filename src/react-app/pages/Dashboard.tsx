import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Camera,
  CheckCircle2,
  CreditCard,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  ScanLine,
  Settings,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";

import { auth } from "../firebase";
import { useHistory } from "../hooks/useHistory";

type BillingState = {
  plan: string;
  credits: number;
  dailyScans: number;
  dailyLimit: number | null;
  remaining: number | null;
};

const PLAN_META: Record<
  string,
  { name: string; price: number; limit: string }
> = {
  free: {
    name: "Free",
    price: 0,
    limit: "10 OCR scans per day",
  },
  pro: {
    name: "Pro",
    price: 19,
    limit: "Unlimited OCR scans",
  },
  business: {
    name: "Business",
    price: 29,
    limit: "Unlimited OCR scans",
  },
  premium: {
    name: "Premium",
    price: 49,
    limit: "Unlimited OCR scans",
  },
};

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Scanner", to: "/app", icon: ScanLine },
  { label: "Camera", to: "/camera", icon: Camera },
  { label: "Documents", to: "/dashboard#documents", icon: FileText },
  { label: "History", to: "/dashboard#history", icon: History },
  { label: "Usage", to: "/dashboard#usage", icon: BarChart3 },
  { label: "Billing", to: "/pricing", icon: CreditCard },
  { label: "Settings", to: "/dashboard#settings", icon: Settings },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { history } = useHistory();

  const [user, setUser] = useState<User | null>(auth.currentUser);

  const [billing, setBilling] = useState<BillingState>({
    plan: "free",
    credits: 0,
    dailyScans: 0,
    dailyLimit: 10,
    remaining: 10,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        navigate("/login");
      }
    });

    return unsubscribe;
  }, [navigate]);

  useEffect(() => {
    if (!user?.email) return;

    const loadBilling = async () => {
      try {
        const response = await fetch(
          `https://billing-service-qorj.onrender.com/user/${encodeURIComponent(
            user.email
          )}`
        );

        if (!response.ok) {
          throw new Error("Unable to load billing status");
        }

        const data = await response.json();

        setBilling({
          plan: String(data?.plan || "free").toLowerCase(),
          credits: Number(data?.credits || 0),
          dailyScans: Number(data?.dailyScans || 0),
          dailyLimit:
            data?.dailyLimit == null ? null : Number(data.dailyLimit),
          remaining:
            data?.remaining == null ? null : Number(data.remaining),
        });
      } catch (error) {
        console.error("Billing status error:", error);
      }
    };

    loadBilling();
  }, [user?.email]);

  const currentPlan = PLAN_META[billing.plan] ?? PLAN_META.free;

  const billingStatus =
    currentPlan.name === "Free"
      ? "Free account"
      : "Paid plan entitlement";

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F2EC] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#6B625B]">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#35D07F] border-t-transparent" />
          Loading NOAH...
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F7F2EC] text-[#171717]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-[#DDD2C7] bg-white lg:flex">
          <div className="flex h-20 items-center gap-3 border-b border-[#EEE7E0] px-6">
            <img
              src="/dashboard.png"
              alt="dashboard"
              className="h-10 w-10 rounded-xl object-contain"
            />

            <div>
              <div className="font-black tracking-tight">WorkSpace</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A8D82]">
                Your account
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;

              if (item.to.includes("#")) {
                return (
                  <a
                    key={item.label}
                    href={item.to}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#6B625B] transition hover:bg-[#F7F2EC]"
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </a>
                );
              }

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#35D07F] text-[#07140D]"
                        : "text-[#6B625B] hover:bg-[#F7F2EC]"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="border-t border-[#EEE7E0] p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#8A5A50] hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              Sign out
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="border-b border-[#DDD2C7] bg-white/90 px-4 py-5 backdrop-blur sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9A8D82]">
                  Usage & Activity
                </p>

                <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                  Welcome back
                </h1>
              </div>

              <div className="hidden items-center gap-3 rounded-xl border border-[#DDD2C7] bg-[#F7F2EC] px-3 py-2 sm:flex">
                <UserRound className="h-4 w-4 text-[#6B625B]" />
                <span className="max-w-[240px] truncate text-sm font-semibold text-[#4F443D]">
                  {user.email}
                </span>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
            <section className="overflow-hidden rounded-3xl border border-[#DDD2C7] bg-white">
              <div className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:p-8">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#EAFBF1] px-3 py-1.5 text-xs font-bold text-[#16824A]">
                    <Sparkles className="h-4 w-4" />
                    Manage your scans, documents, usage, and plan
                  </div>

                  <h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                    Turn every image into usable digital text.
                  </h2>

                  <p className="mt-4 max-w-2xl text-[#6B625B]">
                    Start a scan, capture a document, or open one of your recent
                    results.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to="/app"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#35D07F] px-5 py-3 font-bold text-[#07140D]"
                    >
                      <ScanLine className="h-5 w-5" />
                      New Scan
                    </Link>

                    <Link
                      to="/camera"
                      className="inline-flex items-center gap-2 rounded-xl border border-[#DDD2C7] bg-white px-5 py-3 font-bold text-[#40372F] hover:bg-[#F7F2EC]"
                    >
                      <Camera className="h-5 w-5" />
                      Open Camera
                    </Link>
                  </div>
                </div>

                <div className="hidden items-center justify-center md:flex">
                  <div className="rounded-3xl bg-[#F7F2EC] p-8">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                      <CheckCircle2 className="h-12 w-12 text-[#35D07F]" />
                      <p className="mt-3 font-black">Ready to scan</p>
                      <p className="mt-1 text-sm text-[#8A7D72]">
                        OCR engine available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Total scans",
                  value: history.length,
                  icon: ScanLine,
                },
                {
                  label: "Saved documents",
                  value: history.length,
                  icon: FileText,
                },
                {
                  label: "Today's scans",
                  value: billing.dailyScans,
                  icon: BarChart3,
                },
                {
                  label: "Current plan",
                  value: currentPlan.name,
                  icon: CreditCard,
                },
              ].map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[#DDD2C7] bg-white p-5"
                  >
                    <div className="rounded-xl bg-[#EAFBF1] p-2.5 w-fit">
                      <Icon className="h-5 w-5 text-[#16824A]" />
                    </div>

                    <p className="mt-5 text-sm font-semibold text-[#8A7D72]">
                      {stat.label}
                    </p>

                    <p className="mt-1 text-3xl font-black">{stat.value}</p>
                  </div>
                );
              })}
            </section>

            <section
              id="billing"
              className="rounded-3xl border border-[#DDD2C7] bg-white p-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9A8D82]">
                Current plan
              </p>

              <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-3xl font-black">
                    {currentPlan.name}
                  </h3>

                  <p className="mt-1 text-[#6B625B]">
                    ${currentPlan.price}/month · {currentPlan.limit}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#16824A]">
                    {billingStatus}
                  </p>
                </div>

                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center rounded-xl bg-[#35D07F] px-5 py-3 font-bold text-[#07140D]"
                >
                  Manage Plan
                </Link>
              </div>
            </section>

            <section
              id="history"
              className="rounded-3xl border border-[#DDD2C7] bg-white"
            >
              <div className="flex items-center justify-between border-b border-[#EEE7E0] px-6 py-5">
                <div>
                  <h3 className="text-xl font-black">Recent scans</h3>
                  <p className="mt-1 text-sm text-[#8A7D72]">
                    Your latest OCR activity.
                  </p>
                </div>

                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#16824A]"
                >
                  Open scanner
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {history.length === 0 ? (
                <div className="px-6 py-14 text-center">
                  <FileText className="mx-auto h-10 w-10 text-[#B8AAA0]" />
                  <p className="mt-4 font-bold">No scans yet</p>
                  <p className="mt-1 text-sm text-[#8A7D72]">
                    Your recognized documents will appear here.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#EEE7E0]">
                  {history.slice(0, 6).map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between gap-4 px-6 py-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[#2F2722]">
                          {entry.text || "Untitled scan"}
                        </p>

                        <p className="mt-1 text-xs text-[#8A7D72]">
                          {new Date(entry.timestamp).toLocaleString()} ·{" "}
                          {entry.confidence.toFixed(1)}% confidence
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-[#EAFBF1] px-3 py-1 text-xs font-bold text-[#16824A]">
                        {entry.source}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div
                id="usage"
                className="rounded-3xl border border-[#DDD2C7] bg-white p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black">Usage</h3>

                    <p className="mt-1 text-sm text-[#8A7D72]">
                      {billing.dailyLimit === null
                        ? "Unlimited OCR scans"
                        : `${billing.dailyScans} of ${billing.dailyLimit} scans today`}
                    </p>
                  </div>

                  <BarChart3 className="h-6 w-6 text-[#16824A]" />
                </div>

                {billing.dailyLimit === null ? (
                  <div className="mt-6 rounded-xl bg-[#EAFBF1] px-4 py-4">
                    <p className="font-bold text-[#16824A]">
                      Unlimited OCR scans
                    </p>

                    <p className="mt-1 text-sm text-[#4F443D]">
                      {billing.dailyScans} scans recorded today.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#EEE7E0]">
                      <div
                        className="h-full rounded-full bg-[#35D07F] transition-all"
                        style={{
                          width: `${Math.min(
                            (billing.dailyScans / billing.dailyLimit) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="mt-3 flex justify-between text-sm">
                      <span className="font-semibold text-[#4F443D]">
                        {billing.remaining} remaining
                      </span>

                      <span className="text-[#8A7D72]">
                        {currentPlan.name} plan
                      </span>
                    </div>

                    {billing.remaining === 0 && (
                      <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
                        <p className="font-bold text-red-700">
                          Daily scan limit reached
                        </p>

                        <p className="mt-1 text-sm text-red-600">
                          Upgrade to Pro for unlimited OCR scans.
                        </p>

                        <Link
                          to="/pricing"
                          className="mt-3 inline-flex rounded-lg bg-[#35D07F] px-4 py-2 text-sm font-bold text-[#07140D]"
                        >
                          Upgrade to Pro
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div
                id="documents"
                className="rounded-3xl border border-[#DDD2C7] bg-white p-6"
              >
                <h3 className="text-xl font-black">Documents</h3>

                <p className="mt-1 text-sm text-[#8A7D72]">
                  Saved OCR results: {history.length}
                </p>

                <Link
                  to="/app"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#DDD2C7] px-4 py-3 text-sm font-bold hover:bg-[#F7F2EC]"
                >
                  Manage documents
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            <section
              id="settings"
              className="rounded-3xl border border-[#DDD2C7] bg-white p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-black">Account</h3>

                  <p className="mt-1 text-sm text-[#8A7D72]">
                    {user.email}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E2CFC8] px-4 py-3 text-sm font-bold text-[#8A5A50] hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
