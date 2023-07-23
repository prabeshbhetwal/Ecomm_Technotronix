import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { MdProductionQuantityLimits, MdPayment } from "react-icons/md";
import { FaShuttleVan } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  return (
    <div className="side-bar bg-dark text-light">
      <p className="mt-3 text-center">Admin Panel</p>
      <hr />
      <nav>
        <ul className="list-unstyled side-nav">
          <li>
            <Link className="nav-link" to="/dashboard">
              <AiOutlineDashboard className="fs-4" /> Dashboard
            </Link>
          </li>{" "}
          <li>
            <Link className="nav-link" to="/category">
              <BiCategory className="fs-4" /> Category
            </Link>
          </li>{" "}
          <li>
            <Link className="nav-link" to="/products">
              <MdProductionQuantityLimits className="fs-4" /> Products
            </Link>
          </li>{" "}
          <li>
            <Link className="nav-link" to="/payment-option">
              <MdPayment className="fs-4" /> Payment Option
            </Link>
          </li>{" "}
          <li>
            <Link className="nav-link" to="/orders">
              <FaShuttleVan className="fs-4" /> Orders
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/customer">
              <BsFillPersonFill className="fs-4" /> Customer
            </Link>
          </li>
          <hr />
          <li>
            <Link className="nav-link" to="/admin-user">
              <RiAdminFill className="fs-4" /> Admin User
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/profile">
              <CgProfile className="fs-4" /> Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
