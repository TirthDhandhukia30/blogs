import { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AUTHOR_NAME = "Tirth";
const THEME_KEY = "blog-theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const blogPosts = [
  {
    id: 3,
    title: "When the Cloud Broke All at Once",
    excerpt:
      "Three pillars of the internet wobbled within months. Apps froze. Logins looped. Infrastructure showing where it hurts.",
    date: "Nov 22, 2025",
    dateISO: "2025-11-22",
    readingTime: "6 min read",
    timeRequired: "PT6M",
    href: "/blog/cloud-outage",
    canonical: "/blog/cloud-outage",
    pinned: true,
  },
  {
    id: 1,
    title: "My Take on the Blackhole Theory",
    excerpt: "A rupture in spacetime.",
    date: "Nov 15, 2025",
    dateISO: "2025-11-15",
    readingTime: "5 min read",
    timeRequired: "PT7M",
    href: "/blog/blackhole-theory",
    canonical: "/blog/blackhole-theory",
  },
  {
    id: 2,
    title: "Time Travel Exists, But Only in the Math",
    excerpt:
      "Physics already accepts time travel. The equations are clear. We just can't use it.",
    date: "Nov 16, 2025",
    dateISO: "2025-11-16",
    readingTime: "5 min read",
    timeRequired: "PT5M",
    href: "/blog/time-travel",
    canonical: "/blog/time-travel",
  },
];

const placeholderPosts = [
  {
    id: 4,
    title: "",
    excerpt: "",
    date: "",
    dateISO: "",
    readingTime: "",
    timeRequired: "",
    href: "#",
    canonical: "",
  },
];

function BlogCard({ post }) {
  // Empty card for placeholder
  if (!post.title) {
    return (
      <article className="relative border border-[var(--border-muted)]/50 bg-transparent p-5 overflow-hidden opacity-40">
        <div className="flex items-center justify-center h-20">
          <span className="text-[11px] text-[var(--text-dim)] tracking-[0.2em] uppercase font-medium">
            Coming Soon
          </span>
        </div>
      </article>
    );
  }

  return (
    <Link
      to={post.href}
      className="block focus-visible:outline-none group"
      aria-label={`Read ${post.title}`}
    >
      <article className="relative border border-[var(--border-muted)] bg-[var(--bg-panel)] p-6 transition-all duration-200 hover:border-[var(--border-strong)] overflow-hidden">
        {post.pinned && (
          <div
            className="absolute top-4 right-4 text-[var(--text-dim)] hover:text-[var(--text-strong)] transition-colors"
            title="Pinned"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M16 12V4h1a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2h1v8l-2 2v2h5.2l-.6 5a1 1 0 0 0 1 1.2 1 1 0 0 0 1-.8l.8-5.4H19v-2l-3-2z" />
            </svg>
          </div>
        )}
        <div className="relative">
          {/* Meta info */}
          <div className="flex items-center gap-2.5 mb-3">
            <time className="text-xs text-[var(--text-dim)] tracking-[0.08em] font-bold">
              {post.date}
            </time>
            <span className="w-0.5 h-0.5 rounded-full bg-[var(--text-dim)]"></span>
            <span className="text-xs text-[var(--text-dim)] tracking-[0.08em] font-medium">
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg md:text-xl m-0 mb-2 text-[var(--text-strong)] font-semibold leading-snug tracking-tight">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-[var(--text-soft)] m-0 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [currentTime, setCurrentTime] = useState(new Date());

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

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${AUTHOR_NAME}'s Blog`,
      description:
        "Notes, changelogs, and essays written between shipping cycles",
      author: {
        "@type": "Person",
        name: AUTHOR_NAME,
      },
      blogPost: blogPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.dateISO,
        url: post.canonical ?? post.href,
        author: {
          "@type": "Person",
          name: AUTHOR_NAME,
        },
        timeRequired: post.timeRequired,
      })),
    }),
    []
  );

  return (
    <>
      <header className="sticky top-0 z-10 py-1.5 mb-4 backdrop-blur-lg bg-[var(--bg-body)] transition-[background] duration-300 border-b border-[var(--border-muted)]">
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

      <main id="top" className="max-w-[900px] mx-auto px-6 md:px-12 pb-12">
        <section className="pt-2 md:pt-4 pb-6 md:pb-10 border-b border-[var(--border-muted)]">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--text-dim)] mb-4">
            Hi, I'm Tirth.
          </p>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 shrink-0 rounded-md border border-[var(--border-muted)] bg-[var(--bg-panel)] overflow-hidden">
              <img src="/blogLogo.png" alt="Logo" className="w-full h-full " />
            </div>
            <h1 className="text-lg md:text-xl font-semibold text-[var(--text-strong)] m-0 leading-tight max-w-[40ch]">
              These are the notes, changelogs, and essays I write between
              shipping cycles.
            </h1>
          </div>
        </section>

        <section
          className="flex flex-col gap-8 mt-10"
          aria-label="Latest articles"
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
          {placeholderPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </section>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      ></script>
    </>
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

export default App;
