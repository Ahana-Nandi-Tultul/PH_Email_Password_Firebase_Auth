import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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

        const auth = getAuth(app);
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
    return (
        <div className='w-50 mx-auto m-4'>
            <h2>Please login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="eampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" 
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
            <p><small>New in the website? Pleae register <Link to="/register">Click here</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;