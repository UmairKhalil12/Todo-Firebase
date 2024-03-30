import React from 'react'
import './Navbar.css'
import Button from '../Button/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import appStore from '../../zustand/appStore';


function Navbar() {
  const navigate = useNavigate();
  const user = appStore((state) => state.user);

  const LoginClick = () => {
    navigate("/login")
  }

  const SignupClick = () => {
    navigate("/signup")
  }
  const HomeClick = () => {
    navigate("/home")
  }

  const LogOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div >
        <nav className="navbar" >
          <ul className='navbar-ul'>
            <li className='navbar-li'><p className='navbar-a' href="/" onClick={HomeClick}>Home</p></li>
            {user ?
              <Button text="Logout" onClick={LogOut} />
              :
              <>
                <Button onClick={LoginClick} text="Login" />
                <Button onClick={SignupClick} text="Signup" />
              </>
            }
          </ul>
        </nav>
      </div>

    </>
  );

}


export default Navbar
