import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {
    
    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const[passwordStrength, setPasswordStrength] = useState();
    const navigate = useNavigate()

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(getPasswordStrength(newPassword));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', {email, password})
        .then(result => {
            console.log(result)
            if(result.data === "Success"){
                navigate('/home')
            }
            
        })
        .catch(err => console.log(err))
    }

    const getPasswordStrength = (password) => {
        let strength = "Weak"; // Default to Weak
        const lengthCriteria = password.length >= 8;
        const uppercaseCriteria = /[A-Z]/.test(password);
        const numberCriteria = /[0-9]/.test(password);
        const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        let score = 0;

        if (lengthCriteria) score++;
        if (uppercaseCriteria) score++;
        if (numberCriteria) score++;
        if (specialCharCriteria) score++;

        if (score === 1) {
            strength = "Weak";
        } else if (score === 2) {
            strength = "Good";
        } else if (score === 3) {
            strength = "Very Good";
        } else if (score === 4) {
            strength = "Excellent";
        }

        return strength;
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            // onChange={(e) => setPassword(e.target.value)}
                            onChange={handlePasswordChange}
                        />
                            <small className="form-text text-muted">
                            Password strength: {passwordStrength}
                            </small>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                    </form>
                    <p>Already have an Account</p>
                    <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    SignUp
                    </Link>

                

            </div>
        </div>
    )

}
export default Login;