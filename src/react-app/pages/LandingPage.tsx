import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

type LocationPoint = {
  lat: number;
  lng: number;
  label: string;
  size: number;
};

const locations: LocationPoint[] = [
  { lat: 40.7128, lng: -74.006, label: "New York", size: 0.8 },
  { lat: 51.5074, lng: -0.1278, label: "London", size: 0.7 },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo", size: 0.9 },
  { lat: 48.8566, lng: 2.3522, label: "Paris", size: 0.7 },
  { lat: 25.2048, lng: 55.2708, label: "Dubai", size: 0.8 },
  { lat: -33.8688, lng: 151.2093, label: "Sydney", size: 0.7 },
  { lat: 1.3521, lng: 103.8198, label: "Singapore", size: 0.6 },
  { lat: 41.0082, lng: 28.9784, label: "Istanbul", size: 0.7 },
];

export default function LandingPage() {
  const globeRef = useRef<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const globe = globeRef.current;

    if (!globe) return;

    setLoaded(true);

    globe.pointOfView(
      {
        lat: 20,
        lng: 10,
        altitude: 2.2,
      },
      1200
    );

    const controls = globe.controls();

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.enableZoom = false;
    controls.enablePan = false;
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#061a3a] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
       <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl flex-col items-center px-6 pt-8 lg:flex-row lg:px-10 lg:pt-0">
        {/* Hero copy */}
        <div className="relative z-20 w-full max-w-2xl text-center lg:w-1/2 lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs text-cyan-300 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            AI Text Analyzer
          </div>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
           Intelligent Writing Toolr.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              & Scanner.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-gray-400 sm:text-lg lg:mx-0">
            Turn your camera into an intelligent assistant.
            Scan images, write, edit, and translate.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <button
              onClick={() => {
                window.location.href = "/login";
              }}
              className="rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_40px_rgba(255,255,255,0.12)] transition hover:scale-[1.02] hover:bg-cyan-50"
            >
              Start Now
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur transition hover:border-white/20 hover:bg-white/10"
            >
              Explore
            </button>
          </div>

          <div className="mt-10 flex justify-center gap-8 text-left lg:justify-start">
            <div>
              <div className="text-lg font-semibold">OCR</div>
              <div className="text-xs text-gray-500">Instant text</div>
            </div>

            <div>
              <div className="text-lg font-semibold">AI</div>
              <div className="text-xs text-gray-500">Smart analysis</div>
            </div>

            <div>
              <div className="text-lg font-semibold">100+</div>
              <div className="text-xs text-gray-500">Languages</div>
            </div>
          </div>
        </div>

        {/* Globe */}
        <div className="relative flex h-[550px] w-full items-center justify-center lg:h-[700px] lg:w-1/2">
          <div className="absolute h-[430px] w-[430px] rounded-full bg-cyan-400/10 blur-[90px]" />

          <div
            className={`relative h-[620px] w-[620px] max-w-[110vw] transition-opacity duration-1000 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <Globe
              ref={globeRef}
              width={620}
              height={620}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              atmosphereColor="#22d3ee"
              atmosphereAltitude={0.18}
              pointsData={locations}
              pointLat="lat"
              pointLng="lng"
              pointColor={() => "#22d3ee"}
              pointAltitude={0.025}
              pointRadius="size"
              pointLabel="label"
              pointsMerge={false}
              showAtmosphere
            />
          </div>

          {/* Floating scanner card */}
          <div className="absolute bottom-8 left-2 z-10 rounded-2xl border border-white/10 bg-black/50 p-4 shadow-2xl backdrop-blur-xl sm:left-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
                <span className="text-cyan-300">⌁</span>
              </div>

              <div>
                <div className="text-xs text-gray-500">
                  SCANNER
                </div>
                <div className="text-sm font-medium">
                  Ready to understand
                </div>
              </div>

              <span className="ml-2 h-2 w-2 animate-pulse rounded-full bg-green-400" />
            </div>
          </div>

          {/* Location card */}
          <div className="absolute right-0 top-20 z-10 hidden rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl sm:block">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
              Connected
            </div>

            <div className="mt-1 flex items-center gap-2 text-sm">
              <span className="text-cyan-300">●</span>
              AI Intelligence
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-10"
      >
        <div className="max-w-2xl">
          <div className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400">
            One camera. Infinite possibilities.
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            For a better view of your images.
          </h2>

          <p className="mt-4 text-gray-400">
            Point your camara and let AI
            turn it into information you can actually use.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "◎",
              title: "Image Scanning",
              text: "Understand signs, menus and documents in another language.",
            },
            {
              icon: "◈",
              title: "Handwritten OCR",
              text: "Scan menus and discover what unfamiliar dishes mean.",
            },
            {
              icon: "⌖",
              title: "Camera Capture",
              text: "Get useful context about places and things around you.",
            },
            {
              icon: "✦",
              title: "AI Vision",
              text: "Turn camera input into intelligent, actionable answers.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-xl text-cyan-300">
                {feature.icon}
              </div>

              <h3 className="font-medium">{feature.title}</h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Scanner CTA */}
      <section
        id="scanner"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-32 lg:px-10"
      >
        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.03] to-violet-500/10 p-8 sm:p-12">
          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />

          <div className="relative max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-cyan-400">
              Ready when you are
            </div>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Point. Scan. Understand.
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              Your next image shouldn't require you to understand
              everything first.
            </p>

            <button
              onClick={() => {
                window.location.href = "/login";
              }}
              className="mt-7 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-cyan-50"
            >
              Open Now →
            </button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-gray-500 sm:flex-row">
          <div>© {new Date().getFullYear()} OCR</div>
          <div>Understand it.</div>
        </div>
      </footer>
    </main>
  );
}
