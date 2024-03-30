import React, { useState } from 'react'
import './Signup.css'
import Button from '../../../Components/Button/Button';
import InputForm from '../../../Components/InputForm/InputForm';
import Label from '../../../Components/Label/Label';
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import Navbar from '../../../Components/Navbar/Navbar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../Firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState(true);
    const navigate = useNavigate();

    const passwordVisibilityClick = () => {
        setType(!type);
    }
    const initialUserTodo = [
        {
            task: '',
            completed: '',
        }
    ]

    const createDb = async (id) => {
        await addDoc(collection(db, 'todos'), {
            todos: initialUserTodo,
            userId: id
        })
    }

    const SignupOnClick = async (event) => {
        event.preventDefault()
        if (email && password) {
            await createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
                console.log(userCredentials, 'user cred inside signup');
                window.alert("User created successfully");
                navigate('/home');
                createDb(userCredentials.user.uid);
            })
                .catch((error) => {
                    console.log('error creating user', error);
                    window.alert('error creating user', error);
                })
        }
        else {
            window.alert("All fields are required");
        }

    };

    return (
        <>
            <Navbar />
            <div className='main-form-div'>
                <h1>Signup Page</h1>
                <div className='form-div'>
                    <form onSubmit={SignupOnClick}>
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
                        <Button text='Signup' type='submit' />

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
