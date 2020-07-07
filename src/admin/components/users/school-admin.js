
import React, {Fragment, useEffect, forwardRef} from 'react';
import MaterialTable from 'material-table';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Print from '@material-ui/icons/Print';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <Delete style={{color:'#5e2572'}} {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit style={{color:'#5e2572'}} {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    Print: forwardRef((props, ref) => <Print {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn style={{color:'#5e2572'}} {...props} ref={ref} />)
};
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const SchoolAdmin  = (props) => {

    const [adminDetails, setAdminDetails] = React.useState({})
    const [adDet, setAdDet] = React.useState({})
    const [editMode, setEditMode] = React.useState(false)
    const [ad, setAd] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [btnType, setBtnType] = React.useState("Update")
    const [pass, setPass] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [editDet, setEditDet] = React.useState({
        first_name: "",
        last_name: "",
        email:"",
        phone_number: ""
    })
    const [schools, setSchools] = React.useState({
        columns: [
          { title: 'School', field: 'name' },
          { title: 'Address', field: 'address' },
        //   { title: 'city', field: 'city'},
          {title: 'State',field: 'state'},
          {title: 'Students',field: 'total_student'},
        //   {title: 'country',field: 'country'},
          {title: 'Capacity Left',field: 'number_left'},
        ],
        data: [],
      });

      useEffect (()=> {
       

        const usrProfile = JSON.parse(localStorage.getItem('@UserProfile'))
        if (usrProfile == null) return ;
        if (usrProfile.role.role === "SCHOOL_ADMIN"){
            
        }
        
        getSchools()
    },[])


    const getSchools = async () => {
        await axios.get('https://tiltapp-api.herokuapp.com/school-management/schools').then(async res => {
            if (res.status == 200){
                
                const dt = res.data.data
                const schoolData = []
                let schlDt = {}
                dt.forEach(el => {
                    schlDt = el
                    // schlDt.country = "Nigeria"
                    
                    schoolData.push(schlDt)
                })
                await setSchools((prevState) => {
                    let data = [...prevState.data];
                     data = schoolData;
                   return {...prevState, data }
                    })   
              
                
            }else {alert( 'Could not retrieve admin data')}
        }).catch(err => {
            console.log(err)
        })
    }

    const addSchool = async () => {
        const school = adDet
        const nwSchool = {
                "school_name":school.name,
                "school_description":school.description || "N/A",
                "school_address":school.address,
                "school_country":"Nigeria",
                "school_state":school.state,
                "school_city":school.city,
                "school_zipcode":school.zipcode,
                // "allocation": school.allocation,
                "first_name": editDet.first_name,
                "last_name": editDet.last_name,
                "email": editDet.email,
                "phone_number": editDet.phone_number,
                "password": pass
        }
        await axios({
            method: 'POST',
            url: 'https://tiltapp-api.herokuapp.com/registration/school',
            data: nwSchool,
            // headers: {
            //   Authorization: `Bearer ${authToken}`
            // },
            
          }).then( res => {
              if (res.status){
                //   setLoading(false)
                    showSuccess()
            
              }else {
                //   setLoading(false)
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
    
    const updateSchool = async (det) => {
        
        await axios({
            method: 'PUT',
            url: 'https://tiltapp-api.herokuapp.com/school-management/schools/'+det.id,
            data: det,
            // headers: {
            //   Authorization: `Bearer ${authToken}`
            // },
            
          }).then( res => {
              if (res.status){
                //   setLoading(false)
                    showSuccess()
            
              }else {
                //   setLoading(false)
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


    const NewSchoolData = async  () => {
        setEditMode(true)
        setBtnType("Add")
        alert("Now add Admin Info to continue")
    }

    const updateAdmin = async (e)  => {
        e.preventDefault()
        setLoading(true)

        if(btnType === "Add"){
            if (editDet.firstname === "" || editDet.last_name === "" || editDet.email === "" || editDet.phone_number === ""){
                return alert("Kindly enter all information for School Admin")
            }
            addSchool()
            return;
        } 

        await axios({
            method: 'PUT',
            url: 'https://tiltapp-api.herokuapp.com/user-management/users/'+editDet.id,
            data: editDet,
            // headers: {
            //   Authorization: `Bearer ${authToken}`
            // },
            
          }).then( res => {
              if (res.status){
                //   setLoading(false)
                   showSuccess()
            
              }else {
                //   setLoading(false)
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

    const  showSuccess = () => {
        setOpen(true)
      };
    
     const  handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false)

      };
    

    const updateFirstName = e =>{
        setEditDet(prevState => ({...prevState, first_name: e.target.value}));
       
    };

    const updateEmail= e =>{
        setEditDet(prevState => ({...prevState, email: e.target.value}));
    };
    const updateLastName = e =>{
        setEditDet(prevState => ({...prevState, last_name: e.target.value}));
    };
    const updatePhone = e =>{
       
        setEditDet(prevState => ({...prevState, phone_number: e.target.value}));
    };

    const updatePass = e =>{
       
        setPass(e.target.value)
    };

   const toggleUpdt = ()=> {
        setEditMode(true)
        setBtnType("Update")
    }


    const EditAdmin = () => {
        return  ( <form  noValidate autoComplete="off" onSubmit={updateAdmin}>
                            <div>
                                <TextField autoFocus name="first_name" value={editDet.first_name}  margin="dense"  label="First Name" variant="outlined" onChange={ updateFirstName }/>
                            </div>

                            <div>
                                <TextField  name="last_name" value={editDet.last_name} label="Last Name"  margin="dense" onChange={ updateLastName } variant="outlined"/>
                            </div>

                            <div>
                                <TextField  name="email" value={editDet.email} margin="dense" label="Email" variant="outlined" onChange={ updateEmail } />
                            </div>

                           
                            <div>
                                <TextField  name="phone_number" value={editDet.phone_number} label="Phone Number"  margin="dense" onChange={ updatePhone } variant="outlined"/>
                            </div>
                            {btnType === "Add" && <div>
                                <TextField  name="password" label="Password"  margin="dense" onChange={ updatePass } variant="outlined"/>
                            </div>}
                            <DialogActions>
                                <button disabled={loading} className={"btn btn-sm btn-success"}>{btnType}</button>

                                <Button onClick={props.handleRemoveModal} color="secondary">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </form>)
        
    }


    return (
        <div className="col-lg-12 grid-margin">
                    <div className="row" style={{marginTop:20}}>
                        <div className="col-lg-8 grid-margin stretch-card">
                                <div className="card">
                                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="success">
                                        Success ! DONE
                                    </Alert>
                                </Snackbar>
                                    {/* <div className="card-body"> */}

                                        {/* <div className="compose group">
                                            <button className="btn group-btn btn-block" >{addLabel}
                                            <i className="mdi mdi-plus-circle"></i>
                                            </button>
                                        </div> */}
                                        {/* <h4 className="card-title school-title">Users</h4> */}
                                        <MaterialTable
                                            title="Schools"
                                            columns={schools.columns}
                                            data={schools.data}
                                            icons={tableIcons}
                                            options={{
                                                actionsColumnIndex: -1,
                                                headerStyle: {
                                                    backgroundColor: '#edd0f7',
                                                    color: 'black'
                                                  },
                                                  rowStyle: {
                                                  color:"f3f3f3",
                                                  fontWeight:"light"
                                                }
                                              }}
                                            actions={[
                                                {
                                                  icon: () => <ViewColumn style={{color:'#5e2572'}} />,
                                                  tooltip: 'View School Admin',
                                                  onClick: (event, rowData) => {
                                                    // Do save operation
                                                    setAdminDetails(rowData.admin)
                                                    
                                                    setEditDet(rowData.admin)
                                                    if(rowData.admin){
                                                    setAd(true) }
                                                  }
                                                }
                                              ]}
                                            editable={{
                                                onRowAdd: (newData) =>
                                                new Promise((resolve) => {
                                                    setTimeout(async () => {
                                                    setAdDet(newData)
                                                    await NewSchoolData(newData)
                                                    resolve();
                                                    setSchools((prevState) => {
                                                        const data = [...prevState.data];
                                                        data.push(newData);
                                                        return { ...prevState, data };
                                                    });
                                                    }, 600);
                                                }),
                                                onRowUpdate: (newData, oldData) =>
                                                new Promise((resolve) => {
                                                    setTimeout(async () => {
                                                    await updateSchool(newData)
                                                    resolve();
                                                    if (oldData) {
                                                        setSchools((prevState) => {
                                                        const data = [...prevState.data];
                                                        data[data.indexOf(oldData)] = newData;
                                                        return { ...prevState, data };
                                                        });
                                                    }
                                                    }, 600);
                                                }),
                                                onRowDelete: (oldData) =>
                                                new Promise((resolve) => { setTimeout(() => {
                                                    resolve();
                                                    setSchools((prevState) => {
                                                    const data = [...prevState.data];
                                                    data.splice(data.indexOf(oldData), 1);
                                                    return { ...prevState, data };
                                                    });
                                                }, 600);
                                                }),
                                            }}
                                        />
                                    {/* </div> */}
                                {/* </div> */}
                            </div>
                            </div>
                        <div className="col-lg-4 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                <h4 className="card-title school-title">School Admin details</h4>
                                {ad  && !editMode && <div>
                                <List component="nav" aria-label="secondary mailbox folders">
                                    <ListItem button>
                                    <ListItemText primary="Fullname :" />
                                    <ListItemText primary={adminDetails.first_name+' '+adminDetails.last_name} />
                                    </ListItem>
                                    <ListItem button>
                                    <ListItemText primary="Email :" />
                                    <ListItemText primary={adminDetails.email} />
                                    </ListItem>
                                    <ListItem button>
                                    <ListItemText primary="Phone Number :" />
                                    <ListItemText primary={adminDetails.phone_number} />
                                    </ListItem>
                                    <ListItem button>
                                    <ListItemText primary="Status :" />
                                    <ListItemText primary={adminDetails.status === 1 ? "Active" : "Inactive"} />
                                    </ListItem>
                                </List> 
                                <Button variant="contained" size="large" color="tetiary" onClick={toggleUpdt}>
                                    Update Admin
                                </Button>
                                {adminDetails.admin && <Button variant="contained" size="large" color="secondary">
                                    Add Admin
                                </Button> }
                                </div>}
                                {editMode && EditAdmin()}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

    )

};
export default SchoolAdmin