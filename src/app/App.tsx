import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoSrc from "@/imports/image.png";
import faviconSrc from "@/imports/download-removebg-preview.png";

type Page = "home" | "security" | "packages" | "privacy" | "github" | "docs";


// ─── useWindowWidth hook ──────────────────────────────────────────────────────

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

const NAV_ITEMS: { label: string; page: Page; external?: string }[] = [
  { label: "Home",            page: "home" },
  { label: "Docs",            page: "docs", external: "https://docs.terminalx.cloud" },
  { label: "Security",        page: "security" },
  { label: "Packages",        page: "packages" },
  { label: "Privacy Policy",  page: "privacy" },
  { label: "GitHub",          page: "github", external: "https://github.com/TerminalX-Offical" },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar({ activePage, onNav, onGetStarted }: { activePage: Page; onNav: (p: Page) => void; onGetStarted: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when switching to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const handleNavClick = (p: Page) => {
    setMenuOpen(false);
    onNav(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center"
      style={{ padding: scrolled ? "12px 32px" : "20px 32px", transition: "padding 0.4s ease" }}
    >
      {/* Pill nav bar */}
      <nav
        style={{
          background: scrolled ? "rgba(0,0,0,0.92)" : "rgba(0,0,0,0.85)",
          backdropFilter: scrolled ? "blur(40px) saturate(180%)" : "blur(28px) saturate(160%)",
          WebkitBackdropFilter: scrolled ? "blur(40px) saturate(180%)" : "blur(28px) saturate(160%)",
          border: scrolled
            ? "1px solid rgba(255,255,255,0.28)"
            : "1px solid rgba(255,255,255,0.18)",
          borderRadius: "9999px",
          boxShadow: scrolled
            ? "0 0 0 1px rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.8), 0 0 60px rgba(255,255,255,0.04)"
            : "0 0 0 1px rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.5)",
          transition: "all 0.4s ease",
          width: scrolled ? "min(960px, 96vw)" : "min(1120px, 96vw)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: scrolled ? "16px 40px" : "22px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo — always goes home */}
          <button
            onClick={() => handleNavClick("home")}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
          >
            <ImageWithFallback
              src={logoSrc}
              alt="TerminalX logo"
              style={{
                width: scrolled ? 34 : 42,
                height: scrolled ? 34 : 42,
                objectFit: "contain",
                transition: "width 0.4s ease, height 0.4s ease",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: scrolled ? "14px" : "17px",
                letterSpacing: "0.12em",
                color: "#ffffff",
                textTransform: "uppercase",
                transition: "font-size 0.4s ease",
              }}
            >
              TerminalX
            </span>
          </button>

          {/* Nav links — desktop only */}
          {!isMobile && (
            <ul
              style={{ gap: scrolled ? "32px" : "40px", transition: "gap 0.4s ease", listStyle: "none", margin: 0, padding: 0, display: "flex", alignItems: "center" }}
            >
              {NAV_ITEMS.map(({ label, page, external }) => {
                const isActive = activePage === page;
                return (
                  <li key={page}>
                    {external ? (
                      <a
                        href={external}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: isActive ? 600 : 400,
                          fontSize: scrolled ? "12px" : "13px",
                          letterSpacing: "0.08em",
                          color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                          position: "relative",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = isActive ? "#ffffff" : "rgba(255,255,255,0.55)")}
                      >
                        {label}
                      </a>
                    ) : (
                      <button
                        onClick={() => { onNav(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: isActive ? 600 : 400,
                          fontSize: scrolled ? "12px" : "13px",
                          letterSpacing: "0.08em",
                          color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                          position: "relative",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = isActive ? "#ffffff" : "rgba(255,255,255,0.55)")}
                      >
                        {label}
                        {isActive && (
                          <span style={{
                            position: "absolute",
                            bottom: -6,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            background: "#ffffff",
                            display: "block",
                          }} />
                        )}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {/* Right side: GET STARTED (desktop) or hamburger (mobile) */}
          {isMobile ? (
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{ background: "none", border: "none", padding: 4, cursor: "pointer", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          ) : (
            <button
              onClick={onGetStarted}
              style={{
                height: scrolled ? 36 : 42,
                padding: scrolled ? "0 22px" : "0 28px",
                borderRadius: "9999px",
                background: "#ffffff",
                border: "none",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: scrolled ? "11px" : "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#000000",
                transition: "all 0.4s ease, box-shadow 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(255,255,255,0.3)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
            >
              GET STARTED
            </button>
          )}
        </div>
      </nav>

      {/* Mobile full-panel menu overlay */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            pointerEvents: menuOpen ? "auto" : "none",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "16px",
            paddingTop: "16px",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              opacity: menuOpen ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Panel */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 520,
              borderRadius: 20,
              background: "#0a0a0a",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)",
              overflow: "hidden",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0) scale(1)" : "translateY(-12px) scale(0.97)",
              transition: "opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {/* Panel header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                onClick={() => handleNavClick("home")}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em" }}>
                  {">"}<span style={{ color: "rgba(255,255,255,0.5)", margin: "0 2px" }}>_</span>
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 15, letterSpacing: "0.12em", color: "#ffffff" }}>
                  TERMINALX
                </span>
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                style={{ background: "none", border: "none", padding: 4, cursor: "pointer", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center" }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav items */}
            <div style={{ padding: "8px 0" }}>
              {NAV_ITEMS.map(({ label, page, external }) => {
                const isActive = activePage === page;
                return external ? (
                  <a
                    key={page}
                    href={external}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 15,
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: "0.04em",
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.65)",
                      textDecoration: "none",
                      padding: "18px 24px",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {label}
                  </a>
                ) : (
                  <button
                    key={page}
                    onClick={() => handleNavClick(page)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      padding: "18px 24px",
                      cursor: "pointer",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 15,
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: "0.04em",
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.65)",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function PhoneMockup() {
  const termLines = [
    { prompt: true,  text: "terminalx init --secure" },
    { prompt: false, text: "  ✓  session encrypted" },
    { prompt: false, text: "  ✓  env loaded [42 vars]" },
    { prompt: false, text: "  ✓  plugins attached [6]" },
    { prompt: false, text: "" },
    { prompt: true,  text: "ls -la /data/projects" },
    { prompt: false, text: "drwxr-xr-x  termx-core" },
    { prompt: false, text: "drwxr-xr-x  termx-sync" },
    { prompt: false, text: "drwxr-xr-x  termx-render" },
    { prompt: false, text: "" },
    { prompt: true,  text: "█" },
  ];

  return (
    <div style={{ position: "relative", flexShrink: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        position: "absolute",
        width: 260,
        height: 500,
        background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(40px)",
        pointerEvents: "none",
      }} />
      <div style={{
        width: 240,
        height: 500,
        borderRadius: 40,
        background: "linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 100%)",
        border: "1.5px solid rgba(255,255,255,0.18)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 48px 96px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.12)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{
          position: "absolute",
          top: 14,
          left: "50%",
          transform: "translateX(-50%)",
          width: 80,
          height: 22,
          borderRadius: 12,
          background: "#000000",
          zIndex: 10,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
        }} />
        <div style={{
          flex: 1,
          background: "#000000",
          margin: "6px 6px 6px 6px",
          borderRadius: 35,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          paddingTop: 48,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0 18px 8px", alignItems: "center" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>9:41</span>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {[3, 2.5, 2].map((h, i) => (
                <div key={i} style={{ width: 3, height: h * 3, background: "rgba(255,255,255,0.5)", borderRadius: 1 }} />
              ))}
              <div style={{ width: 14, height: 7, border: "1px solid rgba(255,255,255,0.4)", borderRadius: 2, marginLeft: 3, position: "relative" }}>
                <div style={{ position: "absolute", inset: 1, background: "rgba(255,255,255,0.5)", borderRadius: 1 }} />
              </div>
            </div>
          </div>
          <div style={{ padding: "8px 16px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em" }}>
              TERMINALX — production
            </span>
          </div>
          <div style={{ padding: "12px 16px", flex: 1, overflow: "hidden" }}>
            {termLines.map((line, i) => (
              <div key={i} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8.5,
                lineHeight: 1.9,
                color: line.prompt ? "#ffffff" : line.text.includes("✓") ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)",
                letterSpacing: "0.02em",
              }}>
                {line.prompt && <span style={{ color: "rgba(255,255,255,0.3)", marginRight: 6 }}>$</span>}
                {line.text}
              </div>
            ))}
          </div>
          <div style={{ padding: "8px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8 }}>
            {["tab", "ctrl", "esc", "↑", "↓"].map((k) => (
              <div key={k} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 7, color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "3px 6px", letterSpacing: "0.05em" }}>
                {k}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 10px" }}>
            <div style={{ width: 60, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.25)" }} />
          </div>
        </div>
        <div style={{ position: "absolute", right: -2, top: 100, width: 3, height: 60, borderRadius: "0 2px 2px 0", background: "rgba(255,255,255,0.12)" }} />
        <div style={{ position: "absolute", left: -2, top: 90, width: 3, height: 36, borderRadius: "2px 0 0 2px", background: "rgba(255,255,255,0.1)" }} />
        <div style={{ position: "absolute", left: -2, top: 138, width: 3, height: 36, borderRadius: "2px 0 0 2px", background: "rgba(255,255,255,0.1)" }} />
      </div>
    </div>
  );
}


function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth <= 1024;
  const isVerySmall = windowWidth < 480;

  const paddingSides = isMobile ? "20px" : isTablet ? "28px" : "48px";
  const paddingTop = isMobile ? "100px" : "120px";
  const paddingBottom = isMobile ? "60px" : "80px";

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: isMobile ? "column" : "row",
        padding: `${paddingTop} ${paddingSides} ${paddingBottom}`,
        maxWidth: 1200,
        margin: "0 auto",
        gap: isMobile ? 48 : 80,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 800,
            fontSize: "clamp(40px, 5.5vw, 72px)",
            lineHeight: 1.05,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: 28,
          }}
        >
          THE TERMINAL
          <br />
          <span style={{ color: "rgba(255,255,255,0.35)" }}>REIMAGINED.</span>
        </h1>

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(13px, 1.4vw, 15px)",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.5)",
            maxWidth: 460,
            marginBottom: 48,
            letterSpacing: "0.02em",
          }}
        >
          TerminalX brings a new layer of precision to command-line workflows.
          Zero latency. Full encryption. Modular by design.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button
            onClick={onGetStarted}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#000000",
              background: "#ffffff",
              border: "none",
              borderRadius: 9999,
              padding: "14px 32px",
              cursor: "pointer",
              transition: "box-shadow 0.25s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 30px rgba(255,255,255,0.35)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "none";
            }}
          >
            GET STARTED
          </button>
        </div>

        {/* Stat row */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 64,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {[
            { val: "2.4M+", label: "Sessions" },
            { val: "4ms", label: "Avg Latency" },
            { val: "99.97%", label: "Uptime" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.1em",
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Phone mockup — hidden on very small screens */}
      {!isVerySmall && <PhoneMockup />}

    </section>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    tag: "CORE",
    title: "Zero-Overhead Execution",
    body: "Commands execute at near-native speed with sub-millisecond dispatch. No wrappers, no overhead layers — just raw terminal throughput.",
    meta: "< 1ms exec time",
  },
  {
    tag: "SECURITY",
    title: "End-to-End Encryption",
    body: "Every session is encrypted in transit and at rest using AES-256-GCM. Keys rotate automatically on every new session handshake.",
    meta: "AES-256-GCM",
  },
  {
    tag: "SYNC",
    title: "Stateful Session Sync",
    body: "Your environment state — aliases, history, env vars — syncs silently across every device. Pick up exactly where you left off.",
    meta: "Real-time sync",
  },
  {
    tag: "MODULES",
    title: "Modular Plugin Layer",
    body: "Extend TerminalX with typed plugins written in TypeScript. The plugin API is stable, versioned, and formally documented.",
    meta: "300+ plugins",
  },
  {
    tag: "DISPLAY",
    title: "Adaptive Rendering",
    body: "The renderer detects output type and applies inline formatting — tables, diffs, JSON trees, and ANSI art are all first-class citizens.",
    meta: "UTF-8 native",
  },
  {
    tag: "COLLAB",
    title: "Live Pair Sessions",
    body: "Share a live terminal view with a collaborator. Both parties can type, observe, and annotate with zero configuration.",
    meta: "P2P encrypted",
  },
];

function FeatureCard({ tag, title, body, meta }: (typeof FEATURES)[0]) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        background: hovered ? "#0d0d0d" : "#080808",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)"}`,
        boxShadow: hovered
          ? "inset 0 0 40px rgba(255,255,255,0.05), 0 0 40px rgba(255,255,255,0.04)"
          : "inset 0 0 24px rgba(255,255,255,0.025)",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "all 0.3s ease",
        cursor: "default",
      }}
    >
      {/* Icon placeholder + tag */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: hovered ? "inset 0 0 16px rgba(255,255,255,0.08)" : "none",
            transition: "box-shadow 0.3s ease",
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 9999,
            padding: "4px 10px",
          }}
        >
          {tag}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16,
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.75,
          margin: 0,
          letterSpacing: "0.01em",
        }}
      >
        {body}
      </p>

      <div
        style={{
          marginTop: "auto",
          paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.07)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.1em",
        }}
      >
        {meta}
      </div>
    </div>
  );
}

function FeaturesSection() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth <= 1024;
  const paddingSides = isMobile ? "20px" : isTablet ? "28px" : "48px";

  return (
    <section
      style={{
        padding: `100px ${paddingSides}`,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: 64 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.35)",
            marginBottom: 16,
          }}
        >
          // CAPABILITIES
        </div>
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 800,
            fontSize: "clamp(30px, 3.5vw, 48px)",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Built for precision.
          <br />
          <span style={{ color: "rgba(255,255,255,0.3)" }}>Designed for scale.</span>
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {FEATURES.map((f) => (
          <FeatureCard key={f.tag} {...f} />
        ))}
      </div>
    </section>
  );
}

