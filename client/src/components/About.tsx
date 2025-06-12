import { Rocket, Eye } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

export default function About() {
  const { ref: imageRef, isInView: imageInView } = useInView<HTMLImageElement>({ threshold: 0.2 });
  const { ref: textRef, isInView: textInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  
  return (
    <section
      id="acerca"
      className="py-16 sm:py-20 scroll-mt-36 md:scroll-mt-28 lg:min-h-screen lg:flex lg:items-center lg:py-0"
    >
      <div className="max-w-7xl 2xl:max-w-none mx-auto px-4 sm:px-6 lg:px-8 2xl:px-20">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <img
            ref={imageRef}
            src="/profile.png"
            alt="Foto de Ignacio Arruvito"
            loading="lazy"
            decoding="async"
            className={`w-full h-auto sm:w-2/3 md:w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto rounded-2xl shadow-2xl shadow-black/80 object-cover transition-all duration-700 ${
              imageInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          />
          <div
            ref={textRef}
            className={`text-center md:text-left transition-all duration-700 ${textInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold mb-6">
              Acerca de <span className="gradient-text">Mí</span>
            </h2>
            <p className="text-iabyia-light text-sm md:text-base lg:text-lg 2xl:text-xl leading-relaxed">
              Soy Ignacio Arruvito, consultor en inteligencia artificial y fundador de IAbyIA. Mi objetivo es ayudar a las empresas a adoptar soluciones de IA que impulsen su crecimiento y eficiencia.
            </p>
            <p className="text-iabyia-light text-sm md:text-base lg:text-lg 2xl:text-xl leading-relaxed mt-4">
              Cuento con amplia experiencia implementando proyectos de automatización y análisis predictivo para empresas de diversas industrias.
            </p>

            <div className="mt-8 space-y-4 sm:space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 iabyia-accent rounded-lg flex items-center justify-center mr-4">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <p className="text-iabyia-light text-sm md:text-base lg:text-lg 2xl:text-xl leading-relaxed">
                  Llevo la inteligencia artificial a emprendedores que quieren escalar con propósito y construir el futuro desde hoy.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 iabyia-highlight rounded-lg flex items-center justify-center mr-4">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <p className="text-iabyia-light text-sm md:text-base lg:text-lg 2xl:text-xl leading-relaxed">
                  Aspiro a posicionar IAbyIA como la consultora referente para potenciar negocios con inteligencia artificial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
