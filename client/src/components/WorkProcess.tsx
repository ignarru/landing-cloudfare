import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useInView } from "@/hooks/use-in-view";
import { Search, Palette, Code, Zap } from "lucide-react";

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Análisis Inicial",
    description: "Evaluamos tu negocio e identificamos oportunidades de mejora con IA.",
    icon: <Search className="w-6 h-6 text-white" />,
    color: "iabyia-accent"
  },
  {
    number: 2,
    title: "Diseño Personalizado",
    description: "Creamos una solución de IA adaptada a tus necesidades específicas.",
    icon: <Palette className="w-6 h-6 text-white" />,
    color: "bg-green-500"
  },
  {
    number: 3,
    title: "Implementación",
    description: "Desarrollamos e integramos la solución en tu infraestructura actual.",
    icon: <Code className="w-6 h-6 text-white" />,
    color: "bg-blue-500"
  },
  {
    number: 4,
    title: "Optimización",
    description: "Monitoreamos y optimizamos continuamente para maximizar resultados.",
    icon: <Zap className="w-6 h-6 text-white" />,
    color: "bg-blue-800"
  }
];

function StepItem({ step, index, visible }: { step: ProcessStep; index: number; visible: boolean }) {
  const isMobile = useIsMobile();
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const show = isMobile ? isInView : visible;
  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center transition-all duration-700 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Step number circle */}
      <div
        className={`absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${step.color} rounded-full flex items-center justify-center z-10 shadow-lg`}
      >
        <div className="flex flex-col items-center">
          {step.icon}
          <span className="text-white font-bold text-sm mt-1">{step.number}</span>
        </div>
      </div>

      {/* Content card */}
      <div
        className={`pt-16 pl-20 sm:pl-24 md:pt-0 md:pl-0 w-full ${
          index % 2 === 0 ? "md:w-5/12 md:pr-8" : "md:w-5/12 md:ml-auto md:pl-8"
        }`}
      >
        <div className="glass-effect rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
          <p className="text-iabyia-light leading-relaxed">{step.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function WorkProcess() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="proceso" ref={sectionRef} className="py-16 sm:py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Nuestro <span className="gradient-text">Proceso de Trabajo</span>
          </h2>
          <p className="text-xl text-iabyia-light max-w-3xl mx-auto">
            Un enfoque sistemático y probado para garantizar el éxito de tu proyecto de IA
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline - Fixed positioning */}
          <div className="process-timeline relative">
            <div className="space-y-12 md:space-y-16">
              {processSteps.map((step, index) => (
                <StepItem key={step.number} step={step} index={index} visible={isVisible} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
