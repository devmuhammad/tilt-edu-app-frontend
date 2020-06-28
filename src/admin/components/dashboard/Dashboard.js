import React, {Fragment} from 'react';
import axios from 'axios';

const Dashboard  = () => {
    const [students, setStudents] = React.useState(0)
    const [schools, setSchools] = React.useState(0)
    const [testTaken, setTestTaken] = React.useState(0)
    const [recentTest, setRecentTest] = React.useState([])
    const [performingSchools, setPerfSchools] = React.useState([])
    const [transactions, setTrans] = React.useState(0)
    React.useEffect (()=> {
       
        getDashboardDetails()
    },[])

    const getDashboardDetails = async () => {
        await axios.get('https://tiltapp-api.herokuapp.com/admin/dashboard').then(async res => {
            if (res.status == 200){
                const dash = res.data
                
                await setSchools(dash.total_school)
                setStudents(dash.total_students)
                setTestTaken(dash.total_test_taken)
                setRecentTest(dash.latest_test)
                setPerfSchools(dash.schools)

            }else {alert( 'Could not retrieve dashboard data')}
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <Fragment>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-12 grid-margin d-flex flex-column">
                        <div className="row">
                            <div className="col-md-3 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="text-primary mb-4">
                                            <i className="mdi mdi-school mdi-36px"></i>
                                            <p className="font-weight-medium mt-2">Students Registered</p>
                                        </div>
                                        <h1 className="font-weight-light">{students}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="text-danger mb-4">
                                            <i className="mdi mdi-office-building mdi-36px"></i>
                                            <p className="font-weight-medium mt-2">Schools Enrolled</p>
                                        </div>
                                        <h1 className="font-weight-light">{schools}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="text-info mb-4">
                                            <i className="mdi mdi-tag mdi-36px"></i>
                                            <p className="font-weight-medium mt-2">Test Taken</p>
                                        </div>
                                        <h1 className="font-weight-light">{testTaken}</h1>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="text-info mb-4">
                                            <i className="mdi mdi-car mdi-36px"></i>
                                            <p className="font-weight-medium mt-2">Successful Transactions</p>
                                        </div>
                                        <h1 className="font-weight-light">2,23</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-lg-8 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body" style={{height:350,overflow:"scroll"}}>
                                <h4 className="card-title">Recent Tests</h4>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>
                                                Name
                                            </th>
                                            <th>
                                                Average Score
                                            </th>
                                            <th>
                                                Date
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {recentTest.map((test,index) => <tr key={index}>
                                            <td>
                                               {test.name}
                                            </td>
                                            <td>
                                                {test.percentage}%
                                            </td>
                                            <td>
                                                {test.date}
                                            </td>
                                        </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body" style={{height:350,overflow:"scroll"}}>
                                <h4 className="card-title school-title">High Performing Schools</h4>
                                <div className="table-responsive">
                                <table className="table">
                                <thead>
                                    <tr>
                                        <td>School</td>
                                        <td>Tests</td>
                                    </tr>
                                </thead>
                                <tbody>
                                   {performingSchools.map((school, index) => <tr key={index}>
                                        <td> <span style={{fontSize:18,fontWeight:"500"}}>
                                            {school.school_name}
                                            </span> <br/> {school.location} </td>
                                        <td>
                                           <span style={{fontWeight:"700", fontSize:20}} className="text-primary"> 
                                           {school.number} </span>
                                        </td>
                                    </tr>)
                                }
                                </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Dashboard;