import { useState, useEffect, useRef } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  { value: 500, suffix: "+", label: "Proyectos Completados", color: "text-accent" },
  { value: 98, suffix: "%", label: "Satisfacción Cliente", color: "text-purple-400" },
  { value: 45, suffix: "%", label: "Reducción Costos", color: "text-green-400" },
  { value: 24, suffix: "/7", label: "Soporte Técnico", color: "text-blue-400" },
];

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCounters();
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = Math.floor(current);
          return newValues;
        });
      }, duration / steps);
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 iabyia-secondary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-700 delay-${index * 100} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                {animatedValues[index]}{stat.suffix}
              </div>
              <div className="text-iabyia-light text-sm lg:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
