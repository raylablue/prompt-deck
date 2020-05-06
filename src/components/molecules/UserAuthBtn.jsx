import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import { useSelector } from "react-redux";

function UserAuthBtn() {
  const [userLogin, setUserLogin] = useState('');
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const loginBtn = () => {
    if (user) {
      setUserLogin('logout');
    } else {
      setUserLogin('signin');
    }
  };

  const handleClick = () => {
    if (user) {
      history.push('/');
      return firebase.logout();
    }
    return loginBtn();
  };

  useEffect(() => {
    loginBtn();
  }, [user]);

  return (
    <button
      className="btn btn-primary"
      type="button"
      onClick={handleClick}
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
