import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav
        style={{ backgroundColor: "black !important", color: "white" }}
        class="navbar navbar-expand-lg bg-body-tertiary"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Logo
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" aria-current="page" to="/videos">
                  Videos
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" aria-current="page" to="/comment">
                  Comment Form
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
