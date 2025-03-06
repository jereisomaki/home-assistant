import React, { useState, useEffect } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  return (
    <div className="flex items-end gap-4">
      <div className="text-2xl font-bold text-text">{formattedTime}</div>
      <div className="text-xl text-text">{formattedDate}</div>
    </div>
  );
};

export default Clock;
