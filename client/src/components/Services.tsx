import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useInView } from "@/hooks/use-in-view";
import {
  Bot,
  TrendingUp,
  MessageCircle,
  Brain
} from "lucide-react";

const SpecializedServices = lazy(() => import("./SpecializedServices"));

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const mainServices: Service[] = [
  {
    icon: <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
    title: "Automatización Inteligente",
    description: "Optimizamos tus procesos empresariales con sistemas de automatización avanzados que reducen costos y mejoran la productividad.",
    color: "iabyia-accent",
    delay: 0
  },
  {
    icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
    title: "Análisis Predictivo",
    description: "Utilizamos machine learning para predecir tendencias, comportamientos y oportunidades de mercado que impulsen tu crecimiento.",
    color: "bg-green-500",
    delay: 200
  },
  {
    icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
    title: "Chatbots Avanzados",
    description: "Mejora la atención al cliente con chatbots inteligentes que ofrecen respuestas personalizadas 24/7.",
    color: "bg-blue-500",
    delay: 400
  }
];

function ServiceCard({ service, visible }: { service: Service; visible: boolean }) {
  const isMobile = useIsMobile();
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const show = isMobile ? isInView : visible;
  return (
    <div
      ref={ref}
      className={`glass-effect rounded-2xl p-4 sm:p-8 hover:transform hover:scale-105 transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${service.delay}ms` }}
    >
      <div
        className={`w-12 h-12 sm:w-16 sm:h-16 ${service.color} rounded-xl flex items-center justify-center mb-4 sm:mb-6`}
      >
        {service.icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold mb-4">{service.title}</h3>
      <p className="text-iabyia-light leading-relaxed">{service.description}</p>
    </div>
  );
}

export default function Services() {
  const [isMainVisible, setIsMainVisible] = useState(false);
  const [loadSpecialized, setLoadSpecialized] = useState(false);
  const mainSectionRef = useRef<HTMLElement>(null);
  const { ref: sentinelRef, isInView: sentinelVisible } = useInView<HTMLDivElement>({ threshold: 0.1 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsMainVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (mainSectionRef.current) observer.observe(mainSectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sentinelVisible) setLoadSpecialized(true);
  }, [sentinelVisible]);

  return (
    <>
      {/* Main Services Section */}
      <section
        id="servicios"
        ref={mainSectionRef}
        className="py-16 sm:py-20 scroll-mt-36 md:scroll-mt-28 lg:min-h-screen lg:flex lg:items-center lg:py-0"
      >
        <div className="max-w-7xl 2xl:max-w-none mx-auto px-4 sm:px-6 lg:px-8 2xl:px-20">
          <div className={`text-center mb-16 transition-all duration-700 ${
            isMainVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Nuestros <span className="gradient-text">Servicios</span>
            </h2>
            <p className="text-xl text-iabyia-light max-w-3xl mx-auto">
              Soluciones integrales de IA diseñadas para impulsar el crecimiento y la eficiencia de tu negocio
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <ServiceCard key={index} service={service} visible={isMainVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* Lazy Specialized Services Section */}
      <div ref={sentinelRef}></div>
      {loadSpecialized && (
        <Suspense fallback={null}>
          <SpecializedServices />
        </Suspense>
      )}
    </>
  );
}
