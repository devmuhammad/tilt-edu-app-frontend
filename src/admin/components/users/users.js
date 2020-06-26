import React, {Fragment, useEffect, forwardRef} from 'react';
import MaterialTable from 'material-table';


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

  

const Users  = () => {
    const [addLabel, setAddLabel] = React.useState("Create User")
    const [state, setState] = React.useState({
        columns: [
          { title: 'Name', field: 'name' },
          { title: 'Surname', field: 'surname' },
          { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
          {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
          },
        ],
        data: [
          { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
          {
            name: 'Zerya Betül',
            surname: 'Baran',
            birthYear: 2017,
            birthCity: 34,
          },
        ],
      });

    useEffect (()=> {
       

        const usrProfile = JSON.parse(localStorage.getItem('@UserProfile'))
        if (usrProfile == null) return ;
        if (usrProfile.role.role === "SCHOOL_ADMIN"){
            setAddLabel("Create Student")
        }
    },[])

    return (
        <Fragment>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-8 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">

                                {/* <div className="compose group">
                                    <button className="btn group-btn btn-block" >{addLabel}
                                    <i className="mdi mdi-plus-circle"></i>
                                    </button>
                                </div> */}
                                {/* <h4 className="card-title school-title">Users</h4> */}
                                <MaterialTable
                                    title="Users"
                                    columns={state.columns}
                                    data={state.data}
                                    icons={tableIcons}
                                    // actions={[
                                    //     {
                                    //       icon: () => <AddBox />,
                                    //       tooltip: 'Add User',
                                          
                                    //     }
                                    //   ]}
                                    editable={{
                                        onRowAdd: (newData) =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
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
                                            setTimeout(() => {
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
                        </div>
                    </div>
                <div className="col-lg-4 grid-margin stretch-card">
                    <div className="card">
                            <div className="card-body">
                                <h4 className="card-title school-title">Select a user to view results</h4>

                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </Fragment>
    )

};
export default Users