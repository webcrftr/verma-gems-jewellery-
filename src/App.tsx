/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { 
  Diamond, 
  Gem, 
  Hammer, 
  Truck, 
  ShieldCheck, 
  Gem as GemIcon, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Menu, 
  X,
  ArrowUpRight,
  Download,
  Clock,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Constants & Types ---

const CONTACT_INFO = {
  phone: "+91 98201 60245",
  whatsapp: "919820160245",
  email: "varmagemsandjewellery@gmail.com",
  address: "40/42, 6A Ruby Chambers, 6th Floor, Dhanji Street, Zaveri Bazar, Mumbai - 400003",
  owner: "M. G. Varma (Manoj)"
};

const WHATSAPP_APPOINTMENT_MSG = encodeURIComponent("Hello Varma Gems, I want to enquire about your products.");
const WHATSAPP_GENERAL_MSG = encodeURIComponent("Hello Varma Gems, I want to enquire about your products.");

const IMAGES = {
  hero: "https://iili.io/BidZDDN.md.jpg",
  precious: "https://iili.io/BidmvrF.md.jpg",
  semiprecious: "https://iili.io/BidmU7a.md.jpg",
  custom: "https://iili.io/BidmWej.md.jpg",
  heritage: "https://iili.io/BidmSdg.md.jpg",
  b2b: "https://iili.io/BidmgkJ.md.jpg",
};

const COLLECTIONS = [
  {
    id: "precious",
    title: "Precious Stones",
    category: "Ruby • Emerald • Sapphire",
    desc: "Investment-grade precious gemstones sourced directly from global mines.",
    image: IMAGES.precious,
    icon: <GemIcon className="w-5 h-5" />,
  },
  {
    id: "semiprecious",
    title: "Semi-Precious Stones",
    category: "Vibrant Collection",
    desc: "Exquisite variety of colored stones for retail and commercial applications.",
    image: IMAGES.semiprecious,
    icon: <Gem className="w-5 h-5" />,
  },
  {
    id: "custom",
    title: "Custom Jewellery",
    category: "Mastery",
    desc: "Bespoke diamond and gemstone settings handcrafted by Zaveri Bazaar artisans.",
    image: IMAGES.custom,
    icon: <Hammer className="w-5 h-5" />,
  },
];

// --- Components ---

const BackgroundAtmosphere = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/10 rounded-full blur-[150px] -mr-40 -mt-40" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] -ml-20 -mb-20" />
    <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[180px]" />
  </div>
);

