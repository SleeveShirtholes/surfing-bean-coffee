import { useEffect, useRef, useState } from "react";
import { MapPin, Clock, Phone, ExternalLink, Coffee, Waves, Star, ChevronDown, Menu, X, Facebook } from "lucide-react";

// ─── Wave SVG Dividers ───────────────────────────────────────────────────────
function WaveDivider({ flip = false, color = "#F5E6C8" }: { flip?: boolean; color?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`} style={{ height: 60 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full" fill={color}>
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
      </svg>
    </div>
  );
}

// ─── Intersection Observer Hook ──────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Menu Item ───────────────────────────────────────────────────────────────
function MenuItem({ name, desc }: { name: string; desc?: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#AED6F1]/40 last:border-0">
      <div className="mt-1 w-2 h-2 rounded-full bg-[#E67E22] flex-shrink-0" />
      <div>
        <span className="font-semibold text-[#1B4F72] font-poppins text-sm">{name}</span>
        {desc && <p className="text-xs text-[#4A2C17]/70 mt-0.5 font-poppins">{desc}</p>}
      </div>
    </div>
  );
}

// ─── Hours Row ───────────────────────────────────────────────────────────────
function HoursRow({ day, hours, closed = false }: { day: string; hours: string; closed?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2.5 border-b border-[#AED6F1]/40 last:border-0 ${closed ? "opacity-60" : ""}`}>
      <span className="font-semibold text-[#1B4F72] font-poppins text-sm">{day}</span>
      <span className={`font-poppins text-sm ${closed ? "text-red-400 font-semibold" : "text-[#4A2C17]"}`}>{hours}</span>
    </div>
  );
}

