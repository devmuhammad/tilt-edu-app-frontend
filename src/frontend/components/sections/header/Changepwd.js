import React,{useState,useEffect, useContext,Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';


const ChangePwd = (props) => {

    const [currPass, setcurrPass] = useState('');
    const [newPass, setnewPass] = useState('');
    const [confPass, setconfPass] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false)

    const validate = () => {
        const errors = {};
        if (currPass === '') errors.currPass = 'Current password can not be empty' ;
        if (newPass === '') errors.newPass = 'New password field  can not be empty' ;
        if (confPass === '') errors.confPass = 'Confirm password can not be empty' ;
        return errors;
    };

    const data = {
        current_password: currPass,
        new_password: newPass,
        confirm_password:confPass
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const  errors = validate();
        if (newPass !== confPass){
            alert("Passwords do not match")
            return;
        }
        if(newPass.length < 6){
            alert("New Password must be at least 6 characters")
            return;
        }
        const authToken = await JSON.parse(localStorage.getItem('@AppT4k3n'))

        if (Object.keys(errors).length === 0){
            setLoading(true)
            await axios({
                method: 'POST',
                url: 'https://tiltapp-api.herokuapp.com/auth/change-password',
                data: data,
                headers: {
                  Authorization: `Bearer ${authToken}`
                },
                
              }).then( res => {
                  if(res.status){
                    setLoading(false)
                props.showSuccess()
                props.handleRemoveModal();
                }else {setLoading(false); alert(res.message) }
                
            }).then( err => {
                const res = err.response.data
                    console.log(res)
                
                // props.handleRemoveModal();
                alert('Could not change Password')
            }).catch( err => { console.log(err)});
        }else{
            setErrors(errors)
        }
    };

    const updateCurrPass = e =>{
        setcurrPass(e.target.value);
    };

    const updateNewPass = e =>{
        setnewPass(e.target.value);
    };
    const updateConfPass = e =>{
        setconfPass(e.target.value);
    };


    return (
        <Fragment>
                <Dialog open={!!props.clickedForm}  aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                    <DialogContent>
                        <form  noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                            <div>
                                <TextField  name="currPass"  type="password" margin="dense"  label="Current Password" variant="outlined" onChange={ updateCurrPass }/>
                            </div>

                            <div>
                                <TextField  name="newPass" type="password"  margin="dense" label="New Password" variant="outlined" onChange={ updateNewPass } />
                            </div>

                            <div>
                                <TextField  name="confPass" type="password" label="Confirm Password"  margin="dense" onChange={ updateConfPass } variant="outlined"/>
                            </div>
                            <DialogActions>
                                <button disabled={loading} className={"btn btn-sm btn-success"}>Submit</button>

                                <Button onClick={props.handleRemoveModal} color="secondary">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>

                </Dialog>
        </Fragment>


    );



}
export default ChangePwd