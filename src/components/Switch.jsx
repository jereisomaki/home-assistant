const Switch = ({ label, checked = false, disabled, onClick }) => {
  return (
    <label className="fieldset-label flex items-end">
      <span className={`text-light text-xl text-text px-2 ${disabled ? "opacity-40 select-none" : "opacity-100"}`}>
        {label}
      </span>
      <input
        type="checkbox"
        className="toggle toggle-md border-background-500 bg-background-600  checked:text-background-700 checked:border-background-700 "
        checked={checked}
        disabled={disabled}
        onChange={onClick}
      />
    </label>
  );
};

export default Switch;
