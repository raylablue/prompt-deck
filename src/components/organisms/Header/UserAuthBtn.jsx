import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase/firebase';

function UserAuthBtn() {
  const [userLogin, setUserLogin] = useState('');
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const loginBtn = useCallback(
    () => {
      if (user) {
        setUserLogin('logout');
      } else {
        setUserLogin('signin');
      }
    },
    [user],
  );

  const handleClick = () => {
    if (user) {
      history.push('/');
      return firebase.logout();
    }

    return loginBtn();
  };

  useEffect(() => {
    loginBtn();
  }, [user, loginBtn]);

  return (
    <button
      data-test="user-auth-btn"
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
