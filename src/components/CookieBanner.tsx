"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";

type Lang = "pt" | "en" | "fr";

const text = {
  pt: {
    title: "🍪 Utilizamos cookies",
    desc: "Usamos cookies para melhorar a sua experiência, analisar o tráfego e personalizar conteúdo. Ao continuar, aceita a nossa política de privacidade.",
    accept: "Aceitar Tudo",
    decline: "Só Essenciais",
    policy: "Política de Privacidade",
    policyTitle: "Política de Privacidade",
    policyText: "A tua privacidade é importante para nós. Este site é principalmente informativo e não recolhe dados pessoais de identificação direta. Utilizamos apenas armazenamento local (cookies essenciais) para guardar a tua preferência de idioma e o estado de consentimento das cookies. Ao utilizar os links para fazer pedidos pelas plataformas parceiras (Uber Eats, Glovo, WhatsApp), a recolha e processamento de dados adicionais são geridos de forma independente pelas políticas de privacidade de cada uma dessas respetivas empresas.",
    close: "Fechar"
  },
  en: {
    title: "🍪 We use cookies",
    desc: "We use cookies to improve your experience, analyze traffic and personalize content. By continuing, you accept our privacy policy.",
    accept: "Accept All",
    decline: "Essential Only",
    policy: "Privacy Policy",
    policyTitle: "Privacy Policy",
    policyText: "Your privacy is important to us. This website is mainly informational and does not collect direct personal identification data. We only use local storage (essential cookies) to save your language preference and cookie consent status. When using links to order via partner platforms (Uber Eats, Glovo, WhatsApp), the collection and processing of additional data are managed independently according to the privacy policies of those respective companies.",
    close: "Close"
  },
  fr: {
    title: "🍪 Nous utilisons des cookies",
    desc: "Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. En continuant, vous acceptez notre politique de confidentialité.",
    accept: "Tout Accepter",
    decline: "Essentiels Seulement",
    policy: "Politique de Confidentialité",
    policyTitle: "Politique de Confidentialité",
    policyText: "Votre vie privée est importante pour nous. Ce site Web est principalement informatif et ne collecte pas de données d'identification personnelle directe. Nous utilisons uniquement le stockage local (cookies essentiels) pour enregistrer votre préférence de langue et votre statut de consentement. Lors de l'utilisation des liens de commande vers les plateformes partenaires (Uber Eats, Glovo, WhatsApp), la collecte et le traitement de données supplémentaires sont gérés de manière indépendante conformément aux politiques de confidentialité de ces sociétés respectives.",
    close: "Fermer"
  }
};

export default function CookieBanner({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const t = text[lang];

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
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
    <>
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
                  <button 
                    onClick={() => setShowPolicy(true)} 
                    className="text-lime-400 hover:underline font-medium focus:outline-none"
                  >
                    {t.policy}
                  </button>.
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

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPolicy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowPolicy(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowPolicy(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-lime-400" />
                <h3 className="text-2xl font-bold text-white">{t.policyTitle}</h3>
              </div>

              <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-6">
                {t.policyText}
              </p>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowPolicy(false)}
                  className="px-6 py-2 bg-lime-500 text-black font-bold rounded-full hover:bg-lime-400 transition-colors"
                >
                  {t.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
