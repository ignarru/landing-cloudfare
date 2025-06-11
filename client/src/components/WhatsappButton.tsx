import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  const [visible, setVisible] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    const bounceTimer = setTimeout(() => setBounce(true), 1500);
    return () => {
      clearTimeout(timer);
      clearTimeout(bounceTimer);
    };
  }, []);
  
  return (
    <a
      href="https://wa.me/5491160390755"
      className={`fixed bottom-4 right-4 z-50 p-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-500 ease-out ${
        visible ? "translate-x-0 opacity-100" : "translate-x-[200%] opacity-0"
      } ${bounce ? "animate-bounce-slow hover:animate-none" : ""}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatea en WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
  );
}
