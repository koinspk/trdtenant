import React from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';

import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Changestatus = () => {
    return (
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            label="Age"
            
        >
            <MenuItem value={10}>Edit</MenuItem>
            <MenuItem value={20}>Delete</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>
    );
}

const ExpandableRowTable = props => {
    const [data, setData] = React.useState({
        data: [],
        count: 0,
        page: 0,
        rowsPerPage: 10,
        searchtext: '',
    })

    const columns = [
        {
            name: "organization",
            label: "Company ID",
            options: {
                customBodyRender: (colArrayData) => {
                    return colArrayData?.organisationid ?? '-'
                }
            }
        },
        {
            name: "organization",
            label: "Company Name",
            options: {
                customBodyRender: (colArrayData) => {
                    return colArrayData?.organizationname ?? '-'
                }
            }
        },
        {
            name: "organization",
            label: "Company Contact No",
            options: {
                customBodyRender: (colArrayData) => {
                    return colArrayData?.contactno ?? '-'
                }
            }
        },
        {
            name: "organization",
            label: "Email ID",
            options: {
                customBodyRender: (colArrayData) => {
                    return colArrayData?.emailid ?? '-'
                }
            }
        },
        {
            name: "database",
            label: "DB Name",
            options: {
                customBodyRender: (colArrayData) => {
                    return colArrayData?.databasename ?? '-'
                }
            }
        },
        {
            name: "status",
            label: "Status",
           
        },
        {
            name : '',
            label : 'Action',
            options: {
                customBodyRender: (colArrayData) => {
                    // return Changestatus();
                }
        }
    }
      

    ];



    React.useEffect(() => {
        let skip = data.page * data?.rowsPerPage
        let searchtext = data?.searchtext ?? ''
        var url = `${process.env.REACT_APP_BASE_URL}/organisation?skip=${skip}&limit=${data?.rowsPerPage}`;
        console.log(`${process.env.REACT_APP_BASE_URL}`);
        axios.get(url).then(r => {
            console.log(r?.data?.message)
            setData(prev => ({ ...prev, data: r?.data?.message , count: r?.data?.total, page: data.page }))
        })
    }, [data.page , data.rowsPerPage])

    const serversideData = (pagestate, sortorder) => {
        setData(prev => ({ ...prev, page: pagestate?.page, rowsPerPage: pagestate?.rowsPerPage }))
    }



    const options = {
        filter: false,
        serverSide: false,
        search : false,
        download : false,
        print : false,
        columns : false,
        count: data?.count,
        page: data?.page,
        rowsPerPage: data?.rowsPerPage,
        onTableChange: (action, tableState) => {
            console.log(action);
            switch (action) {
                case 'changePage':
                    serversideData(tableState, tableState.sortOrder);
                    break;
                case 'sort':
                    // this.sort(tableState.page, tableState.sortOrder);
                    break;
                case 'changeRowsPerPage':
                    // console.log(tableState);
                    setData(prev => ({ ...prev, rowsPerPage: tableState?.rowsPerPage }))
                    break;
                case 'search':
                    setData(prev => ({ ...prev, searchtext: tableState?.searchText }))
                    break;


                default:
                    console.log('action not handled.');
            }

            //serversideData(action, tableState)
            // console.log(action, tableState);
        },
        onFilterChange: (changedColumn, filterList) => {
            console.log(changedColumn, filterList);
        },
        selectableRows: false,
        filterType: "dropdown",
        responsive: "scrollMaxHeight",
        //rowsPerPage: 10,
        expandableRows: false,
        // page: 1
    };

    return (
        <>
            <MUIDataTable 
                className="company_table"
                // title={"Organisation"}
                data={data?.data}
                columns={columns}
                options={options}
            />
        </>
    );
};

export default ExpandableRowTable;