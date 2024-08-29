import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";

const colors = {
  primary: "#F96303",
  secondary: "#0bafe1",
  accent: "#FB640B",
  lightGray: "#f4f4f4",
  white: "#ffffff",
};

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the subscription logic
    console.log("Subscribed with email:", email);
    setShowToast(true);
    setEmail("");
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div
          className="relative rounded-lg overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/img/subscribe-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#F96303] to-[#0bafe1] opacity-80"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold leading-tight mb-4 text-white">
                <span className="text-[#FB640B]">Suscríbete</span> Para los
                Últimos Episodios
              </h3>
              <p className="text-gray-200">
                No te pierdas ninguna actualización. Suscríbete a nuestro
                boletín para recibir notificaciones sobre nuevos episodios,
                contenido exclusivo y más.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h5 className="text-2xl font-bold mb-4 text-white">Boletín</h5>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow py-3 px-4 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#FB640B]"
                    placeholder="Tu Email"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#FB640B] text-white px-6 py-3 rounded-r-full font-bold hover:bg-[#F96303] transition-colors duration-300 flex items-center"
                  >
                    Suscribir
                    <Send size={20} className="ml-2" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-[#0bafe1] text-white px-4 py-2 rounded-lg shadow-lg flex items-center"
        >
          <p className="mr-2">¡Suscripción enviada con éxito!</p>
          <button onClick={() => setShowToast(false)} className="text-white">
            <X size={20} />
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default Subscribe;
