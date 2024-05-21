const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Home
        </a>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <a className="btn" href="./Login">
            Login
          </a>
          <a className="btn btn-outline-secondary mx-2" href="./Signup">
            Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
