import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase2";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    // use state for name
    const [name, setName] = useState();
     // Function to handle Google sign-in
     const signIn = () => {
       signInWithPopup(auth, provider)
         .then((result) => {
           // Get user from result
            // This gives you a Google Access Token. You can use it to access the Google API.
    //        const credential = GoogleAuthProvider.credentialFromResult(result);
    //        const token = credential.accessToken;
           // set the name using the result object
             // The signed-in user info.
            const user = result.user;
            setName(user.displayName);
            console.log(user);
            // Save user to local storage
            localStorage.setItem("user",JSON.stringify(user));
         })
         .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
         });
        };
         // Retrieve the user from local storage on component mount
    useEffect(() => {
        // try to fetch user from local storage
        const user = localStorage.getItem("user");
        if (user) {
        // if user is found, set his name 
        const u = JSON.parse(user);
        setName(u.displayName);
        }
    }, []);

    const signOut = () => {
        auth.signOut().then(() => {
          localStorage.removeItem("user");
          setName(null);
          navigate('/');
        });
      };      

   
    return(
        <AppBar position="static">
            <Toolbar >
                <Container >
                   <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Link to="/" id="drone"><img src="dronefood.png"/></Link>
                    <div className="nav" style={{display:'flex', justifyContent:'space-between'}}>
                    <Link to="/menu"><Button>Menu</Button></Link>
                    <Link to="/about"><Button>About</Button></Link>
                    <Link to="/contact"><Button>Contact</Button></Link>
                    { name && (<Link to="/admin"><Button>Admin</Button></Link>)}
                    {/* <Button><ShoppingCartIcon onClick={() => navigate('/cart')}/></Button> */}
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    { name && (
                    <Button onClick={signOut} variant="contained" color="warning" size="small">  Logout  </Button>
                    //    <AccountCircleIcon/>
                    ) }&nbsp;&nbsp;&nbsp;
                    {name ? (<p >Hello, {name} </p>) : (
                    <Button onClick={signIn} color="success" size="small" variant="contained"> Login </Button>)} 
                  
                  </div>
                    </div>
                </Container>
                
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;