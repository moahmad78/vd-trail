// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const DynamicQuoteModal = dynamic(() => import("@/components/QuoteModal"), { ssr: false });
const DynamicWelcomePopup = dynamic(() => import("@/components/WelcomePopup"), { ssr: false });

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
  const pathname = usePathname();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState(false);
  const [hasCopiedPromo, setHasCopiedPromo] = useState(false);
  const [prefillCategory, setPrefillCategory] = useState("Residential");

  const [hasQuoteMounted, setHasQuoteMounted] = useState(false);
  const [hasWelcomeMounted, setHasWelcomeMounted] = useState(false);

  const isExcludedFromWelcome = Boolean(
    pathname && (
      pathname === "/quote" ||
      pathname === "/landing" ||
      pathname.startsWith("/quote") ||
      pathname.startsWith("/landing") ||
      pathname.startsWith("/lead") ||
      pathname.startsWith("/adminlead") ||
      pathname.startsWith("/login")
    )
  );

  if (isQuoteOpen && !hasQuoteMounted) setHasQuoteMounted(true);
  if (isWelcomePopupOpen && !hasWelcomeMounted && !isExcludedFromWelcome) setHasWelcomeMounted(true);

  const openQuoteWithCategory = (category: string) => {
    setPrefillCategory(category);
    setIsQuoteOpen(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isExcludedFromWelcome) {
      setIsWelcomePopupOpen(false);
      return;
    }

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
  }, [isQuoteOpen, isExcludedFromWelcome]);

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
      {hasWelcomeMounted && !isExcludedFromWelcome && <DynamicWelcomePopup />}
      {hasQuoteMounted && (
        <DynamicQuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          prefillCategory={prefillCategory}
        />
      )}
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

