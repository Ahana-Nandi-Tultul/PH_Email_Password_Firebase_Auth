import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification} from 'firebase/auth';
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        setError('');
        setSuccess('');

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('You should provide 2 upper case letter.');
            return;
        }

        if(!/(?=.*[!@#$&*])/.test(password)){
            setError('You should provide one special case letter.');
            return;
        }

        if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('You should provide two digits.');
            return;
        }

        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            event.target.reset();
            setSuccess('Success! You have created account successfully.')
            sendVarificationEmail(result.user)
        })
        .catch(error => {
            console.error(error.message);
            setError(error.message);
        })
    }

    const sendVarificationEmail = (user) => {
        sendEmailVerification(user) 
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.error(error.message)
            setError(error.message);
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
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p><small>Already have an accout Account? Please <Link to="/login">Login</Link></small></p>
        </div>
    );
};

export default Register;