import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";

const FormRow = ({ type, name, labelText, defaultValue, min, max }) => {
  const [labelWidth, setLabelWidth] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const labelWidthRef = useRef(null);
  const wrapperWidthRef = useRef(null);

  useEffect(() => {
    setLabelWidth(labelWidthRef.current.getBoundingClientRect().width);
  }, []);
  useEffect(() => {
    setWrapperWidth(wrapperWidthRef.current.getBoundingClientRect().width);
  }, []);

  return (
    // <div>
    <Wrapper ref={wrapperWidthRef}>
      <label
        htmlFor={name}
        className='label'
        ref={labelWidthRef}
      >
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        className='input'
        name={name}
        defaultValue={defaultValue}
        min={min}
        max={max}
        style={{ width: `${wrapperWidth - labelWidth - 30}px` }}
        required
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
  }
  .input:focus {
    outline: 1px solid var(--primaryColor);
    background: var(--lightestVariation);
    color: var(--darkestVariation);
  }
`;

export default FormRow;
