import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
const FormRow = ({ type, name, labelText, defaultValue, min, max }) => {
  const [labelWidth, setLabelWidth] = useState(0);
  const labelWidthRef = useRef(null);

  useEffect(() => {
    setLabelWidth(labelWidthRef.current.getBoundingClientRect().width);
  }, []);

  return (
    // <div>
    <Wrapper>
      <label htmlFor={name} className="label" ref={labelWidthRef}>
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
        style={{ width: `${300 - labelWidth}px` }}
        required
      />
      {/* </div> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* margin-left: 1rem; */
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  .label {
    margin-right: 0.5rem;
    font-size: 1.5rem;
  }
  .input {
    border: 1px solid var(--mediumVariation);
    border-radius: var(--borderRadius);
    height: 1.5rem;
    /* width: calc(300px - {widthOfLabel}); */
    /* outline-color: none; */
  }
  .input:focus {
    outline: 1px solid var(--primaryColor);
    background: var(--lightestVariation);
    color: var(--darkestVariation);
  }
`;

export default FormRow;
