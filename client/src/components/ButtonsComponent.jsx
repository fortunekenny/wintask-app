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
          classes={showButton ? "show" : "hide"}
          actionstring={`./repeattask/${_id}`}
        />
        <CancelButton
          time={remainderTime}
          classes={showButton ? "show" : "hide"}
          actionstring={`./canceltask/${_id}`}
        />
        <EditButton
          time={remainderTime}
          classes={showButton ? "show" : "hide"}
          actionstring={`./edittask/${_id}`}
        />
        <DeleteButton
          classes={showButton ? "show" : "hide"}
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
  .show {
    display: inline-block;
  }
  .hide {
    display: none;
    transition: var(--transition);
  }
  .reduce-height {
    height: 0px;
    transition: var(--transition);
  }
`;

export default ButtonsComponent;
