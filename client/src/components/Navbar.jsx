import { NavLink } from "react-router-dom";
import { useUserContext } from "../pages/UserPage";
import { styled } from "styled-components";
import LogoutComponent from "./LogoutComponent";
import { useRef, useEffect } from "react";

const Navbar = ({ contain }) => {
  const { user } = useUserContext();
  const { name, role } = user;
  const hideNavRef = useRef(null);
  useEffect(() => {
    if (contain) {
      hideNavRef.current.style.display = "none";
    }
    hideNavRef.current.style.display = "flex";
  });

  return (
    <Wrapper>
      <nav className="nav-center" ref={hideNavRef}>
        <h5 className="navtext">
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
  width: 100vw;
  .nav-center {
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

  @media screen and (min-width: 676px) {
    width: 600px;
    max-width: 600px;
    margin: auto;
    .nav-center {
      margin-top: 5rem;
      padding: 0.5rem 0.5rem;
    }
  }
`;

export default Navbar;