const Navbar = ({ activePage, onPageChange }: { activePage: string, onPageChange: (page: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Collections", id: "collections" },
    { name: "Loose Gemstones", id: "gemstones" },
    { name: "Wholesale Portal", id: "wholesale" },
    { name: "Our Heritage", id: "heritage" },
  ];

  const handleLinkClick = (id: string) => {
    onPageChange(id);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 border-b border-white/5 ${
        isScrolled ? "bg-brand-navy/95 backdrop-blur-xl py-4 shadow-2xl" : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <button onClick={() => handleLinkClick('home')} className="flex flex-col group text-left">
          <span className="text-xl lg:text-2xl font-serif tracking-[0.2em] text-brand-gold leading-none uppercase group-hover:text-white transition-colors">Varma</span>
          <span className="text-[9px] lg:text-[10px] tracking-[0.4em] uppercase opacity-60 mt-1">Gems & Jewellery</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-[11px] uppercase tracking-widest font-medium transition-all hover:text-brand-gold border-b-2 ${
                activePage === link.id ? "text-brand-gold border-brand-gold" : "text-white/80 border-transparent"
              } pb-1`}
            >
              {link.name}
            </button>
          ))}
          <a 
            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_APPOINTMENT_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-brand-gold text-brand-gold text-[11px] uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 font-bold"
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white p-2 relative z-[110]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="fixed inset-0 bg-[#0b1c2c] z-[105] lg:hidden flex flex-col items-center justify-center p-8 overflow-hidden"
          >
            <div className="flex flex-col items-center space-y-10 w-full">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-3xl uppercase tracking-[0.2em] font-serif transition-all ${
                    activePage === link.id ? "text-brand-gold scale-110" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-10 w-full max-w-xs"
              >
                <a 
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_APPOINTMENT_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-gold text-brand-navy py-5 text-sm font-bold uppercase tracking-[0.2em] text-center block shadow-2xl active:scale-95 transition-all"
                >
                  Book Appointment
                </a>
              </motion.div>
            </div>

            <div className="absolute bottom-12 text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">
                Mumbai • Zaveri Bazaar
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="inline-block px-4 py-1.5 border border-brand-gold/40 text-brand-gold text-[10px] tracking-[0.2em] uppercase mb-8 font-bold rounded-full">
            Est. 1974 • Zaveri Bazaar, Mumbai
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[80px] font-serif leading-[1.1] mb-8 text-white">
            Premium Gemstones <br className="hidden lg:block" />
            <span className="text-brand-gold italic">& Jewellery</span> <br className="hidden lg:block" />
            Direct from <span className="opacity-80">Zaveri Bazaar</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 mb-10 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
            Certified diamonds, precious stones, and custom jewellery crafted by expert manufacturers. Experience the height of Mumbai's crafting legacy.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button 
              onClick={() => onNavigate('collections')}
              className="px-8 md:px-10 py-4 md:py-5 bg-brand-gold text-brand-navy text-xs font-bold uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(212,175,55,0.25)] hover:scale-105 transition-all duration-300 active:scale-95"
            >
              Explore Collection
            </button>
            <button 
              onClick={() => onNavigate('gemstones')}
              className="px-8 md:px-10 py-4 md:py-5 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-300 active:scale-95"
            >
              View Gemstones
            </button>
          </div>

          <div className="mt-16 flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-6 border-t border-white/10 pt-10">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] md:text-[11px] uppercase tracking-widest opacity-70 font-medium">Certified Quality</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] md:text-[11px] uppercase tracking-widest opacity-70 font-medium">Direct Pricing</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] md:text-[11px] uppercase tracking-widest opacity-70 font-medium">Global Export</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative group w-full max-w-xl mx-auto lg:max-w-none"
        >
          <div className="aspect-[4/5] lg:aspect-[3/4] relative overflow-hidden rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] border border-white/10 bg-brand-navy">
            <img 
              src={IMAGES.hero} 
              alt="Premium Gems & Jewellery Featured" 
              className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            
            {/* Overlay Info Card */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 p-6 md:p-8 glass-card border border-white/5 backdrop-blur-xl rounded-xl">
              <p className="text-brand-gold text-[9px] md:text-[10px] tracking-widest uppercase mb-1 font-bold">Zaveri Bazaar Signature</p>
              <h3 className="text-xl md:text-2xl mb-2 font-serif text-white">The Artisan's Masterpiece</h3>
              <p className="text-[10px] md:text-xs text-white/50 tracking-wide uppercase font-light">Direct Manufacturing Excellence</p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 border border-brand-gold/20 -z-10 rounded-2xl hidden md:block" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-brand-gold/20 -z-10 rounded-2xl hidden md:block" />
        </motion.div>
      </div>
    </section>
  );
};

const CollectionsSection = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <section id="collections" className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20">
          <div className="max-w-2xl">
            <h2 className="text-brand-gold text-xs tracking-[0.5em] uppercase mb-6 block">Legacy Curation</h2>
            <h3 className="text-5xl md:text-6xl text-white mb-8">Our Collections</h3>
            <p className="text-white/50 font-light leading-relaxed">
              Explore our master-crafted pieces that bridge the gap between Mumbai's storied traditions and the demands of modern luxury.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('collections')}
            className="flex items-center gap-3 text-white/40 hover:text-brand-gold transition-colors mt-8 lg:mt-0 uppercase text-[11px] tracking-widest font-bold group"
          >
            All Collections <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              onClick={() => onNavigate(item.id === 'precious' || item.id === 'semiprecious' ? 'gemstones' : 'collections')}
              className="relative overflow-hidden group border border-white/10 flex flex-col aspect-[4/5] bg-brand-navy p-8 cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent" />
              </div>
              
              <div className="mt-auto z-10">
                <p className="text-[10px] uppercase tracking-widest text-brand-gold mb-2">{item.category}</p>
                <h4 className="text-3xl mb-4 font-serif text-white">{item.title}</h4>
                <p className="text-xs text-white/60 mb-6 font-light leading-relaxed pr-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.desc}
                </p>
                <div className="w-12 h-12 border border-brand-gold/30 rounded-full flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HeritageSection = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <section id="heritage" className="py-20 lg:py-32 bg-white/5 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="w-full lg:w-1/2 relative">
          <div className="relative z-10 border border-brand-gold/20 p-2">
            <img 
              src={IMAGES.heritage} 
              alt="Zaveri Bazaar Mastery" 
              className="w-full h-[400px] lg:h-[600px] object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-6 lg:-top-12 -left-6 lg:-left-12 w-32 lg:w-64 h-32 lg:h-64 border border-brand-gold/10 hidden md:block pointer-events-none" />
          <div className="absolute -bottom-6 lg:bottom-12 -right-4 lg:-right-12 px-6 lg:px-8 py-8 lg:py-10 glass-card z-20 pointer-events-none transform scale-90 lg:scale-100">
            <span className="block text-3xl lg:text-4xl font-serif text-brand-gold mb-2">Since 1974</span>
            <span className="text-[9px] lg:text-[11px] uppercase tracking-[0.3em] opacity-60">Mumbai's Artisanal Hub</span>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <span className="text-brand-gold text-xs tracking-[0.5em] uppercase mb-6 block">Our Heritage Story</span>
          <h2 className="text-4xl lg:text-5xl font-serif text-white mb-8 leading-tight">Mastery in Every Cut.</h2>
          <p className="text-white/60 mb-8 leading-relaxed font-light text-base lg:text-lg">
            Located in the legendary Zaveri Bazaar, Varma Gems & Jewellery is more than a name—it's a testament to decades of industrial manufacturing and meticulous retailing.
          </p>
          <p className="text-white/40 leading-relaxed mb-12 font-light text-sm lg:text-base">
            Our workshop specializes in high-contrast gemstone detailing and premium diamond setting, providing unparalleled brilliance in every custom design. We honor the heritage while building the future of jewellery.
          </p>
          
          <div className="grid grid-cols-2 gap-8 lg:gap-10 mb-12">
            <div className="flex flex-col gap-2">
              <span className="text-3xl lg:text-4xl font-serif text-brand-gold opacity-80">9k+</span>
              <p className="text-[9px] lg:text-[10px] uppercase tracking-widest opacity-50">Custom Pieces Created</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl lg:text-4xl font-serif text-brand-gold opacity-80">50+</span>
              <p className="text-[9px] lg:text-[10px] uppercase tracking-widest opacity-50">Global Logistics Partners</p>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('heritage')}
            className="w-full lg:w-auto px-10 py-4 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all duration-300"
          >
            Read Full Journey
          </button>
        </div>
      </div>
    </section>
  );
};

const B2BPortal = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <section id="b2b" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="glass-card flex flex-col lg:flex-row overflow-hidden border border-brand-gold/10">
          <div className="w-full lg:w-1/2 p-8 lg:p-24 flex flex-col justify-center">
            <span className="text-brand-gold text-[10px] tracking-[0.5em] uppercase mb-8 block">Exclusive B2B Inquiries</span>
            <h2 className="text-4xl lg:text-5xl text-white font-serif mb-8 leading-tight">Wholesale & Export</h2>
            <p className="text-white/50 mb-12 font-light leading-relaxed max-w-md text-base lg:text-lg">
              Bulk supply of certified gemstones and jewelry directly from our manufacturing unit in Zaveri Bazaar. Access our global inventory with direct-to-manufacturer logistics.
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-center text-white/80 gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">✓</div>
                <span className="text-[10px] lg:text-[11px] uppercase tracking-widest font-bold">Direct Manufacturing Rates</span>
              </div>
              <div className="flex items-center text-white/80 gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">✦</div>
                <span className="text-[10px] lg:text-[11px] uppercase tracking-widest font-bold">GIA & IGI Certified Inventory</span>
              </div>
            </div>
            
            <div className="flex">
              <button 
                onClick={() => onNavigate('wholesale')}
                className="w-full lg:w-auto px-10 py-5 bg-brand-gold text-brand-navy font-bold tracking-widest uppercase hover:bg-brand-gold/90 transition-all text-xs"
              >
                Access Wholesale Portal
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[500px]">
             <img 
              src={IMAGES.b2b} 
              alt="Export Logistics" 
              className="w-full h-full object-cover opacity-40 lg:opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-navy to-transparent" />
            <div className="absolute bottom-12 left-12 lg:bottom-12 lg:left-12">
              <div className="flex flex-col uppercase tracking-[0.3em] font-serif text-xl lg:text-2xl text-brand-gold">
                <span>Global</span>
                <span>Standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactArea = () => {
  const [formData, setFormData] = useState({
    name: '',
    interest: 'Precious Stones',
    message: ''
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      alert("Please provide your name and a brief message regarding your requirements.");
      return;
    }

    const message = `Hello Varma Gems & Jewellery ✨

My name is ${formData.name}.

I am interested in your *${formData.interest}* collection.

Here are my requirements:
${formData.message}

Kindly share more details, pricing, and availability.

Thank you 😊`;

    const encodedMsg = encodeURIComponent(message);
    
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <h2 className="text-brand-gold text-xs tracking-[0.5em] uppercase mb-6 block">Direct Enquiry</h2>
            <h3 className="text-4xl lg:text-5xl font-serif text-white mb-10 leading-tight">Contact Us</h3>
            <div className="space-y-8 flex flex-col items-center lg:items-start">
              <div className="flex items-start gap-6 text-left">
                <MapPin className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-gold mb-2 font-bold">Location</p>
                  <p className="text-white/70 font-light leading-relaxed text-sm">{CONTACT_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 text-left">
                <Mail className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-gold mb-2 font-bold">Inquiries</p>
                  <p className="text-white/70 font-light text-sm truncate max-w-[200px] sm:max-w-none">{CONTACT_INFO.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 text-left">
                <Phone className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-gold mb-2 font-bold">Direct Line</p>
                  <p className="text-white/70 font-light text-sm">{CONTACT_INFO.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 glass-card border border-brand-gold/10 inline-block">
              <h4 className="text-brand-gold font-serif text-lg mb-2">{CONTACT_INFO.owner}</h4>
              <p className="text-[10px] text-white/40 tracking-widest uppercase">Proprietor</p>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <form className="p-8 lg:p-12 glass-card space-y-10" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Your Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-brand-gold transition-colors text-white font-light text-base" 
                    placeholder="e.g. Rahul Varma" 
                    required
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Interest</label>
                  <select 
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-brand-gold transition-colors text-white/80 font-light outline-none text-base"
                  >
                    <option className="bg-brand-navy">Precious Stones</option>
                    <option className="bg-brand-navy">Semi-Precious Stones</option>
                    <option className="bg-brand-navy">Custom Jewellery</option>
                    <option className="bg-brand-navy">Bulk Wholesale</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Message</label>
                  <textarea 
                    rows={3} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-brand-gold transition-colors text-white font-light resize-none text-base" 
                    placeholder="Share your requirements..." 
                    required
                  />
              </div>
              <button 
                type="submit"
                className="w-full bg-white/5 border border-brand-gold/30 text-brand-gold py-5 uppercase tracking-[0.3em] text-[11px] font-bold hover:bg-brand-gold hover:text-brand-navy transition-all active:scale-[0.98]"
              >
                Send Digital Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <footer className="bg-black/40 py-20 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 pb-20">
        <div className="lg:w-1/3">
          <div className="flex flex-col mb-8">
            <span className="text-2xl font-serif tracking-[0.2em] text-brand-gold leading-none uppercase">Varma</span>
            <span className="text-[10px] tracking-[0.4em] uppercase opacity-60 mt-1">Gems & Jewellery</span>
          </div>
          <p className="text-white/30 text-sm font-light leading-relaxed mb-8">
            Direct manufacturers and exporters of precious and semi-precious stones. Trustworthy and authentic crafting since 1974.
          </p>
          <div className="">
            <p className="text-xs uppercase tracking-widest text-brand-gold mb-2 font-bold">Flagship Workshop</p>
            <p className="text-white/50 text-xs leading-relaxed">{CONTACT_INFO.address}</p>
          </div>
        </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="flex flex-col gap-4">
              <span className="text-[11px] uppercase tracking-widest text-brand-gold/80 mb-2 font-bold">Quick Links</span>
              <button onClick={() => { onNavigate('collections'); window.scrollTo(0,0)}} className="text-white/40 text-sm hover:text-white transition-colors text-left uppercase tracking-widest">Collections</button>
              <button onClick={() => { onNavigate('gemstones'); window.scrollTo(0,0)}} className="text-white/40 text-sm hover:text-white transition-colors text-left uppercase tracking-widest">Gemstones</button>
              <button onClick={() => { onNavigate('wholesale'); window.scrollTo(0,0)}} className="text-white/40 text-sm hover:text-white transition-colors text-left uppercase tracking-widest">Wholesale</button>
              <button onClick={() => { onNavigate('heritage'); window.scrollTo(0,0)}} className="text-white/40 text-sm hover:text-white transition-colors text-left uppercase tracking-widest">Heritage</button>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[11px] uppercase tracking-widest text-brand-gold/80 mb-2 font-bold">Support</span>
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-white/40 text-sm hover:text-white transition-colors uppercase tracking-widest">Email Us</a>
              <a href={`tel:${CONTACT_INFO.phone}`} className="text-white/40 text-sm hover:text-white transition-colors uppercase tracking-widest">Call Expert</a>
              <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_APPOINTMENT_MSG}`} target="_blank" rel="noopener noreferrer" className="text-white/40 text-sm hover:text-white transition-colors uppercase tracking-widest">Book Slot</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
          <p>© 2026 Varma Gems & Jewellery. Zaveri Bazaar, Mumbai.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <span className="cursor-default">Privacy Protocol</span>
             <span className="cursor-default">Trade Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const StickyActions = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-white/20 transition-all hover:scale-110 active:scale-95"
          >
            <ArrowUpRight className="w-6 h-6 -rotate-45" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Action */}
      <a
        href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_GENERAL_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-end"
      >
        <span className="bg-white text-brand-navy text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-l shadow-xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 origin-right pointer-events-none">
          WhatsApp Inquiry
        </span>
        <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform group-active:scale-95 group-hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]">
          <MessageCircle className="w-7 h-7" />
        </div>
      </a>

      {/* Call Action */}
      <a
        href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
        className="group flex items-center justify-end"
      >
        <span className="bg-white text-brand-navy text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-l shadow-xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 origin-right pointer-events-none">
          Call Now
        </span>
        <div className="w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center text-brand-navy shadow-2xl hover:scale-110 transition-transform group-active:scale-95 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
          <Phone className="w-7 h-7" />
        </div>
      </a>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <CollectionsSection onNavigate={setCurrentPage} />
            <HeritageSection onNavigate={setCurrentPage} />
            <B2BPortal onNavigate={setCurrentPage} />
          </>
        );
      case "collections":
        return <CollectionsView />;
      case "gemstones":
        return <GemstonesView />;
      case "wholesale":
        return <WholesaleView />;
      case "heritage":
        return <HeritageView />;
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-brand-navy min-h-screen selection:bg-brand-gold selection:text-brand-navy overflow-hidden">
      <BackgroundAtmosphere />
      <Navbar activePage={currentPage} onPageChange={setCurrentPage} />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
        <ContactArea />
      </main>
      <Footer onNavigate={setCurrentPage} />
      <StickyActions />
    </div>
  );
}

