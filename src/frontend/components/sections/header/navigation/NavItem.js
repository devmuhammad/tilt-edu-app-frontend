import React, {Fragment} from 'react';
import {NavLink} from "react-router-dom";

const NavItem = (props) => {
    return (
       <Fragment>
           {
               props.children ?
                   <li className="nav-item dropdown">
                       <NavLink to={props.link} className={"nav-link"} data-toggle="dropdown" role="button">
                           <span className="nav-link-inner-text mr-1">{props.name}</span>
                               <i className="fas fa-angle-down nav-link-arrow"> </i>
                       </NavLink>
                           <div className="dropdown-menu dropdown-menu-lg">
                               <div className="col-auto px-0" data-dropdown-content>
                                   <div className="list-group list-group-flush">
                                       {props.children}
                                   </div>
                               </div>
                           </div>
                   </li>
                   :
                   <li className="nav-item">
                       <NavLink to={props.link} className={"nav-link"}>
                           <span className="nav-link-inner-text">{props.name}</span>
                       </NavLink>
                   </li>
           }
       </Fragment>

    );
};

export default NavItem;
