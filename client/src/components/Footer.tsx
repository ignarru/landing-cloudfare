import { Brain, Linkedin, Twitter, Facebook, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {

  return (
    <footer className="bg-secondary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
              <span className="text-2xl font-bold gradient-text">IAbyIA</span>
            </div>
            <p className="text-iabyia-light mb-6 leading-relaxed">
              Transformamos negocios con soluciones de Inteligencia Artificial personalizadas. 
              Tu socio estratégico en la era digital.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/ignacio-arruvito-485562340/" 
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:opacity-80 transition-opacity focus-visible:focus"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://www.youtube.com/@ignacio.arruvito" 
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:opacity-80 transition-opacity focus-visible:focus"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/ignacio.arruvito/" 
                className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:opacity-80 transition-opacity focus-visible:focus"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Services Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Servicios</h3>
            <ul className="space-y-3 text-iabyia-light">
              <li>
                <span className="hover:text-accent transition-colors">
                  Automatización IA
                </span>
              </li>
              <li>
                <span className="hover:text-accent transition-colors">
                  Análisis Predictivo
                </span>
              </li>
              <li>
                <span className="hover:text-accent transition-colors">
                  Chatbots Avanzados
                </span>
              </li>
              <li>
                <span className="hover:text-accent transition-colors">
                  Big Data
                </span>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contacto</h3>
            <ul className="space-y-3 text-iabyia-light">
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent" />
                <span>+54 91160390755</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span>Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-accent" />
                <span>Lun - Vie: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-iabyia-light">
          <p>&copy; 2024 IAbyIA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