// --- Specific Views ---

const CollectionsView = () => (
  <section className="pt-40 pb-20 container mx-auto px-6 lg:px-12">
    <h2 className="text-brand-gold text-xs tracking-[0.5em] uppercase mb-6">Exquisite Masterpieces</h2>
    <h3 className="text-5xl font-serif text-white mb-16">The Jewellery Collections</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {/* Expanded Collection Cards */}
      {[
        { title: "Engagement Rings", img: "https://iili.io/BidmEge.md.jpg" },
        { title: "Bridal Sets", img: "https://iili.io/Bidm119.md.jpg" },
        { title: "Diamond Necklaces", img: "https://iili.io/BidmV5b.md.jpg" },
        { title: "Gold Bracelets", img: "https://iili.io/BidmMdu.md.jpg" },
        { title: "Temple Jewellery", img: "https://iili.io/BidmWej.md.jpg" },
        { title: "Modern Minimal", img: "https://iili.io/BidmXmx.md.jpg" },
      ].map((cat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="group relative overflow-hidden aspect-square border border-white/10"
        >
          <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h4 className="text-2xl font-serif text-white">{cat.title}</h4>
            <button className="text-[10px] text-brand-gold uppercase tracking-[0.2em] mt-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">View Details</button>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const GemstonesView = () => (
  <section className="pt-40 pb-20 container mx-auto px-6 lg:px-12">
    <h2 className="text-brand-gold text-xs tracking-[0.5em] uppercase mb-6">Loose Gemstones</h2>
    <h3 className="text-5xl font-serif text-white mb-8">Certified Natural Stones</h3>
    <p className="text-white/60 max-w-2xl mb-16 font-light leading-relaxed text-lg">
      We source premium loose gemstones directly from mines in Thailand, Sri Lanka, and Africa. Every stone is certified by leading laboratories including GIA and IGI.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { name: "Rubies", color: "Crimson Red", img: "https://iili.io/BidmjzQ.md.jpg" },
        { name: "Emeralds", color: "Forest Green", img: "https://iili.io/BidmwXV.md.jpg" },
        { name: "Sapphires", color: "Royal Blue", img: "https://iili.io/BidmNLB.md.jpg" },
        { name: "Yellow Topaz", color: "Golden Sun", img: "https://iili.io/Bidmk11.md.jpg" },
      ].map((stone, i) => (
        <div key={i} className="glass-card p-6 border-brand-gold/10 group active:scale-95 transition-transform">
          <div className="aspect-square overflow-hidden mb-6 border border-white/5">
            <img src={stone.img} alt={stone.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1s]" />
          </div>
          <h4 className="text-xl font-serif text-white mb-2">{stone.name}</h4>
          <p className="text-[10px] text-brand-gold uppercase tracking-widest">{stone.color}</p>
        </div>
      ))}
    </div>
  </section>
);

const WholesaleView = () => (
  <section className="pt-40 pb-20 container mx-auto px-6 lg:px-12">
    <div className="flex flex-col lg:flex-row gap-20 items-center">
      <div className="lg:w-1/2">
        <h2 className="text-brand-gold text-xs tracking-[0.5em] uppercase mb-6">Global Supply</h2>
        <h3 className="text-5xl font-serif text-white mb-10">B2B & Export Portal</h3>
        <p className="text-white/60 mb-10 leading-relaxed font-light text-lg">
          Varma Gems & Jewellery has been a trusted supplier to international retailers and watchmakers since 1974. We provide bulk loose stones and white-label jewellery manufacturing.
        </p>
        <div className="space-y-6 mb-12">
          {["Direct Manufacturer Pricing", "GIA/IGI/HRD Certification", "In-house Logistics & Export Support", "Custom Cutting & Polishing"].map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-white/80">
              <div className="w-6 h-6 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0 text-[10px]">✓</div>
              <span className="text-xs uppercase tracking-[0.2em]">{item}</span>
            </div>
          ))}
        </div>
        <a 
          href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_GENERAL_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-12 py-5 bg-brand-gold text-brand-navy font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl"
        >
          Request Wholesale Pricing
        </a>
      </div>
      <div className="lg:w-1/2">
        <div className="relative p-2 border border-brand-gold/20">
          <img src={IMAGES.b2b} alt="B2B Supply" className="w-full aspect-[4/3] object-cover opacity-80" />
        </div>
      </div>
    </div>
  </section>
);

