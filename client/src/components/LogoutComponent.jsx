import { styled } from "styled-components";
import { useUserContext } from "../pages/UserPage";
// import { useState } from "react";

const LogoutComponent = () => {
  //   const [showLogout, setShowLogout] = useState(false);
  const { logoutUser } = useUserContext();

  return (
    <Wrapper>
      <button type="button" onClick={logoutUser} className="logoutbtn">
        logout
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
  background: var(--primaryColor);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadowSM);
  padding: 0.375rem 0.75rem;
  margin-right: 1rem;
  transition: var(--transition);
  .logoutbtn {
    border: transparent;
    background: transparent;
    color: var(--lightestVariation);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
`;

export default LogoutComponent;
