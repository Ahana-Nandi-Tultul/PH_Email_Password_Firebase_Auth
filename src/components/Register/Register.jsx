import React from 'react';

const Register = () => {
    return (
        <div>
            <input type="email" name="email" id="email" placeholder='Your Email' />
            <br/>
            <input type="password" name="password" id="password" placeholder='Your Password' />
            <br/>
            <input type="submit" value="Register" />
        </div>
    );
};

export default Register;