export default function Index() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#FDFAF4]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* ─── NAV ─────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#1B4F72]/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("hero")}>
            <img src="/logo.png" alt="The Surfing Bean" className="w-10 h-10 object-contain" />
            <span className="text-white font-bold text-sm leading-tight hidden sm:block" style={{ fontFamily: "'Pacifico', cursive", fontSize: "1.1rem" }}>
              The Surfing Bean
            </span>
          </div>
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {["about", "menu", "location"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-white/90 hover:text-[#E67E22] capitalize font-medium text-sm transition-colors"
              >
                {id === "about" ? "About & Hours" : id === "location" ? "Find Us" : "Menu"}
              </button>
            ))}
            <a
              href="https://www.facebook.com/profile.php?id=61554097752249"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#E67E22] hover:bg-[#D35400] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            >
              <Facebook size={14} />
              Follow Us
            </a>
          </div>
          {/* Mobile hamburger */}
          <button className="md:hidden text-white p-2" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile menu */}
        {navOpen && (
          <div className="md:hidden bg-[#1B4F72] border-t border-white/10 px-4 py-4 flex flex-col gap-3">
            {["about", "menu", "location"].map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-white/90 text-left capitalize font-medium py-2">
                {id === "about" ? "About & Hours" : id === "location" ? "Find Us" : "Menu"}
              </button>
            ))}
            <a
              href="https://www.facebook.com/profile.php?id=61554097752249"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#E67E22] text-white font-semibold px-4 py-2 rounded-full w-fit"
            >
              <Facebook size={14} />
              Follow on Facebook
            </a>
          </div>
        )}
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0d2d4a 0%, #1B4F72 35%, #2E86C1 70%, #5DADE2 100%)",
        }}
      >
        {/* Animated wave background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ height: 200 }}>
            <path fill="#F5E6C8" fillOpacity="0.15" d="M0,160 C240,220 480,100 720,160 C960,220 1200,100 1440,160 L1440,320 L0,320 Z">
              <animate attributeName="d" dur="8s" repeatCount="indefinite"
                values="M0,160 C240,220 480,100 720,160 C960,220 1200,100 1440,160 L1440,320 L0,320 Z;
                        M0,140 C240,100 480,200 720,140 C960,100 1200,200 1440,140 L1440,320 L0,320 Z;
                        M0,160 C240,220 480,100 720,160 C960,220 1200,100 1440,160 L1440,320 L0,320 Z"/>
            </path>
            <path fill="#F5E6C8" fillOpacity="0.08" d="M0,200 C360,140 1080,260 1440,200 L1440,320 L0,320 Z">
              <animate attributeName="d" dur="12s" repeatCount="indefinite"
                values="M0,200 C360,140 1080,260 1440,200 L1440,320 L0,320 Z;
                        M0,220 C360,280 1080,160 1440,220 L1440,320 L0,320 Z;
                        M0,200 C360,140 1080,260 1440,200 L1440,320 L0,320 Z"/>
            </path>
          </svg>
          {/* Scattered dots / bubbles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${20 + (i * 13) % 60}px`,
                height: `${20 + (i * 13) % 60}px`,
                left: `${(i * 17 + 5) % 95}%`,
                top: `${(i * 23 + 10) % 80}%`,
                animation: `float ${4 + (i % 4)}s ease-in-out ${i * 0.5}s infinite alternate`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes float {
            from { transform: translateY(0px) rotate(0deg); }
            to   { transform: translateY(-20px) rotate(8deg); }
          }
          @keyframes mascotBob {
            from { transform: translateY(0px) rotate(-2deg); }
            to   { transform: translateY(-12px) rotate(2deg); }
          }
        `}</style>

        <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
          {/* Mascot */}
          <div
            className="mx-auto mb-6 w-64 h-48 sm:w-80 sm:h-60"
            style={{ animation: "mascotBob 3s ease-in-out infinite alternate" }}
          >
            <img
              src="/logo.png"
              alt="The Surfing Bean Mascot"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          <div className="inline-flex items-center gap-2 bg-[#E67E22]/20 border border-[#E67E22]/40 text-[#F5E6C8] text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <Waves size={12} />
            South Beach, Oregon · Drive-Thru
          </div>

          <h1
            className="text-white mb-4"
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              lineHeight: 1.2,
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            The Surfing Bean<br />
            <span style={{ fontSize: "clamp(1.4rem, 4vw, 2.8rem)", color: "#F5E6C8" }}>Coffee Company</span>
          </h1>

          <p
            className="text-[#AED6F1] mb-10 max-w-lg mx-auto"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", fontStyle: "italic" }}
          >
            "Brewed for Beachside Adventures.<br />
            <span className="text-[#F5E6C8] font-semibold not-italic">Family Owned &amp; Operated.</span>"
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("menu")}
              className="flex items-center justify-center gap-2 bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold px-8 py-3.5 rounded-full text-base shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <Coffee size={18} />
              View Menu
            </button>
            <button
              onClick={() => scrollTo("location")}
              className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/40 text-white font-semibold px-8 py-3.5 rounded-full text-base backdrop-blur-sm transition-all hover:scale-105"
            >
              <MapPin size={18} />
              Find Us
            </button>
          </div>

          {/* Scroll cue */}
          <button onClick={() => scrollTo("about")} className="mt-14 text-white/50 hover:text-white/80 transition-colors flex flex-col items-center gap-1 mx-auto">
            <span className="text-xs">Scroll to explore</span>
            <ChevronDown size={20} style={{ animation: "float 1.5s ease-in-out infinite alternate" }} />
          </button>
        </div>
      </section>

      <WaveDivider color="#F5E6C8" />

      {/* ─── ABOUT & HOURS ───────────────────────────────────────────────── */}
      <section id="about" className="bg-[#F5E6C8] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[#E67E22] font-semibold text-sm uppercase tracking-widest mb-2">Our Story</p>
              <h2
                className="text-[#1B4F72] mb-4"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700 }}
              >
                A Local Treasure on the Oregon Coast
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* About blurb */}
            <Reveal delay={100}>
              <div className="bg-white rounded-3xl p-8 shadow-md border border-[#AED6F1]/30">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#1B4F72] flex items-center justify-center flex-shrink-0">
                    <Coffee size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1B4F72] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Welcome to the Bean
                    </h3>
                    <p className="text-[#4A2C17]/60 text-xs">South Beach, Oregon</p>
                  </div>
                </div>
                <p className="text-[#4A2C17] leading-relaxed text-sm mb-4">
                  Nestled in the heart of South Beach, just a stone's throw from the crashing Pacific, <strong>The Surfing Bean Coffee Company</strong> is more than a drive-thru — it's a daily ritual for locals and a warm welcome for every adventurer passing through.
                </p>
                <p className="text-[#4A2C17] leading-relaxed text-sm mb-4">
                  As a <strong>family-owned and operated</strong> shop, we pour our hearts into every cup. We know your name, your order, and your day — that's the South Beach difference.
                </p>
                <p className="text-[#4A2C17] leading-relaxed text-sm mb-5">
                  Each drink goes out with a personal touch: <strong>handwritten positive affirmations on your cup sleeve</strong> and a <strong>chocolate-covered espresso bean on top</strong> — because you deserve a little extra love with your morning brew.
                </p>
                {/* Affirmation card */}
                <div className="bg-[#1B4F72] rounded-2xl p-4 text-center">
                  <p className="text-[#AED6F1] text-xs mb-1">Today's affirmation ✍️</p>
                  <p className="text-white font-semibold italic text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                    "You are capable of amazing things."
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Hours */}
            <Reveal delay={200}>
              <div className="bg-white rounded-3xl p-8 shadow-md border border-[#AED6F1]/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E67E22] flex items-center justify-center flex-shrink-0">
                    <Clock size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1B4F72] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Hours of Operation
                    </h3>
                    <p className="text-[#4A2C17]/60 text-xs">Drive-Thru Window</p>
                  </div>
                </div>
                <HoursRow day="Sunday" hours="8:00 AM – 3:00 PM" />
                <HoursRow day="Monday" hours="6:00 AM – 3:00 PM" />
                <HoursRow day="Tuesday" hours="6:00 AM – 3:00 PM" />
                <HoursRow day="Wednesday" hours="6:00 AM – 3:00 PM" />
                <HoursRow day="Thursday" hours="CLOSED" closed />
                <HoursRow day="Friday" hours="6:00 AM – 3:00 PM" />
                <HoursRow day="Saturday" hours="7:00 AM – 3:00 PM" />

                <div className="mt-5 bg-[#E8F4FD] rounded-2xl p-4 flex items-start gap-3">
                  <MapPin size={16} className="text-[#2E86C1] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#1B4F72] font-semibold text-sm">116 SE 32nd Street</p>
                    <p className="text-[#4A2C17]/70 text-xs">South Beach, OR 97366</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <WaveDivider flip color="#FDFAF4" />

      {/* ─── MENU ────────────────────────────────────────────────────────── */}
      <section id="menu" className="bg-[#FDFAF4] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[#E67E22] font-semibold text-sm uppercase tracking-widest mb-2">What We're Serving</p>
              <h2
                className="text-[#1B4F72] mb-3"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700 }}
              >
                Our Menu
              </h2>
              <p className="text-[#4A2C17]/60 text-sm max-w-md mx-auto">
                Every hot drink is topped with a chocolate-covered espresso bean. Sugar-free options available on request.
              </p>
            </div>
          </Reveal>

          {/* Drinks note */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3 mb-8 text-xs">
              <span className="bg-[#1B4F72] text-white px-4 py-2 rounded-full font-semibold">Dairy: 2%, Nonfat, Breve, Whole, Heavy Cream</span>
              <span className="bg-[#2E86C1] text-white px-4 py-2 rounded-full font-semibold">Dairy Alternatives: Almond, Oat, Soy, Coconut</span>
              <span className="bg-[#E67E22] text-white px-4 py-2 rounded-full font-semibold">Sugar-Free Syrups Available</span>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* Drink Menu */}
            <Reveal delay={0}>
              <div className="bg-white rounded-3xl p-6 shadow-md border border-[#AED6F1]/30 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1B4F72] flex items-center justify-center flex-shrink-0">
                    <Coffee size={18} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[#1B4F72] text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Drink Menu</h3>
                </div>
                <MenuItem name="Latté" />
                <MenuItem name="Mocha" />
                <MenuItem name="White Chocolate Mocha" />
                <MenuItem name="Cappuccino" />
                <MenuItem name="Americano" />
                <MenuItem name="Caramel Macchiato" />
                <MenuItem name="Chai Tea Latté" />
                <MenuItem name="Matcha Tea Latté" />
                <MenuItem name="South Beach Fog" />
                <MenuItem name="Drip Coffee" />
                <MenuItem name="Hot Cocoa" />
                <MenuItem name="Steamer" />
                <MenuItem name="Apple Cider" />
                <div className="mt-4 bg-[#E8F4FD] rounded-xl p-3">
                  <p className="text-[#2E86C1] text-xs font-semibold leading-relaxed">Customer Favorite: Oat milk latté with brown sugar and cinnamon powder (Hot or Iced)</p>
                </div>
              </div>
            </Reveal>

            {/* Mixed Mochas */}
            <Reveal delay={80}>
              <div className="bg-white rounded-3xl p-6 shadow-md border border-[#AED6F1]/30 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2E86C1] flex items-center justify-center flex-shrink-0">
                    <Waves size={18} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[#1B4F72] text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Mixed Mochas <span className="text-xs font-normal text-[#4A2C17]/60">(Hot or Iced)</span></h3>
                </div>
                <MenuItem name="High Tide" desc="Chocolate, Thick Caramel, plus 1 Extra Shot" />
                <MenuItem name="The Orca" desc="Chocolate, Vanilla" />
                <MenuItem name="Sand Dollar" desc="White Chocolate, Thick Caramel" />
                <MenuItem name="Beach Bum" desc="Chocolate, Almond, Coconut" />
                <MenuItem name="Chillin' Turtle" desc="Chocolate, Crème De Menthe" />
                <MenuItem name="Great White" desc="White Chocolate, Hazelnut, Praline, Thick Caramel" />
                <MenuItem name="Sea Storm" desc="Chocolate, Toffee Nut, Sea Salt" />
                <MenuItem name="Sleepy Sailor" desc="Chocolate, Hazelnut, Thick Caramel" />
                <MenuItem name="Oregon's Treasure" desc="White Chocolate, Huckleberry" />
                <div className="mt-4 bg-[#FEF9EE] rounded-xl p-3 border border-[#E67E22]/20">
                  <p className="text-[#E67E22] text-xs font-semibold">Try The Beach Comber!</p>
                  <p className="text-[#4A2C17]/60 text-xs mt-0.5">Vanilla, Thick Caramel, Chocolate Covered Espresso Beans</p>
                </div>
              </div>
            </Reveal>

            {/* Blended Beverages */}
            <Reveal delay={160}>
              <div className="bg-white rounded-3xl p-6 shadow-md border border-[#AED6F1]/30 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#5DADE2] flex items-center justify-center flex-shrink-0">
                    <Star size={18} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[#1B4F72] text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Blended Beverages</h3>
                </div>
                <MenuItem name="Mocha Frappé" />
                <MenuItem name="Caramel Frappé" />
                <MenuItem name="Vanilla Bean Frappé" />
                <MenuItem name="Vanilla Bean Coffee Frappé" />
                <MenuItem name="White Chocolate Frappé" />
                <MenuItem name="Coffee Frappé" />
                <MenuItem name="Matcha Frappé" />
                <MenuItem name="Spiced Chai Frappé" />
              </div>
            </Reveal>

            {/* Smoothies & Kids */}
            <Reveal delay={0}>
              <div className="bg-white rounded-3xl p-6 shadow-md border border-[#AED6F1]/30 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#27AE60] flex items-center justify-center flex-shrink-0">
                    <Star size={18} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[#1B4F72] text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Smoothies &amp; Kids Kreamz</h3>
                </div>
                <p className="text-[#4A2C17]/60 text-xs font-semibold uppercase tracking-wide mb-2">Smoothies</p>
                <MenuItem name="Peach" />
                <MenuItem name="Mango" />
                <MenuItem name="Strawberry" />
                <MenuItem name="Strawberry Banana" />
                <MenuItem name="Wild Berry" />
                <p className="text-[#4A2C17]/60 text-xs font-semibold uppercase tracking-wide mt-4 mb-2">Kids Kreamz (Caffeine Free)</p>
                <MenuItem name="Cotton Candy" />
                <MenuItem name="Orange Cream" />
              </div>
            </Reveal>

            {/* Infused Red Bulls */}
            <Reveal delay={80}>
              <div className="bg-white rounded-3xl p-6 shadow-md border border-[#AED6F1]/30 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E74C3C] flex items-center justify-center flex-shrink-0">
                    <Waves size={18} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[#1B4F72] text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Infused Red Bulls <span className="text-xs font-normal text-[#4A2C17]/60">(Sugar-Free Available)</span></h3>
                </div>
                <MenuItem name="Tsunami" desc="Pineapple, Mango, Passion Fruit" />
                <MenuItem name="Rocky Reef" desc="Blackberry, Cherry" />
                <MenuItem name="Shark Frenzy" desc="Blue Raspberry, Raspberry" />
                <MenuItem name="Rip Tide" desc="Blue Raspberry, Coconut, Lime, Pomegranate" />
                <MenuItem name="Clownfish" desc="Orange, Vanilla, Cream" />
                <div className="mt-4 bg-[#FDEDEC] rounded-xl p-3 border border-[#E74C3C]/20">
                  <p className="text-[#E74C3C] text-xs leading-relaxed">Create Your Own with any of our syrup flavors!</p>
                </div>
              </div>
            </Reveal>

            {/* Teas, Sodas & Food */}
            <Reveal delay={160}>
              <div className="bg-white rounded-3xl p-6 shadow-md border border-[#AED6F1]/30 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E67E22] flex items-center justify-center flex-shrink-0">
                    <Coffee size={18} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[#1B4F72] text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Teas, Sodas &amp; Food</h3>
                </div>
                <p className="text-[#4A2C17]/60 text-xs font-semibold uppercase tracking-wide mb-2">Teas &amp; Sodas</p>
                <MenuItem name="Iced Green Tea" />
                <MenuItem name="Iced Black Tea" />
                <MenuItem name="Italian Soda" />
                <MenuItem name="Cremosa" />
                <MenuItem name="Harney and Son's Hot Tea" desc="Paris Tea, Earl Grey, Peppermint, Hot Cinnamon Spice, Green Tea, Black Tea" />
                <p className="text-[#4A2C17]/60 text-xs font-semibold uppercase tracking-wide mt-4 mb-2">Food Items <span className="font-normal normal-case">(Ask for Availability)</span></p>
                <MenuItem name="Assorted Muffins" />
                <MenuItem name="Bagels" />
              </div>
            </Reveal>

          </div>


        </div>
      </section>

      <WaveDivider color="#1B4F72" />

      {/* ─── LOCATION & CONTACT ──────────────────────────────────────────── */}
      <section id="location" className="bg-[#1B4F72] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[#E67E22] font-semibold text-sm uppercase tracking-widest mb-2">Come Visit</p>
              <h2
                className="text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700 }}
              >
                Find The Surfing Bean
              </h2>
              <p className="text-[#AED6F1] text-sm max-w-sm mx-auto">
                We're easy to find in South Beach, Oregon — just follow the waves and the smell of fresh espresso.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Map embed */}
            <Reveal delay={100}>
              <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10">
                <iframe
                  title="The Surfing Bean Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.5!2d-124.0560!3d44.6087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54ebba1c6e7f5e5b%3A0x0!2s116+SE+32nd+St%2C+South+Beach%2C+OR+97366!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            {/* Contact info */}
            <Reveal delay={200}>
              <div className="flex flex-col gap-5">
                {/* Address card */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E67E22] flex items-center justify-center flex-shrink-0">
                      <MapPin size={22} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Our Location</h4>
                      <p className="text-[#AED6F1] text-sm">116 SE 32nd Street</p>
                      <p className="text-[#AED6F1] text-sm">South Beach, OR 97366</p>
                      <a
                        href="https://maps.google.com/?q=116+SE+32nd+Street+South+Beach+OR+97366"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#E67E22] hover:text-[#F5A623] text-sm font-semibold mt-2 transition-colors"
                      >
                        Get Directions <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours summary */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#2E86C1] flex items-center justify-center flex-shrink-0">
                      <Clock size={22} className="text-white" />
                    </div>
                    <div className="w-full">
                      <h4 className="text-white font-bold text-base mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Quick Hours</h4>
                      <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between"><span className="text-[#AED6F1]">Sun</span><span className="text-white">8 AM – 3 PM</span></div>
                        <div className="flex justify-between"><span className="text-[#AED6F1]">Mon–Wed</span><span className="text-white">6 AM – 3 PM</span></div>
                        <div className="flex justify-between"><span className="text-[#AED6F1]">Thu</span><span className="text-red-400 font-semibold">Closed</span></div>
                        <div className="flex justify-between"><span className="text-[#AED6F1]">Fri</span><span className="text-white">6 AM – 3 PM</span></div>
                        <div className="flex justify-between"><span className="text-[#AED6F1]">Sat</span><span className="text-white">7 AM – 3 PM</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Facebook CTA */}
                <a
                  href="https://www.facebook.com/profile.php?id=61554097752249"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold py-4 px-6 rounded-3xl transition-all hover:scale-105 shadow-lg text-base"
                >
                  <Facebook size={22} />
                  Follow Us on Facebook
                  <ExternalLink size={15} className="opacity-70" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#0D2137] text-[#AED6F1] py-10 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <img src="/logo.png" alt="The Surfing Bean" className="w-14 h-14 object-contain mx-auto mb-4" />
          <p style={{ fontFamily: "'Pacifico', cursive", fontSize: "1.3rem" }} className="text-white mb-1">
            The Surfing Bean Coffee Company
          </p>
          <p className="text-sm mb-1">116 SE 32nd Street · South Beach, OR 97366</p>
          <p className="text-xs text-[#AED6F1]/50 mt-4">© {new Date().getFullYear()} The Surfing Bean Coffee Company · Family Owned &amp; Operated · South Beach, Oregon</p>
        </div>
      </footer>
    </div>
  );
}
