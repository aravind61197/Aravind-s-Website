"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    number: "01",
    title: "Tax One",
    eyebrow: "AI + Enterprise finance",
    description: "An end-to-end tax ecosystem that turns high-stakes compliance across 10K+ stores into one clear, auditable flow.",
    impact: "30% faster cycles",
    accent: "tax",
    tags: ["UX strategy", "AI workflows", "Design system"],
  },
  {
    number: "02",
    title: "Vision.AI",
    eyebrow: "Conversational research",
    description: "An AI-powered survey experience designed to make feedback feel human for customers and associates.",
    impact: "+12–15% response",
    accent: "vision",
    tags: ["Human–AI interaction", "Research", "CX"],
  },
  {
    number: "03",
    title: "Finance Forecasting",
    eyebrow: "Decision intelligence",
    description: "A redesigned planning platform that turns complex financial signals into confident, faster decisions.",
    impact: "Faster decisions",
    accent: "finance",
    tags: ["Data visualization", "Enterprise UX", "Systems thinking"],
  },
  {
    number: "04",
    title: "Approval Hub",
    eyebrow: "Workflow orchestration",
    description: "One transparent home for multi-level approvals, built around visibility, momentum and stakeholder trust.",
    impact: "Less workflow friction",
    accent: "approval",
    tags: ["Discovery", "Interaction design", "Prototyping"],
  },
];

