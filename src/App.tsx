import { useState, useEffect, FormEvent } from 'react';

export default function App() {
  // Navigation & Scroll states
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Clipboard copy state
  const [isCopied, setIsCopied] = useState(false);

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailAddress = "andikaabiz99@gmail.com";

  // Handle header state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const sectionEl = document.getElementById(id);
    if (sectionEl) {
      sectionEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '-160px 0px -45% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          if (activeId) {
            setActiveSection(activeId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(sec => observer.observe(sec));

    return () => {
      sections.forEach(sec => observer.unobserve(sec));
    };
  }, []);

  // Copy Email Address handler
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(emailAddress).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // Contact form submission
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim() && formData.message.trim()) {
      setIsSubmitted(true);
    }
  };

  // Reset Contact Form
  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0d0d0d] text-neutral-200 selection:bg-white selection:text-black font-sans">
      
      {/* Background Decorative Grid */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#151515_1px,transparent_1px),linear-gradient(to_bottom,#151515_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 z-0"></div>

      {/* Top Navigation Bar */}
      <header 
        id="main-header" 
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'border-b border-neutral-900 bg-[#0d0d0d]/90 py-4 backdrop-blur-md' 
            : 'border-b border-transparent bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo / Name */}
          <button 
            onClick={() => scrollToSection('hero')} 
            className="group flex flex-col items-start font-mono text-xl font-bold tracking-widest text-white transition-opacity hover:opacity-80 cursor-pointer"
          >
            <span>ANDIKA ARYADI PUTRA</span>
            <span className="h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-10 md:flex" id="desktop-nav">
            {['about', 'projects', 'achievements', 'contact'].map((section) => (
              <button 
                key={section}
                onClick={() => scrollToSection(section)}
                className={`font-mono capitalize tracking-wider transition-colors duration-200 cursor-pointer ${
                  activeSection === section 
                    ? 'text-white font-medium' 
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                {section}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="z-50 text-neutral-400 hover:text-white md:hidden cursor-pointer" 
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              /* Close Icon */
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            ) : (
              /* Hamburger Menu Icon */
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div 
        id="mobile-drawer" 
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-[#0d0d0d] px-8 py-24 transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Decorative Grid inside drawer */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#151515_1px,transparent_1px),linear-gradient(to_bottom,#151515_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>

        <div className="relative flex flex-col gap-10 pt-8">
          <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.25em]">Navigation</span>
          
          {['about', 'projects', 'achievements', 'contact'].map((section) => (
            <button 
              key={section}
              onClick={() => scrollToSection(section)} 
              className="group flex items-center justify-between font-mono text-lg font-medium text-neutral-400 transition-colors hover:text-white cursor-pointer"
            >
              <span className="capitalize">{section}</span>
              <svg className="h-4 w-4 opacity-0 transition-transform group-hover:translate-x-1 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          ))}
        </div>

        <div className="relative flex flex-col gap-6 pt-10 border-t border-neutral-900 font-mono text-xs text-neutral-500">
          <div>
            <p className="text-neutral-600 mb-1">Contact Me Here!</p>
            <a href="mailto:andikaabiz99@gmail.com" className="text-neutral-300 hover:text-white transition-colors">
              andikaabiz99@gmail.com
            </a>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/andikaap99" className="hover:text-white transition-colors">GitHub</a>
            <a href="www.linkedin.com/in/andika-aap" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>

      <main className="w-full relative z-10">
        
        {/* HE-01 / Hero Section */}
        <section id="hero" className="snap-start relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden w-full">
          <div className="mx-auto max-w-6xl w-full px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            <div className="md:col-span-7 flex flex-col items-start">
              <h1 className="font-sans text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
                Machine Learning
              </h1>
              <h1 className="font-sans text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl mb-3">
                Engineer<span className="text-neutral-500">.</span>
              </h1>
              <h2 className="font-sans text-xl font-medium text-neutral-400 sm:text-2xl mb-8">
                Andika Aryadi Putra
              </h2>

              {/* Social / Actions */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex gap-4">
                  <a href="https://github.com/andikaap99" className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-900 bg-neutral-950/50 text-neutral-400 hover:border-neutral-700 hover:text-white transition-all duration-300 hover:-translate-y-0.5" aria-label="GitHub Page">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/andika-aap" className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-900 bg-neutral-950/50 text-neutral-400 hover:border-neutral-700 hover:text-white transition-all duration-300 hover:-translate-y-0.5" aria-label="LinkedIn Profile">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <button 
                    onClick={copyEmailToClipboard}
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-900 bg-neutral-950/50 text-neutral-400 hover:border-neutral-700 hover:text-white transition-all duration-300 hover:-translate-y-0.5 relative group cursor-pointer" 
                    aria-label="Copy Email"
                  >
                    {isCopied ? (
                      /* Check Icon */
                      <svg className="h-5 w-5 text-emerald-400 animate-fade-in" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    ) : (
                      /* Mail Icon */
                      <svg className="h-5 w-5 animate-fade-in" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    )}
                    
                    {/* Tooltip */}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-neutral-950 border border-neutral-800 px-2 py-1 font-mono text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {isCopied ? 'Email Copied!' : 'Copy Email'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Portrait Section */}
            <div className="md:col-span-5 flex justify-center md:justify-end w-full">
              <div className="relative group max-w-[360px] md:max-w-md w-full">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-neutral-800 to-neutral-900 opacity-50 blur-lg transition duration-1000 group-hover:opacity-75 group-hover:duration-200"></div>
                
                <div className="relative overflow-hidden rounded-xl border border-neutral-800 bg-[#0d0d0d] p-3 transition-transform duration-500 hover:scale-[1.02]">
                  <div className="overflow-hidden rounded-lg aspect-[4/5] bg-neutral-950">
                    <img 
                      src="assets/img/dika2.jpeg" 
                      alt="Portrait of Andika Aryadi Putra" 
                      className="h-full w-full object-cover object-top transition-all duration-700 hover:scale-105" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* AB-02 / About Section */}
        <section id="about" className="snap-start relative min-h-screen flex items-center py-24 border-t border-neutral-950 bg-neutral-950/30 w-full">
          <div className="mx-auto max-w-6xl px-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              
              <div className="md:col-span-4">
                <div className="sticky top-28 flex flex-col items-start">
                  <h2 className="font-sans text-4xl font-extrabold tracking-tight text-white">About</h2>
                  <div className="mt-4 h-[1px] w-12 bg-neutral-800"></div>
                </div>
              </div>

              <div className="md:col-span-8 flex flex-col gap-12">
                <p className="font-sans text-lg md:text-xl text-neutral-300 leading-relaxed font-light">
                  AI/ML Engineer with hands-on experience in time series analysis, computer vision, and large language models using TensorFlow. 
                  Proficient in deploying machine learning solutions through FastAPI as a backend framework. 
                  Passionate about exploring emerging AI technologies and enjoys tinkering with IoT as a side interest, bridging the gap between intelligent software and physical hardware.
                </p>

                {/* Tech Stack Grids with Lucide SVGs */}
                <div className="space-y-6 pt-6 border-t border-neutral-900">
                  <h3 className="font-mono text-xs text-neutral-500 uppercase tracking-widest">TECH STACK</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    
                    <div className="flex items-center gap-3 rounded-lg border border-neutral-900 bg-neutral-950 px-4 py-3 text-neutral-400 transition-all hover:border-neutral-700 hover:text-white">
                      <svg className="h-4 w-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>
                      </svg>
                      <span className="font-mono text-xs">Python</span>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-neutral-900 bg-neutral-950 px-4 py-3 text-neutral-400 transition-all hover:border-neutral-700 hover:text-white">
                      <svg className="h-4 w-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>
                      </svg>
                      <span className="font-mono text-xs">FastAPI</span>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-neutral-900 bg-neutral-950 px-4 py-3 text-neutral-400 transition-all hover:border-neutral-700 hover:text-white">
                      <svg className="h-4 w-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v4"/><path d="M12 12H5v4"/><path d="M12 12h7v4"/>
                      </svg>
                      <span className="font-mono text-xs">Pytorch</span>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-neutral-900 bg-neutral-950 px-4 py-3 text-neutral-400 transition-all hover:border-neutral-700 hover:text-white">
                      <svg className="h-4 w-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v4"/><path d="M12 12H5v4"/><path d="M12 12h7v4"/>
                      </svg>
                      <span className="font-mono text-xs">TensorFlow</span>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-neutral-900 bg-neutral-950 px-4 py-3 text-neutral-400 transition-all hover:border-neutral-700 hover:text-white">
                      <svg className="h-4 w-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v4"/><path d="M12 12H5v4"/><path d="M12 12h7v4"/>
                      </svg>
                      <span className="font-mono text-xs">LiteRT</span>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-neutral-900 bg-neutral-950 px-4 py-3 text-neutral-400 transition-all hover:border-neutral-700 hover:text-white">
                      <svg className="h-4 w-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v4"/><path d="M12 12H5v4"/><path d="M12 12h7v4"/>
                      </svg>
                      <span className="font-mono text-xs">LangChain</span>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-neutral-900 bg-neutral-950 px-4 py-3 text-neutral-400 transition-all hover:border-neutral-700 hover:text-white">
                      <svg className="h-4 w-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
                      </svg>
                      <span className="font-mono text-xs">Streamlit</span>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-neutral-900 bg-neutral-950 px-4 py-3 text-neutral-400 transition-all hover:border-neutral-700 hover:text-white">
                      <svg className="h-4 w-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v4"/><path d="M12 12H5v4"/><path d="M12 12h7v4"/>
                      </svg>
                      <span className="font-mono text-xs">TensorFlow</span>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-neutral-900 bg-neutral-950 px-4 py-3 text-neutral-400 transition-all hover:border-neutral-700 hover:text-white">
                      <svg className="h-4 w-4 text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>
                      </svg>
                      <span className="font-mono text-xs">SQL</span>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PR-03 / Projects Section */}
        <section id="projects" className="snap-start relative min-h-screen flex items-center py-24 border-t border-neutral-950 w-full">
          <div className="mx-auto max-w-6xl px-6 w-full">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="font-sans text-4xl font-extrabold tracking-tight text-white">Projects</h2>
              </div>
              <span className="font-mono text-xs text-neutral-500">SCROLL HORIZONTALLY OR SWIPE ──</span>
            </div>

            {/* Project Horizontal Carousel */}
            <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar-track]:bg-neutral-900 [&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-neutral-400">
              
              {/* Project 1 */}
              <a href="https://github.com/MuhammadAnbiya/SAVORI-Project" target="_blank" rel="noopener noreferrer" className="min-w-[280px] sm:min-w-[360px] md:min-w-[420px] snap-start rounded-xl border border-neutral-900 bg-neutral-950/40 p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 hover:scale-[0.99] group cursor-pointer no-underline">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <span className="font-mono text-[10px] text-neutral-600">01</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-neutral-500">
                      <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                      View Repo
                    </span>
                  </div>
                  <h3 className="font-sans text-2xl font-black tracking-tight text-white mb-3 group-hover:text-neutral-200 transition-colors">S.A.V.O.R.I Dashboard</h3>
                  <p className="font-sans text-sm text-neutral-400 leading-relaxed font-light mb-8">
                    BI dashboard for F&B Restaurant that can forecast sales, extract receipt into text that automatically inserts into database, and make instant monthly report ready to present with several analytics inside.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">Python</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">Pytorch</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">FastAPI</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">LLM</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">SQL</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">Javascript</span>
                  </div>
                  <div className="pt-4 border-t border-neutral-900 flex justify-between items-center">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Data Scientist</span>
                    <svg className="h-4 w-4 text-neutral-600 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                    </svg>
                  </div>
                </div>
              </a>

              {/* Project 2 */}
              <a href="https://github.com/andikaap99/be-dss-teras-rasa" target="_blank" rel="noopener noreferrer" className="min-w-[280px] sm:min-w-[360px] md:min-w-[420px] snap-start rounded-xl border border-neutral-900 bg-neutral-950/40 p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 hover:scale-[0.99] group cursor-pointer no-underline">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <span className="font-mono text-[10px] text-neutral-600">02</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-neutral-500">
                      <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                      View Repo
                    </span>
                  </div>
                  <h3 className="font-sans text-2xl font-black tracking-tight text-white mb-3 group-hover:text-neutral-200 transition-colors">DSS Teras Rasa</h3>
                  <p className="font-sans text-sm text-neutral-400 leading-relaxed font-light mb-8">
                    BI dashboard for Mie Ayam Small Restaurant that can forecast sales, give recomendation of how many raw materials should be restocked tomorrow, and sales statistic analytics.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">Python</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">TensorFlow</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">FastAPI</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">SQL</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">Javascript</span>
                  </div>
                  <div className="pt-4 border-t border-neutral-900 flex justify-between items-center">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">ML Engineer, Backend Developer</span>
                    <svg className="h-4 w-4 text-neutral-600 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                    </svg>
                  </div>
                </div>
              </a>
              
              {/* Project 3 */}
              <a href="https://github.com/airinr/wearable_device_asd" target="_blank" rel="noopener noreferrer" className="min-w-[280px] sm:min-w-[360px] md:min-w-[420px] snap-start rounded-xl border border-neutral-900 bg-neutral-950/40 p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 hover:scale-[0.99] group cursor-pointer no-underline">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <span className="font-mono text-[10px] text-neutral-600">03</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-neutral-500">
                      <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                      View Repo
                    </span>
                  </div>
                  <h3 className="font-sans text-2xl font-black tracking-tight text-white mb-3 group-hover:text-neutral-200 transition-colors">CalmiSense Wearable Device</h3>
                  <p className="font-sans text-sm text-neutral-400 leading-relaxed font-light mb-8">
                    IoT Wearable Device that can help classified or detect stress on child with Autism Spectrum Disorder with Neural Network.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">Python</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">TensorFLow</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">Streamlit</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">ESP32</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">React Native</span>
                  </div>
                  <div className="pt-4 border-t border-neutral-900 flex justify-between items-center">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">ML Engineer, Backend DEveloper, IoT Engineer</span>
                    <svg className="h-4 w-4 text-neutral-600 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                    </svg>
                  </div>
                </div>
              </a>

              {/* Project 4 */}
              <a href="https://github.com/airinr/hospital_queue_prediction" target="_blank" rel="noopener noreferrer" className="min-w-[280px] sm:min-w-[360px] md:min-w-[420px] snap-start rounded-xl border border-neutral-900 bg-neutral-950/40 p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 hover:scale-[0.99] group cursor-pointer no-underline">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <span className="font-mono text-[10px] text-neutral-600">04</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-neutral-500">
                      <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                      View Repo
                    </span>
                  </div>
                  <h3 className="font-sans text-2xl font-black tracking-tight text-white mb-3 group-hover:text-neutral-200 transition-colors">Smart Hospital Queue</h3>
                  <p className="font-sans text-sm text-neutral-400 leading-relaxed font-light mb-8">
                    An intelligent hospital queue management system that integrates Machine Learning algorithms to provide real-time patient wait-time predictions.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">Python</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">Scikit-Learn</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">FastAPI</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">React Native</span>
                  </div>
                  <div className="pt-4 border-t border-neutral-900 flex justify-between items-center">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">ML Engineer, Backend Developer</span>
                    <svg className="h-4 w-4 text-neutral-600 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                    </svg>
                  </div>
                </div>
              </a>

            </div>
          </div>
        </section>

        {/* AC-04 / Achievements & Certifications */}
        <section id="achievements" className="snap-start relative min-h-screen flex items-center py-24 border-t border-neutral-950 bg-neutral-950/30 w-full">
          <div className="mx-auto max-w-6xl px-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              
              {/* Achievements Column */}
              <div className="md:col-span-6 flex flex-col">
                <div className="flex items-center gap-3 border-l-2 border-white pl-4 mb-10">
                  <h2 className="font-sans text-xl font-black uppercase tracking-wider text-white">Achievements</h2>
                </div>

                <div className="flex flex-col">
                  {/* Achievement 1 */}
                  <div className="group py-6 border-b border-neutral-900 flex gap-6 items-start hover:bg-neutral-950/20 px-3 rounded transition-all duration-300">
                    <span className="font-mono text-xs text-neutral-600 mt-0.5">2026</span>
                    <div>
                      <h4 className="font-sans text-base font-semibold text-neutral-200 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">Top 10 Finalist, Samsung Innovation Campus</h4>
                      <p className="font-mono text-xs text-neutral-500 mt-1">Samsung Indonesia</p>
                    </div>
                  </div>
                  {/* Achievement 2 */}
                  <div className="group py-6 border-b border-neutral-900 flex gap-6 items-start hover:bg-neutral-950/20 px-3 rounded transition-all duration-300">
                    <span className="font-mono text-xs text-neutral-600 mt-0.5">2025</span>
                    <div>
                      <h4 className="font-sans text-base font-semibold text-neutral-200 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">Top 71 Global Leaderboard, Indonesia Young Coders League</h4>
                      <p className="font-mono text-xs text-neutral-500 mt-1">Mekari x Money Forward</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications Column */}
              <div className="md:col-span-6 flex flex-col">
                <div className="flex items-center gap-3 border-l-2 border-white-800 pl-4 mb-10">
                  <h2 className="font-sans text-xl font-black uppercase tracking-wider text-white">Certifications</h2>
                </div>

                <div className="flex flex-col">
                  {/* Certification 1 */}
                  <div className="group py-6 border-b border-neutral-900 flex gap-6 items-start hover:bg-neutral-950/20 px-3 rounded transition-all duration-300">
                    <span className="font-mono text-xs text-neutral-600 w-24 shrink-0 uppercase tracking-widest mt-0.5">Dicoding x IBM</span>
                    <div>
                      <h4 className="font-sans text-base font-semibold text-neutral-200 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">Pijak Program (Ongoing)</h4>
                    </div>
                  </div>
                  {/* Certification 2 */}
                  <div className="group py-6 border-b border-neutral-900 flex gap-6 items-start hover:bg-neutral-950/20 px-3 rounded transition-all duration-300">
                    <span className="font-mono text-xs text-neutral-600 w-24 shrink-0 uppercase tracking-widest mt-0.5">Dicoding</span>
                    <div>
                      <h4 className="font-sans text-base font-semibold text-neutral-200 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">AI Engineer Learning Path</h4>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CO-05 / Contact Section */}
        <section id="contact" className="snap-start relative min-h-screen flex items-center py-24 border-t border-neutral-950 bg-gradient-to-b from-transparent to-neutral-950/40 w-full">
          <div className="mx-auto max-w-6xl px-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              
              <div className="md:col-span-5 flex flex-col items-start select-none">
                <h2 className="font-sans text-5xl font-extrabold tracking-tighter text-white mb-6">Let's Collaborate!</h2>
                <p className="font-sans text-neutral-400 leading-relaxed font-light mb-8 max-w-md">
                  Whether you have an upcoming Machine Learning pipeline to engineer, my mailbox is open.
                </p>

                <div className="flex flex-col gap-2 font-mono text-xs">
                  <span className="text-neutral-500">Contact Me Here!</span>
                  <button 
                    onClick={copyEmailToClipboard}
                    className="flex items-center gap-2 text-neutral-300 hover:text-white transition-all group text-left cursor-pointer"
                  >
                    <span>{emailAddress}</span>
                    {isCopied ? (
                      /* Check Icon */
                      <svg className="h-3.5 w-3.5 text-emerald-400 animate-fade-in" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    ) : (
                      /* Copy Icon */
                      <svg className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity animate-fade-in" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Form Content Box */}
              <div className="md:col-span-7 bg-neutral-950/60 rounded-xl border border-neutral-900 p-8 relative overflow-hidden">
                
                {!isSubmitted ? (
                  /* Contact Form */
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Your Name</label>
                        <input 
                          id="name" 
                          type="text" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-neutral-900/50 border border-neutral-800 rounded px-4 py-3 font-sans text-sm text-neutral-200 outline-none focus:border-neutral-500 focus:bg-neutral-900 transition-all" 
                          placeholder="Andika Aryadi"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Email Address</label>
                        <input 
                          id="email" 
                          type="email" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-neutral-900/50 border border-neutral-800 rounded px-4 py-3 font-sans text-sm text-neutral-200 outline-none focus:border-neutral-500 focus:bg-neutral-900 transition-all" 
                          placeholder="you@domain.com"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Brief Message</label>
                      <textarea 
                        id="message" 
                        required 
                        rows={4} 
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-neutral-900/50 border border-neutral-800 rounded px-4 py-3 font-sans text-sm text-neutral-200 outline-none focus:border-neutral-500 focus:bg-neutral-900 transition-all resize-none" 
                        placeholder="Hello, I would love to connect for an opportunity..."
                      />
                    </div>
                    
                    <button type="submit" className="w-full bg-white hover:bg-neutral-200 text-black py-4 font-mono text-xs uppercase font-bold rounded tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer">
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
                      </svg>
                      Send Inquiries
                    </button>
                  </form>
                ) : (
                  /* Success Card Container */
                  <div id="success-card" className="py-12 text-center flex flex-col items-center animate-fade-in animate-duration-300">
                    <div className="h-12 w-12 rounded-full border-2 border-white flex items-center justify-center mb-6">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-white mb-2">Message Sent</h3>
                    <p className="font-sans text-sm text-neutral-400 max-w-sm mb-8 leading-relaxed">
                      Thank you for reaching out, <span className="text-white font-medium">{formData.name}</span>! Andika will get back to you at <span className="text-white">{formData.email}</span> as soon as possible.
                    </p>
                    <button 
                      onClick={resetForm} 
                      className="border border-neutral-800 hover:border-neutral-700 bg-neutral-900 px-6 py-2.5 rounded font-mono text-xs uppercase tracking-widest text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                )}

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FO-06 / Footer Section */}
      <footer className="snap-end border-t border-neutral-950 bg-black/40 py-16 relative z-10 w-full">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left font-sans">
          
          <div className="space-y-3">
            <div className="font-mono text-sm font-bold tracking-widest text-white">
              ANDIKA ARYADI PUTRA
            </div>
            <p className="font-mono text-[10px] text-neutral-600 leading-relaxed uppercase tracking-wider">
              Bandung, Indonesia<br />
              Always make projects with love.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-4 font-mono text-xs">
            <div className="flex justify-center md:justify-end gap-8 text-neutral-500">
              <a href="#" className="hover:text-white tracking-widest transition-all">GITHUB</a>
              <a href="#" className="hover:text-white tracking-widest transition-all">LINKEDIN</a>
            </div>
            <a href="mailto:andika.putra@engineering.com" className="text-neutral-400 hover:text-white transition-all font-mono">
              andikaabiz99@gmail.com
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