const HeritageView = () => (
  <section className="pt-40 pb-20 container mx-auto px-6 lg:px-12">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-brand-gold text-xs tracking-[0.5em] uppercase mb-6">Our Legacy</h2>
      <h3 className="text-5xl md:text-6xl font-serif text-white mb-10 leading-tight">Authenticity Crafted Over Generations</h3>
      <p className="text-xl text-white/60 font-light leading-relaxed mb-16">
        Founded in the heart of Mumbai's Zaveri Bazaar, our journey began with a simple philosophy: purity in stones and transparency in pricing. Today, M.G. Varma (Manoj) continues this heritage, combining ancestral wisdom with modern precision technology.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
      {[
        { title: "Zaveri Bazaar Roots", desc: "Operating from Mumbai's most historic jewelry district since 1974.", icon: <MapPin /> },
        { title: "Artisanal Excellence", desc: "Every stone is hand-sorted and every piece hand-set by master craftsmen.", icon: <Hammer /> },
        { title: "Global Trust", desc: "Exporting to over 20 countries with verified quality certifications.", icon: <ShieldCheck /> },
      ].map((item, i) => (
        <div key={i} className="text-center p-10 glass-card">
          <div className="w-16 h-16 border border-brand-gold/30 rounded-full flex items-center justify-center text-brand-gold mx-auto mb-8">
            {item.icon}
          </div>
          <h4 className="text-2xl font-serif text-white mb-4">{item.title}</h4>
          <p className="text-white/40 font-light text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);
