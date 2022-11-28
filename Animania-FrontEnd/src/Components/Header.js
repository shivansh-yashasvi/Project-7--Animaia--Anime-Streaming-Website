import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
import search from "../img/search.png";

const Header = forwardRef((props, ref) => {
  const navList = [
    {
      id: 1,
      text: "Home",
      to: "/",
    },
    {
      id: 2,
      text: "Popular",
      to: "/popular",
    },
    {
      id: 3,
      text: "Dub Anime",
      to: "/dub-anime",
    },
  ];
  const [inputVal, setInputVal] = useState("");
  const handelChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    props.handelChanges(val);
  };

  useImperativeHandle(ref, () => ({
    emptySearch() {
      setInputVal("");
    },
  }));

  // const handelScroll = (ele) => {
  //   props.handelScroll(ele);
  // };

  return (
    <div>
      <nav className="navbar navbar-expand-lg header_navbar navbar-light bg-light d-flex align-items-center">
        <div className="container-fluid ">
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
          <div className="header_logo ms-5">
            <Link to={"/"}>
              <img
                src={require("../img/header_logo.png")}
                width="100px"
                className="header_img"
                alt="anime logo"
              />
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="nav_list" id="navbarSupportedContent">
              <ul className="nav_list navbar-nav me-auto mb-2 mb-lg-0">
                {navList.map((list) => (
                  <li className="nav-item" key={list.to}>
                    <Link to={list.to} className="HeaderLi link">
                      {list.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-2 bg-light rounded  input-gp ms-auto ">
              <div className="input-group ">
                <input
                  type="search"
                  placeholder="Search Here.."
                  aria-describedby="button-addon1"
                  className="form-control border-0 bg-light"
                  value={inputVal}
                  onChange={handelChange}
                  id="searchArea"
                />
                <div className="input-group-append">
                  <button
                    id="button-addon1"
                    type="submit"
                    className="btn btn-link text-primary"
                  >
                    <img src={search} alt="search" width="20px" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="anime_search">

        </div> */}
        </div>
      </nav>
    </div>
  );
});
export default Header;
