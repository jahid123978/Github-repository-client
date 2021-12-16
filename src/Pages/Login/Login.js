import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../Context/useAuth';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const {user,  LoginUser, isLoading, error} = useAuth();
    const location = useLocation();
    const history = useNavigate();
     const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData);
     }
    const handleSubmit = e => {

        LoginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }
    return (
        <div>
             <Container>
            <Grid container spacing={2}>
            <Grid sx={{mt: 8}} item xs={12} md={6}>
            <Typography variant="body1">Login</Typography>
            {!isLoading && <form onSubmit={handleSubmit}>
            <TextField
            sx={{width: '75%', m: 1}}
            id="standard-basic" 
            label=" Your Email"
            name="email"
            onChange={handleOnChange} 
            variant="standard" />
            <TextField
             sx={{width: '75%', m: 1}}
             id="standard-basic" 
             label="Password"
             name="password"
             onChange={handleOnChange} 
             type="password"
             variant="standard" />
             <br />
              <Button  sx={{width: '75%', m: 1}} variant="contained" type="submit">Login</Button>
            </form> }
            {
                isLoading && <CircularProgress />
            }
            {/* {user.email && <Alert severity="success">Successfully login!</Alert>} */}
         {error && <Alert severity="success">{error}</Alert>}
            <NavLink
            style={{textDecoration: 'none'}}
            to="/register">New user? Please Register</NavLink>

            {/* <p>-----------------------------------Or----------------------------</p>
             <Button onClick={handleGoogleSignIn} variant="contained">Google with Sign In</Button> */}
            </Grid>
            <Grid item xs={12} md={6}>
            <img style={{width: '620px', height: '575px'}} src="https://media.istockphoto.com/photos/woman-using-access-window-to-log-in-entering-password-on-laptop-sign-picture-id1322595946?b=1&k=20&m=1322595946&s=170667a&w=0&h=37m0-fLJUHJkI8V2mFJYslTVwP7vKogqeuWdp0d6rXk=" alt="" />
            </Grid>
            </Grid>
        </Container>
        </div>
    );
};

export default Login;