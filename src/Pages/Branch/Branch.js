import { Button } from '@mui/material';
import React from 'react';
import useAuth from '../Context/useAuth';

const Branch = ({bran, handleDelete}) => {
      const {user, logOut} = useAuth();
      console.log(user);
    return (
        <div>
             <Button variant="contained" onClick={logOut}>Logout</Button>
             <Button variant="contained" style={{marginLeft: '200px'}} onClick={()=>handleDelete(bran._id)}>Delete</Button>
             <hr />
            <div style={{display: 'flex'}}>
               <div style={{marginLeft: '90px'}}>
                  <h1 style={{color: 'blue'}}>Branches</h1>
                  <hr />
                  <h1>{bran.branch}</h1>
               </div>
               <hr />
               <div style={{marginRight: '90px'}}>
                <h1 style={{color: 'blue'}}>Issues</h1>
                <hr />
                <h1>{bran.title}</h1>
                <div style={{display: 'flex'}}>
                <img style={{width: '40px', borderRadius: '45%', height: '30px', marginTop: '20px', marginRight: '5px'}} src="https://media-exp1.licdn.com/dms/image/C4D1BAQFw3w2OuNyZaQ/company-background_10000/0/1591731129254?e=2159024400&v=beta&t=_Az-h48s44I5ZW8b3mUd2lU8pNQXaWvp-mTUJUyyeUY" alt="image is not supported" />
                <h2>{user.displayName}</h2>
                </div>
               </div>      
            </div>
     </div>  
    );
};

export default Branch;