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

function TimeTravelPost() {
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

  useEffect(() => {
    // Update meta tags
    const updateMetaTags = () => {
      document.title =
        "Time Travel Exists, But Only in the Math | Tirth's Blog";

      const setMetaTag = (property, content, isProperty = true) => {
        const attribute = isProperty ? "property" : "name";
        let element = document.querySelector(
          `meta[${attribute}="${property}"]`
        );
        if (!element) {
          element = document.createElement("meta");
          element.setAttribute(attribute, property);
          document.head.appendChild(element);
        }
        element.setAttribute("content", content);
      };

      const description =
        "Physics already accepts time travel. The equations are clear. The measurements confirm it. We just can't use it.";
      const url = window.location.origin + "/blog/time-travel";
      const ogImage = window.location.origin + "/timetravel-og.png";

      setMetaTag("description", description, false);
      setMetaTag("og:type", "article");
      setMetaTag("og:url", url);
      setMetaTag("og:title", "Time Travel Exists, But Only in the Math");
      setMetaTag("og:description", description);
      setMetaTag("og:image", ogImage);
      setMetaTag("twitter:card", "summary_large_image");
      setMetaTag("twitter:url", url);
      setMetaTag("twitter:title", "Time Travel Exists, But Only in the Math");
      setMetaTag("twitter:description", description);
      setMetaTag("twitter:image", ogImage);
    };

    updateMetaTags();
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
        {/* Subtle cosmic effect */}
        <div
          className="absolute w-64 h-64 rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, var(--text-strong) 0%, transparent 70%)",
            left: "10%",
            top: "30%",
            filter: "blur(80px)",
          }}
        />
      </div>

      <main className="max-w-[900px] mx-auto px-6 md:px-12 pb-12 relative z-1">
        <article className="pt-2 md:pt-4 pb-12">
          <header className="pb-6 md:pb-8 border-b border-[var(--border-muted)] mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-dim)] mb-4">
              <time dateTime="2025-11-16" className="font-bold">
                Nov 16, 2025
              </time>
              <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
              <span>5 min read</span>
            </p>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 shrink-0 rounded-md bg-[var(--bg-panel)] overflow-hidden">
                <img
                  src="/timetravel.png"
                  alt="Time travel"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-[var(--text-strong)] m-0 mb-3 leading-tight">
                  Time Travel Exists, But Only in the Math
                </h1>
                <p className="text-sm text-[var(--text-soft)] leading-relaxed">
                  Physics already accepts time travel. The equations are clear.
                  The measurements confirm it. We just can't use it.
                </p>
              </div>
            </div>
          </header>

          <div className="prose-blog">
            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-6">
              The movie <em>Interstellar</em> gives us a dramatic version of
              something physics already accepts. On Miller's planet, Cooper
              spends about an hour near the black hole. When he returns, roughly
              23 years have passed on Earth. The film treats it as a shock, but
              the idea comes straight from Einstein's work.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-6">
              <strong className="font-semibold text-[var(--text-strong)]">
                Gravity bends time.
              </strong>{" "}
              Sit close to something massive and seconds stretch. Move away and
              they tighten. It feels strange only because, in our daily lives,
              the differences are too small to notice. But the math leaves no
              room for doubt. A clock near heavy gravity runs slow. A clock in
              weaker gravity runs fast.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-6">
              We've already measured this. Not at the scale of decades, but in
              microseconds. Astronauts return slightly younger than they would
              have on Earth. Satellites need constant time corrections. Even
              laboratory clocks show the effect when raised by just a few
              centimeters. These are tiny demonstrations, but they follow the
              same rules that shape the film's story.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-6">
              So the question isn't whether traveling into the future is
              possible. It is. The universe handles it on its own. What we can't
              do is push it to extremes. The conditions needed to stretch an
              hour into decades exist near black holes—places we have no
              realistic way to reach or survive. Radiation, tidal forces, and
              engineering limits stop us long before we get close.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-6">
              That leaves us in a strange position. We understand the mechanism.
              We can write the equations. We see hints of it every day. But the
              version that moves a person meaningfully into the future stays
              locked behind environments far beyond our reach.
            </p>

            <div
              className="my-8 w-full aspect-[21/9] bg-[var(--bg-panel)]/50 border border-[var(--border-muted)] rounded-lg overflow-hidden"
              style={{ aspectRatio: "28/9" }}
            >
              <img
                src="/miller.png"
                alt="millers planet from Interstellar"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-lg md:text-xl font-semibold text-[var(--text-strong)] mt-12 mb-4">
              The Theory Stands Solid
            </h2>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-6">
              Time travel isn't waiting to be invented. It's already part of the
              universe. We can describe it. We can measure it. We just can't use
              it. The theory stands solid. The practice remains out of reach.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-6">
              This is the gap between knowing and doing. Between understanding a
              phenomenon and harnessing it. Between seeing the path and being
              able to walk it.
            </p>
          </div>
        </article>
      </main>

      <footer className="max-w-[900px] mx-auto px-6 md:px-12 py-8 mt-12 border-t border-[var(--border-muted)]">
        <p className="text-sm text-[var(--text-dim)] text-center">
          Follow me on{" "}
          <a
            href="https://x.com/tirthhh30"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-base)] hover:text-[var(--text-strong)] transition-colors duration-200 underline underline-offset-2"
          >
            X
          </a>
        </p>
      </footer>
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

export default TimeTravelPost;
