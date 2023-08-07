import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const auth = getAuth(app);  

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        setError('');
        setSuccess('');

        // if(/(?=.*[A-Z].*[A-Z])/.test(password)){
        //     setError('Please add at least two Uppercase letter');
        //     return;
        // }
        // else if(/(?=.*[!@#$&*])/.test(password)){
        //     setError('Please add at least one special character.');
        //     return;
        // }
        // else if(password.length < 6){
        //     setError('Password should have length of 6 characters');
        //     return;
        // }

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            if(!user.emailVerified){
                alert('Please varify your email accout.')
                return;
            }
            setSuccess('Success! You have successfully logged in.')
        })
        .catch(error => {
            console.error(error.message);
            setError(error.message);
        })
    }
    const handleResetPassword = () => {
        const email = emailRef.current.value;
        console.log(email);
        if(!email){
            alert('Please provide your email to reset password.');
            return;
        }

        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert('Please check your email account to reset password.');
        })
        .catch(error => {
            console.error(error.message);
            setError(error.message);
        })
    }
    return (
        <div className='w-50 mx-auto m-4'>
            <h2>Please login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="eampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" ref={emailRef}
                    id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p><small>Forget your password. Please <button className='btn btn-link' 
            onClick={handleResetPassword}>Reset Password</button></small></p>
            <p><small>New in the website? Pleae register <Link to="/register">Click here</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;