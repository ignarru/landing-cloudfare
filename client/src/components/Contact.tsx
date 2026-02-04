import { useEffect, useMemo, useRef, useState } from "react";
import { CONTACT_EXTRA_OFFSET } from "@/lib/constants";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Cal?: (command: string, payload?: Record<string, unknown>) => void;
  }
}

export interface ContactProps {
  offset?: typeof CONTACT_EXTRA_OFFSET;
}

export default function Contact({
  offset = CONTACT_EXTRA_OFFSET,
}: ContactProps) {
  const [ctaVisible, setCtaVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
 const [embedReady, setEmbedReady] = useState(false);
  const ctaRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  
  const calSlug = useMemo(() => {
    const value =
      import.meta.env.VITE_CALCOM_LINK?.toString().trim() || "calcom/30min";
    const normalized = value
      .replace(/^https?:\/\/(www\.)?cal\.com\//i, "")
      .replace(/^\//, "");
    return normalized || "calcom/30min";
  }, []);

  const calBookingUrl = useMemo(
    () => `https://cal.com/${calSlug}`,
    [calSlug],
  );

  const scrollToContact = (customOffset = offset) => {
    const element = document.getElementById("contacto");
    if (!element) return;

    const navHeight = document.querySelector("nav")?.clientHeight ?? 0;
    const offsetValue =
      window.innerWidth < 768 ? customOffset.mobile : customOffset.desktop;

    // Center the form when possible so it is fully visible
    const formHeight = element.offsetHeight;
    const availableSpace = window.innerHeight - formHeight;
    const centerOffset = availableSpace > 0 ? availableSpace / 2 : 0;
    
    const elementPosition =
      element.offsetTop - navHeight - offsetValue - centerOffset;

    window.scrollTo({ top: elementPosition, behavior: "smooth" });
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFormVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setEmbedReady(false);

    const initializeCal = () => {
      if (!window.Cal) return;

          window.Cal("init", { origin: "https://cal.com" });
      window.Cal("inline", {
        elementOrSelector: "#calcom-booking",
        calLink: calSlug,
      });
window.Cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#0ea5e9" } },
        hideEventTypeDetails: false,
      });
      setEmbedReady(true);
    };

    if (window.Cal) {
      initializeCal();
      return;
    }

  const script = document.createElement("script");
    script.src = "https://cal.com/embed.js";
    script.async = true;
    script.onload = initializeCal;
    document.head.appendChild(script);

  return () => {
      script.onload = null;
      if (script.parentElement) {
        script.parentElement.removeChild(script);
      }
    };
  }, [calSlug]);
  
  return (
    <>
      {/* CTA Section */}
      <section
        id="transformar"
        ref={ctaRef}
        className={`py-16 sm:py-24 lg:py-32 lg:min-h-[60vh] lg:flex lg:items-center scroll-mt-36 md:scroll-mt-28 bg-gradient-to-r from-accent to-blue-900 transition-all duration-700 ${
          ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-none mx-auto px-4 sm:px-6 lg:px-8 2xl:px-20 text-center">
          <h2 className="text-3xl lg:text-6xl font-bold mb-5 text-white">
            ¿Listo para Transformar tu Negocio?
          </h2>
          <p className="text-lg lg:text-2xl text-blue-100 mb-6 max-w-4xl mx-auto">
            Agenda una consulta gratuita y descubre cómo la IA puede
            revolucionar tu empresa
          </p>
          <Button
            onClick={() => scrollToContact(offset)}
           aria-label="Ir a la agenda de reuniones"
            className="bg-white text-accent hover:bg-gray-100 px-6 py-3 lg:px-10 lg:py-5 text-base lg:text-xl font-semibold transform hover:scale-105 transition-all"
          >
            Agendar Consulta Gratuita
          </Button>
        </div>
      </section>

      {/* Contact Booking Section */}
      <section
        id="contacto"
        ref={formRef}
        className={`relative overflow-hidden min-h-screen flex flex-col items-center justify-center py-14 sm:py-16 md:py-24 lg:pt-0 lg:pb-10 text-center transition-all duration-700 scroll-mt-44 md:scroll-mt-36 ${
          formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
          <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-72 w-72 bg-accent/20 blur-3xl" />
          <div className="absolute -right-10 bottom-10 h-80 w-80 bg-blue-600/20 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-black/60" />
        </div>

        <div
          className={`relative text-center mb-10 sm:mb-14 transition-all duration-700 ${
            formVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-3">
            Agenda personalizada
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-5">
            Conecta con <span className="gradient-text">Nuestro Equipo</span>
          </h2>
          <p className="text-lg lg:text-2xl text-iabyia-light max-w-4xl mx-auto">
            Cuéntanos sobre tu proyecto y descubre cómo podemos ayudarte a
            implementar IA en tu negocio. Puedes seleccionar tu fecha y reservar
            la reunión directamente desde esta página.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto w-full px-2 sm:px-4">
          <div
            className={`relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-black/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl shadow-2xl ring-1 ring-white/5 transition-all duration-700 delay-300 ${
              formVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
              <div className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-left">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                    Agenda en 30 segundos
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                    Elige el horario que mejor se adapte a ti
                  </h3>
                  <p className="text-base sm:text-lg text-iabyia-light">
                    Sin correos de ida y vuelta: elige tu fecha aquí mismo,
                    recibe confirmación inmediata y recordatorios automáticos.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-3 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 text-accent">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
                  <span className="text-sm font-semibold">Cupos disponibles esta semana</span>
                </div>
              </div>

              {!embedReady && (
                <div className="flex items-center gap-3 text-iabyia-light text-base">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" aria-hidden />
                  Preparando el calendario...
                </div>
              )}

              <div
                id="calcom-booking"
                className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-2 sm:p-4 shadow-inner min-h-[720px]"
              />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-slate-900/50 border border-slate-800/60 rounded-2xl px-4 py-3 text-sm sm:text-base text-iabyia-light">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
                  <span>
                    ¿Prefieres abrir el calendario en otra pestaña? Puedes hacerlo aquí.
                  </span>
                </div>
                <div className="flex gap-3 justify-end">
                  <Button
                    asChild
                    variant="secondary"
                    className="bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  >
                    <a href={calBookingUrl} target="_blank" rel="noreferrer">
                      Abrir en Cal.com
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
