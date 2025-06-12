import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useInView } from "@/hooks/use-in-view";
import { Settings, Shield, Database, Zap, Target } from "lucide-react";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

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

export default function SpecializedServices() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { ref: roiRef, isInView: isRoiVisible } = useInView<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="servicios-especializados"
      ref={sectionRef}
      className="py-16 sm:py-20 bg-gradient-to-br from-background to-secondary lg:min-h-screen lg:flex lg:items-center lg:py-0"
    >
      <div className="max-w-7xl 2xl:max-w-none mx-auto px-4 sm:px-6 lg:px-8 2xl:px-20">
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Servicios <span className="gradient-text">Especializados</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {specializedServices.map((service, index) => (
              <SpecializedServiceCard key={index} service={service} visible={isVisible} />
            ))}
          </div>

          {/* Data Visualization Illustration */}
          <div
            ref={roiRef}
            className={`relative transition-all duration-700 delay-300 ${
              (isMobile ? isRoiVisible : isVisible) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
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
  );
}
