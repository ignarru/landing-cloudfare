import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useInView } from "@/hooks/use-in-view";
import { 
  Bot, 
  TrendingUp, 
  MessageCircle, 
  Brain, 
  Shield, 
  Database,
  Settings,
  Zap,
  Target
} from "lucide-react";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const mainServices: Service[] = [
  {
    icon: <Bot className="w-8 h-8 text-white" />,
    title: "Automatización Inteligente",
    description: "Optimizamos tus procesos empresariales con sistemas de automatización avanzados que reducen costos y mejoran la productividad.",
    color: "iabyia-accent",
    delay: 0
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    title: "Análisis Predictivo",
    description: "Utilizamos machine learning para predecir tendencias, comportamientos y oportunidades de mercado que impulsen tu crecimiento.",
    color: "bg-green-500",
    delay: 200
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-white" />,
    title: "Chatbots Avanzados",
    description: "Mejora la atención al cliente con chatbots inteligentes que ofrecen respuestas personalizadas 24/7.",
    color: "bg-blue-500",
    delay: 400
  }
];

const specializedServices: Service[] = [
  {
    icon: <Settings className="w-6 h-6 text-white" />,
    title: "Optimización de Recursos y ROI",
    description: "Maximizamos el retorno de inversión mediante algoritmos inteligentes de gestión de recursos.",
    color: "iabyia-accent",
    delay: 0
  },
  {
    icon: <Shield className="w-6 h-6 text-white" />,
    title: "Seguridad Avanzada con IA",
    description: "Protección inteligente que detecta y previene amenazas en tiempo real.",
    color: "bg-green-500",
    delay: 100
  },
  {
    icon: <Database className="w-6 h-6 text-white" />,
    title: "Procesamiento de Big Data",
    description: "Convertimos grandes volúmenes de datos en insights accionables para tu negocio.",
    color: "bg-blue-500",
    delay: 200
  }
];

function ServiceCard({ service, visible }: { service: Service; visible: boolean }) {
  const isMobile = useIsMobile();
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const show = isMobile ? isInView : visible;
  return (
    <div
      ref={ref}
      className={`glass-effect rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${service.delay}ms` }}
    >
      <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-6`}>
        {service.icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
      <p className="text-iabyia-light leading-relaxed">{service.description}</p>
    </div>
  );
}

function SpecializedServiceCard({ service, visible }: { service: Service; visible: boolean }) {
  const isMobile = useIsMobile();
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const show = isMobile ? isInView : visible;
  return (
    <div
      ref={ref}
      className={`glass-effect rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 ${
        show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}
      style={{ transitionDelay: `${service.delay}ms` }}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
          {service.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-iabyia-light">{service.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [isMainVisible, setIsMainVisible] = useState(false);
  const [isSpecializedVisible, setIsSpecializedVisible] = useState(false);
  const mainSectionRef = useRef<HTMLElement>(null);
  const specializedSectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { ref: roiRef, isInView: isRoiVisible } = useInView<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === mainSectionRef.current) {
              setIsMainVisible(true);
            }
            if (entry.target === specializedSectionRef.current) {
              setIsSpecializedVisible(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (mainSectionRef.current) observer.observe(mainSectionRef.current);
    if (specializedSectionRef.current) observer.observe(specializedSectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Main Services Section */}
      <section id="servicios" ref={mainSectionRef} className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Specialized Services Section */}
      <section
        id="servicios-especializados"
        ref={specializedSectionRef}
        className="py-16 sm:py-20 bg-gradient-to-br from-background to-secondary"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            isSpecializedVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Servicios <span className="gradient-text">Especializados</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {specializedServices.map((service, index) => (
                <SpecializedServiceCard key={index} service={service} visible={isSpecializedVisible} />
              ))}
            </div>
            
            {/* Data Visualization Illustration */}
            <div
              ref={roiRef}
              className={`relative transition-all duration-700 delay-300 ${
                (isMobile ? isRoiVisible : isSpecializedVisible)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="glass-effect rounded-3xl p-8 animate-float">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="h-20 bg-gradient-to-t from-accent to-blue-400 rounded-lg animate-pulse-soft"></div>
                  <div className="h-32 bg-gradient-to-t from-green-500 to-emerald-400 rounded-lg animate-pulse-soft" style={{ animationDelay: "0.5s" }}></div>
                  <div className="h-16 bg-gradient-to-t from-blue-700 to-blue-500 rounded-lg animate-pulse-soft" style={{ animationDelay: "1s" }}></div>
                </div>
                <div className="flex items-center justify-between text-sm text-iabyia-light">
                  <span>Eficiencia</span>
                  <span>ROI</span>
                  <span>Crecimiento</span>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2">
                  <Zap className="w-6 h-6 text-accent animate-pulse" />
                </div>
                <div className="absolute -bottom-2 -left-2">
                  <Target className="w-5 h-5 text-green-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
