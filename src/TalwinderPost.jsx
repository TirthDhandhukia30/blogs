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

function TalwinderPost() {
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
      document.title = "npx talwinder | Tirth's Blog";

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
        "I kept typing 'talwinder' instead of 'tailwind', so I wrapped TailwindCSS as an npm package. Here's how you can publish your own wrapper package.";
      const url = window.location.origin + "/blog/talwinder";
      const ogImage = window.location.origin + "/Talwinder.png";

      setMetaTag("description", description, false);
      setMetaTag("og:type", "article");
      setMetaTag("og:url", url);
      setMetaTag("og:title", "npx talwinder");
      setMetaTag("og:description", description);
      setMetaTag("og:image", ogImage);
      setMetaTag("twitter:card", "summary_large_image");
      setMetaTag("twitter:url", url);
      setMetaTag("twitter:title", "npx talwinder");
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
              <time dateTime="2025-11-23" className="font-bold">
                Nov 23, 2025
              </time>
              <span aria-hidden="true">&nbsp;&middot;&nbsp;</span>
              <span>4 min read</span>
            </p>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 shrink-0 rounded-md bg-[var(--bg-panel)] overflow-hidden">
                <img
                  src="/Talwinder.png"
                  alt="npx talwinder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-[var(--text-strong)] m-0 mb-3 leading-tight">
                  npx talwinder
                </h1>
                <p className="text-sm text-[var(--text-soft)] leading-relaxed">
                  I kept typing "talwinder" instead of "tailwind", so I wrapped TailwindCSS as an npm package. Here's how you can do it too.
                </p>
              </div>
            </div>
          </header>

          <div className="prose-blog">
            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              I often type "talwinder" instead of tailwind, so instead of fixing my muscle memory I wrapped the tailwindCSS package with <code className="px-1.5 py-0.5 rounded bg-[var(--bg-panel)] text-[var(--text-strong)] text-xs font-mono border border-[var(--border-muted)]">npx talwinder</code>.
            </p>

            <div className="my-6 p-4 rounded-lg bg-[var(--bg-panel)]/50 border border-[var(--border-muted)]">
              <p className="text-base text-[var(--text-soft)] leading-relaxed m-0">
                <strong className="font-semibold text-[var(--text-strong)]">Note:</strong> This wrapper is specifically designed for React Vite projects. If you're using other frameworks or build tools, you'll need to adjust the approach accordingly.
              </p>
            </div>

            <h2 className="text-lg md:text-xl font-semibold text-[var(--text-strong)] mt-12 mb-4">
              The Wrapper
            </h2>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              Create a package that re-exports everything from the original. No logic, no modifications—just a thin wrapper.
            </p>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              The <code className="px-1.5 py-0.5 rounded bg-[var(--bg-panel)] text-[var(--text-strong)] text-xs font-mono border border-[var(--border-muted)]">package.json</code>:
            </p>

            <div className="my-6 p-4 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-muted)] overflow-x-auto">
              <pre className="text-sm font-mono text-[var(--text-base)] leading-relaxed m-0">
{`{
  "name": "talwinder",
  "version": "1.0.0",
  "main": "index.js",
  "bin": {
    "talwinder": "./bin/talwinder.js"
  },
  "dependencies": {
    "tailwindcss": "^3.4.0"
  }
}`}
              </pre>
            </div>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              The wrapper script:
            </p>

            <div className="my-6 p-4 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-muted)] overflow-x-auto">
              <pre className="text-sm font-mono text-[var(--text-base)] leading-relaxed m-0">
{`#!/usr/bin/env node
require('tailwindcss/lib/cli').run(process.argv.slice(2));`}
              </pre>
            </div>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              That's it. The shebang tells the system to use Node.js. The rest passes all arguments to TailwindCSS.
            </p>

            <h2 className="text-lg md:text-xl font-semibold text-[var(--text-strong)] mt-12 mb-4">
              Publishing to npm
            </h2>

            <div className="my-6 p-4 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-muted)] overflow-x-auto">
              <pre className="text-sm font-mono text-[var(--text-base)] leading-relaxed m-0">
{`# Login to npm (one time)
npm login

# Publish your package
npm publish`}
              </pre>
            </div>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              Check name availability on <a href="https://www.npmjs.com" target="_blank" rel="noopener noreferrer" className="text-[var(--text-base)] hover:text-[var(--text-strong)] transition-colors duration-200 underline underline-offset-2">npmjs.com</a> first. For scoped packages, use <code className="px-1.5 py-0.5 rounded bg-[var(--bg-panel)] text-[var(--text-strong)] text-xs font-mono border border-[var(--border-muted)]">npm publish --access public</code>.
            </p>

            <h2 className="text-lg md:text-xl font-semibold text-[var(--text-strong)] mt-12 mb-4">
              How You Can Do It
            </h2>

            <ol className="list-decimal list-inside space-y-3 mb-6 text-base text-[var(--text-base)] leading-relaxed">
              <li className="pl-2">Create a new directory and run <code className="px-1.5 py-0.5 rounded bg-[var(--bg-panel)] text-[var(--text-strong)] text-xs font-mono border border-[var(--border-muted)]">npm init</code></li>
              <li className="pl-2">Add the original package as a dependency</li>
              <li className="pl-2">Create a bin script that forwards to the original CLI</li>
              <li className="pl-2">Make it executable: <code className="px-1.5 py-0.5 rounded bg-[var(--bg-panel)] text-[var(--text-strong)] text-xs font-mono border border-[var(--border-muted)]">chmod +x bin/your-script.js</code></li>
              <li className="pl-2">Test locally with <code className="px-1.5 py-0.5 rounded bg-[var(--bg-panel)] text-[var(--text-strong)] text-xs font-mono border border-[var(--border-muted)]">npm link</code></li>
              <li className="pl-2">Publish with <code className="px-1.5 py-0.5 rounded bg-[var(--bg-panel)] text-[var(--text-strong)] text-xs font-mono border border-[var(--border-muted)]">npm publish</code></li>
            </ol>

            <p className="text-base text-[var(--text-base)] leading-relaxed mb-6">
              You're not maintaining a fork or copying code. Just creating an alias that npm understands.
            </p>

            <div className="my-8 p-6 rounded-lg bg-[var(--bg-panel)]/50 border border-[var(--border-muted)]">
              <p className="text-base text-[var(--text-soft)] leading-relaxed m-0">
                <strong className="font-semibold text-[var(--text-strong)]">Try it:</strong> <code className="px-1.5 py-0.5 rounded bg-[var(--bg-panel)] text-[var(--text-strong)] text-xs font-mono border border-[var(--border-muted)]">npx talwinder init</code> works exactly like <code className="px-1.5 py-0.5 rounded bg-[var(--bg-panel)] text-[var(--text-strong)] text-xs font-mono border border-[var(--border-muted)]">npx tailwindcss init</code>. Muscle memory shouldn't be a bug—it should be a feature.
              </p>
            </div>
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

export default TalwinderPost;
