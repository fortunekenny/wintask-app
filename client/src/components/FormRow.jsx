const FormRow = ({ type, name, labelText, defaultValue, min, max }) => {
  return (
    <div>
      <div className="">
        <label htmlFor={name} className="">
          {labelText || name}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          defaultValue={defaultValue}
          min={min}
          max={max}
          required
        />
      </div>
    </div>
  );
};

export default FormRow;
