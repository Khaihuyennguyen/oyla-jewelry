import { useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { motion } from "motion/react";

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const HOME_URL = import.meta.env.BASE_URL;
const VIDEO_URL = assetUrl("/videos/hero-background-scrub.mp4");
const REVEAL_VIDEO_URL = assetUrl("/videos/reveal-background-scrub.mp4");
const ease = [0.16, 1, 0.3, 1];
const products = [
  {
    name: "Orbis Signet",
    price: "$420",
    image: assetUrl("/products/orbis-signet.png"),
    alt: "Silver signet ring with an oval red gemstone",
  },
  {
    name: "Vera Cuff",
    price: "$360",
    image: assetUrl("/products/vera-cuff.png"),
    alt: "Polished silver cuff bracelet with a soft pearl accent",
  },
  {
    name: "Mira Line",
    price: "$510",
    image: assetUrl("/products/mira-line.png"),
    alt: "Fine silver tennis bracelet with bright stone settings",
  },
  {
    name: "Lyra Hoops",
    price: "$280",
    image: assetUrl("/products/lyra-hoops.png"),
    alt: "Minimal polished silver hoop earrings",
  },
  {
    name: "Solis Pendant",
    price: "$390",
    image: assetUrl("/products/solis-pendant.png"),
    alt: "Silver pendant necklace with a circular gemstone setting",
  },
  {
    name: "Halo Cuff",
    price: "$240",
    image: assetUrl("/products/halo-cuff.png"),
    alt: "Sculptural silver ear cuff on a white background",
  },
  {
    name: "Rhea Wave",
    price: "$340",
    image: assetUrl("/products/rhea-wave.png"),
    alt: "Fluid wave-shaped sterling silver ring",
  },
  {
    name: "Aster Stone",
    price: "$460",
    image: assetUrl("/products/aster-stone.png"),
    alt: "Silver ring with a blue gemstone centerpiece",
  },
  {
    name: "Noa Chain",
    price: "$310",
    image: assetUrl("/products/noa-chain.png"),
    alt: "Delicate silver chain bracelet with polished links",
  },
];

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg viewBox="0 0 40 40" role="img">
        <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M26 7 35 2l-4 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function GridIcon() {
  return (
    <svg className="grid-icon" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="5" cy="5" r="1.6" />
      <circle cx="11" cy="5" r="1.6" />
      <circle cx="5" cy="11" r="1.6" />
      <circle cx="11" cy="11" r="1.6" />
    </svg>
  );
}

function Navbar() {
  return (
    <motion.header
      className="navbar"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="nav-left">
        <a className="brand" href={HOME_URL} aria-label="Oyla home">
          <LogoMark />
          <span className="brand-text">Oyla</span>
        </a>

        <button className="menu-pill" type="button">
          <span className="menu-icon">
            <Plus size={12} strokeWidth={3} />
          </span>
          <span>Menu</span>
        </button>

        <div className="tags-pill" aria-label="Jewelry categories">
          <span>Sculptural Silver</span>
          <span>Gemstone Rings</span>
        </div>
      </div>

      <div className="adaptive-pill" aria-label="Signature collection">
        <button className="adaptive-icon" type="button" aria-label="Open signature collection">
          <GridIcon />
        </button>
        <span className="adaptive-label">Signature Collection</span>
      </div>
    </motion.header>
  );
}

function FooterContent() {
  return (
    <motion.footer
      className="hero-footer"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1, ease }}
    >
      <div className="footer-inner">
        <div className="footer-copy">
          <motion.div
            className="subtitle"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease }}
          >
            <span className="subtitle-dot" />
            <span>Fine jewelry campaign 2026</span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease }}
          >
            Measured Purity.
            <br />
            Worn in Light.
          </motion.h1>

          <motion.div
            className="cta-row"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, ease }}
          >
            <a className="button button-primary" href="#collection">
              Shop Collection
            </a>
            <a className="button button-secondary" href="#lookbook">
              View Lookbook
            </a>
          </motion.div>
        </div>

        <div className="footer-tags" aria-label="Jewelry materials">
          <span>Rings</span>
          <span>Gemstones</span>
          <span>Sterling Silver</span>
        </div>
      </div>
    </motion.footer>
  );
}

function ScrubVideo({ containerRef }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let rafId = 0;
    let duration = 0;
    let targetTime = 0;
    let currentTime = 0;
    let scrollStart = 0;
    let scrollDistance = 1;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const updateMetrics = () => {
      const container = containerRef.current;
      if (!container) return;

      scrollStart = container.offsetTop;
      scrollDistance = Math.max(1, container.offsetHeight - window.innerHeight);
    };

    const updateTargetTime = () => {
      if (duration <= 0) return;

      const progress = clamp((window.scrollY - scrollStart) / scrollDistance, 0, 1);
      targetTime = progress * duration;
    };

    const syncDuration = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      currentTime = video.currentTime || 0;
      video.pause();
      updateMetrics();
      updateTargetTime();
    };

    const handleScroll = () => {
      updateTargetTime();
    };

    const handleResize = () => {
      updateMetrics();
      updateTargetTime();
    };

    const scrub = () => {
      if (duration > 0) {
        updateTargetTime();
        currentTime += (targetTime - currentTime) * 0.08;

        if (!video.seeking && Math.abs(video.currentTime - currentTime) > 0.01) {
          video.currentTime = currentTime;
        }
      }

      rafId = requestAnimationFrame(scrub);
    };

    video.addEventListener("loadedmetadata", syncDuration);
    if (video.readyState >= 1) {
      syncDuration();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    rafId = requestAnimationFrame(scrub);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      video.removeEventListener("loadedmetadata", syncDuration);
    };
  }, [containerRef]);

  return (
    <div className="video-stage" aria-hidden="true">
      <motion.div
        className="video-shell"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        <video ref={videoRef} muted playsInline preload="auto" className="hero-video">
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </motion.div>
    </div>
  );
}

