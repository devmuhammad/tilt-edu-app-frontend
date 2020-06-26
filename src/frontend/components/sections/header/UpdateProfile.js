import React,{useState,useEffect, useContext,Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';


const UpdateProfile = (props) => {

    const [last_name, setlast_name] = useState('');
    const [first_name, setfirst_name] = useState('');
    const [middle_name, setmiddle_name] = useState('');
    const [phone_number, setphone_number] = useState('');
    const [errors, setErrors] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false)
    const [loading, setLoading] = useState(false)

    // const validate = () => {
    //     const errors = {};
    //     if (last_name === '') errors.last_name = 'Current password can not be empty' ;
    //     if (first_name === '') errors.first_name = 'New password field  can not be empty' ;
    //     if (middle_name === '') errors.middle_name = 'Confirm password can not be empty' ;
    //     return errors;
    // };

    const data = {
        fullname: first_name,
        email: middle_name,
        address: last_name,
        phone_number
    };

    useEffect (() => {
        const usrProfile = JSON.parse(localStorage.getItem('@UserProfile'))
        if (usrProfile == null) return; 
        setfirst_name(usrProfile.fullname)
        setmiddle_name(usrProfile.email)
        setlast_name(usrProfile.address)
        setphone_number(usrProfile.phone_number)

    },[])

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!isUpdated){
            return;
         }
        setLoading(true)
        const authToken = await JSON.parse(localStorage.getItem('@AppT4k3n'))

            await axios({
                method: 'POST',
                url: 'https://tiltapp-api.herokuapp.com/user/profile',
                data: data,
                headers: {
                  Authorization: `Bearer ${authToken}`
                },
                
              }).then( res => {
                  if (res.status){
                      setLoading(false)
                props.showSuccess()
                props.handleRemoveModal();
                  }else {
                      setLoading(false)
                      alert(res.message)
                  }
                
            }).then( err => {
                const res = err.response.data
                if(res){
                alert('Could not update detail, please retry')

                }
                // props.handleRemoveModal();
            }).catch( err => { console.log(err)});
        }

    const updateFirstName = e =>{
        setfirst_name(e.target.value);
        setIsUpdated(true)
    };

    const updateMiddleName = e =>{
        setmiddle_name(e.target.value);
        setIsUpdated(true)
    };
    const updateLastName = e =>{
        setlast_name(e.target.value);
        setIsUpdated(true)
    };
    const updatePhone = e =>{
        setphone_number(e.target.value);
        setIsUpdated(true)
    };


    return (
        <Fragment>
                <Dialog open={!!props.openedForm}  aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit User Profile</DialogTitle>
                    <DialogContent>
                        <form  noValidate autoComplete="off" onSubmit={handleFormSubmit}>
                            <div>
                                <TextField  name="first_name" value={first_name}  margin="dense"  label="Fullname" variant="outlined" onChange={ updateFirstName }/>
                            </div>

                            <div>
                                <TextField  name="middle_name" value={middle_name} margin="dense" label="Email" variant="outlined" onChange={ updateMiddleName } />
                            </div>

                            <div>
                                <TextField  name="last_name" value={last_name} label="Address"  margin="dense" onChange={ updateLastName } variant="outlined"/>
                            </div>
                            <div>
                                <TextField  name="phone_number" value={phone_number} label="Phone Number"  margin="dense" onChange={ updatePhone } variant="outlined"/>
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
export default UpdateProfile