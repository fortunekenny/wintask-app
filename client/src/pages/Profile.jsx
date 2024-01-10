import { styled } from "styled-components";
import { useUserContext } from "./UserPage";

const Profile = () => {
  const data = useUserContext();
  return <Wrapper>Profile</Wrapper>;
};

const Wrapper = styled.div`
  background: skyblue;
`;

export default Profile;