const metrics = [
  { value: 5, suffix: "+", label: "years shaping products" },
  { value: 18, suffix: "+", label: "products designed" },
  { value: 30, suffix: "K+", label: "people enabled" },
  { value: 3, suffix: "×", label: "design awards" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const started = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - started) / 1100, 1);
        setCount(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: .4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const [dark, setDark] = useState(() => typeof window !== "undefined" && (localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)));
  const [menu, setMenu] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setProgress(window.scrollY / Math.max(document.body.scrollHeight - innerHeight, 1));
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("in")), { threshold: .12 });
    nodes.forEach(n => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <div className="scroll-line" style={{ transform: `scaleX(${progress})` }} />
      <nav className="nav glass">
        <a className="monogram" href="#top" aria-label="Aravind home">AV<span>.</span></a>
        <div className={`nav-links ${menu ? "open" : ""}`}>
          <a href="#about" onClick={() => setMenu(false)}>About</a>
          <a href="#work" onClick={() => setMenu(false)}>Work</a>
          <a href="#contact" onClick={() => setMenu(false)}>Contact</a>
        </div>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => setDark(v => !v)} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>
            <span className="toggle-orbit">{dark ? "☾" : "☼"}</span>
          </button>
          <button className="menu-button" onClick={() => setMenu(v => !v)} aria-label="Toggle menu">{menu ? "×" : "≡"}</button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="availability"><span /> Bengaluru, India · open to brave ideas</div>
          <p className="kicker scribble">Hello, I’m Aravind V.</p>
          <h1>I make complex<br />products feel <em>obvious.</em></h1>
          <p className="hero-lede">Product-focused UX designer building intelligent, enterprise-scale experiences with curiosity, clarity and a little bit of mischief.</p>
          <div className="hero-actions">
            <a className="button primary" href="#work">See my work <span>↘</span></a>
            <a className="button text-button" href="mailto:aravind61197@gmail.com">Let’s talk <span>→</span></a>
          </div>
          <div className="tiny-proof"><span className="avatar-stack">✦</span> Designing at Walmart · since 2022</div>
        </div>
        <div className="hero-art" aria-label="Pencil illustration of Aravind designing digital products">
          <Image src="/aravind-sketch-hero.png" width={1536} height={1024} priority alt="Hand-drawn designer sketching an enterprise product surrounded by interfaces and AI ideas" />
          <div className="float-note note-one">systems, not screens <b>↗</b></div>
          <div className="float-note note-two">human + AI <b>✦</b></div>
        </div>
        <div className="scroll-cue">scroll to explore <i>↓</i></div>
      </section>

      <section className="marquee" aria-label="Areas of expertise"><div>
        <span>PRODUCT DESIGN</span><b>✦</b><span>ENTERPRISE UX</span><b>✦</b><span>AI EXPERIENCES</span><b>✦</b><span>DESIGN STRATEGY</span><b>✦</b>
        <span>PRODUCT DESIGN</span><b>✦</b><span>ENTERPRISE UX</span><b>✦</b><span>AI EXPERIENCES</span><b>✦</b><span>DESIGN STRATEGY</span><b>✦</b>
      </div></section>

      <section className="about section" id="about">
        <div className="section-label reveal"><span>01</span> / ABOUT ME</div>
        <div className="about-grid">
          <div className="about-title reveal">
            <p className="hand-note">A designer who asks “why?”<br />one more time.</p>
            <h2>Strategy in my head.<br /><i>People</i> at heart.</h2>
          </div>
          <div className="about-copy reveal">
            <p className="large-copy">For 5+ years, I’ve turned tangled workflows into experiences people can trust—from tax compliance across 10,000+ stores to AI surveys that actually invite a response.</p>
            <p>I move comfortably between research rooms, stakeholder conversations, system maps and high-fidelity details. The goal is always the same: make the hard thing useful, scalable and beautifully clear.</p>
            <div className="tool-row"><span>Figma</span><span>Sketch</span><span>Miro</span><span>Claude</span><span>Codex</span></div>
          </div>
        </div>
        <div className="metrics">
          {metrics.map((m, i) => <div className="metric reveal" key={m.label} style={{ transitionDelay: `${i * 80}ms` }}>
            <strong><Counter value={m.value} suffix={m.suffix} /></strong><p>{m.label}</p>
          </div>)}
        </div>
      </section>

      <section className="work section" id="work">
        <div className="section-heading reveal">
          <div className="section-label"><span>02</span> / SELECTED WORK</div>
          <h2>Big systems.<br /><i>Human</i> outcomes.</h2>
          <p>Selected work across AI, finance, learning and operational platforms.</p>
        </div>
        <div className="projects">
          {projects.map((project, i) => <article className={`project-card ${project.accent} reveal`} key={project.title} style={{ transitionDelay: `${i * 70}ms` }}>
            <div className="project-top"><span>{project.number}</span><span className="project-arrow">↗</span></div>
            <div className="project-visual" aria-hidden="true">
              <div className="mock-window"><div className="mock-bar"><i/><i/><i/></div><div className="mock-content"><b/><span/><span/><span/></div></div>
              <div className="impact-sticker">{project.impact}</div>
              <div className="pencil-circle" />
            </div>
            <div className="project-content"><p className="eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div></div>
          </article>)}
        </div>
      </section>

      <section className="process section">
        <div className="section-label reveal"><span>03</span> / HOW I THINK</div>
        <div className="process-grid">
          <h2 className="reveal">Clarity is a<br /><i>team sport.</i></h2>
          <div className="steps">
            {[['Listen for the real problem','Research, context and candid conversations before pixels.'],['Make the system visible','Map the moving parts until everyone can see the same problem.'],['Prototype the decision','Use design to create alignment, learn fast and de-risk.'],['Ship, measure, sharpen','Stay close to outcomes and let real behavior improve the work.']].map((s,i)=><div className="step reveal" key={s[0]}><b>0{i+1}</b><div><h3>{s[0]}</h3><p>{s[1]}</p></div><span>→</span></div>)}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-mark">“</div>
        <blockquote className="reveal">Aravind went above and beyond. His dedication and attention to detail were flawless—he is a phenomenal designer.</blockquote>
        <p>Vishal Bansal <span>Senior Director, Engineering</span></p>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-doodle">✦<span>↘</span></div>
        <p className="section-label"><span>04</span> / SAY HELLO</p>
        <h2>Have a knotty problem?<br /><i>Let’s untangle it.</i></h2>
        <p className="contact-copy">I’m always happy to talk about ambitious products, thoughtful teams, or why the best sticky notes are orange.</p>
        <a className="email-link" href="mailto:aravind61197@gmail.com">aravind61197@gmail.com <span>↗</span></a>
        <div className="contact-bottom"><p>Based in Bengaluru · working globally</p><div><a href="https://linkedin.com/in/aravind611/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="/Aravind-V-Resume.pdf" target="_blank">Résumé ↗</a></div></div>
      </section>

      <footer><span>© 2026 Aravind V</span><span>Designed with curiosity &amp; caffeine ☕</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
