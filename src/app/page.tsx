"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { SiGlovo, SiUbereats } from "react-icons/si";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { menuData } from "@/data/menu";
import CookieBanner from "@/components/CookieBanner";

type Lang = "pt" | "en" | "fr";
type MenuTab = "build" | "nachos" | "drinks" | "desserts";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");
  const [activeTab, setActiveTab] = useState<MenuTab>("build");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const content = menuData[lang];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-lime-500 selection:text-black overflow-x-hidden relative">
      
      {/* Navigation */}
      <nav className="fixed w-full z-40 transition-all duration-300 bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
              <Image src="/logo.png" alt="Aguacate Logo" width={50} height={50} className="rounded-full" />
            </motion.div>
            <span className="text-xl font-bold tracking-tighter hidden sm:block group-hover:text-lime-500 transition-colors">Aguacate Tex-Mex</span>
          </Link>
          
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-lime-400 transition-colors">{content.nav.about}</a>
            <a href="#menu" className="hover:text-lime-400 transition-colors">{content.nav.menu}</a>
            <a href="#gallery" className="hover:text-lime-400 transition-colors">{content.nav.gallery}</a>
            <a href="#contact" className="hover:text-lime-400 transition-colors">{content.nav.contact}</a>
          </div>

          <div className="flex gap-2 bg-neutral-900 p-1 rounded-full border border-white/10">
            {(["pt", "en", "fr"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${lang === l ? "bg-lime-500 text-black shadow-lg" : "text-neutral-400 hover:text-white"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Floating Order Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Glovo */}
        <a 
          href="https://glovoapp.com/pt/pt/porto/stores/aguacate-1-opo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#FFC244] text-[#00A082] p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform flex items-center justify-center group relative"
        >
          <SiGlovo className="w-7 h-7" />
          <span className="absolute right-full mr-4 bg-black text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {content.floating.glovo}
          </span>
        </a>
        
        {/* Uber Eats */}
        <a 
          href="https://www.ubereats.com/pt/store/aguacate-tex-mex/-Qn2dTU4RyiRJraXyS448w?diningMode=DELIVERY&ps=1&sc=SEARCH_SUGGESTION" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-black text-[#06C167] border border-white/20 p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform flex items-center justify-center group relative"
        >
          <SiUbereats className="w-7 h-7" />
          <span className="absolute right-full mr-4 bg-black text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {content.floating.uber}
          </span>
        </a>

        {/* WhatsApp */}
        <a 
          href="https://wa.me/351000000000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center group relative"
        >
          <FaWhatsapp className="w-7 h-7" />
          <span className="absolute right-full mr-4 bg-black text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {content.floating.whatsapp}
          </span>
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.video 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute w-full h-full object-cover pointer-events-none"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </motion.video>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/60 to-neutral-950"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image src="/logo.png" alt="Logo" width={180} height={180} className="mb-8 drop-shadow-2xl" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight"
          >
            <span className="block">{content.hero.title}</span>
            <span className="block text-lime-500">{content.hero.titleSpan}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-2xl text-neutral-300 mb-8 max-w-2xl font-light"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.a 
            href="#menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="px-8 py-4 bg-lime-500 text-black font-bold rounded-full hover:bg-lime-400 shadow-[0_0_40px_rgba(132,204,22,0.4)] flex items-center gap-2 group"
          >
            {content.hero.cta}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-neutral-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square rounded-3xl overflow-hidden group shadow-2xl"
          >
            <Image src="/img/01.jpg" alt="Aguacate Tex-Mex" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <p className="text-lime-400 font-bold text-sm tracking-widest uppercase">Mercado Bom Sucesso</p>
              <p className="text-white text-lg font-semibold mt-1">Porto, Portugal 🇵🇹</p>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-lime-500 font-bold tracking-widest text-sm uppercase mb-2">{content.about.subtitle}</p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">{content.about.title}</h2>
            </div>

            <p className="text-neutral-400 text-lg leading-relaxed">{content.about.desc1}</p>
            <p className="text-neutral-400 text-lg leading-relaxed">{content.about.desc2}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[content.about.stat1, content.about.stat2, content.about.stat3].map((stat, i) => (
                <div key={i} className="bg-neutral-950/60 border border-white/10 rounded-2xl p-4 text-center hover:border-lime-500/40 transition-colors">
                  <p className="text-2xl font-extrabold text-lime-400">{stat.value}</p>
                  <p className="text-neutral-400 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <a href="#menu" className="inline-flex items-center gap-2 px-6 py-3 bg-lime-500 text-black font-bold rounded-full hover:bg-lime-400 transition-colors w-fit group mt-2">
              {content.hero.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <section className="py-12 bg-lime-500 overflow-hidden text-black font-bold text-xl md:text-2xl whitespace-nowrap border-y-4 border-lime-600">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-12 items-center w-max"
        >
          {/* We duplicate the reviews array to ensure infinite loop seamlessly */}
          {[...content.reviews, ...content.reviews].map((review, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span className="flex items-center gap-2">
                <Star className="w-6 h-6 fill-black" /> 
                "{review.text}" 
                <span className="text-sm font-medium opacity-60 ml-2">({review.author})</span>
              </span>
              <span>•</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Interactive Menu Section */}
      <section id="menu" className="py-24 px-6 max-w-5xl mx-auto min-h-[800px]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.menuSection.title}</h2>
          <p className="text-neutral-400 text-lg">{content.menuSection.subtitle}</p>
        </motion.div>

        {/* Menu Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button 
            onClick={() => setActiveTab("build")}
            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === "build" ? "bg-lime-500 text-black shadow-[0_0_20px_rgba(132,204,22,0.3)]" : "bg-neutral-900 text-neutral-400 hover:text-white"}`}
          >
            {content.build.title}
          </button>
          <button 
            onClick={() => setActiveTab("nachos")}
            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === "nachos" ? "bg-lime-500 text-black shadow-[0_0_20px_rgba(132,204,22,0.3)]" : "bg-neutral-900 text-neutral-400 hover:text-white"}`}
          >
            {content.nachos.title}
          </button>
          <button 
            onClick={() => setActiveTab("drinks")}
            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === "drinks" ? "bg-lime-500 text-black shadow-[0_0_20px_rgba(132,204,22,0.3)]" : "bg-neutral-900 text-neutral-400 hover:text-white"}`}
          >
            {content.drinks.title}
          </button>
          <button 
            onClick={() => setActiveTab("desserts")}
            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === "desserts" ? "bg-lime-500 text-black shadow-[0_0_20px_rgba(132,204,22,0.3)]" : "bg-neutral-900 text-neutral-400 hover:text-white"}`}
          >
            {content.desserts.title}
          </button>
        </div>

        {/* Menu Content Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            
            {activeTab === "build" && (
              <motion.div 
                key="build"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 md:p-12 rounded-3xl border border-lime-500/30 shadow-[0_0_30px_rgba(132,204,22,0.1)] overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                
                <h3 className="text-3xl font-bold text-lime-500 mb-6">{content.build.title}</h3>
                <div className="mb-8 flex flex-wrap gap-3 relative z-10">
                  {content.build.basePrices.map((bp, i) => (
                    <motion.div whileHover={{ scale: 1.05 }} key={i} className="bg-neutral-950 px-4 py-2 rounded-lg border border-lime-500/20 text-sm shadow-lg">
                      <span className="text-neutral-400 block text-xs">{bp.name}</span>
                      <span className="font-bold text-white">{bp.price}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="space-y-8 relative z-10">
                  {content.build.steps.map((step, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-lime-500/30 hover:border-lime-500 transition-colors group">
                      <div className="absolute w-3 h-3 bg-lime-500 rounded-full -left-[7px] top-1.5 shadow-[0_0_10px_rgba(132,204,22,0.8)] group-hover:scale-150 transition-transform"></div>
                      <h4 className="font-bold text-xl text-white group-hover:text-lime-300 transition-colors">{step.title}</h4>
                      <p className="text-neutral-400 text-base mt-2">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "nachos" && (
              <motion.div 
                key="nachos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-900/50 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-sm"
              >
                <h3 className="text-3xl font-bold text-lime-400 mb-8 border-b border-white/10 pb-4">{content.nachos.title}</h3>
                <ul className="space-y-6 text-lg">
                  {content.nachos.items.map((item, i) => (
                    <li key={i} className="flex justify-between items-center group border-b border-white/5 pb-4">
                      <span className="font-medium group-hover:text-lime-300 transition-colors">{item.name}</span>
                      <span className="text-neutral-400 font-bold group-hover:text-white transition-colors">{item.price}</span>
                    </li>
                  ))}
                </ul>
                
                <h4 className="text-2xl font-bold text-orange-400 mt-12 mb-6">{content.nachos.startersTitle}</h4>
                <ul className="space-y-6 text-lg">
                  {content.nachos.starters.map((item, i) => (
                    <li key={i} className="flex justify-between items-center group border-b border-white/5 pb-4">
                      <span className="font-medium group-hover:text-orange-300 transition-colors">{item.name}</span>
                      <span className="text-neutral-400 font-bold group-hover:text-white transition-colors">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === "drinks" && (
              <motion.div 
                key="drinks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-900/50 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-sm"
              >
                <h3 className="text-3xl font-bold text-blue-400 mb-8 border-b border-white/10 pb-4">{content.drinks.title}</h3>
                <ul className="space-y-6 text-lg mb-12">
                  {content.drinks.items.map((item, i) => (
                    <li key={i} className="flex justify-between items-center group border-b border-white/5 pb-4">
                      <span className="font-medium text-neutral-300 group-hover:text-blue-300 transition-colors">{item.name}</span>
                      <span className="text-neutral-400 font-bold">{item.price}</span>
                    </li>
                  ))}
                </ul>
                <h4 className="text-2xl font-bold text-yellow-400 mb-6">{content.drinks.beersTitle}</h4>
                <ul className="space-y-6 text-lg">
                  {content.drinks.beers.map((item, i) => (
                    <li key={i} className="flex justify-between items-center group border-b border-white/5 pb-4">
                      <span className="font-medium text-neutral-300 group-hover:text-yellow-300 transition-colors">{item.name}</span>
                      <span className="text-neutral-400 font-bold">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === "desserts" && (
              <motion.div 
                key="desserts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-900/50 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-sm"
              >
                <h3 className="text-3xl font-bold text-pink-400 mb-8 border-b border-white/10 pb-4">{content.desserts.title}</h3>
                <ul className="space-y-6 text-lg">
                  {content.desserts.items.map((item, i) => (
                    <li key={i} className="flex justify-between items-center group border-b border-white/5 pb-4">
                      <span className="font-medium group-hover:text-pink-300 transition-colors">{item.name}</span>
                      <span className="text-neutral-400 font-bold group-hover:text-white transition-colors">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-neutral-950 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.nav.gallery}</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[1,2,3,4,5,6,7,8].map((num) => {
              const strNum = num.toString().padStart(2, '0');
              const imageSrc = `/img/${strNum}.jpg`;
              return (
                <motion.div 
                  variants={fadeInUp} 
                  key={num} 
                  onClick={() => setSelectedImage(imageSrc)}
                  className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer shadow-lg"
                >
                  <Image 
                    src={imageSrc} 
                    alt={`Gallery ${strNum}`} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none group-hover:ring-lime-500/50 transition-colors"></div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-square md:aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedImage} 
                alt="Enlarged gallery view" 
                fill 
                className="object-contain" 
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-lime-500 hover:text-black transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location / Map Section */}
      <section id="location" className="py-24 bg-neutral-900 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">{content.location.title}</h2>
            <p className="text-neutral-400 text-lg">
              {content.location.desc}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-neutral-800 p-3 rounded-full text-lime-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">{content.location.market}</h4>
                  <p className="text-neutral-400">{content.location.address}<br/>{content.location.city}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-neutral-800 p-3 rounded-full text-lime-500">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">{content.location.scheduleTitle}</h4>
                  <p className="text-neutral-400">
                    {content.location.schedule1}<br/>
                    {content.location.schedule2}
                  </p>
                </div>
              </div>
            </div>
            
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors">
              {content.location.directions} <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-video md:aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <iframe
              src="https://maps.google.com/maps?q=Mercado+Bom+Sucesso+Porto+Portugal&output=embed&z=16&hl=pt"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Aguacate Tex-Mex - Mercado Bom Sucesso"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 bg-black border-t border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full grayscale opacity-50" />
            <p className="text-neutral-500 text-sm">&copy; 2026 Aguacate Tex-Mex. {content.footer.rights}</p>
          </div>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/aguacatetexmex" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full border border-neutral-700 hover:border-[#E1306C] hover:text-[#E1306C] transition-colors text-sm font-medium flex items-center gap-2">
              <FaInstagram className="w-5 h-5" /> Instagram <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/login" className="px-6 py-2 rounded-full border border-neutral-800 hover:border-white transition-colors text-sm font-medium">
              {content.footer.admin}
            </Link>
          </div>
        </div>
      </footer>
      {/* Cookie Banner */}
      <CookieBanner lang={lang} />
    </div>
  );
}