// ─── Terminal Preview ─────────────────────────────────────────────────────────

function TerminalPreview() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth <= 1024;
  const paddingSides = isMobile ? "20px" : isTablet ? "28px" : "48px";

  const lines = [
    { prompt: true, text: "terminalx init --secure --env=production" },
    { prompt: false, text: "  ✓  session encrypted  [AES-256-GCM]" },
    { prompt: false, text: "  ✓  environment loaded [42 variables]" },
    { prompt: false, text: "  ✓  plugins attached   [6 active]" },
    { prompt: false, text: "" },
    { prompt: true, text: "terminalx run deploy --pipeline=main" },
    { prompt: false, text: "  ▶  building artifacts…" },
    { prompt: false, text: "  ▶  running 47 checks…" },
    { prompt: false, text: "  ✓  pipeline complete  [1.24s]" },
    { prompt: false, text: "" },
    { prompt: true, text: "█" },
  ];

  return (
    <section
      style={{
        padding: `0 ${paddingSides} 100px`,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          borderRadius: 24,
          background: "#050505",
          border: "1px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.6), inset 0 0 60px rgba(255,255,255,0.02)",
        }}
      >
        {/* Window bar */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          ))}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.25)",
              marginLeft: 12,
              letterSpacing: "0.08em",
            }}
          >
            terminalx — production
          </span>
        </div>

        {/* Terminal body */}
        <div style={{ padding: "28px 32px" }}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                lineHeight: 1.9,
                color: line.prompt
                  ? "#ffffff"
                  : line.text.includes("✓")
                  ? "rgba(255,255,255,0.65)"
                  : "rgba(255,255,255,0.4)",
                letterSpacing: "0.02em",
              }}
            >
              {line.prompt && (
                <span style={{ color: "rgba(255,255,255,0.3)", marginRight: 10 }}>$</span>
              )}
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Download ────────────────────────────────────────────────────────────────

