import styled from "styled-components";
import RepeatButton from "../components/RepeatButton";
import CancelButton from "../components/CancelButton";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

const ButtonsComponent = ({ remainderTime, _id, showButton }) => {
  return (
    <Wrapper>
      <div className={showButton ? "button-center" : "reduce-height"}>
        <RepeatButton
          time={remainderTime}
          // id={_id}
          show={showButton}
          actionstring={`./repeattask/${_id}`}
        />
        <CancelButton
          time={remainderTime}
          // id={_id}
          show={showButton}
          actionstring={`./canceltask/${_id}`}
        />
        <EditButton
          time={remainderTime}
          // id={_id}
          show={showButton}
          actionstring={`./edittask/${_id}`}
        />
        <DeleteButton
          // id={_id}
          show={showButton}
          actionstring={`./deletetask/${_id}`}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .button-center {
    display: flex;
    padding: 0.5rem 0;
    justify-content: center;
    border-radius: 2rem;
    transition: var(--transition);
  }
  .btn2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    background: transparent;
    border: transparent;
    border-radius: var(--borderRadius);
    transition: var(--transition);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    margin-right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    color: var(--primaryColor);
  }
  .btn2:active {
    color: var(--lightestVariation);
    background: var(--darkestVariation);
  }
  .btn2 p {
    margin-bottom: 0.1rem;
    font-size: 0.65rem;
  }
  .btn2 svg {
    font-size: 1.5rem;
  }
  .disable {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ddd;
    color: var(--primaryColor);
    cursor: pointer;
    border: transparent;
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
  }
  .disable p {
    margin-bottom: 0.1rem;
    font-size: 0.65rem;
  }
  .disable svg {
    font-size: 1.5rem;
  }
  .reduce-height {
    height: 0px;
    transition: var(--transition);
  }
  .show {
    display: inline-block;
  }
  .hide {
    display: none;
    transition: var(--transition);
  }
`;

export default ButtonsComponent;
