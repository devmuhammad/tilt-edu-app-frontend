import React, {useEffect} from 'react';
import NavLogo from "./navigation/NavLogo";
import NavigationLinks from "./navigation/NavigationLinks";
import NavActionButton from "../../snippets/NavActionButton";
import { useHistory,useLocation } from "react-router-dom";
import axios from 'axios';
import { withRouter } from 'react-router'; 
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ChangePwd from './Changepwd';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UpdateProfile from './UpdateProfile';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const Header = (props) => {
    const [userProfile, setUserProfile] = React.useState({})
    const [logMsg, setLogMsg] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [isTest, setIsTest]= React.useState(false)
    const [canPwd, setPwd] = React.useState(false)
    const [clickedForm, setClickedForm] = React.useState(undefined)
    const [openedForm, setOpenedForm] = React.useState(undefined)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isAdmin, setIsAdmin] = React.useState(false)

    const history = useHistory();
    const location = useLocation()


    useEffect (()=> {
       

        const usrProfile = JSON.parse(localStorage.getItem('@UserProfile'))

        if (usrProfile == null){
            setLogMsg("Login")
            setPwd(false)
        }else{
        setPwd(true)
        if (usrProfile.role.role === "SCHOOL_ADMIN" || usrProfile.role.role === "ADMIN"){
            // setIsAdmin(false)
            setIsAdmin(true)
        } 
        setLogMsg("Logout")

        }

       
        setUserProfile(usrProfile)
        if (location.pathname == '/test'){
            setIsTest(true)
        }
    },[])

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const closeMenu = () => {
        setAnchorEl(null);
      };


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

      const gotoAdmin = () => {
          if (userProfile.role.role === "ADMIN"){
          history.push("/admin")
          }else history.push("/admin/user-manager")
      }

   
    const changePwd = () =>{
        closeMenu()
        setClickedForm(1)
    };
    const editProfile = () =>{
        closeMenu()
        setOpenedForm(1)
    };


    const handleRemoveModal = () => {
        // this.setState( () =>({clickedForm:undefined}))
        setOpenedForm(undefined)
        setClickedForm(undefined)
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
                // setUserProfile({})
                window.location.reload(false)
            }
        }).catch(async  err => {
            await localStorage.removeItem('@AppT4k3n')
            await localStorage.removeItem('@UserProfile')
            // setUserProfile({})
            window.location.reload(false)
        }  )
    }

    return (
        <header className="header-global">
            <nav id="navbar-main"
                className={`navbar navbar-main navbar-expand-lg navbar-transparent navbar-${props.navBarType} navbar-theme-primary headroom py-lg-2 px-lg-6`}>
                <div className="container">
                <ChangePwd
                    clickedForm={clickedForm}
                    showSuccess={handleClick}
                    handleRemoveModal={handleRemoveModal}
                />
                <UpdateProfile
                    openedForm={openedForm}
                    showSuccess={handleClick}
                    handleRemoveModal={handleRemoveModal}
                />
                    <NavLogo/>
                    <div className="navbar-collapse collapse" id="navbar_global">
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                    Success ! DONE
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
                       {/* {!isTest && <NavActionButton
                           link={"/test"}
                           className={"btn btn-sm mr-3 btn-pill btn-secondary animate-up-2"}
                           icon={"fa-file-alt"}
                           text={"Take Test"}
                       />} */}
                       {canPwd && <div className={" mr-3 animate-up-2"}>
                       <IconButton color="primary" aria-label="account" component="span" onClick={openMenu}>
                        <AccountCircleIcon fontSize="large" />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={closeMenu}
                        >
                            <MenuItem onClick={editProfile}>Edit Profile</MenuItem>
                            <MenuItem onClick={changePwd}>Change Password</MenuItem>
                            { isAdmin && <MenuItem onClick={gotoAdmin}> Admin Portal</MenuItem>}
                            {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                        </Menu>
                       </div>}
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
