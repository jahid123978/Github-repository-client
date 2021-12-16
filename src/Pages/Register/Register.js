import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../Context/useAuth';

const Register = () => {

    const [loginData, setLoginData] = useState({});
    const history = useNavigate();
    const location = useLocation();

    const {user,  RegisterNewUser, isLoading, error} = useAuth();
    const handleOnBlur = e => {
        e.preventDefault();
        const field = e.target.name;
        const value = e.target.value;
        console.log(field, value);
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData);
     }
    const handleSubmit = e => {
        // setIsLoading(false);
        e.preventDefault();
        if(loginData.password !== loginData.password2){
            alert('Your password did not match');
            return;
        }
        RegisterNewUser(loginData.name, loginData.email, loginData.password, history);
       
    }
    return (
        <div>
             <Container>
        <Grid container spacing={2}>
        <Grid sx={{mt: 8}} item xs={12} md={6}>
        <Typography variant="body1">Register</Typography>
       {!isLoading? <form onSubmit={handleSubmit}>
        <TextField 
        sx={{width: '75%', m: 1}}
        id="standard-basic" 
        label=" Your Name"
        name="name"
        onBlur={handleOnBlur} 
        variant="standard" />
        <TextField 
        sx={{width: '75%', m: 1}}
        id="standard-basic" 
        label=" Your Email"
        name="email"
        onBlur={handleOnBlur} 
        variant="standard" />
        <TextField
         sx={{width: '75%', m: 1}}
         id="standard-basic" 
         label="Password"
         name="password"
         onBlur={handleOnBlur} 
         type="password"
         variant="standard" />
        <TextField
         sx={{width: '75%', m: 1}}
         id="standard-basic" 
         label="Re-type Password"
         name="password2"
         onBlur={handleOnBlur} 
         type="password"
         variant="standard" />
         <br />
          <Button  sx={{width: '75%', m: 1}} variant="contained" type="submit">Register</Button>
        </form> : <CircularProgress /> }
         {user.email && <Alert severity="success">This is a success register!</Alert>}
         {error && <Alert severity="success">This is not valid email!</Alert>}
        <NavLink
        style={{textDecoration: 'none'}}
        to="/login">Already Registered? Please Login</NavLink>
        </Grid>
        <Grid item xs={12} md={6}>
        <img style={{width: '620px', height: '575px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQudU3ZVS_wVCSLOO-v5uQYWumNwBBPtF7vHw&usqp=CAU" alt="" />
        </Grid>
        </Grid>
    </Container>
        </div>
    );
};

export default Register;