const Select = ({ value, options = [], onChange }) => {
  return (
    <fieldset className=" border-1 border-border bg-background-500 rounded-lg">
      <select
        defaultValue={value}
        className="select select-bordered w-full rounded-lg bg-background-600 text-text focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default Select;
