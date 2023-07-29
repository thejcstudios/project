import React from "react";
import Users from "../Users";

function UserNav() {
  return (
    <div className="usernav__container">
      <h2>Welcome to JC Studios Admin Page</h2>
      <div className="usernav__wrapper">
        <ul>
          <br />
          <Users />
        </ul>
      </div>
    </div>
  );
}

export default UserNav;