function DownloadSection() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth <= 1024;
  const paddingSides = isMobile ? "20px" : isTablet ? "28px" : "48px";

  const platforms = [
    { label: "GET IT ON PLAY STORE", sub: "Android 10+", href: "https://play.google.com/store/apps/details?id=app.terminalx.mobile" },
    { label: "DOWNLOAD FROM GITHUB", sub: "Source & release builds", href: "https://github.com/TerminalX-Offical/TerminalX-App-Download/releases/tag/Release" },
    { label: "DOWNLOAD FROM QUICKFILE", sub: "Mirror · Fast CDN", href: "https://terminalxapk-quickfile-v3.base44.app" },
  ];

  return (
    <section
      id="install"
      style={{
        padding: `100px ${paddingSides}`,
        maxWidth: 1200,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.35)",
          marginBottom: 16,
        }}
      >
        // INSTALL
      </div>
      <h2
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 800,
          fontSize: "clamp(28px, 3.5vw, 48px)",
          color: "#ffffff",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          marginBottom: 16,
        }}
      >
        Start in under 60 seconds.
      </h2>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          color: "rgba(255,255,255,0.4)",
          marginBottom: 56,
          letterSpacing: "0.02em",
          lineHeight: 1.7,
        }}
      >
        Available on all major platforms. No telemetry. No account required for local sessions.
      </p>

      <div
        style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {platforms.map((p, i) => (
          <DownloadButton key={i} label={p.label} sub={p.sub} primary={i === 0} href={p.href} />
        ))}
      </div>

      <button
        onClick={() => window.open("https://terminal-x-install.vercel.app", "_blank", "noopener,noreferrer")}
        style={{
          marginTop: 28,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.7)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 9999,
          padding: "12px 28px",
          cursor: "pointer",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)";
          (e.currentTarget as HTMLElement).style.color = "#ffffff";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.28)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
        }}
      >
        View Installation Guide
      </button>

    </section>
  );
}

function ViewPackagesButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      onClick={() => setClicked(true)}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.12em",
        color: clicked ? "rgba(255,255,255,0.7)" : "#000000",
        background: clicked ? "rgba(255,255,255,0.06)" : "#ffffff",
        border: clicked ? "1px solid rgba(255,255,255,0.18)" : "none",
        borderRadius: 9999,
        padding: "14px 32px",
        cursor: clicked ? "default" : "pointer",
        transition: "all 0.3s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (clicked) return;
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(255,255,255,0.35)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "none";
      }}
    >
      {clicked ? "PACKAGES NOT AVAILABLE TO PUBLIC" : "VIEW PACKAGES"}
    </button>
  );
}

function DownloadButton({ label, sub, primary, href }: { label: string; sub: string; primary: boolean; href?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => href && window.open(href, "_blank", "noopener,noreferrer")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4,
        borderRadius: 22,
        padding: "18px 32px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        border: primary
          ? "1px solid rgba(255,255,255,0.9)"
          : "1px solid rgba(255,255,255,0.18)",
        background: primary
          ? hovered
            ? "#f0f0f0"
            : "#ffffff"
          : hovered
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.02)",
        boxShadow: hovered
          ? primary
            ? "0 0 40px rgba(255,255,255,0.3)"
            : "0 0 24px rgba(255,255,255,0.06), inset 0 0 20px rgba(255,255,255,0.04)"
          : primary
          ? "0 0 20px rgba(255,255,255,0.1)"
          : "none",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: primary ? "#000000" : "rgba(255,255,255,0.85)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.1em",
          color: primary ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.3)",
          fontWeight: 400,
        }}
      >
        {sub}
      </span>
    </button>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth <= 1024;
  const paddingSides = isMobile ? "20px" : isTablet ? "28px" : "48px";

  const cols = [
    { label: "PRODUCT",    links: ["Features", "Changelog", "Roadmap", "Pricing"] },
    { label: "DEVELOPERS", links: ["Docs", "API Reference", "Plugin SDK", "GitHub"] },
    { label: "COMPANY",    links: ["About", "Blog", "Careers", "Contact"] },
  ];

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: `64px ${paddingSides} 48px`,
        }}
      >
        {/* Main row */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 48,
            marginBottom: 64,
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 180 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 18,
                fontWeight: 700,
                color: "rgba(255,255,255,0.9)",
                letterSpacing: "-0.02em",
              }}>
                {">"}<span style={{ color: "rgba(255,255,255,0.5)", margin: "0 2px" }}>_</span>
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.14em",
                color: "#ffffff",
              }}>
                TERMINALX
              </span>
            </div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              lineHeight: 1.8,
              maxWidth: 200,
              letterSpacing: "0.02em",
              margin: 0,
            }}>
              The precision terminal for developers who care about performance.
            </p>
          </div>

          {/* Link columns */}
          <div style={{ display: "flex", gap: isMobile ? 40 : 80, flexWrap: "wrap" }}>
            {cols.map((col) => (
              <div key={col.label} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.3)",
                }}>
                  {col.label}
                </span>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ffffff")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.06em",
          }}>
            © 2026 TerminalX. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 28 }}>
            {["Privacy", "Terms", "Security"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.2)",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.55)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.2)")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Inner pages ─────────────────────────────────────────────────────────────

