"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    number: "01",
    title: "Tax One",
    eyebrow: "AI + Enterprise finance",
    description: "An end-to-end tax ecosystem that turns high-stakes compliance across 10K+ stores into one clear, auditable flow.",
    impact: "30% faster cycles",
    image: "/project-tax-one.png",
    link: "https://drive.google.com/file/d/1Pe0L85NN0Q0DUt8SKb8gVsWiDnl0dk4w/view",
    accent: "tax",
    tags: ["UX strategy", "AI workflows", "Design system"],
  },
  {
    number: "02",
    title: "Vision.AI",
    eyebrow: "Conversational research",
    description: "An AI-powered survey experience designed to make feedback feel human for customers and associates.",
    impact: "+12–15% response",
    image: "/project-vision-ai.png",
    link: "https://drive.google.com/file/d/1upFqFJy3i4A1bNs1-A_HhCo3xoQpZTpt/view",
    accent: "vision",
    tags: ["Human–AI interaction", "Research", "CX"],
  },
  {
    number: "03",
    title: "Finance Forecasting",
    eyebrow: "Decision intelligence",
    description: "A redesigned planning platform that turns complex financial signals into confident, faster decisions.",
    impact: "Faster decisions",
    image: "/project-finance-forecasting.png",
    link: "https://drive.google.com/file/d/1lLB5VIAWwR391aBaEB6wo0YWgHKEjzvn/view",
    accent: "finance",
    tags: ["Data visualization", "Enterprise UX", "Systems thinking"],
  },
  {
    number: "04",
    title: "Audit Management Hub",
    eyebrow: "Audit orchestration",
    description: "A unified command centre for planning audits, tracking evidence, managing findings and keeping every stakeholder aligned.",
    impact: "Clearer audit control",
    image: "/project-approval-hub.png",
    link: "https://drive.google.com/file/d/1MYAZlFZuTquzu3zonf3cMv63XZDE2KzV/view",
    accent: "approval",
    tags: ["Enterprise UX", "Workflow design", "Data visibility"],
  },
  {
    number: "05",
    title: "Agent Accelerator",
    eyebrow: "AI support experience",
    description: "Guided workflows and intelligent assistance that help agents resolve associate and customer questions with confidence.",
    impact: "Smarter resolution",
    image: "/project-agent-accelerator.png",
    accent: "agent",
    tags: ["Conversational UX", "AI products", "Service design"],
  },
  {
    number: "06",
    title: "Global Training",
    eyebrow: "Learning at scale",
    description: "A unified learning and skills platform helping technology associates across the globe own their growth.",
    impact: "25K+ associates",
    image: "/project-global-training.png",
    accent: "learning",
    tags: ["Product design", "Learning UX", "Data visualization"],
  },
];

