import { NavLink } from "react-router-dom";
import { useUserContext } from "../pages/UserPage";
import { styled } from "styled-components";
import LogoutComponent from "./LogoutComponent";

const Navbar = () => {
  const { user } = useUserContext();
  const { name, role } = user;

  return (
    <Wrapper>
      <nav className="nav-center">
        <h5 className="navtext">
          <span> {name}</span>
        </h5>
        <div className="link-center">
          <NavLink
            to="admin"
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
  /* display: flex; */
  /* justify-content: space-between; */
  /* width: 100%; */
  margin: auto;
  .nav-center {
    display: flex;
    justify-content: space-between;
    flex: 0 0 0;
    background: var(--white);
    /* width: 100%; */
    margin: auto;
    padding: 2% 2%;
    border-radius: var(--borderRadius);
  }

  .navtext {
    font-weight: 400;
    margin: auto 0;
  }
  .navtext span {
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
  @media screen and (max-width: 502px) {
    margin: 0 auto;
    width: 100%;
    .nav-center {
      /* width: 100%; */
      /* margin: 0 auto; */
    }
  }

  @media screen and (min-width: 676px) {
    /* width: 600px; */
    max-width: 600px;
    margin: auto;
    margin-top: 5rem;
    /* padding: 0.5rem 0.5rem; */
    .nav-center {
      /* width: 100%; */
      /* margin-top: 5rem;
      padding: 0.5rem 0.5rem; */
    }
  }
`;

export default Navbar;
