import { useTheme } from "./hooks/useTheme";
import { useLanguage } from "./hooks/useLanguage";

import { LANGUAGE_OPTIONS } from "./constants";

import ElectricityPriceData from "./pages/electricityPriceData";

import Clock from "./components/Clock";
import Select from "./components/Select";
import ThemeController from "./components/Button/ThemeButton";

const App = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage("en");

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className={`flex h-screen items-center justify-center bg-background-600`}>
      <div className="flex flex-col flex-1 h-full">
        <div className="flex justify-between items-center px-4 pt-3">
          <Clock />
          <div className={"flex gap-4"}>
            <Select value={language} options={LANGUAGE_OPTIONS} onChange={handleLanguage} />
            <ThemeController checked={theme === "light"} onChange={toggleTheme} />
          </div>
        </div>
        <ElectricityPriceData t={t} />
      </div>
    </div>
  );
};

export default App;
