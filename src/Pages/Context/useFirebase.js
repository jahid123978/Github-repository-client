import initializeAuthentication from "../Firebase/Firebase.init";
import {onAuthStateChanged, signOut, updateProfile, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [admin, setAdmin] = useState(false);
    const auth = getAuth();

    const savedUser = (email, displayName, method) => {
        const user = {email, displayName};
        fetch('http://localhost:2000/users', {
          method: method,
          headers : {
            'content-type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(result =>{
          console.log(result);
        })
     
     }
      const RegisterNewUser = (name, email, password, history) =>{
         setIsLoading(true); 
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in 
              // const user = userCredential.user;
              setError('');
              const newUser = {displayName: name, email}
              setUser(newUser);
              savedUser(email, name, 'POST');
              updateProfile(auth.currentUser, {
                displayName: name
              })
              .then(()=>{
  
              })
              .catch((error)=>{
  
              })
               history('/home');
            })
            .catch((error) => {
              // const errorCode = error.code;
              const errorMessage = error.message;
              setError(errorMessage);
            })
            .finally(()=>{setIsLoading(false)});
      }
  
      const logOut = () => {
        setIsLoading(true);
        signOut(auth)
        .then(()=>{
  
        })
        
        .finally(()=>{setIsLoading(false)})
      }
  
      useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, user=>{
          if(user){
            setUser(user);
          }
          else{
            setUser({});
          }
          setIsLoading(false);
        });
        return ()=>unSubscribe;
      }, [])
  
      const LoginUser = (email, password, location, history) => {
        setIsLoading(true); 
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            
            const destination = location?.state?.from || '/home'
             history(destination);
              // const user = userCredential.user;
              setError('');
              
            })
            .catch((error) => {
              const errorMessage = error.message;
              setError(errorMessage);
            })
            .finally(()=>{setIsLoading(false)});
      }
     

    return {
        RegisterNewUser,
        logOut,
        LoginUser,
        isLoading,
        user

    }
       
  
}

export default useFirebase;