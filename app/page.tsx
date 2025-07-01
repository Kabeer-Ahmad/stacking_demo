'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Enable smooth scrolling globally
  gsap.config({
    force3D: true,
    nullTargetWarn: false
  });
}

interface ServiceData {
  id: string;
  title: string;
  description: string;
  services: string[];
  backgroundColor: string;
  textColor: string;
  mediaType: 'image' | 'video';
  mediaSrc: string;
  isStackable?: boolean;
}

const servicesData: ServiceData[] = [
  {
    id: 'brand-strategy',
    title: 'Brand Strategy',
    description: "It's the core of your company's identity. It guides all business decisions, ensuring a consistent and impactful presence in the market.",
    services: [
      'Research & Insights',
      'Unique Ways',
      'Purpose, Mission, Vision',
      'Value Proposition',
      'Personality Traits',
      'Verbal Identity',
      'Naming'
    ],
    backgroundColor: '#f8cadb',
    textColor: '#222222',
    mediaType: 'image',
    mediaSrc: '/api/placeholder/600/400',
    isStackable: true
  },
  {
    id: 'visual-identity',
    title: 'Visual Identity',
    description: 'Visual identity is the unique visual language of your brand, creating memorable impressions and emotional connections with your audience.',
    services: [
      'Logotype, Typography & Colour',
      'Illustrations & 3D',
      'Photography Art Direction',
      'Brand Book & Guidelines',
      'Animations',
      'Video Production',
      'Product Design'
    ],
    backgroundColor: '#c3a5f6',
    textColor: '#222222',
    mediaType: 'video',
    mediaSrc: '/api/placeholder/600/400',
    isStackable: true
  },
  {
    id: 'website',
    title: 'Website',
    description: 'Our website design services blend innovation and creativity to deliver user-centric solutions that elevate your brand and engage your audience.',
    services: [
      'UX Design',
      'User Testing',
      'Product Prototype',
      'Mobile UI',
      'Software UI design',
      'Web app design',
      'Interaction design'
    ],
    backgroundColor: '#ffffff',
    textColor: '#222222',
    mediaType: 'image',
    mediaSrc: '/api/placeholder/600/400',
    isStackable: true
  },
  {
    id: 'product',
    title: 'Product',
    description: 'Our product design services focus on creating intuitive and aesthetically pleasing products that resonate with your audience and stand out in the market.',
    services: [
      'UX Design',
      'User Testing',
      'Product Prototype',
      'Mobile UI',
      'Software UI design',
      'Web app design',
      'Interaction design'
    ],
    backgroundColor: '#fcd94a',
    textColor: '#222222',
    mediaType: 'video',
    mediaSrc: '/api/placeholder/600/400',
    isStackable: true
  },
  {
    id: 'contact',
    title: "Let's Work Together",
    description: 'Ready to transform your brand and create something extraordinary? Get in touch and let\'s discuss your project.',
    services: [
      'Free Consultation',
      'Project Planning',
      'Timeline Discussion',
      'Budget Planning',
      'Team Introduction',
      'Strategy Session'
    ],
    backgroundColor: '#222222',
    textColor: '#ffffff',
    mediaType: 'image',
    mediaSrc: '/api/placeholder/600/400'
  }
];