function PageShell({ tag, title, children }: { tag: string; title: string; children: React.ReactNode }) {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "120px 20px 60px" : "160px 48px 100px" }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
        // {tag}
      </div>
      <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: "clamp(32px, 4vw, 56px)", color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 48 }}>
        {title}
      </h1>
      {children}
    </div>
  );
}

function SecurityPage() {
  const items = [
    { heading: "End-to-End Encryption", body: "All sessions are encrypted using AES-256-GCM. Keys are derived per-session via X25519 Diffie-Hellman and rotated on every handshake. No session key is ever stored on disk or transmitted to TerminalX servers." },
    { heading: "Zero-Knowledge Architecture", body: "TerminalX cannot read your terminal output. Data is encrypted client-side before leaving your device. Our infrastructure handles only ciphertext — we have no ability to decrypt it." },
    { heading: "Responsible Disclosure", body: "Found a vulnerability? We operate a responsible disclosure programme. Security reports should be sent to security@terminalx.sh with a PGP-encrypted message. We aim to respond within 48 hours and to patch critical issues within 7 days." },
    { heading: "Audit Log", body: "Every session initiation, key rotation, and plugin load is recorded in a tamper-evident audit log stored locally on your device. Logs are signed with your device key and can be exported for compliance purposes." },
    { heading: "Supply Chain Integrity", body: "All release binaries are reproducibly built, signed with cosign, and attested via SLSA level 3. Checksums are published to a transparency log. You can verify any release independently using our published build scripts." },
  ];
  return (
    <PageShell tag="SECURITY" title={"Security & Trust."}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((item, i) => (
          <div key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "28px 0" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 700, color: "#ffffff", marginBottom: 12, letterSpacing: "-0.01em" }}>
              {item.heading}
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: 0, letterSpacing: "0.02em" }}>
              {item.body}
            </p>
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
      </div>
    </PageShell>
  );
}

