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
    mediaType: 'video',
    mediaSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isStackable: true
  },
  {
    id: 'visual-identity',
    title: 'Visual Identity',
    description: 'Visual identity is the unique visual language of your brand, creating memorable impressions and emotional connections with your audience.',
    services: [
      'Logotype, Typography',
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
    mediaSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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
    mediaType: 'video',
    mediaSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
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
    mediaSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    isStackable: true
  }
];

// Thin Services Header Component
const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-2">
        <div className="flex items-center justify-center">
          <h1 className="text-lg font-bold text-gray-900">Services</h1>
        </div>
      </div>
    </header>
  );
};

// Service Section Component - Thin cards with proper stacking
const ServiceSection = ({ service, index }: { service: ServiceData; index: number }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video playback when hover state changes
  useEffect(() => {
    if (hoveredService && videoRef.current) {
      // Small delay to ensure video element is rendered
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(console.log);
        }
      }, 100);
    }
  }, [hoveredService]);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const details = detailsRef.current;
    const media = mediaRef.current;

    if (!section || !content || !title || !details || !media) return;

    // Stacking animation that reveals content then stacks properly
    ScrollTrigger.create({
      trigger: section,
      start: 'top top', // Start when it reaches the top
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
      scrub: 0.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        
        if (progress < 0.7) {
          // Phase 1: Show full content
          gsap.set(details, {
            opacity: 1,
            y: 0,
            scale: 1
          });
          
          gsap.set(media, {
            opacity: 1,
            scale: 1,
            y: 0
          });
          
          gsap.set(section, {
            y: 0,
            scale: 1,
            transformOrigin: 'center top'
          });
        } else {
          // Phase 2: Fade content and move section up for stacking
          const stackProgress = (progress - 0.7) / 0.3;
          
          gsap.set(details, {
            opacity: 1 - stackProgress,
            y: -stackProgress * 30,
            scale: 1 - (stackProgress * 0.1)
          });
          
          gsap.set(media, {
            opacity: 1 - stackProgress,
            scale: 1 - (stackProgress * 0.1),
            y: -stackProgress * 20
          });
          
          gsap.set(section, {
            y: -stackProgress * 60,
            scale: 1 - (stackProgress * 0.05),
            transformOrigin: 'center top'
          });
        }
      }
    });

    // Initial animation when section comes into view
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate title entrance
    tl.fromTo(title, {
      y: 30,
      opacity: 0,
      rotationX: 15
    }, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Animate description
    tl.fromTo(details.querySelector('p'), {
      y: 20,
      opacity: 0,
      x: -20
    }, {
      y: 0,
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.5');

    // Animate service items with stagger
    tl.fromTo(details.querySelectorAll('.grid > div'), {
      y: 15,
      opacity: 0,
      scale: 0.9,
      rotationY: 10
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'back.out(1.7)'
    }, '-=0.4');

    // Animate media with parallax effect
    tl.fromTo(media, {
      scale: 0.8,
      opacity: 0,
      rotationY: 15,
      y: 30
    }, {
      scale: 1,
      opacity: 1,
      rotationY: 0,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');

    // Remove the floating animation - commented out
    // gsap.to(details.querySelectorAll('.grid > div'), {
    //   y: -2,
    //   duration: 2,
    //   ease: 'power2.inOut',
    //   yoyo: true,
    //   repeat: -1,
    //   stagger: {
    //     amount: 1,
    //     from: 'random'
    //   }
    // });

    // Add subtle pulsing animation to media
    gsap.to(media.querySelector('.group'), {
      scale: 1.02,
      duration: 3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [index]);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[90vh] sm:h-[70vh] lg:h-[45vh] min-h-[600px] sm:min-h-[500px] lg:min-h-[350px]"
      style={{ backgroundColor: service.backgroundColor }}
    >
      <div ref={contentRef} className="h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 h-full items-center py-6 sm:py-4">
            {/* Left Content */}
            <div className="space-y-4">
              {/* Title */}
              <div ref={titleRef}>
                <h2 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2 transition-all duration-500 hover:scale-105 hover:tracking-wider relative group"
                  style={{ 
                    color: service.textColor,
                    cursor: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' fill='${encodeURIComponent(service.textColor)}' stroke-width='2'/%3E%3Ccircle cx='12' cy='12' r='3' fill='${encodeURIComponent(service.textColor)}'/%3E%3C/svg%3E") 12 12, default`
                  }}
                >
                  {/* Premium text glow effect */}
                  <span 
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-all duration-500 blur-md"
                    style={{ 
                      color: service.textColor,
                      textShadow: service.textColor === '#222222' 
                        ? '0 0 20px rgba(34,34,34,0.3)'
                        : '0 0 20px rgba(255,255,255,0.4)'
                    }}
                  >
                    {service.title}
                  </span>
                  <span className="relative z-10 group-hover:drop-shadow-lg">
                    {service.title}
                  </span>
                </h2>
              </div>
              
              {/* Details */}
              <div ref={detailsRef} className="space-y-4">
                {/* Description */}
                <p 
                  className="text-sm sm:text-base leading-relaxed max-w-lg transition-all duration-500 hover:opacity-100 hover:transform hover:translate-x-2 relative group"
                  style={{ 
                    color: service.textColor, 
                    opacity: 0.85,
                    cursor: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='8' fill='${encodeURIComponent(service.backgroundColor)}' stroke='${encodeURIComponent(service.textColor)}' stroke-width='2'/%3E%3Ccircle cx='10' cy='10' r='3' fill='${encodeURIComponent(service.textColor)}'/%3E%3C/svg%3E") 10 10, text`
                  }}
                >
                  {/* Subtle background glow on hover */}
                  <span 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-500 blur-xl rounded-lg"
                    style={{ 
                      background: service.textColor === '#222222' 
                        ? `radial-gradient(ellipse at center, rgba(34,34,34,0.1) 0%, transparent 70%)`
                        : `radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)`
                    }}
                  />
                  <span className="relative z-10 group-hover:drop-shadow-sm">
                    {service.description}
                  </span>
                </p>
                
                {/* Services List - Compact grid with animations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.services.slice(0, 6).map((serviceItem, serviceIndex) => (
                    <div 
                      key={serviceIndex}
                      className="group text-xs sm:text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md relative overflow-hidden backdrop-blur-sm inline-block w-fit"
                      style={{ 
                        color: service.textColor, 
                        opacity: 0.85,
                        animationDelay: `${serviceIndex * 100}ms`,
                        cursor: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='8' fill='${encodeURIComponent(service.backgroundColor)}' stroke='${encodeURIComponent(service.textColor)}' stroke-width='2'/%3E%3C/svg%3E") 10 10, pointer`
                      }}
                      onMouseEnter={(e) => {
                        console.log('Hovering over:', serviceItem); // Debug log
                        setHoveredService(serviceItem);
                        const rect = e.currentTarget.getBoundingClientRect();
                        setModalPosition({
                          x: rect.right + 10,
                          y: rect.top + (rect.height / 2)
                        });
                      }}
                      onMouseLeave={() => {
                        console.log('Leaving hover'); // Debug log
                        setHoveredService(null);
                      }}
                    >
                      {/* Premium hover effect background - sized to text */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg"
                        style={{ 
                          background: service.textColor === '#222222' 
                            ? `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.25) 100%)`
                            : `linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.15) 100%)`
                        }}
                      />
                      
                      {/* Subtle inner glow - sized to text */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-all duration-500 rounded-lg blur-sm"
                        style={{ 
                          background: service.textColor === '#222222' 
                            ? `radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)`
                            : `radial-gradient(circle at center, rgba(34,34,34,0.1) 0%, transparent 70%)`
                        }}
                      />
                      
                      {/* Text with enhanced micro-interaction */}
                      <span className="relative z-10 group-hover:font-semibold group-hover:tracking-wide transition-all duration-300 group-hover:text-opacity-100 whitespace-nowrap"
                            style={{ 
                              color: service.textColor,
                              textShadow: service.textColor === '#222222' 
                                ? 'none' 
                                : '0 1px 2px rgba(0,0,0,0.1)'
                            }}>
                        {serviceItem}
                      </span>
                      
                      {/* Premium animated accent line - sized to text */}
                      <div 
                        className="absolute bottom-1 left-3 h-0.5 w-0 group-hover:w-[calc(100%-24px)] transition-all duration-500 rounded-full"
                        style={{ 
                          background: service.textColor === '#222222' 
                            ? `linear-gradient(90deg, rgba(34,34,34,0.6) 0%, rgba(34,34,34,0.9) 100%)`
                            : `linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.9) 100%)`
                        }}
                      />
                      
                      {/* Corner accent dot */}
                      <div 
                        className="absolute top-1 right-1 w-1 h-1 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-300 delay-100"
                        style={{ backgroundColor: service.textColor }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Media */}
            <div ref={mediaRef} className="relative h-full flex items-center justify-center">
              <div 
                className="group w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 relative"
                style={{
                  cursor: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' fill='${encodeURIComponent(service.backgroundColor)}' stroke='${encodeURIComponent(service.textColor)}' stroke-width='2'/%3E%3Ccircle cx='12' cy='12' r='4' fill='${encodeURIComponent(service.textColor)}'/%3E%3C/svg%3E") 12 12, pointer`
                }}
              >
                {/* Premium gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  style={{
                    background: service.backgroundColor === '#ffffff' 
                      ? 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)'
                  }}
                />
                
                {/* Enhanced play indicator for videos */}
                {service.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div 
                      className="w-16 h-16 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 border-2 border-white/30"
                      style={{
                        background: service.backgroundColor === '#ffffff'
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)'
                          : 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)'
                      }}
                    >
                      <svg 
                        className="w-8 h-8 ml-1 transition-transform duration-300 group-hover:scale-110" 
                        fill={service.backgroundColor === '#ffffff' ? '#222222' : '#ffffff'} 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
                
                {/* Media content */}
                {service.mediaType === 'video' ? (
                  <video
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={service.mediaSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={service.mediaSrc}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                
                {/* Premium animated border with color adaptation */}
                <div 
                  className="absolute inset-0 border-2 border-transparent group-hover:border-opacity-40 rounded-xl transition-all duration-500"
                  style={{
                    borderColor: service.textColor === '#222222' 
                      ? 'rgba(255,255,255,0.4)' 
                      : 'rgba(34,34,34,0.3)'
                  }}
                />
                
                {/* Enhanced corner decorations with color harmony */}
                <div 
                  className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-0 group-hover:opacity-80 group-hover:animate-ping transition-all duration-500"
                  style={{ 
                    background: service.textColor === '#222222' 
                      ? 'linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))'
                      : 'linear-gradient(45deg, rgba(34,34,34,0.6), rgba(34,34,34,0.3))'
                  }}
                />
                <div 
                  className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-bounce transition-all duration-500 delay-150"
                  style={{ 
                    background: service.textColor === '#222222' 
                      ? 'rgba(255,255,255,0.6)'
                      : 'rgba(34,34,34,0.5)'
                  }}
                />
                
                {/* Subtle inner highlight */}
                <div 
                  className="absolute top-0 left-0 w-full h-1/3 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-t-xl"
                  style={{
                    background: service.backgroundColor === '#ffffff'
                      ? 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)'
                      : 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Modal Video */}
      {hoveredService && (
        <div 
          className="fixed z-50 pointer-events-none transition-all duration-300 animate-fade-in-up"
          style={{
            left: `${modalPosition.x}px`,
            top: `${modalPosition.y - 60}px`,
            transform: 'translateY(-50%)'
          }}
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 overflow-hidden">
            <div className="w-48 h-28 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                key={hoveredService} // Force re-render for each service
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedData={(e) => {
                  // Ensure video plays when loaded
                  const video = e.target as HTMLVideoElement;
                  video.play().catch(console.log);
                }}
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Contact Section - Redesigned to match card aesthetic
const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.contact-content > *', {
      y: 30,
      opacity: 0,
      rotationX: 10
    }, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[70vh] sm:h-[50vh] min-h-[500px] sm:min-h-[400px] bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center"
    >
              <div className="contact-content max-w-4xl mx-auto px-4 sm:px-6 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 h-full items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2 text-white transition-all duration-500 hover:scale-105 hover:tracking-wider relative group"
                style={{
                  cursor: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23ffffff' stroke='%23000000' stroke-width='2'/%3E%3Ccircle cx='12' cy='12' r='4' fill='%23000000'/%3E%3C/svg%3E") 12 12, default`
                }}
              >
                {/* Premium text glow effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-all duration-500 blur-md text-white">
                  Let&apos;s Work Together
                </span>
                <span className="relative z-10 group-hover:drop-shadow-lg">
                  Let&apos;s Work Together
                </span>
              </h2>
            </div>
            
            <div className="space-y-4">
              <p 
                className="text-base leading-relaxed text-white/85 transition-all duration-500 hover:opacity-100 hover:transform hover:translate-x-2 relative group"
                style={{
                  cursor: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='8' fill='%23ffffff' stroke='%23000000' stroke-width='2'/%3E%3Ccircle cx='10' cy='10' r='3' fill='%23000000'/%3E%3C/svg%3E") 10 10, text`
                }}
              >
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-500 blur-xl rounded-lg"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)' }}
                />
                <span className="relative z-10 group-hover:drop-shadow-sm">
                  Ready to transform your brand? Let&apos;s discuss your project and create something extraordinary together.
                </span>
              </p>
              
              {/* Contact Services List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {['Free Consultation', 'Project Planning', 'Timeline Discussion', 'Budget Planning', 'Team Introduction', 'Strategy Session'].map((contactItem, contactIndex) => (
                  <div 
                    key={contactIndex}
                    className="group text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md relative overflow-hidden backdrop-blur-sm inline-block w-fit"
                    style={{ 
                      color: '#ffffff', 
                      opacity: 0.85,
                      animationDelay: `${contactIndex * 100}ms`,
                      cursor: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='8' fill='%23ffffff' stroke='%23000000' stroke-width='2'/%3E%3C/svg%3E") 10 10, pointer`
                    }}
                  >
                    {/* Premium hover effect background */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.25) 100%)' }}
                    />
                    
                    {/* Text with enhanced micro-interaction */}
                    <span className="relative z-10 group-hover:font-semibold group-hover:tracking-wide transition-all duration-300 whitespace-nowrap">
                      {contactItem}
                    </span>
                    
                    {/* Premium animated accent line */}
                    <div 
                      className="absolute bottom-1 left-3 h-0.5 w-0 group-hover:w-[calc(100%-24px)] transition-all duration-500 rounded-full"
                      style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.9) 100%)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - CTA Buttons */}
          <div className="flex flex-col space-y-4 items-center sm:items-start lg:items-end mt-6 lg:mt-0">
            <button 
              className="group bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden w-full sm:w-auto"
              style={{
                cursor: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23000000' stroke='%23ffffff' stroke-width='2'/%3E%3Ccircle cx='12' cy='12' r='4' fill='%23ffffff'/%3E%3C/svg%3E") 12 12, pointer`
              }}
            >
              <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">Start a Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
            </button>
            
            <button 
              className="group border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-500 hover:scale-105 hover:bg-white hover:text-gray-900 hover:shadow-2xl w-full sm:w-auto"
              style={{
                cursor: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23ffffff' stroke='%23000000' stroke-width='2'/%3E%3Ccircle cx='12' cy='12' r='4' fill='%23000000'/%3E%3C/svg%3E") 12 12, pointer`
              }}
            >
              <span className="group-hover:tracking-wider transition-all duration-300">View Our Work</span>
            </button>
          </div>
        </div>
      </div>

      {/* Background decorations matching card aesthetic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-20 right-20 w-20 h-20 bg-pink-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Enhanced smooth scrolling setup
    if (typeof window !== 'undefined') {
      // Configure GSAP for smoother performance
      gsap.ticker.fps(60);
      gsap.config({
        force3D: true,
        nullTargetWarn: false
      });
      
      // Optimize ScrollTrigger
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
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
      
      <Header />
      
      {/* Service Sections */}
      <main className="pt-0">
        {servicesData.map((service, index) => (
          <ServiceSection 
            key={service.id} 
            service={service} 
            index={index} 
          />
        ))}
      </main>
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}