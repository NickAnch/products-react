import React from 'react';
import classes from './Menu.module.scss';
import { NavLink } from 'react-router-dom';

function renderLinks(links) {
  return links.map((link, index) => {
    return (
      <li key={index} className="nav-item" >
        <NavLink
          to={link.to}
          exact={link.exact}
          className={link.isViewBth ? 'btn btn-outline-info' : 'nav-link'}
          activeClassName="active"
        >
          {link.label}
        </NavLink>
      </li>
    )
  });
}

const Menu = props => {
  const ulCls = ['navbar-nav'];
  const links = [];

  if (props.isLoggedIn) {
    ulCls.push(classes.header);

    links.push({ to: '/admin/dashboard', label: 'Dashboard', exact: false, isViewBth: false });
    links.push({ to: '/admin/create', label: 'Create', exact: false, isViewBth: false });
    links.push({ to: '/logout', label: 'Log Out', exact: false, isViewBth: false });
  } else {
    links.push({ to: '/admin/login', label: 'Admin', exact: false, isViewBth: true });
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <NavLink className="navbar-brand" to={'/'} exact>Products</NavLink>

      <ul className={ulCls.join(' ')}>
        { renderLinks(links) }
      </ul>
    </nav>
  );
}

export default Menu;
