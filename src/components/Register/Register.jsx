import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import app from '../firebase/firebase.config';

const Register = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);


        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(error => {
            console.error(error);
        })
    }

    const handleEmailChange = (event) => {
        const email = event.target.value;
        // console.log(email);
        setEmail(email);
    }

    const handlePasswordBlur = (event) => {
        const password = event.target.value;
        // console.log(password);
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-50 ps-4 mb-4' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your Email' />
                <br/>
                <input className='w-50 ps-4 mb-4' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your Password' />
                <br/>
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;