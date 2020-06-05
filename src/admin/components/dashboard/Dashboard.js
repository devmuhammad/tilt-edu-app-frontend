import React, {Fragment} from 'react';

const Dashboard  = () => {
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
                                        <h1 className="font-weight-light">45679</h1>
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
                                        <h1 className="font-weight-light">8,0927</h1>
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
                                        <h1 className="font-weight-light">22,339</h1>

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
                            <div className="card-body">
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
                                        <tr>
                                            <td>
                                                Moon Fever
                                            </td>
                                            <td>
                                                42070
                                            </td>
                                            <td>
                                                801
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title school-title">High Performing Schools</h4>
                                <table>
                                    <tr>
                                        <td>School</td>
                                        <td>Tests</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Dashboard;