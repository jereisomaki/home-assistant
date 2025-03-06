const DataCard = ({ title, subtitle, value, unit }) => {
  return (
    <div className="flex flex-col text-center w-full">
      <span className="text-light text-sm text-text" style={{ fontSize: "clamp(1rem, 4vw, 1.5rem)" }}>
        {title}
      </span>
      {
        <span
          className={`text-light text-xs text-text ${subtitle ? "visible" : "invisible"}`}
          style={{ fontSize: "clamp(0.75rem, 3vw, 1.25rem)" }}
        >
          {subtitle || "-"}
        </span>
      }
      <span className="text-primary-500 font-bold" style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}>
        {value.toFixed(2)}
      </span>
      <span className="text-light text-sm text-text" style={{ fontSize: "clamp(1rem, 4vw, 1.5rem)" }}>
        {unit}
      </span>
    </div>
  );
};

export default DataCard;
