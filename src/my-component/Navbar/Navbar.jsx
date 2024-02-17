import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/Service/auth/userToken";
import {
  fetchCategory,
  setCategory,
} from "../../redux/Service/Category/GetCategory";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { user } = useSelector(({ userToken }) => userToken);
  const { category } = useSelector(({ categories }) => categories);
  const saveUser = () => {
    let token = localStorage.getItem("token");
    if (token) {
      let decode = jwtDecode(token);
      dispatch(setUser(decode));
    } else {
      console.log("Token is not present in localStorage");
    }
  };
  useEffect(() => {
    if (!user) {
      saveUser();
    }
    dispatch(fetchCategory());
  }, [user,category]);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/login");
  };
  return (
    <nav
      className="navbar navbar-expand-lg bg-primary position-fixed top-0 w-100 z-3"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Super Market
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="cart">
                    Cart
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </a>
              <ul className="dropdown-menu">
                {category.map((item, index) => (
                  <li key={index}>
                    <Link
                      className="dropdown-item"
                      to={`categories/${item}`}
                      state={{ name: item }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={logout}>
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