function PackagesPage() {
  const pkgs = [
    { name: "terminalx-core", version: "2.4.0", desc: "Core runtime and session manager. Required by all other packages.", size: "3.2 MB" },
    { name: "terminalx-sync", version: "2.4.0", desc: "Real-time cross-device state synchronisation via end-to-end encrypted relay.", size: "1.1 MB" },
    { name: "terminalx-collab", version: "2.3.1", desc: "Live pair session streaming with P2P WebRTC transport.", size: "890 KB" },
    { name: "terminalx-render", version: "2.4.0", desc: "Adaptive output renderer: tables, diffs, JSON trees, ANSI art.", size: "2.4 MB" },
    { name: "terminalx-plugins", version: "2.4.0", desc: "Plugin loader and TypeScript SDK for building first-party extensions.", size: "640 KB" },
    { name: "terminalx-audit", version: "2.2.0", desc: "Tamper-evident local audit log with cosign verification.", size: "420 KB" },
  ];
  return (
    <PageShell tag="PACKAGES" title={"Available packages."}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 16 }}>
        {pkgs.map((pkg) => (
          <div key={pkg.name} style={{ borderRadius: 16, background: "#080808", border: "1px solid rgba(255,255,255,0.1)", padding: "24px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: "#ffffff", letterSpacing: "0.02em" }}>{pkg.name}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, padding: "3px 9px", letterSpacing: "0.1em" }}>v{pkg.version}</span>
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0 }}>{pkg.desc}</p>
            <div style={{ marginTop: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>{pkg.size}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>
        Install any package:{" "}
        <code style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "2px 8px", color: "rgba(255,255,255,0.55)" }}>
          terminalx install &lt;package-name&gt;
        </code>
      </div>

      {/* Download APK */}
      <div style={{ marginTop: 64, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 48 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>
          // DOWNLOAD APK
        </div>
        <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: "clamp(22px, 3vw, 36px)", color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 12 }}>
          Get the Android app.
        </h2>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 36, letterSpacing: "0.02em", maxWidth: 480 }}>
          Download the TerminalX APK directly from GitHub or QuickFile. No account required.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            { label: "DOWNLOAD FROM GITHUB", sub: "Source & release builds", primary: true, href: "https://github.com/TerminalX-Offical/TerminalX-App-Download/releases/tag/Release" },
            { label: "DOWNLOAD FROM QUICKFILE", sub: "Mirror · Fast CDN", primary: false, href: "https://terminalxapk-quickfile-v3.base44.app" },
          ].map((btn) => (
            <DownloadButton key={btn.label} label={btn.label} sub={btn.sub} primary={btn.primary} href={btn.href} />
          ))}
        </div>
        <button
          onClick={() => window.open("https://terminal-x-install.vercel.app", "_blank", "noopener,noreferrer")}
          style={{
            marginTop: 20,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.7)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 9999,
            padding: "12px 24px",
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)";
            (e.currentTarget as HTMLElement).style.color = "#ffffff";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.28)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
          }}
        >
          How to install TerminalX
        </button>
      </div>

      {/* View Packages Data */}
      <div style={{ marginTop: 64, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 48 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>
          // PACKAGES DATA
        </div>
        <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: "clamp(22px, 3vw, 36px)", color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 12 }}>
          View TerminalX Packages Data
        </h2>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginBottom: 36, letterSpacing: "0.02em", maxWidth: 480 }}>
          Browse the full TerminalX package registry — versions, changelogs, and metadata for every published package.
        </p>
        <ViewPackagesButton />
      </div>
    </PageShell>
  );
}

