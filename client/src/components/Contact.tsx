import { useState, useEffect, useRef } from "react";
import { CONTACT_EXTRA_OFFSET } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export interface ContactProps {
  offset?: typeof CONTACT_EXTRA_OFFSET;
}

export default function Contact({
  offset = CONTACT_EXTRA_OFFSET,
}: ContactProps) {
  const [ctaVisible, setCtaVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const ctaRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formSchema = insertContactSchema.extend({
        email: z.string().email({ message: "Email inválido" }),
      });
      const parsed = formSchema.safeParse(formData);
      if (!parsed.success) {
        const message = parsed.error.errors[0]?.message || "Datos inválidos";
        throw new Error(message);
      }

          const apiUrl = new URL("/api/contact", window.location.origin).toString();
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => null);
        const message = errorJson?.message ?? "Request failed";
        throw new Error(message);
      }
      
      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
      } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "No se pudo enviar el mensaje";
      toast({ title: "Error", description: message });
    }
   
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
            aria-label="Ir al formulario de contacto"
            className="bg-white text-accent hover:bg-gray-100 px-6 py-3 lg:px-10 lg:py-5 text-base lg:text-xl font-semibold transform hover:scale-105 transition-all"
          >
            Agendar Consulta Gratuita
          </Button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contacto"
        ref={formRef}
        className={`min-h-screen flex flex-col items-center justify-center py-10 sm:py-14 md:py-20 lg:pt-0 lg:pb-0 text-center transition-all duration-700 scroll-mt-44 md:scroll-mt-36 ${
          formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
          <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${
            formVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-5">
            Conecta con <span className="gradient-text">Nuestro Equipo</span>
          </h2>
          <p className="text-lg lg:text-2xl text-iabyia-light max-w-4xl mx-auto">
            Cuéntanos sobre tu proyecto y descubre cómo podemos ayudarte a
            implementar IA en tu negocio
          </p>
        </div>

        <div className="max-w-5xl mx-auto w-full">
          <form
            onSubmit={handleSubmit}
            className={`space-y-2 sm:space-y-3 lg:space-y-6 transition-all duration-700 delay-300 ${
              formVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 w-full">
              <label className="flex flex-col w-full">
                <span className="sr-only">Nombre</span>
                <Input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="iabyia-secondary border-gray-700 focus:border-accent bg-secondary text-foreground placeholder:text-iabyia-light h-10 md:h-9 lg:h-14 lg:text-xl"
                />
              </label>
              <label className="flex flex-col w-full">
                <span className="sr-only">Email</span>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="iabyia-secondary border-gray-700 focus:border-accent bg-secondary text-foreground placeholder:text-iabyia-light h-10 md:h-9 lg:h-14 lg:text-xl"
                />
                </label>
            </div>
            <label className="flex flex-col w-full">
              <span className="sr-only">Empresa</span>
              <Input
                type="text"
                name="company"
                placeholder="Empresa"
                value={formData.company}
                onChange={handleChange}
                className="iabyia-secondary border-gray-700 focus:border-accent bg-secondary text-foreground placeholder:text-iabyia-light h-10 md:h-9 lg:h-14 lg:text-xl"
              />
            </label>
            <label className="flex flex-col w-full">
              <span className="sr-only">Mensaje</span>
              <Textarea
                name="message"
                placeholder="Cuéntanos sobre tu proyecto"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="iabyia-secondary border-gray-700 focus:border-accent bg-secondary text-foreground placeholder:text-iabyia-light resize-none lg:min-h-[180px] lg:text-xl"
              />
            </label>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent hover:opacity-90 text-white py-2 sm:py-3 lg:py-5 text-sm sm:text-base lg:text-xl font-medium transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
