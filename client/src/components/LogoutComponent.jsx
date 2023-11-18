import { styled } from "styled-components";
import { useUserContext } from "../pages/UserPage";
// import { useState } from "react";

const LogoutComponent = () => {
  //   const [showLogout, setShowLogout] = useState(false);
  const { logoutUser } = useUserContext();

  return (
    <Wrapper>
      <button type="button" onClick={logoutUser}>
        logout
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default LogoutComponent;
