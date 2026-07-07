// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import QuoteModal from "@/components/QuoteModal";
import WelcomePopup from "@/components/WelcomePopup";

interface QuoteContextType {
  isQuoteOpen: boolean;
  setIsQuoteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isWelcomePopupOpen: boolean;
  setIsWelcomePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasCopiedPromo: boolean;
  setHasCopiedPromo: React.Dispatch<React.SetStateAction<boolean>>;
  prefillCategory: string;
  openQuoteWithCategory: (category: string) => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState(false);
  const [hasCopiedPromo, setHasCopiedPromo] = useState(false);
  const [prefillCategory, setPrefillCategory] = useState("Residential");

  const openQuoteWithCategory = (category: string) => {
    setPrefillCategory(category);
    setIsQuoteOpen(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasShownWelcome = sessionStorage.getItem("welcome_quote_shown");

    if (!hasShownWelcome) {
      const timer = setTimeout(() => {
        setIsWelcomePopupOpen((prevIsOpen) => {
          if (!prevIsOpen && !isQuoteOpen) {
            sessionStorage.setItem("welcome_quote_shown", "true");
            return true;
          }
          return prevIsOpen;
        });
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isQuoteOpen]);

  return (
    <QuoteContext.Provider
      value={{
        isQuoteOpen,
        setIsQuoteOpen,
        isWelcomePopupOpen,
        setIsWelcomePopupOpen,
        hasCopiedPromo,
        setHasCopiedPromo,
        prefillCategory,
        openQuoteWithCategory,
      }}
    >
      {children}
      <WelcomePopup />
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        prefillCategory={prefillCategory}
      />
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return context;
};

