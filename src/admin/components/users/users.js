import React, {Fragment, useEffect, forwardRef} from 'react';
import MaterialTable from 'material-table';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';


import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Print from '@material-ui/icons/Print';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import axios from 'axios';
import SchoolAdmin from './school-admin'
import PrivateLearner from './other-users'
import Students from './students'

   const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
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
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <div>{children}</div>
              </Box>
            )}
          </div>
        );
      }

      function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

const Users  = () => {
    const [addLabel, setAddLabel] = React.useState("Create User")
    const [value, setValue] = React.useState(0);
    const [adminData, setAdminData] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [isAdmin, setIsAdmin] = React.useState(false)

    const [state, setState] = React.useState({
        columns: [
          { title: 'First Name', field: 'first_name' },
          { title: 'Last Name', field: 'last_name' },
        //   { title: 'Middle_name', field: 'middle_name'},
          {title: 'Email',field: 'email'},
          {title: 'Phone',field: 'phone_number'},
          {title: 'Status', 
            field: 'status',
            lookup: {true: 'true',false: 'false' }},
          {title: 'Password',field: 'password'},
        ],
        data: [],
      });
    

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    useEffect (()=> {
       

        const usrProfile = JSON.parse(localStorage.getItem('@UserProfile'))
        if (usrProfile == null) return ;
        if (usrProfile.role.role === "SCHOOL_ADMIN"){
            setAddLabel("Create Student")
            setIsAdmin(false)
        }else setIsAdmin(true)

        getAdmins()
        // getSchools()
    },[])


    const  showSuccess = () => {
        setOpen(true)
      };
    
     const  handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false)

      };

    const addAdmin = async (newAdmin) => {
        await axios({
            method: 'POST',
            url: 'https://tiltapp-api.herokuapp.com/registration/admin',
            data: newAdmin,
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
    
    const updateUser = async (det) => {
        let details = {}
        if (det.password === "******"){
                    details.id = det.id
                    details.first_name = det.first_name
                    details.last_name = det.last_name
                    details.phone_number = det.phone_number
                    details.status = det.status
                    details.email = det.email
        }else details = det
        await axios({
            method: 'PUT',
            url: 'https://tiltapp-api.herokuapp.com/user-management/users/'+details.id,
            data: details,
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
    


    const getAdmins = async () => {
        await axios.get('https://tiltapp-api.herokuapp.com/user-management/admins').then(async res => {
            if (res.status == 200){
                
                const dt = res.data.data

                const admData =[]
                dt.forEach(el => {
                const adm = {}
                    adm.id = el.id
                    adm.first_name = el.first_name
                    adm.last_name = el.last_name
                    adm.phone_number = el.phone_number
                    adm.email = el.email
                    adm.password = '******'
                    admData.push(adm)
                })
                
               await setState((prevState) => {
               let data = [...prevState.data];
                data = admData;
              return {...prevState, data }
               })
               
            }else {alert( 'Could not retrieve admin data')}
        }).catch(err => {
            console.log(err)
        })
    }
    

    return (
        <Fragment>
           
           <div className="content-wrapper">
           <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Success ! DONE
                </Alert>
            </Snackbar>
                <Paper square>
                    {isAdmin ? <div>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        >
                           
                        
                        <Tab label="Admins" />
                        <Tab label="Private Learners" />
                        
                            
                        <Tab label="School Admin"/>  
                       
                        <Tab label="School Students" />

                    </Tabs>

                    <TabPanel value={value} index={0}>
                        {/* <div className="row"> */}
                            <div className="col-lg-12 grid-margin stretch-card">
                                {/* <div className="card"> */}
                                    <div className="card-body">

                                        {/* <div className="compose group">
                                            <button className="btn group-btn btn-block" >{addLabel}
                                            <i className="mdi mdi-plus-circle"></i>
                                            </button>
                                        </div> */}
                                        {/* <h4 className="card-title school-title">Users</h4> */}
                                        <MaterialTable
                                            title="Admin Users"
                                            columns={state.columns}
                                            data={state.data}
                                            icons={tableIcons}
                                            // actions={[
                                            //     {
                                            //       icon: () => <AddBox />,
                                            //       tooltip: 'Add User',
                                                
                                            //     }
                                            //   ]}
                                            options={{
                                                actionsColumnIndex: -1
                                              }}
                                            editable={{
                                                onRowAdd: (newData) =>
                                                new Promise((resolve) => {
                                                    setTimeout(async () => {
                                                    await addAdmin(newData)
                                                    resolve();
                                                    setState((prevState) => {
                                                        const data = [...prevState.data];
                                                        data.push(newData);
                                                        return { ...prevState, data };
                                                    });
                                                    }, 600);
                                                }),
                                                onRowUpdate: (newData, oldData) =>
                                                new Promise((resolve) => {
                                                    setTimeout(async () => {
                                                    await updateUser(newData)
                                                    resolve();
                                                    if (oldData) {
                                                        setState((prevState) => {
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
                                                    setState((prevState) => {
                                                    const data = [...prevState.data];
                                                    data.splice(data.indexOf(oldData), 1);
                                                    return { ...prevState, data };
                                                    });
                                                }, 600);
                                                }),
                                            }}
                                        />
                                    </div>
                                {/* </div> */}
                            {/* </div> */}
                            </div>
                        </TabPanel>


                        <TabPanel value={value} index={1}>
                        <PrivateLearner showSuccess={showSuccess} />
                        </TabPanel>

                        <TabPanel value={value} index={2}>
                        <SchoolAdmin showSuccess={showSuccess}/>
                        </TabPanel>

                        <TabPanel value={value} index={3}>
                        <Students showSuccess={showSuccess}/>
                        </TabPanel>
                        </div> : <Students showSuccess={showSuccess}/>}
                        
                    </Paper>
                    
            </div>     
               
        </Fragment>
    )

};
export default Users