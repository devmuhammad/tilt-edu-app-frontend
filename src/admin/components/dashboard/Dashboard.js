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
                                <h4 className="card-title">Best sellers</h4>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>
                                                Name
                                            </th>
                                            <th>
                                                Sales
                                            </th>
                                            <th>
                                                Stock
                                            </th>
                                            <th>
                                                Category
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
                                            <td>
                                                Cynthialand
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Dude You Re Getting A Telescope
                                            </td>
                                            <td>
                                                38667
                                            </td>
                                            <td>
                                                882
                                            </td>
                                            <td>
                                                West Janie
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
                                <h4 className="card-title">Tickets</h4>
                                <div className="d-flex border-bottom pb-3">
                                    <img src="../../images/faces/face1.jpg" alt="profile"
                                         className="img-xs rounded-circle"/>
                                    <div className="flex-grow-1 ml-3">
                                        <p>Dollie Ellis</p>
                                        <div className="d-flex text-muted">
                                            <p className="mb-0">Friesenview</p>
                                            <p className="ml-auto mb-0">12:45</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex border-bottom py-3">
                                    <img src="../../images/faces/face2.jpg" alt="profile"
                                         className="img-xs rounded-circle"/>
                                    <div className="flex-grow-1 ml-3">
                                        <p>Lillie Long</p>
                                        <div className="d-flex text-muted">
                                            <p className="mb-0">Susiehaven</p>
                                            <p className="ml-auto mb-0">10:33</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex border-bottom py-3">
                                    <img src="../../images/faces/face3.jpg" alt="profile"
                                         className="img-xs rounded-circle"/>
                                    <div className="flex-grow-1 ml-3">
                                        <p>Lloyd Harper</p>
                                        <div className="d-flex text-muted">
                                            <p className="mb-0">South Hilbert</p>
                                            <p className="ml-auto mb-0">11:10</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex pt-3">
                                    <img src="../../images/faces/face4.jpg" alt="profile"
                                         className="img-xs rounded-circle"/>
                                    <div className="flex-grow-1 ml-3">
                                        <p>Bradley Foster</p>
                                        <div className="d-flex text-muted">
                                            <p className="mb-0">Deshawnhaven</p>
                                            <p className="ml-auto mb-0">13:20</p>
                                        </div>
                                    </div>
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