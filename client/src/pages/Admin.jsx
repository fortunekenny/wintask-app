import { styled } from "styled-components";
import { useUserContext } from "./UserPage";

const Admin = () => {
  const data = useUserContext();

  return (
    <Wrapper>
      <h2>Admin</h2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default Admin;
