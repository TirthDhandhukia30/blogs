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

function CloudOutagePost() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Cloud-themed floating elements (DNS packets, cloud nodes)
  const floatingNodes = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
        opacity: Math.random() * 0.2 + 0.05,
        size: Math.random() * 4 + 2,
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
      document.title = "When the Cloud Broke All at Once | Tirth's Blog";

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
        "Three pillars of the internet wobbled within months. AWS, Cloudflare, Azure. Apps froze. Logins looped. Payments stalled. Infrastructure showing where it hurts.";
      const url = window.location.origin + "/blog/cloud-outage";
      const ogImage = window.location.origin + "/cloudoutage-og.png";

      setMetaTag("description", description, false);
      setMetaTag("og:type", "article");
      setMetaTag("og:url", url);
      setMetaTag("og:title", "When the Cloud Broke All at Once");
      setMetaTag("og:description", description);
      setMetaTag("og:image", ogImage);
      setMetaTag("twitter:card", "summary_large_image");
      setMetaTag("twitter:url", url);
      setMetaTag("twitter:title", "When the Cloud Broke All at Once");
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
        {/* Floating DNS/cloud nodes */}
        {floatingNodes.map((node) => (
          <div
            key={node.id}
            className="absolute rounded-full bg-[var(--text-dim)] animate-twinkle"
            style={{
              left: `${node.left}%`,
              top: `${node.top}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
              animationDelay: `${node.delay}s`,
              animationDuration: `${node.duration}s`,
              opacity: node.opacity,
            }}
          />
        ))}
        {/* Subtle cloud gradient effects */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, var(--text-strong) 0%, transparent 70%)",
            left: "15%",
            top: "20%",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, var(--text-strong) 0%, transparent 70%)",
            right: "10%",
            bottom: "25%",
            filter: "blur(90px)",
          }}
        />
      </div>

      <main className="max-w-[900px] mx-auto px-6 md:px-12 pb-12 relative z-1">
        <article className="pt-2 md:pt-4 pb-12">
          <header className="pb-6 md:pb-8 border-b border-[var(--border-muted)] mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-dim)] mb-4">
              <time dateTime="2025-11-22" className="font-bold">
                Nov 22, 2025
              </time>
              <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
              <span>6 min read</span>
            </p>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 shrink-0 rounded-md bg-[var(--bg-panel)] overflow-hidden">
                <img
                  src="/cloudoutage.png"
                  alt="Cloud outage"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-[var(--text-strong)] m-0 mb-3 leading-tight">
                  When the Cloud Broke All at Once
                </h1>
                <p className="text-sm text-[var(--text-soft)] leading-relaxed">
                  Every so often the internet reminds you it's still a giant
                  machine pretending to be seamless. Late 2024 and 2025 did
                  exactly that.
                </p>
              </div>
            </div>
          </header>

          <div className="prose-blog">
            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              Every so often the internet reminds you it's still a giant machine
              pretending to be seamless. Late 2024 and 2025 did exactly that.
              <strong className="font-semibold text-[var(--text-strong)]">
                Cloudflare fell on November 18, 2024.
              </strong>{" "}
              Azure struggled around the same time. Then,{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                on October 20, 2025, AWS delivered its own meltdown.
              </strong>{" "}
              Three pillars wobbling within a short span. Apps froze. Logins
              looped. Payments stalled. Nothing mystical about it. Just
              infrastructure showing you where it hurts.
            </p>

            <h2 className="text-lg md:text-xl font-semibold text-[var(--text-strong)] mt-8 mb-3">
              What Actually Went Wrong
            </h2>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              <strong className="font-semibold text-[var(--text-strong)]">
                AWS, on October 20, 2025,
              </strong>{" "}
              hit a routing failure that spread into load balancers and identity
              services. Once IAM slows, everything built on top follows. Nothing
              in your code changed. Everything in your permissions did.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              <strong className="font-semibold text-[var(--text-strong)]">
                Cloudflare's outage on November 18, 2024
              </strong>{" "}
              came from something embarrassingly simple. A permissions change in
              one of their database systems created extra entries in a feature
              file used by their Bot Management service. The file doubled in
              size. It propagated across their entire network. Their routing
              software constantly reads that file, but it had a hard size limit
              below the new version. So it crashed. At scale. For a while, they
              thought it was a massive DDoS before realizing it was their own
              update choking the system. They rolled back the file, traffic
              flowed again, and by late afternoon the network stood back up.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              Azure had its moment too. Internal congestion collided with a
              protection layer blocking legitimate traffic. A safety system
              turning on the platform it was meant to defend.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              Different causes. Same story: one weak link and the internet
              coughs.
            </p>

            <div
              className="my-8 w-full aspect-[21/9] bg-[var(--bg-panel)]/50 border border-[var(--border-muted)] rounded-lg overflow-hidden"
              style={{ aspectRatio: "28/9" }}
            >
              <img
                src="/cloudinfra.png"
                alt="Cloud infrastructure"
                className="w-full h-full object-cover object-[center_35%]"
              />
            </div>

            <h2 className="text-lg md:text-xl font-semibold text-[var(--text-strong)] mt-8 mb-3">
              How It Felt on the Ground
            </h2>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              Your app acted broken even though you changed nothing. Payments
              hung. Auth loops locked users out. APIs failed mid-call. Anything
              using cloud identity, DNS, or routing started collapsing under
              dependencies you didn't even know were dependencies.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              That's when you see how much of your world relies on a handful of
              companies staying perfectly aligned.
            </p>

            <h2 className="text-lg md:text-xl font-semibold text-[var(--text-strong)] mt-8 mb-3">
              My Take
            </h2>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              Outages aren't surprising. They're part of engineering. What's
              surprising is how close these failures arrived. You can call it
              coincidence. I call it a reminder. We've built the modern internet
              on top of a very small number of platforms. Most teams aren't
              "distributed." They're just sitting in one provider and hoping the
              provider never blinks.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              <strong className="font-semibold text-[var(--text-strong)]">
                Hope isn't architecture.
              </strong>
            </p>

            <h2 className="text-lg md:text-xl font-semibold text-[var(--text-strong)] mt-8 mb-3">
              The Impact
            </h2>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              Money was lost. Operations paused. Support queues exploded. Even
              teams with backups still got hit because the real dependencies
              live below the layers you think you control. Your app might be
              multi-region. Your CDN isn't. Your DNS isn't. Your auth provider
              isn't. One crack, and the chain snaps.
            </p>

            <h2 className="text-lg md:text-xl font-semibold text-[var(--text-strong)] mt-8 mb-3">
              What Changes Next
            </h2>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              Architectures get re-read with fresh eyes. Cross-cloud becomes
              serious instead of aspirational. Redundancy stops being a slide in
              a presentation and becomes something you actually build. The weak
              points everyone pretended didn't matter get loud.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              The mindset shifts. You stop assuming these platforms won't fail.
              You start planning for when they will.
            </p>

            <h2 className="text-lg md:text-xl font-semibold text-[var(--text-strong)] mt-8 mb-3">
              Preventing the Next Breakdown
            </h2>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              You can't stop AWS, Cloudflare, or Azure from breaking. You can
              only stop their crash from becoming your crash.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              So you add fallback DNS. You split authentication. You test
              failover paths you've been ignoring. You stop anchoring everything
              to a single provider.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              And maybe you stop rolling out critical updates without
              guardrails. Or, as people joke during incidents like these: stop
              hiring interns to push production configs. (Relax. Mostly
              sarcasm.)
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              Good engineering assumes failure and contains it.
            </p>

            <h2 className="text-lg md:text-xl font-semibold text-[var(--text-strong)] mt-8 mb-3">
              The Bottom Line
            </h2>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              The cloud gives you scale but takes control away. When the giants
              stumble, everything on top shakes with them. They publish their
              reports. They fix their configs. The internet recovers like it
              always does.
            </p>

            <p className="text-sm text-[var(--text-base)] leading-relaxed mb-4">
              But the lesson stays the same:{" "}
              <strong className="font-semibold text-[var(--text-strong)]">
                reliability isn't faith. It's preparation.
              </strong>
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

export default CloudOutagePost;