const testimonials = [
  { quote: "Aravind went above and beyond. His dedication and attention to detail were flawless—he is a phenomenal designer.", name: "Vishal Bansal", role: "Senior Director, Engineering" },
  { quote: "The trust and confidence Aravind has established is clear in how stakeholders reach out to him directly for their next engagements.", name: "Srinivasan Gopalakrishnan", role: "Senior Manager, Design" },
  { quote: "His dedication, hard work and passion for design truly made a difference. Aravind helped make Design Fest a real success.", name: "Ramesh Kozhiserry", role: "Group Director, Design" },
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
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [progress, setProgress] = useState(0);
  const [testimonial, setTestimonial] = useState(0);
  const [lockedProject, setLockedProject] = useState<{title:string;link:string}|null>(null);
  const [casePassword, setCasePassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const heroArtRef = useRef<HTMLDivElement>(null);
  const journeyRoadRef = useRef<HTMLDivElement>(null);
  const journeyCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (!lockedProject) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setLockedProject(null);
    document.body.classList.add("modal-open");
    addEventListener("keydown", close);
    return () => { document.body.classList.remove("modal-open"); removeEventListener("keydown", close); };
  }, [lockedProject]);

  const openProtectedProject = (title: string, link: string) => {
    setCasePassword("");
    setPasswordError(false);
    setUnlocking(false);
    setLockedProject({ title, link });
  };

  const unlockProject = (event: React.FormEvent) => {
    event.preventDefault();
    if (!lockedProject) return;
    if (casePassword === "Aravind@611") {
      const destination = lockedProject.link;
      setPasswordError(false);
      setUnlocking(true);
      window.setTimeout(() => {
        window.location.assign(destination);
      }, 1300);
    } else {
      setPasswordError(true);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setProgress(window.scrollY / Math.max(document.body.scrollHeight - innerHeight, 1));
      const art = heroArtRef.current;
      if (art && window.scrollY < innerHeight * 1.25) art.style.setProperty("--parallax", `${window.scrollY * .24}px`);
    };
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

  useEffect(() => {
    const road = journeyRoadRef.current;
    if (!road) return;
    const drive = () => {
      const rect = road.getBoundingClientRect();
      const travel = Math.max(rect.height - innerHeight * .62, 1);
      const p = Math.max(0, Math.min(1, (innerHeight * .48 - rect.top) / travel));
      road.style.setProperty("--car-y", `${p * Math.max(road.clientHeight - 150, 0)}px`);
      const bend = window.innerWidth <= 560 ? 18 : window.innerWidth <= 900 ? 28 : Math.min(118, road.clientWidth * .1);
      const curveX = Math.sin(p * Math.PI * 4) * bend;
      road.style.setProperty("--car-x", `${curveX}px`);
      road.style.setProperty("--car-tilt", `${curveX * .045}deg`);
      road.style.setProperty("--road-fill", `${p * 100}%`);
    };
    drive();
    addEventListener("scroll", drive, { passive: true });
    addEventListener("resize", drive);
    return () => { removeEventListener("scroll", drive); removeEventListener("resize", drive); };
  }, []);

  useEffect(() => {
    const road = journeyRoadRef.current;
    const canvas = journeyCanvasRef.current;
    if (!road || !canvas) return;
    const drawRoad = () => {
      const width = road.clientWidth;
      const height = road.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(ratio, ratio);
      const bend = window.innerWidth <= 560 ? 18 : window.innerWidth <= 900 ? 28 : Math.min(118, width * .1);
      const center = window.innerWidth <= 560 ? 30 : window.innerWidth <= 900 ? 48 : width / 2;
      const trace = () => {
        ctx.beginPath();
        for (let y = 30; y <= height - 100; y += 6) {
          const t = (y - 30) / Math.max(height - 130, 1);
          const x = center + Math.sin(t * Math.PI * 4) * bend;
          if (y === 30) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
      };
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      trace(); ctx.strokeStyle = dark ? "rgba(255,255,255,.18)" : "rgba(34,29,23,.28)"; ctx.lineWidth = 108; ctx.stroke();
      trace(); ctx.strokeStyle = dark ? "#3c3a35" : "#68655e"; ctx.lineWidth = 98; ctx.stroke();
      trace(); ctx.strokeStyle = dark ? "rgba(255,255,255,.055)" : "rgba(255,255,255,.13)"; ctx.lineWidth = 76; ctx.stroke();
      ctx.setLineDash([25, 25]);
      trace(); ctx.strokeStyle = dark ? "#d8d1c4" : "#f5f1e8"; ctx.lineWidth = 4; ctx.stroke();
      ctx.setLineDash([]);
    };
    drawRoad();
    const observer = new ResizeObserver(drawRoad);
    observer.observe(road);
    return () => observer.disconnect();
  }, [dark]);

  return (
    <main>
      <div className="scroll-line" style={{ transform: `scaleX(${progress})` }} />
      <nav className="nav glass">
        <a className="monogram" href="#top" aria-label="Aravind’s portfolio home">Aravind’s <span>Portfolio</span></a>
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
          </div>
          <div className="tiny-proof"><span className="avatar-stack">✦</span> Designing at Walmart · since 2022</div>
        </div>
        <div className="hero-art" ref={heroArtRef} aria-label="Pencil illustration of Aravind designing digital products">
          <div className="ux-wireframe wire-one" aria-hidden="true"><b/><i/><i/><i/></div>
          <div className="ux-wireframe wire-two" aria-hidden="true"><b/><i/><i/></div>
          <img className="hero-portrait-main" src="/aravind-cursor-sketch.png" alt="Hand-drawn pencil portrait of Aravind" />
          <img className="hero-photo-dark" src="/aravind-portrait-photo.png" alt="Portrait of Aravind" />
          <div className="ux-glass-card ux-card-research"><b>◎</b><span>User research<small>listen · learn</small></span></div>
          <div className="ux-glass-card ux-card-flow"><b>⌁</b><span>User flows<small>map the system</small></span></div>
          <div className="ux-glass-card ux-card-ai"><b>✦</b><span>Human + AI<small>design trust</small></span></div>
          <div className="ux-glass-card ux-card-prototype"><b>▦</b><span>Prototype<small>make it tangible</small></span></div>
        </div>
        <div className="smoke smoke-a" /><div className="smoke smoke-b" /><div className="smoke smoke-c" />
        <div className="scroll-cue">scroll to explore <i>↓</i></div>
      </section>

      <section className="expertise-dock" aria-label="Areas of expertise">
        {[['⌁','Product design'],['◈','Enterprise UX'],['✦','AI experiences'],['◎','Design strategy'],['↗','Research'],['▦','Systems thinking']].map((item,i)=><div className="expertise-card" style={{'--i':i} as React.CSSProperties} key={item[1]}><b>{item[0]}</b><span>{item[1]}</span></div>)}
      </section>

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
            <div className="tool-row">
              {['Figma','Sketch','Miro','Claude','Codex'].map((name,i)=><span className="tool-chip" style={{'--tool-i':i} as React.CSSProperties} key={name}><b>{name}</b></span>)}
            </div>
          </div>
        </div>
        <div className="metrics">
          {metrics.map((m, i) => <div className="metric reveal" key={m.label} style={{ transitionDelay: `${i * 80}ms` }}>
            <strong><Counter value={m.value} suffix={m.suffix} /></strong><p>{m.label}</p>
          </div>)}
        </div>
        <div className="road-intro reveal"><p className="hand-note">Five years. Plenty of wrong turns. One good road.</p><h3>Every stop changed<br/>how I <i>see.</i></h3><p>Scroll to drive through the moments that shaped my design practice—from learning the language of UX to making enterprise complexity feel human.</p></div>
        <div className="journey-road" ref={journeyRoadRef}>
          <canvas className="journey-road-canvas" ref={journeyCanvasRef} aria-hidden="true"/>
          <div className="map-illustration" aria-hidden="true">
            <i className="map-water"/><i className="map-park park-a"/><i className="map-park park-b"/><i className="map-block block-a"/><i className="map-block block-b"/><i className="map-block block-c"/>
            <div className="city-cluster city-a"><i/><i/><i/><i/></div><div className="city-cluster city-b"><i/><i/><i/></div><div className="city-cluster city-c"><i/><i/><i/><i/><i/></div><div className="city-cluster city-d"><i/><i/><i/></div><div className="city-cluster city-e"><i/><i/><i/></div><div className="city-cluster city-f"><i/><i/><i/><i/></div><div className="city-cluster city-g"><i/><i/></div><div className="city-cluster city-h"><i/><i/><i/></div>
            <div className="map-bridge bridge-a"><i/><b/><b/><span/><span/><span/></div><div className="map-bridge bridge-b"><i/><b/><b/><span/><span/></div>
            <div className="rail-line rail-a"><div className="map-train"><i/><i/><i/></div></div><div className="rail-line rail-b"><div className="map-train train-reverse"><i/><i/></div></div>
            <div className="map-trees trees-a"><i/><i/><i/><i/><i/></div><div className="map-trees trees-b"><i/><i/><i/><i/></div><div className="map-trees trees-c"><i/><i/><i/><i/><i/><i/></div><div className="map-trees trees-d"><i/><i/><i/><i/><i/></div>
            <div className="map-plane plane-a"><i/><b/><span/></div><div className="map-plane plane-b"><i/><b/><span/></div><div className="map-plane plane-c"><i/><b/><span/></div>
            <div className="map-helicopter heli-a"><i/><b/><span/><em/></div><div className="map-helicopter heli-b"><i/><b/><span/><em/></div>
            <span className="map-compass">N<b>✦</b></span>
          </div>
          <div className="road-car" aria-hidden="true"><i/><em/><span/><b/><b/></div>
          <span className="roadside cloud-one">☁</span><span className="roadside flag-one">⚑</span>
          <div className="bird-flock flock-one" aria-hidden="true"><i>⌁</i><i>⌁</i><i>⌁</i></div><div className="bird-flock flock-two" aria-hidden="true"><i>⌁</i><i>⌁</i></div>
          {[
            {year:'2019',place:'FULL Creative',role:'UX/UI Intern · Chennai',title:'The first mile.',copy:'I learned that a polished screen is only the end of the story. Research, flows and tiny human details became the beginning.',image:'/about-05.png',note:'Curiosity got the keys',side:'left'},
            {year:'2020 — 2022',place:'DJ Academy of Design',role:'Master’s · Communication Design',title:'Learning to see sideways.',copy:'Branding, film, visual media and UX taught me to frame problems from more than one angle—and tell clearer stories through design.',image:'/about-03.jpeg',note:'Craft met context',side:'right'},
            {year:'2021 — 2022',place:'Tekion',role:'Product Designer · Bengaluru',title:'From classroom to live traffic.',copy:'Two shipped products, fast-moving teams and close stakeholder collaboration turned design theory into practical product judgment.',image:'/about-06.jpeg',note:'Real products. Real stakes.',side:'left'},
            {year:'2022 — NOW',place:'Walmart',role:'UX Designer III · EBS Fintech',title:'Designing at enterprise scale.',copy:'Today I simplify finance, tax, learning and AI workflows for tens of thousands of people—without losing sight of the person behind the process.',image:'/about-02.jpeg',note:'18+ products and counting',side:'right'},
            {year:'BEYOND THE ROADMAP',place:'Design community',role:'Mentor · Organizer · Speaker',title:'Good design travels further when shared.',copy:'I organize events, mentor interns and speak with emerging designers. The best work grows through generous teams and open conversations.',image:'/about-01.jpg',note:'Make a difference',side:'left'},
          ].map((stop,i)=><article className={`road-stop ${stop.side} reveal`} key={stop.place} style={{'--stop':i} as React.CSSProperties}>
            <div className="mile-marker"><span>{String(i+1).padStart(2,'0')}</span><b>{stop.year}</b></div>
            <div className={`journey-card ${i===0?'text-only':''}`}>{i!==0&&<div className="journey-image"><img src={stop.image} alt={`${stop.place} chapter from Aravind’s journey`}/><span>{stop.note}</span></div>}<div className="journey-copy"><div className="chapter-meta"><span>{stop.year}</span><b>{stop.place}</b></div><p>{stop.role}</p><h4>{stop.title}</h4><p>{stop.copy}</p>{i===0&&<div className="first-mile-sketch" aria-hidden="true"><i>?</i><span>research</span><b>→</b><span>first flow</span><em>✦</em></div>}</div></div>
          </article>)}
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
            {project.link&&<button className="project-card-hit" type="button" onClick={()=>openProtectedProject(project.title,project.link)} aria-label={`Unlock ${project.title} case study`}/>} 
            <div className="project-top"><span>{project.number}</span><span className="project-arrow">↗</span></div>
            <div className="project-visual" aria-hidden="true">
              <div className="generated-project-art"><img src={project.image} alt=""/><i className="art-glint"/><i className="art-flow"/><span className="art-dot dot-a"/><span className="art-dot dot-b"/></div>
              <div className="impact-sticker">{project.impact}</div>
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

      <section className="quote-section" aria-label="Testimonials">
        <div className="testimonial-heading"><p>WHAT PEOPLE SAY</p><div><button onClick={()=>setTestimonial((testimonial+testimonials.length-1)%testimonials.length)} aria-label="Previous testimonial">←</button><button onClick={()=>setTestimonial((testimonial+1)%testimonials.length)} aria-label="Next testimonial">→</button></div></div>
        <div className="testimonial-stage">
          {testimonials.map((t,i)=>{const offset=(i-testimonial+testimonials.length)%testimonials.length;return <article className={`testimonial-card position-${offset}`} key={t.name} aria-hidden={offset!==0}><div className="quote-mark">“</div><blockquote>{t.quote}</blockquote><p>{t.name}<span>{t.role}</span></p></article>})}
        </div>
        <div className="testimonial-dots">{testimonials.map((_,i)=><button aria-label={`Show testimonial ${i+1}`} className={i===testimonial?'active':''} onClick={()=>setTestimonial(i)} key={i}/>)}</div>
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
      {lockedProject&&<div className={`password-modal ${unlocking?'is-unlocking':''}`} role="presentation" onMouseDown={(event)=>!unlocking&&event.target===event.currentTarget&&setLockedProject(null)}><div className="password-dialog glass" role="dialog" aria-modal="true" aria-labelledby="password-title"><button className="modal-close" type="button" disabled={unlocking} onClick={()=>setLockedProject(null)} aria-label="Close password dialog">×</button><div className="lock-sketch" aria-hidden="true"><i/><b>✦</b></div><p>PROTECTED CASE STUDY</p><h3 id="password-title">{unlocking?'Access granted':`Unlock ${lockedProject.title}`}</h3>{unlocking?<div className="redirect-state" role="status"><div className="redirect-track"><i/></div><strong>Opening the document…</strong><span>Taking you to the case study securely.</span></div>:<><span>This work contains confidential project details. Enter the portfolio password to continue.</span><form onSubmit={unlockProject}><label htmlFor="case-password">Password</label><div className={`password-field ${passwordError?'error':''}`}><input id="case-password" type="password" value={casePassword} onChange={(event)=>{setCasePassword(event.target.value);setPasswordError(false)}} autoFocus autoComplete="current-password" placeholder="Enter password" aria-invalid={passwordError}/><button type="submit">Unlock <b>↗</b></button></div>{passwordError&&<small className="password-error" role="alert"><b>!</b> Incorrect password. Please check it and try again.</small>}</form></>}</div></div>}
    </main>
  );
}
