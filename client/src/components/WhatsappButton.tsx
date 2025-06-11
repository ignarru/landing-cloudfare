import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/5491160390755"
      className="fixed bottom-4 right-4 z-50 p-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transform hover:scale-105 transition-transform animate-bounce-slow hover:animate-none"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatea en WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
  );
}
