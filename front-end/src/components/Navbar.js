import styled from "styled-components";
import Dropdown from "../components/Dropdown";
import Cookies from "js-cookie";

const StyledNav = styled.nav`
  background-color: #fff;
`;

const NavbarBrand = styled.a`
  font-weight: 500;
  color: #601349;
  font-size: 28px;
`

const Navbar = () => {
  const username = Cookies.get("username");

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("userid");
    window.location = "/login";
  };

  return (
    <StyledNav className="navbar navbar-expand-lg justify-content-between border-bottom">
      <div className="container-fluid">
        <NavbarBrand className="navbar-brand" href="#">
          Controle de produtos e vendas
        </NavbarBrand>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Dropdown text={username} logout={logout}/>
      </div>
    </StyledNav>
  );
};

export default Navbar;
