import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { filterAds, searchFilter } from "../redux/ads/adsSlice";
import { resetUser } from "../redux/auth/authSlice";

import profile from "../images/profile.jpg";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";

function Header() {
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState("");
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((select) => select.auth);

  console.log("header user", user);

  useEffect(() => {
    if (value || value !== null) {
      dispatch(filterAds(value.label));
    }
  }, [dispatch, value]);

  useEffect(() => {
    dispatch(searchFilter(input));
  }, [dispatch, input]);

  const logout = () => {
    localStorage.clear();
    dispatch(resetUser());
    navigate("/");
  };

  const handleSellBtnClick = () => {
    if (!user) {
      toast.error("To post Ad, Please login");
    }
  };
  const handleChatBtnClick = () => {
    if(!user){
      toast.error("To get chats, please login")
    }
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Navbar bg="light" expand="lg" style={{ height: "80px" }}>
      <Container>
        <NavLink
          style={{ fontWeight: "bold", color: "orange" }}
          to="/"
          className="navbar-brand"
        >
          swapNplay
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex" style={{ flex: 1 }}>
            <div style={{ width: "50%" }}>
              {GooglePlacesAutocomplete && (
                <GooglePlacesAutocomplete
                  selectProps={{
                    value,
                    onChange: setValue,
                  }}
                  autocompletionRequest={{
                    componentRestrictions: { country: ["pk"] },
                  }}
                />
              )}
            </div>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 "
              aria-label="Search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Form>
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {!user && (
              <>
                <NavLink className="nav-link" to="/signin">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/signup">
                  Register
                </NavLink>
              </>
            )}

            {user && (
              <div style={{ marginLeft: "1rem" }}>
                <Avatar
                  alt="Remy Sharp"
                  src={user.picture ? user.picture : profile}
                  onClick={handleClick}
                  style={{ background: "none", cursor: "pointer" }}
                />
                 

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{
                    ".MuiPaper-root": {
                      width: "20%",
                      padding: "1rem",
                      left: "auto !important",
                      right: "150px",
                    },
                  }}
                >
                  <div className="d-flex">
                    <img
                      src={user.picture ? user.picture : profile}
                      width={50}
                      height={50}
                      alt="profile"
                      style={{ borderRadius: "50%" }}
                    />

                    <div className="d-flex flex-column ps-2">
                      <span>Hello</span>
                      <span style={{ fontWeight: "bold" }}>{user?.name && user.name}</span>
                      {/* <Link to="/" style={{ color: 'black' }}>
                        view and edit profile
                      </Link> */}
                    </div>
                  </div>
                  <hr />
                  <Link
                    to="/myads"
                    className="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"
                    style={{
                      color: "#333",
                      padding: "6px 16px",
                      textDecoration: "none",
                    }}
                  >
                    My Ads
                  </Link>
                  <Link
                    to="/swap-requests"
                    className="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root"
                    style={{
                      color: "#333",
                      padding: "6px 16px",
                      textDecoration: "none",
                    }}
                  >
                    Swap requests
                  </Link>
                  <MenuItem to="/" onClick={logout}>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}

            <NavLink
              className="nav-link ms-2"
              to="/post"
              onClick={handleSellBtnClick}
            >
              Sell
            </NavLink>
            {user && <NavLink
              className="nav-link ms-2"
              to="/chatList"
              onClick={handleChatBtnClick}
            >
              Chat
            </NavLink>}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
