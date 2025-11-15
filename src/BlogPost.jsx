import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const THEME_KEY = "blog-theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

function BlogPost() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  const stars = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        opacity: Math.random() * 0.3 + 0.1,
      })),
    []
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const locationString = "Mumbai, India";

  return (
    <>
      <header className="sticky top-0 z-10 py-1.5 mb-4 backdrop-blur-lg bg-[var(--bg-body)] transition-[background] duration-300">
        <div className="max-w-[900px] mx-auto px-2 md:px-3 flex items-center justify-between">
          <div className="flex flex-col">
            <time className="text-1xl md:text-2xl font-semibold text-[var(--text-strong)] leading-tight">
              {timeString}
            </time>
            <p className="text-xs text-[var(--text-dim)] mt-0.5">
              {locationString}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="w-[38px] h-[38px] rounded-[10px] border border-[var(--border-muted)] grid place-items-center text-[var(--text-base)] bg-transparent cursor-pointer transition-all duration-200 hover:border-[var(--border-strong)] hover:text-[var(--text-strong)] hover:bg-[var(--bg-panel)]"
              aria-label="Go back home"
            >
              <BackIcon />
            </button>
            <button
              onClick={toggleTheme}
              className="w-[38px] h-[38px] rounded-[10px] border border-[var(--border-muted)] grid place-items-center text-[var(--text-base)] bg-transparent cursor-pointer transition-all duration-200 hover:border-[var(--border-strong)] hover:text-[var(--text-strong)] hover:bg-[var(--bg-panel)]"
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } theme`}
            >
              <ThemeIcon isDark={theme === "dark"} />
            </button>
            <a
              href="mailto:tirth30.info@gmail.com"
              className="w-[38px] h-[38px] rounded-[10px] border border-[var(--border-muted)] grid place-items-center text-[var(--text-base)] bg-transparent transition-all duration-200 hover:border-[var(--border-strong)] hover:text-[var(--text-strong)] hover:bg-[var(--bg-panel)]"
              aria-label="Email me"
            >
              <MailIcon />
            </a>
          </div>
        </div>
      </header>

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Twinkling stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              opacity: star.opacity,
            }}
          />
        ))}
        {/* Black hole in background */}
        <div
          className="absolute w-48 h-48 rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, transparent 40%, var(--text-dim) 80%, transparent 100%)",
            right: "15%",
            top: "25%",
            filter: "blur(60px)",
          }}
        />
      </div>

      <main className="max-w-[900px] mx-auto px-6 md:px-12 pb-12 relative z-1">
        <article className="pt-2 md:pt-4 pb-12">
          <header className="pb-6 md:pb-8 border-b border-[var(--border-muted)] mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-dim)] mb-4">
              <time dateTime="2025-10-28">Oct 28, 2025</time>
              <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
              <span>7 min read</span>
            </p>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 shrink-0 rounded-md bg-[var(--bg-panel)] overflow-hidden">
                <img
                  src="/blackhole.png"
                  alt="Black hole"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-[var(--text-strong)] m-0 mb-3 leading-tight">
                  My Take on Black Hole Theory
                </h1>
                <p className="text-base text-[var(--text-soft)] leading-relaxed">
                  A rupture in spacetime — exploring black holes through the
                  lens of structural failure rather than just gravitational
                  collapse.
                </p>
              </div>
            </div>
          </header>

          <div className="prose-blog">
            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              You look at black holes and hear the usual line: regions where{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                gravity gets so strong that nothing escapes
              </strong>
              . But the way I see it, a black hole feels more like a{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                rupture in spacetime
              </strong>
              . Picture the universe as a giant moving structure with tension
              built into it. When something violent happens, the fabric buckles.
              That buckle becomes a rupture. That rupture becomes what we call a{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                black hole
              </strong>
              .
            </p>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              Think of the universe as a{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                massive aircraft in motion
              </strong>
              . Now picture a window breaking mid-flight. Air rushes out. The{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                pressure difference
              </strong>{" "}
              pulls everything toward the opening. You get a clear direction of
              flow and no chance to resist it. A black hole gives you the same
              behavior, but on a scale so big that{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                light itself gets caught in the pull
              </strong>
              .
            </p>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              You might look at this analogy and laugh. But several theories
              support the idea of extreme curvature acting like a tear or a
              puncture.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-strong)] mt-12 mb-4">
              You see this in the Schwarzschild radius
            </h2>

            <div className="my-6 py-4 px-6 bg-[var(--bg-panel)]/50 rounded-lg border border-[var(--border-muted)]">
              <p
                className="text-center text-[var(--text-base)]"
                style={{
                  fontFamily: "Georgia, Cambria, 'Times New Roman', serif",
                  fontSize: "1.25rem",
                  letterSpacing: "0.05em",
                }}
              >
                <em>r</em>
                <sub className="text-xs">s</sub> = 2<em>GM</em> / <em>c</em>
                <sup className="text-xs">2</sup>
              </p>
            </div>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              This formula gives the size of the{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                event horizon
              </strong>
              . A larger mass creates a larger radius. A larger radius creates a{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                stronger inward pull
              </strong>
              . That matches the rupture idea. The bigger the opening, the
              stronger the flow.
            </p>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              You also see it in the way{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                general relativity
              </strong>{" "}
              treats gravity. Mass bends spacetime. Extreme bending turns into a
              funnel. At some point the funnel becomes so steep that everything
              slides in. Light follows the geometry. It doesn't fight the pull.
              It moves on paths called{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                geodesics
              </strong>
              , and inside a black hole those paths lead only one way.
            </p>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              The rupture picture goes further. Early universe models talk about{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                topological defects
              </strong>
              . These are flaws in spacetime formed during rapid expansion. They
              behave like cracks or seams. They show that spacetime doesn't have
              to be perfect. It can stretch, deform, and fail under extreme
              pressure.{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                Stellar collapse
              </strong>{" "}
              fits into this. If enough mass falls inward fast enough, curvature
              doesn't just increase. It collapses. The{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                Penrose singularity theorem
              </strong>{" "}
              describes this breakdown.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-strong)] mt-12 mb-4">
              Accretion and the Growing Rupture
            </h2>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              You also have the physics of accretion. Matter near a black hole
              falls inward and forms a disk. The rate depends on Bondi
              accretion,
            </p>

            <div className="my-6 py-4 px-6 bg-[var(--bg-panel)]/50 rounded-lg border border-[var(--border-muted)]">
              <p
                className="text-center text-[var(--text-base)]"
                style={{
                  fontFamily: "Georgia, Cambria, 'Times New Roman', serif",
                  fontSize: "1.25rem",
                  letterSpacing: "0.05em",
                }}
              >
                <span className="text-xl">Ṁ</span> = 4π<em>λ</em>(<em>GM</em>)
                <sup className="text-xs">2</sup>
                <em>ρ</em> / <em>c</em>
                <sub className="text-xs">s</sub>
                <sup className="text-xs">3</sup>
              </p>
            </div>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              A stronger{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                gravitational field
              </strong>{" "}
              means faster inflow. You can picture this like a bigger breach in
              an aircraft pulling air in at a faster rate. Same idea, different
              scale.
            </p>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              The rupture grows over time. The{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                area theorem
              </strong>{" "}
              shows that the surface area of the event horizon{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                never shrinks
              </strong>
              . Once the rupture forms, it only widens. Every bit of matter that
              falls in stretches it further.
            </p>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              Rotation twists the story. A spinning black hole drags spacetime
              around it. That's{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                frame dragging
              </strong>
              . Imagine a tear not only pulling inward but twisting the fabric
              around its edge. The analogy holds.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-strong)] mt-12 mb-4">
              The Final Picture
            </h2>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              So yes. My take on black holes might sound unusual at first. But
              the core idea stays simple. A black hole behaves like a rupture in
              spacetime. It acts like a breach that pulls everything toward it.
              The physics we already know supports this picture. The formulas
              describe the strength of the pull. The theories explain how the
              rupture forms. The behavior we observe matches the flow you expect
              from an opening in a moving medium.
            </p>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              This is how I see it. And this is the lens I use when I think
              about the universe.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="w-4 h-4"
      role="presentation"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function ThemeIcon({ isDark }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="w-4 h-4"
      role="presentation"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {isDark ? (
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
      ) : (
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      )}
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="w-4 h-4"
      role="presentation"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25Z" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export default BlogPost;
