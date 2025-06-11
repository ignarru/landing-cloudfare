import { useState, useEffect } from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveBrain from "./InteractiveBrain";
import { Button } from "@/components/ui/button";
import { HERO_DELAY_MS } from "@/lib/constants";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [brainActive, setBrainActive] = useState(false);
  const [burstActive, setBurstActive] = useState(false);
  const [starsExpanded, setStarsExpanded] = useState(false);
  const [started, setStarted] = useState(false);
const [brainAscending, setBrainAscending] = useState(false);
  const [brainMoving, setBrainMoving] = useState(false);
  const [brainHidden, setBrainHidden] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [sparkles, setSparkles] = useState<
    { id: number; x: string; y: string; rot: string }[]
  >([]);
  const [buttonHidden, setButtonHidden] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), HERO_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setIsVisible(false);
        setTimeout(() => setIsVisible(true), HERO_DELAY_MS);
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    if (brainHidden) {
      const timer = setTimeout(() => setShowQuestion(true), 0);
      return () => clearTimeout(timer);
    }
  }, [brainHidden]);

  useEffect(() => {
    if (showQuestion) {
      const timer = setTimeout(() => setShowArrow(true), 50);
      return () => clearTimeout(timer);
    }
  }, [showQuestion]);
  
  const triggerBurst = () => {
    setBurstActive(true);
    setTimeout(() => setBurstActive(false), 1000);
  };

  const generateSparkles = (count: number) => {
    return Array.from({ length: count }).map((_, idx) => ({
      id: Date.now() + idx,
      x: `${Math.random() * 120 - 60}px`,
      y: `${Math.random() * 120 - 60}px`,
      rot: `${Math.random() * 360}deg`,
    }));
  };
  
  const handleStartClick = () => {
    if (started) return;
    setStarted(true);
    setTimeout(() => setButtonHidden(true), 600);
    setStarsExpanded(true);
    setTimeout(() => setStarsExpanded(false), 800);
    setBrainActive(true);
    triggerBurst();
    setSparkles(generateSparkles(8));
    setTimeout(() => {
      setBrainActive(false);
      setSparkles([]);
      setBrainAscending(true);
    }, 1800);
  };

  
  return (
    <section
      id="inicio"
      className="box-border flex flex-col items-center justify-center min-h-[100dvh] sm:min-h-[80vh] pt-24 scroll-mt-24 px-4 sm:px-6 overflow-hidden"
    >
        <div className="max-w-7xl mx-auto text-center w-full">
        <motion.div
          layout
          className={`relative z-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
            <h1 className="text-center text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transforma tu negocio con
            <br />
            <span className="gradient-text">Inteligencia Artificial</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-iabyia-light mb-8 max-w-4xl mx-auto leading-relaxed">
            Automatización inteligente, análisis predictivo y optimización de procesos
            para llevar tu empresa al siguiente nivel
          </p>
          <AnimatePresence>
            {!buttonHidden && (
              <motion.div
                key="start-button"
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              >
                <Button
                  onClick={handleStartClick}
                  aria-label="Ir a la sección sobre mí"
                  type="button"
                  disabled={started}
                  className={`iabyia-accent hover:opacity-90 text-white px-8 py-4 text-lg font-medium transform hover:scale-105 transition-all ${started ? 'pointer-events-none cursor-not-allowed animate-fade-out' : ''}`}
                >
                  Comenzar Ahora
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div
          className={`relative mt-4 md:mt-2 lg:mt-0 xl:-mt-2 h-52 sm:h-60 md:h-72 lg:h-80 xl:h-96 2xl:h-[28rem] flex flex-col items-center justify-center transform -translate-y-8 sm:-translate-y-20 md:-translate-y-24 lg:-translate-y-28 xl:-translate-y-32 2xl:-translate-y-36 ${
            started ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {!brainHidden && (
            <div
              className={`absolute inset-0 flex justify-center items-center transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } ${started ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <div
                className={`relative w-fit ${started ? '' : 'animate-float'} ${
                  brainAscending ? 'brain-rise' : ''
                } ${brainMoving ? 'brain-up-down' : ''}`}
                onAnimationEnd={(e) => {
                  if (e.animationName === 'brain-rise') {
                    setBrainAscending(false);
                    setBrainMoving(true);
                  } else if (e.animationName === 'brain-fall' && brainMoving) {
                    setBrainHidden(true);
                    setBrainMoving(false);
                  }
                }}
              >
                <InteractiveBrain
                  className="mx-auto"
                  active={brainActive}
                  started={started}
                />
              
                <div className="absolute top-4 left-4 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-800 rounded-full animate-ping" style={{ animationDelay: '1s' }} />

                  {burstActive && (
              <>
                <span
                  className="particle-burst"
                  style={{
                    '--burst-x': '40px',
                    '--burst-y': '-20px',
                  } as React.CSSProperties}
                />
                <span
                  className="particle-burst"
                  style={{
                    '--burst-x': '-30px',
                    '--burst-y': '-30px',
                  } as React.CSSProperties}
                />
                <span
                  className="particle-burst"
                  style={{
                    '--burst-x': '20px',
                    '--burst-y': '35px',
                  } as React.CSSProperties}
                />
              </>
            )}

                  {sparkles.map((sp) => (
              <Sparkles
                key={sp.id}
                className="sparkle-burst"
                style={{
                  '--burst-x': sp.x,
                  '--burst-y': sp.y,
                  '--burst-rot': sp.rot,
                } as React.CSSProperties}
                aria-hidden="true"
              />
            ))}
            
              <Sparkles
                className={`absolute -bottom-3 right-4 w-6 h-6 text-accent animate-pulse ${starsExpanded ? 'star-expand' : ''}`}
                style={{ '--star-x': '12px', '--star-y': '12px' } as React.CSSProperties}
                aria-hidden="true"
              />
              <Sparkles
                className={`absolute -bottom-3 left-4 w-4 h-4 text-blue-400 animate-pulse ${starsExpanded ? 'star-expand' : ''}`}
                style={{ '--star-x': '-12px', '--star-y': '12px' } as React.CSSProperties}
                aria-hidden="true"
              />
            <Sparkles
                className={`absolute -top-3 left-4 w-6 h-6 text-accent animate-pulse ${starsExpanded ? 'star-expand' : ''}`}
                style={{ '--star-x': '-12px', '--star-y': '-12px' } as React.CSSProperties}
                aria-hidden="true"
              />
              <Sparkles
                className={`absolute -top-3 right-4 w-4 h-4 text-blue-400 animate-pulse ${starsExpanded ? 'star-expand' : ''}`}
                style={{ '--star-x': '12px', '--star-y': '-12px' } as React.CSSProperties}
              />
          </div>
        </div>
        )}
        <AnimatePresence>
          {showQuestion && (
            <motion.div
              key="question"
              layout="position"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center mt-20"
            >
              <p className="text-3xl sm:text-4xl text-iabyia-light font-semibold mb-2">
                ¿Querés conocer más?
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showArrow ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8"
              >
                <ChevronDown className="w-8 h-8 text-iabyia-light animate-bounce-slow" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </section>
  );
}
