import { styled } from "styled-components";
const FormRow = ({ type, name, labelText, defaultValue, min, max }) => {
  return (
    // <div>
    <Wrapper>
      <label htmlFor={name} className="label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        className="input"
        name={name}
        defaultValue={defaultValue}
        min={min}
        max={max}
        required
      />
      {/* </div> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* margin-left: 1rem; */
  margin-bottom: 1rem;
  .label {
    margin-right: 0.5rem;
  }
  .input {
    border: 1px solid var(--mediumVariation);
    border-radius: var(--borderRadius);
    /* outline-color: none; */
  }
  .input:focus {
    outline: 1px solid var(--primaryColor);
  }
`;

export default FormRow;
