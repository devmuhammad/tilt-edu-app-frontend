
import React, {Fragment, useEffect, forwardRef} from 'react';
import MaterialTable from 'material-table';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';

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

const Students  = (props) => {

    const [isAdmin, setIsAdmin] = React.useState(false)
    const [selStudent, setSelStudent] = React.useState("")
    const [schools, setSchools] = React.useState([])
    const [studentTests, setTests] = React.useState([])
    const [selSchl, setSelSchl] = React.useState(null)
    const [hasTest, setHasTest] = React.useState(true)
    const [currUser, setCurrUser] = React.useState({})
    const [users, setUsers] = React.useState({
        columns: [
            { title: 'First Name', field: 'first_name' },
            { title: 'Last Name', field: 'last_name' },
          //   { title: 'Middle_name', field: 'middle_name'},
            {title: 'Email',field: 'email'},
            {title: 'Phone',field: 'phone_number'},
            {title: 'Status', 
            field: 'status',
            lookup: {true: 'true',false: 'false' }},

            {title: 'Password',field: 'password'}
        ],
        data: [],
      });

      useEffect (()=> {
       

        const usrProfile = JSON.parse(localStorage.getItem('@UserProfile'))
        if (usrProfile == null) return ;
        if (usrProfile.role.role === "SCHOOL_ADMIN"){
            // setIsAdmin(false)
        }else setIsAdmin(true)
        
        getSchools()
    },[])

    const getSchools = async () => {
        await axios.get('https://tiltapp-api.herokuapp.com/school-management/schools').then(async res => {
            if (res.status == 200){
                
                const dt = res.data.data
                setSchools(dt)
                if(!isAdmin){
                    const usrProfile = JSON.parse(localStorage.getItem('@UserProfile'))
                
                const mschl = dt.find(el=> {return el.admin.id == usrProfile.id})

                setSelSchl(mschl.id)
                getStudents(mschl.id)
                }
            }else {alert( 'Could not retrieve admin data')}
        }).catch(err => {
            console.log(err)
        })
    }

    const handleSchoolSelect = (e) =>{
        getStudents(e.target.value)
        setSelSchl(e.target.value)
    }

    const getStudents = async (schoolId) => {
        await axios.get('https://tiltapp-api.herokuapp.com/school-management/schools/'+schoolId+'/students').then(async res => {
            if (res.status == 200){
                
                const dt = res.data
                
                const userData = []
                let usrDt = {}
                dt.forEach(async el => {
                    usrDt = el
                    usrDt.password ="******"
                    // userData.push(usrDt)
                    await setUsers((prevState) => {
                        let data = [...prevState.data];
                        data.push(usrDt);
                       return {...prevState, data }
                        })   
                })
               
              
                
            }else {alert( 'Could not retrieve data')}
        }).catch(err => {
            console.log(err)
        })
    }

    const addStudents = async (nwStudent) => {
        nwStudent.school_id = selSchl
        nwStudent.middle_name = ""
        await axios({
            method: 'POST',
            url: 'https://tiltapp-api.herokuapp.com/registration/student',
            data: nwStudent,
            // headers: {
            //   Authorization: `Bearer ${authToken}`
            // },
            
          }).then( res => {
              if (res.status){
                //   setLoading(false)
                    props.showSuccess()
            
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

    const getResultDetails = (id) => {
        axios.get('https://tiltapp-api.herokuapp.com/tests/'+id).then(async res => {
            // console.log(res.data)
                if(res.status){
                    const tests = []
                    if (res.data.length < 1){
                        setHasTest(false)
                        return;
                    }
                    await res.data.forEach(el => {
                        if (el.test_result !== null){
                            
                            const dt = {}
                                dt.date_taken = new Date(el.created_at).toDateString()
                                dt.avg_score = el.test_result.avg_score
                                dt.total_score = el.test_result.total_score
                                dt.obtainable_score = el.test_result.obtainable_score
                            
                            tests.push(dt)
                        }
                    })
                    await setTests(tests)
                    
                }
    })
    }
    
    const updateStudents = async (det) => {
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
            data: det,
            // headers: {
            //   Authorization: `Bearer ${authToken}`
            // },
            
          }).then( res => {
              if (res.status){
                //   setLoading(false)
                    props.showSuccess()
            
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



    return (
        <div className="row">
                        <div className="col-lg-8 grid-margin stretch-card">
                                <div className="card">
                                    {/* <div className="card-body"> */}

                                       {isAdmin && <div className="compose group p-2">
                                        <TextField
                                            id="select-section"
                                            // disabled ={!isAdmin}
                                            select
                                            label="Select school"
                                            fullWidth
                                            margin="dense"
                                            value={selSchl}
                                            onChange={handleSchoolSelect}
                                            // helperText="Select a school"
                                            variant="outlined"
                                            >
                                           {schools.map((school, index) => 
                                            <MenuItem key={index}  value={school.id}>{school.name}</MenuItem>
                                            )
                                            }
                                            
                                            </TextField>
                                           
                                        </div> }
                                        {/* <h4 className="card-title school-title">Users</h4> */}
                                        <MaterialTable
                                            title="Students"
                                            columns={users.columns}
                                            data={users.data}
                                            icons={tableIcons}
                                            // options={{
                                            //     actionsColumnIndex: -1
                                            //   }}
                                            actions={[
                                                {
                                                  icon: () => <ViewColumn />,
                                                  tooltip: 'View Student Results',
                                                  onClick: (event, rowData) => {
                                                    // Do save operation
                                                    setSelStudent(rowData.first_name+' '+rowData.last_name)
                                                    getResultDetails(rowData.id)
                                                  }
                                                }
                                              ]}
                                            editable={{
                                                onRowAdd: (newData) =>
                                                new Promise((resolve) => {
                                                    setTimeout(async () => {
                                                    
                                                    await addStudents(newData)
                                                    resolve();
                                                    setUsers((prevState) => {
                                                        const data = [...prevState.data];
                                                        data.push(newData);
                                                        return { ...prevState, data };
                                                    });
                                                    }, 600);
                                                }),
                                                onRowUpdate: (newData, oldData) =>
                                                new Promise((resolve) => {
                                                    setTimeout(async () => {
                                                    await updateStudents(newData)
                                                    resolve();
                                                    if (oldData) {
                                                        setUsers((prevState) => {
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
                                                    setUsers((prevState) => {
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
                                <div className="card-body" style={{height:350,overflow:"scroll"}}>
                                        <h4 className="card-title school-title">Student Results : {selStudent}</h4>
                            {hasTest ? <div className="table-responsive">
                                <table className="table">
                                <thead>
                                    <tr>
                                        <td>Test</td>
                                        <td>Result</td>
                                    </tr>
                                </thead>
                                <tbody>
                                   {studentTests.map((student, index) => <tr key={index}>
                                        <td> <span style={{fontSize:18,fontWeight:"500"}}>
                                            {student.avg_score}%
                                            </span> <br/> {student.date_taken} </td>
                                        <td>
                                           <span style={{fontWeight:"700", fontSize:20}} className="text-primary"> 
                                          {student.total_score}/{student.obtainable_score} </span>
                                        </td>
                                    </tr>)
                                }
                                </tbody>
                                </table>
                            </div> : <h4 className="card-title school-title">Student has not taken a test at this moment</h4>}
                       </div>
                       </div>
                       </div>
                    </div>

    )

};
export default Students