function DocsPage() {
  const sections = [
    {
      tag: "GETTING STARTED",
      title: "Installation",
      body: "Download the TerminalX APK from GitHub or the Play Store. Sideload via ADB or install directly from the Play Store listing. No account is required for local sessions.",
      code: "adb install terminalx.apk",
    },
    {
      tag: "CONFIGURATION",
      title: "Init & Environment",
      body: "Run the init command to bootstrap a new session. TerminalX will auto-detect your shell, load environment variables, and attach any installed plugins.",
      code: "terminalx init --secure --env=production",
    },
    {
      tag: "PLUGINS",
      title: "Installing Plugins",
      body: "The plugin registry lists all verified TypeScript plugins. Install any plugin by name — it is sandboxed, versioned, and can be audited via the built-in plugin inspector.",
      code: "terminalx install terminalx-collab",
    },
    {
      tag: "SYNC",
      title: "Cross-Device Sync",
      body: "Enable stateful sync to carry your aliases, history, and environment variables across every device. Sync data is end-to-end encrypted and never touches TerminalX servers in plaintext.",
      code: "terminalx sync enable --key=<your-key>",
    },
    {
      tag: "SECURITY",
      title: "Key Management",
      body: "Session keys rotate automatically on every handshake. You can inspect active key fingerprints, force a rotation, or revoke a device's access at any time.",
      code: "terminalx keys list\nterminalx keys rotate",
    },
    {
      tag: "COLLAB",
      title: "Pair Sessions",
      body: "Share a live terminal view with a collaborator over an encrypted P2P WebRTC channel. No server relay is involved — the connection is direct and auditable.",
      code: "terminalx collab start --invite",
    },
  ];

  return (
    <PageShell tag="DOCS" title={"Documentation."}>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 56, letterSpacing: "0.02em", maxWidth: 560 }}>
        Everything you need to install, configure, and extend TerminalX. For the full installation walkthrough, visit{" "}
        <a
          href="https://terminal-x-install.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "rgba(255,255,255,0.7)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          terminal-x-install.vercel.app
        </a>.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sections.map((s, i) => (
          <div key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "32px 0" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", color: "rgba(255,255,255,0.28)", marginBottom: 10 }}>
              // {s.tag}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 700, color: "#ffffff", marginBottom: 12, letterSpacing: "-0.01em" }}>
              {s.title}
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: "0 0 20px", letterSpacing: "0.02em" }}>
              {s.body}
            </p>
            <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, padding: "14px 18px", margin: 0, overflowX: "auto", letterSpacing: "0.02em", lineHeight: 1.7 }}>
              {s.code}
            </pre>
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
      </div>
    </PageShell>
  );
}