function ProductGrid() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const revealMaskRef = useRef(null);
  const revealVideoRef = useRef(null);
  const rollItems = products;
  const collectionPanels = rollItems.length / 3 + 1.4;

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const mask = revealMaskRef.current;
    const video = revealVideoRef.current;
    if (!section || !track || !mask || !video) return undefined;

    let rafId = 0;
    let targetX = 0;
    let currentX = 0;
    let duration = 0;
    let targetTime = 0;
    let currentTime = 0;
    let targetRevealProgress = 0;
    let currentRevealProgress = 0;
    let scrollStart = 0;
    let scrollDistance = 1;
    let horizontalDistance = 1;
    let revealScrollDistance = 1;
    let maxTranslate = 0;
    let revealTranslate = 0;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const updateMetrics = () => {
      scrollStart = section.offsetTop;
      scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      revealScrollDistance = Math.min(scrollDistance * 0.36, window.innerHeight * 1.35);
      horizontalDistance = Math.max(1, scrollDistance - revealScrollDistance);
      maxTranslate = Math.max(0, track.scrollWidth - track.clientWidth);

      const cards = Array.from(track.querySelectorAll(".product-card"));
      const anchorIndex = Math.max(1, cards.length - 2);
      const seamLeft = cards[anchorIndex]?.offsetLeft ?? maxTranslate;
      revealTranslate = clamp(seamLeft - track.clientWidth / 2, 0, maxTranslate);
    };

    const updateTarget = () => {
      const scrollOffset = window.scrollY - scrollStart;
      const horizontalProgress = clamp(scrollOffset / horizontalDistance, 0, 1);
      targetRevealProgress = clamp((scrollOffset - horizontalDistance) / revealScrollDistance, 0, 1);
      targetX = horizontalProgress * revealTranslate;
      targetTime = targetRevealProgress * duration;
    };

    const syncDuration = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      currentTime = video.currentTime || 0;
      video.pause();
      updateMetrics();
      updateTarget();
    };

    const animate = () => {
      updateTarget();
      currentX += (targetX - currentX) * 0.12;
      track.style.transform = `translate3d(${-currentX}px, 0, 0)`;

      currentRevealProgress += (targetRevealProgress - currentRevealProgress) * 0.12;
      mask.style.setProperty("--reveal-width", `${currentRevealProgress * 100}vw`);
      mask.style.setProperty(
        "--reveal-mask-opacity",
        `${clamp((currentRevealProgress - 0.02) / 0.04, 0, 1)}`,
      );
      mask.style.setProperty(
        "--reveal-edge-opacity",
        `${clamp((currentRevealProgress - 0.08) / 0.18, 0, 1) * 0.16}`,
      );

      if (duration > 0) {
        currentTime += (targetTime - currentTime) * 0.08;

        if (!video.seeking && Math.abs(video.currentTime - currentTime) > 0.01) {
          video.currentTime = currentTime;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      updateMetrics();
      updateTarget();
    };

    updateMetrics();
    updateTarget();
    video.addEventListener("loadedmetadata", syncDuration);
    if (video.readyState >= 1) {
      syncDuration();
    }
    rafId = requestAnimationFrame(animate);

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      video.removeEventListener("loadedmetadata", syncDuration);
    };
  }, []);

  return (
    <section
      className="product-section"
      id="collection"
      ref={sectionRef}
      style={{ "--collection-panels": collectionPanels }}
      aria-labelledby="collection-title"
    >
      <div className="product-sticky">
        <div className="product-grid" ref={trackRef}>
          {rollItems.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-image-wrap">
                <img src={product.image} alt={product.alt} />
              </div>
              <div className="product-copy">
                <h2>{product.name}</h2>
                <p>{product.price}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="horizontal-reveal-mask" ref={revealMaskRef} aria-hidden="true">
          <video ref={revealVideoRef} muted playsInline preload="auto" className="product-reveal-video">
            <source src={REVEAL_VIDEO_URL} type="video/mp4" />
          </video>
        </div>
      </div>
      <h2 className="sr-only" id="collection-title">
        Oyla jewelry collection
      </h2>
    </section>
  );
}

export default function App() {
  const heroRef = useRef(null);

  return (
    <>
      <main className="hero" ref={heroRef}>
        <div className="hero-pin">
          <ScrubVideo containerRef={heroRef} />
          <Navbar />
          <span className="hero-spacer" aria-hidden="true" />
          <FooterContent />
        </div>
      </main>
      <ProductGrid />
    </>
  );
}
