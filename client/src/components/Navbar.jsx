import { NavLink } from "react-router-dom";
import { useUserContext } from "../pages/UserPage";
import { styled } from "styled-components";
import LogoutComponent from "./LogoutComponent";

const Navbar = () => {
  const { user } = useUserContext();
  const { name, role } = user;
  return (
    <Wrapper>
      {/* <h3>Navbar</h3> */}
      <nav className="nav-center">
        <h5 className="navtext">
          {/* Welcome */}
          <span> {name}</span>
        </h5>
        <div className="link-center">
          <NavLink
            to="/userpage/admin"
            className={role === "founder" ? "showadmin btn" : "adminhide"}
          >
            Admin
          </NavLink>
          <LogoutComponent />
        </div>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .nav-center {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: var(--white);
    padding: 2% 2%;
    margin: 0 auto;
    flex: 0 0 0;
  }

  .navtext {
    font-weight: 400;
    margin: auto 0;
  }
  .navtext span {
    /* /* display: inline-block;  */
    background: var(--lightestVariation);
    color: var(--primaryColor);
    border-radius: var(--borderRadius);
    margin-left: 0.5rem;
    font-weight: 600;
    padding: 0.375rem 0.75rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    transition: var(--transition);
  }
  .link-center {
    display: flex;
    flex: 0 0 0;
  }
  .link-center > div:hover {
    background: var(--darkVariation);
    box-shadow: var(--shadowMD);
  }
  .adminhide {
    visibility: hidden;
  }
  .showadmin {
    text-decoration: none;
    visibility: visible;
    margin-right: 1rem;
  }
  /* @media screen and (max-width: 400px) {
    .nav-center {
      margin-bottom: 2rem;
      min-width: 400px;
    }
  } */
  @media screen and (min-width: 676px) {
    .nav-center {
      width: 70%;
      max-width: 600px;
      margin-top: 5rem;
      padding: 0.5rem 0.5rem;
    }
  }
`;

export default Navbar;
