const FormRow = ({ type, name, labelText, defaultValue }) => {
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
          required
        />
      </div>
    </div>
  );
};

export default FormRow;
