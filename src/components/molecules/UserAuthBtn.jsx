import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FirebaseContext from "../../firebase/context";


function UserAuthBtn() {
  const { user, firebase} = useContext(FirebaseContext);
  const [userLogin, setUserLogin] = useState("signin");

  const loginBtn = () => {
    if (user) {
      setUserLogin("logout");
    } else {
      setUserLogin("signin");
    }
    console.log('user', user);
  };

  useEffect(() => {
    console.log('user', user);
  }, []);

  return (
    <button
      className="btn btn-primary"
      type="button"
    >
      <NavLink
        to="/signin"
        className="nav-link"
        activeClassName="chosen"
      >
        {userLogin}
      </NavLink>
    </button>
  );
}

export default UserAuthBtn;
