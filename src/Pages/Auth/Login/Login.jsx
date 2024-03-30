import React, { useState } from 'react'
import './Login.css'
import Button from '../../../Components/Button/Button';
import InputForm from '../../../Components/InputForm/InputForm';
import Label from '../../../Components/Label/Label';
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import Navbar from '../../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../Firebase/firebase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState(true);

    const passwordVisibilityClick = () => {
        setType(!type);
    }

    const navigate = useNavigate();

    const Login = async (event) => {
        event.preventDefault();
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                window.alert("Sign in succesfull");
                navigate('/home');
            }
            catch (error) {
                console.log("error logging in");
                window.alert("Error loggin in");
            }

        }
        else {
            window.alert("All fields are required");
        }
    }

    return (
        <>
            <Navbar />
            <div className='main-form-div'>
                <h1>Login Page</h1>
                <div className='form-div'>
                    <form onSubmit={Login}>
                        <Label text='Enter your Email' />
                        <InputForm
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Label text='Enter your Password' />
                        <InputForm
                            type={type ? 'password' : 'text'}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            placeholder='Password'
                        />
                        <Button text='Login' type='submit' />

                        <MdOutlineMailOutline className='email-input-icon' size={25} />
                        <MdOutlinePassword className='password-input-icon' size={25} />
                        {type ?
                            <MdOutlineVisibilityOff
                                size={25}
                                className='password-visibility-icon'
                                onClick={passwordVisibilityClick} />
                            :
                            <MdOutlineVisibility
                                className='password-visibility-icon'
                                size={25}
                                onClick={passwordVisibilityClick} />}

                    </form>
                </div>
            </div>
        </>
    )
}