// Hero Section with Enhanced Animations
const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Enhanced hero entrance animation - FASTER
    const tl = gsap.timeline();
    
    // Background particles entrance - FASTER
    tl.fromTo('.floating-particle', {
      scale: 0,
      opacity: 0,
      rotation: 180
    }, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.8, // Reduced from 1.5
      stagger: 0.15, // Reduced from 0.3
      ease: 'back.out(1.7)'
    });

    tl.fromTo('.hero-title', {
      y: 100,
      opacity: 0,
      rotationX: 45
    }, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.7, // Reduced from 1.2
      ease: 'power3.out'
    }, '-=0.6'); // Reduced overlap

    tl.fromTo('.hero-subtitle', {
      y: 50,
      opacity: 0,
      scale: 0.9
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5, // Reduced from 0.8
      ease: 'power2.out'
    }, '-=0.4'); // Reduced overlap

    tl.fromTo('.hero-cta', {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.4, // Reduced from 0.6
      ease: 'power2.out'
    }, '-=0.3'); // Reduced overlap

    // Mouse move parallax effect - SMOOTHER
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });

      gsap.to('.floating-particle', {
        x: x * 30,
        y: y * 20,
        duration: 0.6, // Reduced from 1
        ease: 'power2.out',
        stagger: 0.05 // Reduced from 0.1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center relative overflow-hidden">
      {/* Enhanced background decoration with parallax */}
      <div className="absolute inset-0 opacity-30">
        <div className="floating-particle absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="floating-particle absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="floating-particle absolute top-1/2 left-1/2 w-40 h-40 bg-blue-400 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Floating geometric shapes */}
        <div className="floating-particle absolute top-20 right-20 w-4 h-4 bg-white/20 rounded rotate-45 animate-bounce delay-500"></div>
        <div className="floating-particle absolute bottom-40 left-20 w-6 h-6 bg-purple-300/30 rounded-full animate-bounce delay-1000"></div>
        <div className="floating-particle absolute top-60 left-1/3 w-3 h-3 bg-pink-300/40 rounded rotate-12 animate-bounce delay-1500"></div>
      </div>
      
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-8">
        <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-black mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent cursor-default hover:scale-105 transition-transform duration-500">
          Our Services
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
          Transforming ideas into extraordinary digital experiences through strategic design, 
          innovative technology, and creative excellence.
        </p>
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="group bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform hover:shadow-2xl">
            <span className="group-hover:tracking-wider transition-all duration-300">Explore Services</span>
          </button>
          <div className="flex items-center space-x-4 text-gray-400">
            <div className="animate-bounce hover:animate-pulse cursor-pointer">↓</div>
            <span className="text-sm hover:text-white transition-colors duration-300 cursor-default">Scroll to discover</span>
            <div className="animate-bounce hover:animate-pulse cursor-pointer">↓</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Sticky Navigation Component
const StickyNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Enhanced Sticky Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' 
          : 'bg-white/90 backdrop-blur-md border-b border-gray-200/30'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left - Services Label with hover effect */}
            <div className="text-sm font-medium text-gray-700 tracking-wide hover:text-gray-900 hover:tracking-widest transition-all duration-300 cursor-default">
              Services
            </div>
            
            {/* Center - Company Logo with hover effect */}
            <div className="text-xl font-bold text-gray-900 tracking-tight hover:scale-110 hover:tracking-wider transition-all duration-300 cursor-pointer">
              SERIOUS.BUSINESS
            </div>
            
            {/* Right - CTA and Menu */}
            <div className="flex items-center space-x-6">
              <button className="hidden md:block bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:tracking-wider">
                Let's work
              </button>
              
              {/* Enhanced Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="group flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-105"
              >
                <span className="text-sm font-medium group-hover:tracking-wider transition-all duration-300">Menu</span>
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <span className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl">
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-8">
              <h2 className="text-6xl font-bold text-gray-900 mb-12 hover:scale-110 transition-transform duration-500 cursor-default">Menu</h2>
              <nav className="space-y-6">
                {['Home', 'Services', 'Work', 'About', 'Contact'].map((item, index) => (
                  <a 
                    key={item}
                    href="#" 
                    className="block text-3xl font-medium text-gray-700 hover:text-gray-900 hover:scale-110 hover:tracking-wider transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Enhanced Service Section Component
const ServiceSection = ({ service, index }: { service: ServiceData; index: number }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const details = detailsRef.current;
    const media = mediaRef.current;

    if (!section || !content || !title || !details || !media) return;

    // Only apply stacking animation to stackable sections
    if (service.isStackable) {
      // Pin the section and create stacking effect - SMOOTHER
      ScrollTrigger.create({
        trigger: section,
        start: 'top top+=64',
        end: 'bottom top+=64',
        pin: true,
        pinSpacing: false,
        scrub: 0.5, // Added smooth scrubbing
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          
          if (progress < 0.6) {
            // First phase: Fade out details while keeping title visible
            gsap.set(details, {
              opacity: 1 - (progress / 0.6),
              y: -(progress / 0.6) * 30,
              ease: 'power2.out'
            });
            
            gsap.set(media, {
              opacity: 1 - (progress / 0.6),
              scale: 1 - (progress / 0.6) * 0.1,
              y: -(progress / 0.6) * 20,
              ease: 'power2.out'
            });
            
            // Keep section in place during detail fade-out
            gsap.set(section, {
              y: 0,
              transformOrigin: 'center top'
            });
          } else {
            // Second phase: Move entire section up (with only title visible)
            const moveProgress = (progress - 0.6) / 0.4;
            
            gsap.set(details, {
              opacity: 0,
              y: -30
            });
            
            gsap.set(media, {
              opacity: 0,
              scale: 0.9,
              y: -20
            });
            
            gsap.set(section, {
              y: -moveProgress * 100,
              transformOrigin: 'center top',
              ease: 'power2.out'
            });
          }
        }
      });
    }

    // Enhanced Initial animation when section comes into view - SMOOTHER
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        scrub: false // Keep entrance animations crisp
      }
    });

    tl.fromTo(title, {
      y: 50,
      opacity: 0,
      rotationX: 15
    }, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.6, // Slightly faster
      ease: 'power3.out'
    });

    tl.fromTo(details.children, {
      y: 30,
      opacity: 0,
      rotationY: 5
    }, {
      y: 0,
      opacity: 1,
      rotationY: 0,
      duration: 0.4, // Faster
      stagger: 0.08, // Faster stagger
      ease: 'power2.out'
    }, '-=0.3');

    tl.fromTo(media, {
      scale: 0.8,
      opacity: 0,
      rotationY: 15
    }, {
      scale: 1,
      opacity: 1,
      rotationY: 0,
      duration: 0.6, // Slightly faster
      ease: 'back.out(1.7)'
    }, '-=0.4');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [index, service.isStackable]);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[70vh] min-h-[500px] overflow-hidden"
      style={{ backgroundColor: service.backgroundColor }}
    >
      <div ref={contentRef} className="relative h-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center">
            
            {/* Enhanced Left Content */}
            <div className="space-y-8">
              {/* Title with hover effects */}
              <div ref={titleRef}>
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.85] tracking-tight cursor-default hover:tracking-tighter transition-all duration-500 hover:scale-105"
                  style={{ color: service.textColor }}
                >
                  {service.title}
                </h1>
              </div>
              
              {/* Enhanced Details */}
              <div ref={detailsRef} className="space-y-6 pb-8">
                {/* Description with hover effect */}
                <p 
                  className="text-lg md:text-xl leading-relaxed max-w-2xl hover:text-opacity-100 transition-all duration-300 cursor-default"
                  style={{ color: service.textColor, opacity: 0.8 }}
                >
                  {service.description}
                </p>
                
                {/* Enhanced Services List */}
                <div className="space-y-3">
                  {service.services.slice(0, 5).map((serviceItem, serviceIndex) => (
                    <div
                      key={serviceIndex}
                      className="group flex items-center space-x-3 cursor-pointer transition-all duration-300 hover:translate-x-4 hover:scale-105"
                    >
                      <div 
                        className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:rotate-180"
                        style={{ backgroundColor: service.textColor }}
                      ></div>
                      <span 
                        className="text-base md:text-lg font-medium transition-all duration-300 group-hover:opacity-100 group-hover:tracking-wide"
                        style={{ color: service.textColor, opacity: 0.8 }}
                      >
                        {serviceItem}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Enhanced CTA Button */}
                <div className="pt-4">
                  <button 
                    className="group px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-2xl hover:tracking-wider relative overflow-hidden"
                    style={{ 
                      backgroundColor: service.textColor === '#ffffff' ? '#ffffff' : '#222222',
                      color: service.textColor === '#ffffff' ? '#222222' : '#ffffff'
                    }}
                  >
                    <span className="relative z-10 group-hover:animate-pulse">Learn More</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Enhanced Right Media */}
            <div ref={mediaRef} className="relative lg:pl-12">
              <div className="relative group cursor-pointer">
                {service.mediaType === 'video' ? (
                  <div className="aspect-video bg-gray-300/20 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-sm border border-white/20 group-hover:shadow-4xl group-hover:scale-105 transition-all duration-500">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <svg className="w-8 h-8 text-white group-hover:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p className="text-white font-medium group-hover:scale-110 transition-transform duration-300">Video Preview</p>
                      <p className="text-white/70 text-sm mt-2 group-hover:text-white transition-colors duration-300">Interactive media showcase</p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-300/20 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-sm border border-white/20 group-hover:shadow-4xl group-hover:scale-105 transition-all duration-500">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <svg className="w-8 h-8 text-white group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-white font-medium group-hover:scale-110 transition-transform duration-300">Portfolio Preview</p>
                      <p className="text-white/70 text-sm mt-2 group-hover:text-white transition-colors duration-300">Visual case studies</p>
                    </div>
                  </div>
                )}
                
                {/* Enhanced Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-100"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Background decorations */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <div 
            className="w-full h-full animate-pulse"
            style={{
              background: `radial-gradient(circle at 70% 30%, ${service.textColor} 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Footer Section (NOT part of stacking animation)
const FooterSection = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Enhanced Footer entrance animation - FASTER
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.footer-content > *', {
      y: 50,
      opacity: 0,
      rotationX: 10
    }, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.6, // Reduced from 0.8
      stagger: 0.1, // Reduced from 0.2
      ease: 'power2.out'
    });

    // Floating animation for background elements - SMOOTHER
    gsap.to('.footer-float', {
      y: -20,
      duration: 2, // Reduced from 3
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.3 // Reduced from 0.5
    });
  }, []);

  return (
    <footer ref={footerRef} className="relative min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600"></div>
        <div className="footer-float absolute top-1/3 left-1/3 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="footer-float absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="footer-float absolute top-20 right-20 w-32 h-32 bg-blue-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="footer-content relative z-10 text-center text-white max-w-4xl mx-auto px-8 space-y-12">
        <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default">
          Ready to Create?
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto hover:text-white transition-colors duration-300">
          Let's transform your vision into reality. Our team of experts is ready to bring 
          your next project to life with innovation, creativity, and technical excellence.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
          <button className="group bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-110 transform hover:shadow-2xl relative overflow-hidden">
            <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">Start Your Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
          <button className="group border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-110 transform hover:shadow-2xl">
            <span className="group-hover:tracking-wider transition-all duration-300">Schedule a Call</span>
          </button>
        </div>
        
        <div className="pt-12 border-t border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'Services', items: ['Brand Strategy', 'Visual Identity', 'Web Design', 'Product Design'] },
              { title: 'Company', items: ['About Us', 'Our Work', 'Careers', 'Contact'] },
              { title: 'Connect', items: ['LinkedIn', 'Twitter', 'Instagram', 'Dribbble'] }
            ].map((section, sectionIndex) => (
              <div key={section.title} className="group">
                <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-300 transition-colors duration-300">{section.title}</h3>
                <div className="space-y-2 text-gray-400">
                  {section.items.map((item, itemIndex) => (
                    <p key={item} className="hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
            <p className="hover:text-gray-300 transition-colors duration-300 cursor-default">&copy; 2024 Serious Business. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function SeriousBusinessClone() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Enhanced smooth scrolling setup
    if (typeof window !== 'undefined') {
      // Add smooth scrolling to document
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Configure GSAP for smoother performance
      gsap.ticker.fps(60);
      gsap.config({
        force3D: true,
        nullTargetWarn: false
      });
      
      // Optimize ScrollTrigger for smooth performance
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
      });
    }
    
    // Refresh ScrollTrigger after mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-4 animate-pulse">Loading Experience...</div>
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <style jsx global>{`
        * {
          scroll-behavior: smooth;
        }
        
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 64px;
        }
        
        body {
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
        
        /* Webkit scrollbar styling for smooth appearance */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
          transition: background 0.3s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
        
        /* Smooth focus transitions */
        *:focus {
          outline: none;
          transition: all 0.3s ease;
        }
        
        /* Enhanced smooth transitions for all elements */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
      
      <StickyNavigation />
      <HeroSection />
      
      {/* Service Sections (Only these participate in stacking) */}
      <main>
        {servicesData.map((service, index) => (
          <ServiceSection 
            key={service.id} 
            service={service} 
            index={index} 
          />
        ))}
      </main>
      
      {/* Spacer Section for breathing room */}
      <section className="h-32 md:h-48 lg:h-64 bg-gradient-to-b from-transparent to-gray-900/10"></section>
      
      {/* Footer Section (Separate, not part of stacking) */}
      <FooterSection />
    </div>
  );
}