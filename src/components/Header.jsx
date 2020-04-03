import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

export const Header = props => {
  return (
    <Nav tabs fill>
      <NavItem>
        <NavLink to="/home" activeClassName="active" tag={RRNavLink}>
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/movies" activeClassName="active" tag={RRNavLink}>
          Movies
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/users" activeClassName="active" tag={RRNavLink}>
          Users
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/addUsers" activeClassName="active" tag={RRNavLink}>
          Add Users
        </NavLink>
      </NavItem>
    </Nav>
  );
};
