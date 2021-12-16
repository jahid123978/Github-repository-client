import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import { Button, Modal } from '@mui/material';
import { useForm } from "react-hook-form";
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Branch from '../Branch/Branch';
import useAuth from '../Context/useAuth';

const drawerWidth = 400;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [repos, setRepos] = useState([]);
  const [branch, setBranch] = useState([]);
  const [create, setCreate] = useState([]);
  const [isBoolean, setIsBoolean] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm();
 
  const {user} = useAuth();
  const onSubmit = data => {
    const storingData = {user: user.displayName, email: user.email, name: data.name, description: data.description, branch: data.Branch_name, title: data.title}
    fetch(`http://localhost:2000/repository`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(storingData)
    })
    .then(res => res.json())
    .then(result =>{
      console.log(result);
    })
  }
  useEffect(() => {
    fetch(`http://localhost:2000/repository`)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        const currentEmail = data.filter(da => da.email == user.email)
        console.log(currentEmail);
        setRepos(currentEmail);
        console.log(data);
    })

   }, [user.email]);

  const newArray = [];

  const handleBranch = id => {
    console.log(id);
     
    fetch(`http://localhost:2000/created?email=${user.email}`)
    .then(res => res.json())
    .then(data =>{
      console.log(data);
      const findData = data.find(da => da._id === id);
      console.log("Processing")
      console.log(findData);
      const array = [...newArray, findData];
      setBranch(array);
      
    });
    console.log(branch);
   
  }

  const handleDelete = id =>{
    const proceed = window.confirm('Are you sure you want to delete');
    if(proceed){
        const url = `http://localhost:2000/repository/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data =>{
            if(data.deletedCount > 0){
                alert("Successfully deleted");
                const remaining = branch.filter(order => order._id !== id);
                setBranch(remaining);
            }
        })
    }
       
   }

   useEffect(() => {
     fetch('http://localhost:2000/users')
     .then(res => res.json())
     .then(result => {
       console.log(result);
       const CurrentEmail = result.find(res => res.email == user.email);
       if(CurrentEmail)
       {
        console.log("Checking")
        setIsBoolean(true);
       
       }
     })
   }, [])
    console.log(user.email);
    
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Github Browser
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {
              repos.map(repo =>
                <div> 
                  <Button onClick={() =>handleBranch(repo._id)}>
                  {isBoolean && <div>
                    <h2>{repo.name}</h2>
                  <h4>{repo.description}</h4>
                  </div>
                   }</Button>
                </div>
              )
            }
          </List>
          <Divider />
          <List>
          <Button onClick={handleOpen}><Icon sx={{ color: green[500] }}>add_circle</Icon></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="github" htmlFor="">Github Repository</label>
         <br />
         <label className="repo" htmlFor="">Repository</label>
          <select className="select" {...register("select")}>
        <option value="female">public</option>
        <option value="male">private</option>
      </select>
         
      <br />
      <label className="repo-name">Repository name</label>
      <br />
      <input className="repo-input" type="name" {...register("name")} />
      <br />
      <label htmlFor="">Repository Description</label>
      <br />
      <textarea className="description" type="description" {...register("description")} />
      <br />
      <label htmlFor="">Branch Name</label>
      <br />
      <input className="repo-input" type="branch" {...register("Branch_name")} />
      <br />
      <label htmlFor="">Issue title</label>
      <br />
      <input className="repo-input" type="title" {...register("title")} />
      <br />
      <input className="button" type="submit" />
    </form>
        </Box>
      </Modal>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
        <div>
        {
          branch.map(bran => <Branch
          key={bran._id}
          bran={bran}
          handleDelete={handleDelete}
          ></Branch>)
        }
      </div>
        </Typography>
        <Typography paragraph>
          
        </Typography>
      </Box>
      
    </Box> 
        </div>
    );
};

export default Home;