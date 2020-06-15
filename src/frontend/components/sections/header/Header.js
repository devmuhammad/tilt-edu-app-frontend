import React, {useEffect} from 'react';
import NavLogo from "./navigation/NavLogo";
import NavigationLinks from "./navigation/NavigationLinks";
import NavActionButton from "../../snippets/NavActionButton";
import { useHistory,useLocation } from "react-router-dom";
import axios from 'axios';
import { withRouter } from 'react-router'; 
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const Header = (props) => {
    const [userProfile, setUserProfile] = React.useState({})
    const [logMsg, setLogMsg] = React.useState("")
    const [open, setOpen] = React.useState("")

    const history = useHistory();


    useEffect (()=> {
       

        const usrProfile = JSON.parse(localStorage.getItem('@UserProfile'))

        if (usrProfile == null){
            setLogMsg("Login")
        }else setLogMsg("Logout")
       
        setUserProfile(usrProfile)
    },[])

    const doLog = () => {
        
        if (logMsg === "Login"){
            history.push("/auth/login")
        }else logout()
    }

   const  handleClick = () => {
        setOpen(true)
      };
    
     const  handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false)

      };
    

    const logout = async () =>{
        const Token = await JSON.parse(localStorage.getItem('@AppT4k3n'))

        const config = {
            headers: { Authorization: `Bearer${Token}` }
        };
       await axios.post('https://tiltapp-api.herokuapp.com/auth/logout',config).then(async res => {
            if (res.status){
                await localStorage.removeItem('@AppT4k3n')
                await localStorage.removeItem('@UserProfile')
                setUserProfile({})
                window.location.reload(false)
            }
        }).catch(async  err => {
            await localStorage.removeItem('@AppT4k3n')
            await localStorage.removeItem('@UserProfile')
            setUserProfile({})
            window.location.reload(false)
        }  )
    }

    return (
        <header className="header-global">
            <nav id="navbar-main"
                className={`navbar navbar-main navbar-expand-lg navbar-transparent navbar-${props.navBarType} navbar-theme-primary headroom py-lg-2 px-lg-6`}>
                <div className="container">
                    <NavLogo/>
                    <div className="navbar-collapse collapse" id="navbar_global">
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                    Success ! Logged Out
                    </Alert>
                    </Snackbar>
                        <div className="navbar-collapse-header">
                            <div className="row">
                                <div className="col-6 collapse-brand">
                                    <NavLogo/>
                                </div>
                                <div className="col-6 collapse-close">
                                    <a
                                        href="#navbar_global"
                                        role="button"
                                        className="fas fa-times"
                                        data-toggle="collapse"
                                        data-target="#navbar_global"
                                        aria-controls="navbar_global"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <NavigationLinks/>
                    </div>
                    <div className="d-flex align-items-center">
                       <NavActionButton
                           link={"/test"}
                           className={"btn mr-3 btn-pill btn-secondary animate-up-2"}
                           icon={"fa-file-alt"}
                           text={"Take Test"}
                       />
                       <div onClick={doLog}> 
                           <NavActionButton
                        //    link={"/auth/login"}
                           
                           className={"btn btn-sm mr-3 text-white btn-pill btn-tertiary animate-up-2"}
                           icon={"fa-unlock"}
                           text={logMsg}
                       /></div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"> </span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
