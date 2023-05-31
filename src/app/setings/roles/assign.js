import React, { useEffect, useState } from 'react'
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { Button, Grid, Modal, Backdrop, Box, Alert, Table, TableBody, TableContainer, } from '@mui/material'
import { Form, useActionData } from 'react-router-dom';
import TablePaginationFeild from '../../components/tablePagination';
import { TableRow, TableCell, TableHead, Snackbar, } from '@mui/material';
import { Formik, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import NoData from '../../components/noData';


function Assign() {

    const navigate = useNavigate();
    const actiondata = useActionData();
    const loaderData = useRouteLoaderData('role');

    const [modalForm, setModalForm] = useState(false);
    const [listData, setListData] = useState([
        {
            "roles": "User",
            "permission": [
                { "label": "create", "selected": false},
                { "label": "update", "selected": false},
                { "label": "view", "selected": false},
                { "label": "delete", "selected": false },
            ]
        },
        {
            "roles": "Sub Company",
            "permission": [
                { "label": "create", "selected": false},
                { "label": "update", "selected": false},
                { "label": "view", "selected": false},
                { "label": "delete", "selected": false },
            ]
        },
        {
            "roles": "Truck",
            "permission": [
                { "label": "create", "selected": false},
                { "label": "update", "selected": false},
                { "label": "view", "selected": false},
                { "label": "delete", "selected": false },
            ]
        },
        {
            "roles": "Designation",
            "permission": [
                { "label": "create", "selected": false},
                { "label": "update", "selected": false},
                { "label": "view", "selected": false},
                { "label": "delete", "selected": false },
            ]
        },
    ]);


    const [snackOpen, setSnackOpen] = useState(false); 

    const handleSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    };
 
    const handleChangeForm = () => {
        setModalForm(!modalForm);
    };
    useEffect(() => {
        actiondata?.status && handleChangeForm(false)
    }, [actiondata])
 
    const submitPermission = ()=>{
        console.log(listData);
    }


    return (
        <div className='mainwrapper'>
            <Grid container sx={{ mb: 3 }} alignItems="center">
                <Grid item md={6}>
                    <Box className="title_page">Roles Permission</Box>
                </Grid>
            </Grid>

            <Box style={{ width: '100%' }}>
                <Snackbar
                    open={actiondata?.status}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    autoHideDuration={3000}
                    onClose={handleSnackbar}
                    message="Subsidiary Company Created"
                    key={"top" + "right"}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Role has beeen Created
                    </Alert>
                </Snackbar>
                {/* <UserListToolbar
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                // onDeleteUsers={() => handleDeleteMultiUser(selected)}
                /> */}
                <TableContainer>
                    <Table>
                        <TableHead sx={{
                            backgroundColor: '#F4F6F8', borderRadius: 5,
                            borderBottom: `solid 1px #ccc`,
                            '& th': { backgroundColor: 'transparent' },
                        }}>
                            <TableRow>
                                <TableCell  > </TableCell>
                                <TableCell> Create </TableCell>
                                <TableCell> Update</TableCell>
                                <TableCell> View </TableCell>
                                <TableCell> Delete </TableCell>
                                {/* <TableCell> Customer </TableCell> */}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {listData.length > 0 && listData.map((list, i) => (
                                <TableRow sx={{ '& td': { paddingY: 2, border: 0 }, '&:hover': { backgroundColor: '#F4F6F8' } }} key={i}>
                                    <TableCell sx={{ alignItems: 'center', display: 'flex', textTransform: 'capitalize' }}>{list?.roles ?? '--'}</TableCell>

                                    {list.permission.map((role, roleIndex) => (
                                        <TableCell key={roleIndex}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name={list.permission + roleIndex}
                                                    checked={role.selected}
                                                    onChange={(e) => {
                                                        let _data = [...listData];
                                                        if (!e.target.checked) {
                                                            _data[i].permission[roleIndex].selected = false;
                                                        } else {
                                                            _data[i].permission[roleIndex].selected = true;
                                                        }
                                                        setListData(_data)
                                                    }}
                                                />
                                            </label>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer> 

                <Box className='form_action_wrap ' sx={{ mt: 3 }}>
                    {/* <Button onClick={handleChangeForm} className='btn cancel_btn'>Cancel</Button> */}
                    <Button className='btn submit_btn' type="submit" onClick={submitPermission}>Submit</Button>
                </Box>

            </Box>

        </div>
    )
}

export default Assign
