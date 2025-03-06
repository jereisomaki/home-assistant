import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useTheme } from "./hooks/useTheme";
import { useLanguage } from "./hooks/useLanguage";

import { LANGUAGE_OPTIONS } from "./constants";

import ElectricityPriceData from "./pages/electricityPriceData";
import WeatherData from "./pages/weatherData";

import Clock from "./components/Clock";
import Select from "./components/Select";
import ThemeController from "./components/ThemeController";

const App = () => {
  const [currentComponent, setCurrentComponent] = useState("electricity");

  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage("en");

  const swipeHandler = (e) => {
    if (e.dir === "Left") setCurrentComponent("weather");
    else if (e.dir === "Right") setCurrentComponent("electricity");
  };

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const handlers = useSwipeable({
    onSwiped: swipeHandler,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className={`flex h-screen items-center justify-center bg-background-600`} {...handlers}>
      <div className="flex flex-col flex-1 h-full">
        <div className="flex justify-between items-center px-4 pt-3">
          <Clock />
          <div className={"flex gap-4"}>
            <Select value={language} options={LANGUAGE_OPTIONS} onChange={handleLanguage} />
            <ThemeController theme={theme} onChange={toggleTheme} />
          </div>
        </div>
        {currentComponent === "electricity" ? <ElectricityPriceData t={t} /> : <WeatherData t={t} />}
      </div>
    </div>
  );
};

export default App;
