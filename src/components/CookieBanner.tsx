"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck } from "lucide-react";

type Lang = "pt" | "en" | "fr";

const text = {
  pt: {
    title: "🍪 Utilizamos cookies",
    desc: "Usamos cookies para melhorar a sua experiência, analisar o tráfego e personalizar conteúdo. Ao continuar, aceita a nossa política de privacidade.",
    accept: "Aceitar Tudo",
    decline: "Só Essenciais",
    policy: "Política de Privacidade"
  },
  en: {
    title: "🍪 We use cookies",
    desc: "We use cookies to improve your experience, analyze traffic and personalize content. By continuing, you accept our privacy policy.",
    accept: "Accept All",
    decline: "Essential Only",
    policy: "Privacy Policy"
  },
  fr: {
    title: "🍪 Nous utilisons des cookies",
    desc: "Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. En continuant, vous acceptez notre politique de confidentialité.",
    accept: "Tout Accepter",
    decline: "Essentiels Seulement",
    policy: "Politique de Confidentialité"
  }
};

export default function CookieBanner({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(false);
  const t = text[lang];

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash immediately
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "essential");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
          <div className="max-w-5xl mx-auto bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Icon */}
            <div className="bg-lime-500/10 border border-lime-500/20 p-3 rounded-xl shrink-0">
              <ShieldCheck className="w-6 h-6 text-lime-400" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-sm mb-1">{t.title}</p>
              <p className="text-neutral-400 text-xs leading-relaxed">{t.desc}{" "}
                <a href="#" className="text-lime-400 hover:underline">{t.policy}</a>.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-xs font-medium text-neutral-400 border border-neutral-700 rounded-full hover:border-white hover:text-white transition-colors"
              >
                {t.decline}
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2 text-xs font-bold bg-lime-500 text-black rounded-full hover:bg-lime-400 transition-colors shadow-[0_0_20px_rgba(132,204,22,0.3)]"
              >
                {t.accept}
              </button>
              <button
                onClick={handleDecline}
                className="p-2 text-neutral-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
