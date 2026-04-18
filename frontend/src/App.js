import { useState, useEffect, useRef } from "react";
import axios from "axios";
const NAV = ["Home","About","Skills","Projects","Contact"];

const SKILLS = [
  { name:"MongoDB", icon:"🍃", level:88, color:"#4DB33D" },
  { name:"Express.js", icon:"⚡", level:83, color:"#353535" },
  { name:"React", icon:"⚛️", level:92, color:"#61DAFB" },
  { name:"Node.js", icon:"🟢", level:87, color:"#68A063" },
  { name:"JavaScript", icon:"🟨", level:88, color:"#F7DF1E" },
  { name:"Git & GitHub", icon:"🐙", level:90, color:"#F05032" },
  { name:"Java", icon:"☕", level:85, color:"#ED8B00" },
  { name:"Docker", icon:"🐳", level:68, color:"#2496ED" },
  { name:"SQL", icon:"🗄️", level:82, color:"#4479A1" },
  { name:"Kubernetes", icon:"🎡", level:55, color:"#326CE5" },
  { name:"Next.js", icon:"▲", level:70, color:"#000000" },
  { name:"Jenkins", icon:"🔧", level:60, color:"#D33833" },
  { name:"Spring Boot", icon:"🌱", level:75, color:"#6DB33F" },
  { name:"Hibernate", icon:"🗃️", level:70, color:"#BCAE79" },
  { name:"HQL", icon:"🔍", level:75, color:"#59666C" },
  { name:"JPA", icon:"🔗", level:78, color:"#6E4C9E" },
  { name:"JDBC", icon:"🔌", level:80, color:"#007396" },
  { name:"REST APIs", icon:"🌐", level:90, color:"#00A896" },
  { name:"Data Structures & Algorithms", icon:"🧩", level:90, color:"#F4A261" },
  { name:"Postman", icon:"📮", level:95, color:"#FF6C37" },
  { name:"DevOps", icon:"♾️", level:60, color:"#0078D7" },
  { name:"Linux", icon:"🐧", level:72, color:"#FCC624" },
];

const PROJECTS = [
  {
    title:"MultiMind AI",
    desc:"6 differnet AI on sigle platform i.e. Image Generator, Background Remover, Code Reviewer, Resume Reviewer, Article Writer, Blog Title Generator.",
    tags:["MongoDB","Express","React","Node.js","OAuth/JWT","OpenAI"],
    color:"#7C3AED",
    accent:"#A78BFA",
    bg:"linear-gradient(135deg,#1e1b4b,#312e81)",
    link:"https://multimind-ai-1-frontend.onrender.com/", github:"https://github.com/ZubHussain/MultiMind-AI"
  },
  {
    title:"Social Media Dashboard",
    desc:"A social media web application where users can follow/unfollow others, share image posts, and interact through likes, dislikes, and comments.",
    tags:["Node.js","React","Express","MongoDB","Containerized"],
    color:"#0EA5E9",
    accent:"#7DD3FC",
    bg:"linear-gradient(135deg,#0c1a2e,#0e3a5e)",
    link:"#", github:"https://github.com/ZubHussain/Social-Media"
  },
  {
    title:"Chess Game",
    desc:"A real-time multiplayer Chess game using Socket.io for instant communication between players. It enables live move synchronization and smooth gameplay without page reloads.",
    tags:["Socket.io","CSS","HTML","Node.js"],
    color:"#10B981",
    accent:"#6EE7B7",
    bg:"linear-gradient(135deg,#022c22,#064e3b)",
    link:"#", github:"https://github.com/ZubHussain/Chess-Game"
  },
  {
    title:"ChatApp",
    desc:"A real-time chat application built using the with Socket.io for instant messaging. It supports user authentication, real-time communication, and efficient data storage using MongoDB.",
    tags:["MongoDB","Node.js","React.js","Express.js","Socket.io"],
    color:"#F59E0B",
    accent:"#FDE68A",
    bg:"linear-gradient(135deg,#1c1002,#451a03)",
    link:"#", github:"https://github.com/ZubHussain/ChatApp"
  },
];