function PrivacyPage() {
  const sections = [
    { title: "What we collect", body: "TerminalX collects only the information required to deliver the service: your email address for account creation, a device identifier for session routing, and aggregate crash reports if you opt in. We do not collect terminal output, command history, or any content you type." },
    { title: "How we use it", body: "Your email is used only for account authentication and critical security notifications. Your device identifier is used to route encrypted session data. Aggregate crash reports are used to improve stability. We do not sell, license, or share personal data with third parties for advertising." },
    { title: "Data retention", body: "Account data is retained for the duration of your subscription plus 30 days. Crash reports are retained for 90 days and then permanently deleted. You can request deletion of your account data at any time by emailing privacy@terminalx.sh." },
    { title: "Third-party services", body: "We use Stripe for payment processing and AWS for infrastructure. Neither service has access to your terminal data. Stripe processes payment information under their own privacy policy. AWS stores only encrypted ciphertext on our behalf." },
    { title: "Your rights", body: "You have the right to access, correct, or delete your personal data. You can export a copy of your account data from the settings panel at any time. Requests to exercise your rights are responded to within 30 days." },
    { title: "Contact", body: "Privacy questions and data subject requests should be directed to privacy@terminalx.sh. For security issues, use security@terminalx.sh. This policy was last updated 1 July 2026." },
  ];
  return (
    <PageShell tag="LEGAL" title={"Privacy Policy."}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sections.map((s, i) => (
          <div key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "28px 0" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: "#ffffff", marginBottom: 12 }}>{s.title}</div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: 0, letterSpacing: "0.02em" }}>{s.body}</p>
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
      </div>
    </PageShell>
  );
}

// ─── Background decorations ───────────────────────────────────────────────────

function Background() {
  return (
    <>
      <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div aria-hidden style={{ position: "fixed", top: "-30vh", left: "50%", transform: "translateX(-50%)", width: "80vw", height: "80vh", background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = faviconSrc;
  }, []);

  const handleNav = (p: Page) => {
    if (p === "github") {
      window.open("https://github.com/TerminalX-Offical", "_blank", "noopener,noreferrer");
      return;
    }
    setPage(p);
  };

  const handleGetStarted = () => {
    if (page !== "home") {
      setPage("home");
      setTimeout(() => {
        document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ background: "#000000", minHeight: "100vh", fontFamily: "'JetBrains Mono', monospace", overflowX: "hidden" }}>
      <Background />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar activePage={page} onNav={handleNav} onGetStarted={handleGetStarted} />
        {page === "home" && (
          <>
            <HeroSection onGetStarted={handleGetStarted} />
            <FeaturesSection />
            <TerminalPreview />
            <DownloadSection />
            <Footer />
          </>
        )}
        {page === "docs"      && <><DocsPage /><Footer /></>}
        {page === "security"  && <><SecurityPage /><Footer /></>}
        {page === "packages"  && <><PackagesPage /><Footer /></>}
        {page === "privacy"   && <><PrivacyPage /><Footer /></>}
      </div>
    </div>
  );
}
