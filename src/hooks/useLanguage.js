import { useState, useEffect } from "react";
import { translations } from "../utils/translations";

const LANGUAGE_KEY = "seleectedLanguage";

export const useLanguage = (defaultLanguage = "en") => {
  const [language, setLanguage] = useState(localStorage.getItem(LANGUAGE_KEY) || defaultLanguage);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return { language, setLanguage, t };
};
