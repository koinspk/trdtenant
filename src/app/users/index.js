import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid, Modal, Backdrop, Box, Alert, Table, TableBody, TableContainer, TablePagination, Chip, Pagination } from '@mui/material'
import { Form, useActionData } from 'react-router-dom';
import { Services } from '../service/services';
import TablePaginationFeild from '../components/tablePagination';
import { Menu,MenuItem,Checkbox, TableRow, TableCell, TableHead, TableSortLabe, TablePaginationl, Snackbar, IconButton } from '@mui/material';
import UserListToolbar from '../components/user/userList';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function Index() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();


    // const actiondata = useActionData();

    const [companyForm, setCompanyForm] = useState(false);
    const [companyList, setCompanyList] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [snackOpen, setSnackOpen] = useState(false);
    const [actionMenu, setActionMenu] = useState(false);

    const [pagination, setPagination] = useState({
        rowsPerPage: 5,
        page: 1,
        count: 1,
    });


    const handleSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    };

    const changeActionMenu = () => {
        setActionMenu(!actionMenu);
    };
    const handleChangeForm = () => {
        setCompanyForm(!companyForm);
    };
    // useEffect(() => {
    //     console.log(actiondata);
    //     if (actiondata?.status == 201) {
    //         handleChangeForm(false);
    //     }
    // }, [actiondata])

    useEffect(() => {
        getCompany();
    }, [pagination?.pageSize])
    const getCompany = async () => {
        let listData = await Services.companyList({
            page: pagination?.page,
            pageSize: pagination?.rowsPerPage
        });
        setCompanyList(listData?.data?.items)
        console.log(listData);
        setPagination({
            ...pagination,
            page: listData?.data?.page,
            rowsPerPage: listData?.data?.pageSize,
            count: listData?.data?.total,
        })
    }
    const handleFilterByName = (filterName) => {
        setFilterName(filterName);
    };

    const changeEvent = (page) => {
        setPagination({
            ...pagination,
            page: page
        })
    }
    const handleChangeRowsPerPage = (event) => {
        setPagination({
            ...pagination,
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        })
    };

    return (
        <div className='mainwrapper'>
            <Grid container sx={{ mb: 3 }}>
                <Grid item md={6}>
                    Users List
                </Grid>
                <Grid item md={6} style={{ textAlign: 'right ' }}>
                    <Button variant="outlined" onClick={handleOpen} className='add_btn'>Add User</Button>
                </Grid>
            </Grid>

            <Box className="">
                {/* <Snackbar
                    open={actiondata?.status == 201}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    autoHideDuration={3000}
                    onClose={handleSnackbar}
                    message="Subsidiary Company Created"
                    key={"top" + "right"}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        This is a success message!
                    </Alert>
                </Snackbar> */}
                <UserListToolbar
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                // onDeleteUsers={() => handleDeleteMultiUser(selected)}
                />

                <TableContainer>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#F4F6F8', borderRadius: 5 }}>
                            <TableCell sx={{ width: 50 }}> Sno </TableCell>
                            <TableCell> Name </TableCell>
                            <TableCell> Employee No </TableCell>
                            <TableCell> Designation </TableCell>
                            <TableCell> Email </TableCell>
                            <TableCell> Contact No </TableCell>
                            <TableCell> Company </TableCell>
                            <TableCell> Role </TableCell>
                            <TableCell>  </TableCell>
                        </TableHead>

                        <TableBody>
                            {companyList && companyList.slice(pagination.page * pagination.rowsPerPage, pagination.page * pagination.rowsPerPage + pagination.rowsPerPage).map((list, i) => (
                                <TableRow>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell sx={{ alignItems: 'center', display: 'flex' }}><img src={require('../../assets/users/user.png')} style={{ width: 30, height: 30, marginRight: 10 }} />{list?.subsidiarycompany}</TableCell>
                                    <TableCell>{list?.contactno}</TableCell>
                                    <TableCell>{list?.emailid}</TableCell>
                                    <TableCell sx={{ alignItems: 'center', display: 'flex' }}> <PlaceOutlinedIcon sx={{ opacity: .3 }} />{list?.street}, {list?.street}</TableCell>
                                    <TableCell>
                                        <Chip label={list?.status} size="small" variant="outlined" color="error" />
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePaginationFeild
                    rowsPerPageOptions={[10, 20]}
                    count={pagination.count}
                    rowsPerPage={pagination.rowsPerPage}
                    pageSize={pagination.pageSize}
                    page={pagination.page}
                    changeEvent={changeEvent}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>



            <Box>
                {/* <Button >Open Child Modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    BackdropComponent={Backdrop}
                    aria-describedby="child-modal-description"
                >
                    <Box className="modal_wrapper">
                        <h2>Add User</h2>
                        <Form method='post'>
                            <Box style={{ height: 300, overflow: 'scroll' }}>
                                <input type={'text'} placeholder="First Name" name='firstname' className='form-control' />
                                <input type={'text'} placeholder="Last Name" name='lastname' className='form-control' />
                                <input type={'email'} placeholder="Email" name='email' className='form-control' />
                                <input type={'text'} placeholder="Employee No" name='employeno' className='form-control' />
                                <input type={'text'} placeholder="Designation" name='designation' className='form-control' />
                                <input type={'text'} placeholder="Company" name='company' className='form-control' />
                                <input type={'text'} placeholder="Role" name='role' className='form-control' />
                                <input type={'text'} placeholder="Password" name='password' className='form-control' />
                            </Box>
                            <Box className='modalaction'>
                                <Button onClick={handleClose} className='btn cancel_btn'>Cancel</Button>
                                <Button className='btn submit_btn' type='submit'>Submit</Button>
                            </Box>
                        </Form>
                    </Box>
                </Modal>
            </Box>
        </div>
    )
}

export default Index