const TIMELINE = [
  { year:"2022", title:"CS Degree Started", org:"LNCT University", desc:"Began B.Tech in Computer Science. Fell in love with web dev." },
  { year:"2024", title:"First Internship", org:"Startup Labs", desc:"Built REST APIs with Node.js and React dashboards for 3 clients." },
  { year:"2025", title:"Full Stack Dev", org:"TechCorp Solutions", desc:"Led a team of 4 to ship a SaaS product used by 10,000+ users." },
  { year:"2026", title:"Freelance & Open Source", org:"Self-employed", desc:"5-star rated on Upwork. Contributed to major OSS repos." },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap');

  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --bg:#060614;
    --surface:#0d0d1f;
    --surface2:#131327;
    --border:#ffffff14;
    --text:#e2e8f0;
    --muted:#6b7280;
    --accent:#7C3AED;
    --accent2:#06b6d4;
    --grad: linear-gradient(135deg,#7C3AED,#06b6d4);
  }
  html{scroll-behavior:smooth}
  body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden}
  
  /* Stars bg */
  .stars{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
  .star{position:absolute;border-radius:50%;background:#fff;animation:twinkle 3s infinite}
  @keyframes twinkle{0%,100%{opacity:.1}50%{opacity:.8}}
  
  /* Orbs */
  .orb{position:fixed;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0;opacity:.18}
  .orb1{width:500px;height:500px;background:#7C3AED;top:-100px;left:-100px;animation:orbFloat 8s ease-in-out infinite}
  .orb2{width:400px;height:400px;background:#06b6d4;bottom:-100px;right:-100px;animation:orbFloat 10s ease-in-out infinite reverse}
  @keyframes orbFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,30px)}}
  
  /* Nav */
  nav{position:fixed;top:0;left:0;right:0;z-index:100;backdrop-filter:blur(20px);background:rgba(6,6,20,.7);border-bottom:1px solid var(--border);padding:0 2rem;display:flex;align-items:center;justify-content:space-between;height:64px}
  .logo{font-weight:900;font-size:1.3rem;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .nav-links{display:flex;gap:2rem;list-style:none}
  .nav-links a{color:var(--muted);text-decoration:none;font-size:.9rem;font-weight:500;letter-spacing:.02em;transition:color .2s}
  .nav-links a:hover,.nav-links a.active{color:#fff}
  .nav-cta{background:var(--grad);border:none;color:#fff;padding:.5rem 1.2rem;border-radius:50px;font-size:.85rem;font-weight:600;cursor:pointer;transition:opacity .2s}
  .nav-cta:hover{opacity:.85}

  /* Sections */
  section{position:relative;z-index:1;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:100px 2rem 60px}
  
  /* Hero */
  .hero{flex-direction:column;text-align:center;gap:1.5rem}
  .hero-badge{display:inline-flex;align-items:center;gap:.5rem;background:rgba(124,58,237,.15);border:1px solid rgba(124,58,237,.3);padding:.35rem 1rem;border-radius:50px;font-size:.8rem;color:#A78BFA;margin-bottom:.5rem}
  .hero-badge span{width:6px;height:6px;background:#7C3AED;border-radius:50%;animation:pulse 2s infinite}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}
  .hero h1{font-size:clamp(2.5rem,7vw,5.5rem);font-weight:900;line-height:1.05;letter-spacing:-.03em}
  .hero h1 span{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .hero p {
  font-size: 1.1rem;
  color: var(--muted);
  max-width: 520px;
  line-height: 1.7;

  margin: 0 auto;        /* centers the block */
  text-align: center;    /* centers the text */
}
  .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;margin-top:.5rem}
  .btn-primary{background:var(--grad);border:none;color:#fff;padding:.75rem 2rem;border-radius:50px;font-weight:600;font-size:.95rem;cursor:pointer;transition:transform .2s,box-shadow .2s}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 0 30px rgba(124,58,237,.4)}
  .btn-secondary{background:transparent;border:1px solid var(--border);color:var(--text);padding:.75rem 2rem;border-radius:50px;font-weight:500;font-size:.95rem;cursor:pointer;transition:all .2s}
  .btn-secondary:hover{border-color:rgba(124,58,237,.5);color:#A78BFA}
  .hero-stats{display:flex;gap:3rem;margin-top:1rem;flex-wrap:wrap;justify-content:center}
  .stat{display:flex;flex-direction:column;align-items:center;gap:.2rem}
  .stat-num{font-size:2rem;font-weight:900;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .stat-label{font-size:.8rem;color:var(--muted);letter-spacing:.05em;text-transform:uppercase}
  
  /* Scroll indicator */
  .scroll-hint{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:.5rem;color:var(--muted);font-size:.75rem;letter-spacing:.1em}
  .scroll-line{width:1px;height:50px;background:linear-gradient(to bottom,transparent,rgba(124,58,237,.6));animation:scrollDown 2s infinite}
  @keyframes scrollDown{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}100%{transform:scaleY(1);transform-origin:bottom;opacity:0}}
  
  /* Section heading */
  .section-label{font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;color:var(--accent2);font-weight:600;margin-bottom:.75rem}
  .section-title{font-size:clamp(2rem,5vw,3rem);font-weight:800;letter-spacing:-.02em;margin-bottom:1rem}
  .section-title span{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  
  /* About */
  .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;max-width:1000px;width:100%}
  .about-avatar{position:relative;display:flex;align-items:center;justify-content:center}
  .avatar-ring{width:280px;height:280px;border-radius:50%;background:var(--grad);padding:3px;animation:rotateBorder 8s linear infinite}
  @keyframes rotateBorder{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}
  .avatar-inner{width:100%;height:100%;border-radius:50%;background:var(--surface);display:flex;align-items:center;justify-content:center;font-size:6rem}
  .about-text{display:flex;flex-direction:column;gap:1.2rem}
  .about-text p{color:var(--muted);line-height:1.8;font-size:.95rem}
  .about-tags{display:flex;flex-wrap:wrap;gap:.5rem}
  .tag{padding:.3rem .85rem;border-radius:50px;border:1px solid var(--border);font-size:.78rem;color:var(--muted);background:var(--surface)}
  
  /* Timeline */
  .timeline{position:relative;padding:1rem 0}
  .tl-line{position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent,rgba(124,58,237,.5),transparent)}
  .tl-item{display:flex;gap:2rem;padding:0 0 2rem 2rem;position:relative}
  .tl-item::before{content:'';position:absolute;left:-4px;top:4px;width:9px;height:9px;border-radius:50%;background:var(--grad)}
  .tl-year{font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--accent2);font-weight:700;min-width:36px}
  .tl-content h4{font-size:.95rem;font-weight:600;margin-bottom:.15rem}
  .tl-content span{font-size:.78rem;color:var(--muted)}
  .tl-content p{font-size:.85rem;color:var(--muted);margin-top:.3rem;line-height:1.6}

  /* Skills */
  .skills-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;max-width:900px;width:100%}
  .skill-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:1.2rem 1rem;display:flex;flex-direction:column;gap:.8rem;transition:all .3s;cursor:default;position:relative;overflow:hidden}
  .skill-card::before{content:'';position:absolute;inset:0;background:var(--grad);opacity:0;transition:opacity .3s}
  .skill-card:hover::before{opacity:.06}
  .skill-card:hover{border-color:rgba(124,58,237,.4);transform:translateY(-4px)}
  .skill-icon{font-size:1.6rem}
  .skill-name{font-size:.85rem;font-weight:600}
  .skill-bar{height:3px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden}
  .skill-fill{height:100%;border-radius:99px;background:var(--grad);transition:width 1s ease}
  .skill-pct{font-size:.72rem;color:var(--muted);text-align:right;font-family:'JetBrains Mono',monospace}
  
  /* Projects */
  .projects-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;max-width:1000px;width:100%}
  .proj-card{border-radius:20px;overflow:hidden;border:1px solid var(--border);transition:all .3s;position:relative;cursor:pointer}
  .proj-card:hover{transform:translateY(-6px);border-color:rgba(124,58,237,.3)}
  .proj-card-bg{padding:1.5rem;background:var(--surface2)}
  .proj-card:hover .proj-card-bg{background:var(--surface)}
  .proj-accent{width:36px;height:3px;border-radius:99px;margin-bottom:1rem}
  .proj-card h3{font-size:1.1rem;font-weight:700;margin-bottom:.5rem}
  .proj-card p{font-size:.85rem;color:var(--muted);line-height:1.7;margin-bottom:1rem}
  .proj-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.2rem}
  .proj-tag{padding:.2rem .65rem;border-radius:50px;font-size:.7rem;font-weight:500}
  .proj-links{display:flex;gap:.75rem}
  .proj-link{padding:.4rem .9rem;border-radius:50px;font-size:.78rem;font-weight:500;cursor:pointer;text-decoration:none;transition:all .2s}
  .proj-link.live{background:var(--grad);color:#fff;border:none}
  .proj-link.gh{background:transparent;border:1px solid var(--border);color:var(--muted)}
  .proj-link.gh:hover{border-color:rgba(124,58,237,.5);color:#A78BFA}
  
  /* Contact */
  .contact-wrap{max-width:640px;width:100%;display:flex;flex-direction:column;gap:2rem}
  .contact-form{display:flex;flex-direction:column;gap:1rem}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
  input,textarea{width:100%;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:.85rem 1rem;color:var(--text);font-size:.9rem;font-family:'Inter',sans-serif;outline:none;transition:border-color .2s;resize:none}
  input:focus,textarea:focus{border-color:rgba(124,58,237,.5)}
  input::placeholder,textarea::placeholder{color:var(--muted)}
  .submit-btn{background:var(--grad);border:none;color:#fff;padding:.9rem;border-radius:12px;font-size:1rem;font-weight:600;cursor:pointer;transition:all .2s;letter-spacing:.02em}
  .submit-btn:hover{opacity:.9;transform:translateY(-2px)}
  .submit-btn:disabled{opacity:.6;cursor:not-allowed;transform:none}
  .contact-links{display:flex;gap:1rem;flex-wrap:wrap}
  .contact-link{display:flex;align-items:center;gap:.5rem;padding:.6rem 1.2rem;border-radius:50px;border:1px solid var(--border);color:var(--muted);text-decoration:none;font-size:.85rem;transition:all .2s;cursor:pointer}
  .contact-link:hover{border-color:rgba(124,58,237,.4);color:#A78BFA}
  
  /* Toast */
  .toast{position:fixed;bottom:2rem;right:2rem;background:var(--surface);border:1px solid rgba(124,58,237,.3);border-radius:12px;padding:1rem 1.5rem;color:var(--text);font-size:.9rem;z-index:999;animation:toastIn .3s ease;display:flex;align-items:center;gap:.75rem}
  @keyframes toastIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .toast-icon{width:8px;height:8px;border-radius:50%;background:#10b981}
  
  /* Footer */
  footer{position:relative;z-index:1;text-align:center;padding:2rem;border-top:1px solid var(--border);color:var(--muted);font-size:.8rem}
  footer span{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:600}
  
  /* Responsive */
  @media(max-width:768px){
    .about-grid{grid-template-columns:1fr}
    .skills-grid{grid-template-columns:repeat(2,1fr)}
    .projects-grid{grid-template-columns:1fr}
    .form-row{grid-template-columns:1fr}
    .nav-links{display:none}
  }
  @media(max-width:480px){
    .skills-grid{grid-template-columns:repeat(2,1fr)}
    .hero h1{font-size:2.2rem}
  }
`;

function Stars() {
  const stars = Array.from({length:60},(_,i)=>({
    id:i,
    x:Math.random()*100,
    y:Math.random()*100,
    size:Math.random()*2+.5,
    delay:Math.random()*3,
    dur:2+Math.random()*3
  }));
  return (
    <div className="stars">
      {stars.map(s=>(
        <div key={s.id} className="star" style={{
          left:`${s.x}%`,top:`${s.y}%`,
          width:s.size,height:s.size,
          animationDelay:`${s.delay}s`,
          animationDuration:`${s.dur}s`
        }}/>
      ))}
    </div>
  );
}

function SkillBar({level, animated}) {
  return (
    <div className="skill-bar">
      <div className="skill-fill" style={{width: animated ? `${level}%` : '0%'}}/>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({name:"",email:"",message:""});
  const [sending, setSending] = useState(false);
  const skillsRef = useRef(null);
  const sectionsRef = useRef({});

  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setSkillsVisible(true); },{threshold:.2});
    if(skillsRef.current) obs.observe(skillsRef.current);
    return ()=>obs.disconnect();
  },[]);

  useEffect(()=>{
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) setActive(e.target.dataset.section||""); });
    },{threshold:.4});
    Object.values(sectionsRef.current).forEach(el=>el&&obs.observe(el));
    return ()=>obs.disconnect();
  },[]);

  const showToast = (msg)=>{
    setToast(msg);
    setTimeout(()=>setToast(null),3500);
  };


  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      return showToast("⚠️ Please fill all fields");
    }

    setSending(true);

    try {
      await axios.post("https://portolio-ykhd.vercel.app/api/contact", form);

      showToast("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });

    } catch (error) {
      showToast("❌ Failed to send message");
    }

    setSending(false);
  };

  const scrollTo = (id)=>{
    const el = document.getElementById(id.toLowerCase());
    if(el) el.scrollIntoView({behavior:"smooth"});
  };

  return (
    <>
      <style>{css}</style>
      <Stars/>
      <div className="orb orb1"/>
      <div className="orb orb2"/>

      <nav>
        <div className="logo">{"Zubair Ansari"}</div>
        <ul className="nav-links">
          {NAV.map(n=>(
            <li key={n}><a href={`#${n}`} className={active===n?"active":""} onClick={e=>{e.preventDefault();scrollTo(n)}}>{n}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={()=>scrollTo("Contact")}>Hire Me</button>
      </nav>

      {/* HERO */}
      <section id="home" data-section="Home" ref={el=>sectionsRef.current.home=el}>
        <div className="hero">
          <div className="hero-badge"><span/>Available for freelance work</div>
          <h1>
            I Build <span>Scalable</span><br/>
            Full-Stack Apps<br/>
            with the <span>MERN Stack</span>
          </h1>
          <p>Crafting elegant, high-performance web applications — from pixel-perfect frontends to robust Node.js APIs and MongoDB architectures.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={()=>scrollTo("Projects")}>View My Work</button>
            <button className="btn-secondary" onClick={()=>scrollTo("Contact")}>Let's Talk</button>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">5+</span><span className="stat-label">Years Exp.</span></div>
            <div className="stat"><span className="stat-num">30+</span><span className="stat-label">Projects</span></div>
            <div className="stat"><span className="stat-num">15+</span><span className="stat-label">Clients</span></div>
            <div className="stat"><span className="stat-num">99%</span><span className="stat-label">Satisfaction</span></div>
          </div>
        </div>
        <div className="scroll-hint">
          <span style={{letterSpacing:'.1em',fontSize:'.7rem',color:'#6b7280'}}></span>
          <div className="scroll-line"/>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" data-section="About" ref={el=>sectionsRef.current.about=el}>
        <div className="about-grid">
          <div className="about-avatar">
            <div className="avatar-ring">
              <div className="avatar-inner">👨‍💻</div>
            </div>
          </div>
          <div className="about-text">
            <div>
              <div className="section-label">About Me</div>
              <div className="section-title">Full-Stack <span>Developer</span> &amp; Problem Solver</div>
            </div>
            <p>I'm a passionate MERN Stack developer based in Bhopal, India. I specialise in building scalable SaaS platforms, real-time apps, and RESTful APIs that serve millions of users.</p>
            <p>When I'm not coding, I'm contributing to open source, writing technical blogs, or exploring the latest in AI/ML integrations.</p>
            <div className="about-tags">
              {["React","Node.js","MongoDB","Java","JavaScript","Docker","AWS","Containerization","Git","GitHub","SQL"].map(t=>(
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
            <div style={{marginTop:'.5rem'}}>
              <div className="section-label" style={{marginBottom:'1rem'}}>Experience</div>
              <div className="timeline">
                <div className="tl-line"/>
                {TIMELINE.map(t=>(
                  <div key={t.year} className="tl-item">
                    <div className="tl-year">{t.year}</div>
                    <div className="tl-content">
                      <h4>{t.title}</h4>
                      <span>{t.org}</span>
                      <p>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" data-section="Skills" ref={el=>{sectionsRef.current.skills=el;skillsRef.current=el}}>
        <div style={{width:"100%",maxWidth:"900px",textAlign:"center"}}>
          <div className="section-label">Tech Stack</div>
          <div className="section-title">My <span>Skills</span> &amp; Tools</div>
          <p style={{color:"#6b7280",marginBottom:"2.5rem",fontSize:".95rem"}}>Technologies I use to bring ideas to life — from database to deployment.</p>
          <div className="skills-grid">
            {SKILLS.map(s=>(
              <div key={s.name} className="skill-card">
                <div className="skill-icon">{s.icon}</div>
                <div className="skill-name">{s.name}</div>
                <SkillBar level={s.level} animated={skillsVisible}/>
                <div className="skill-pct">{s.level}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" data-section="Projects" ref={el=>sectionsRef.current.projects=el}>
        <div style={{width:"100%",maxWidth:"1000px"}}>
          <div style={{textAlign:"center",marginBottom:"2.5rem"}}>
            <div className="section-label">Portfolio</div>
            <div className="section-title">Featured <span>Projects</span></div>
            <p style={{color:"#6b7280",fontSize:".95rem"}}>Real-world applications built with scalability and performance in mind.</p>
          </div>
          <div className="projects-grid">
            {PROJECTS.map(p=>(
              <div key={p.title} className="proj-card">
                <div className="proj-card-bg">
                  <div className="proj-accent" style={{background:`linear-gradient(90deg,${p.color},${p.accent})`}}/>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="proj-tags">
                    {p.tags.map(t=>(
                      <span key={t} className="proj-tag" style={{background:`${p.color}22`,color:p.accent,border:`1px solid ${p.color}44`}}>{t}</span>
                    ))}
                  </div>
                  <div className="proj-links">
                    <a href={p.link} className="proj-link live" onClick={e=>{e.preventDefault();showToast("Live demo coming soon!")}}>Live Demo ↗</a>
                    <a href={p.github} className="proj-link gh" target="_blank" rel="noopener noreferrer">GitHub</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" data-section="Contact" ref={el=>sectionsRef.current.contact=el}>
        <div className="contact-wrap">
          <div>
            <div className="section-label">Get In Touch</div>
            <div className="section-title">Let's Build <span>Together</span></div>
            <p style={{color:"#6b7280",fontSize:".95rem",lineHeight:"1.7"}}>Have a project in mind? I'm available for freelance, contracts, and full-time opportunities. Drop a message!</p>
          </div>
          <div className="contact-links">
              {[
                ["📧", "Email", "mailto:zuby4246@gmail.com"],
                ["🐙", "GitHub", "https://github.com/ZubHussain"],
                ["📷", "Instagram", "https://instagram.com/zubair_hussain__"]
              ].map(([ic, pl, link]) => (
                <a 
                  key={pl} 
                  href={link} 
                  className="contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{ic}</span>
                  <span>{pl}</span>
                </a>
              ))}
            </div>
          <div className="contact-form">
            <div className="form-row">
              <input placeholder="Your Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
              <input type="email" placeholder="Email Address" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
            </div>
            <textarea rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}/>
            <button className="submit-btn" onClick={handleSubmit} disabled={sending}>
              {sending ? "Sending..." : "Send Message →"}
            </button>
          </div>
        </div>
      </section>

      <footer>
        <p>Designed & Built by <span>Zubair</span> · MERN Stack Developer · Bhopal, India</p>
        {/* <p style={{marginTop:'.5rem',fontSize:'.75rem'}}>© {new Date().getFullYear()} — Built with React 18, Node.js, Express &amp; MongoDB</p> */}
      </footer>

      {toast && (
        <div className="toast">
          <div className="toast-icon"/>
          {toast}
        </div>
      )}
    </>
  );
}