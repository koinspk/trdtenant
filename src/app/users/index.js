import React, { useEffect, useState, useContext } from 'react'
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid, Modal, Backdrop, Box, Alert, Table, TableBody, TableContainer, TablePagination, Chip, Pagination } from '@mui/material'
import { Form, useActionData, useRouteLoaderData } from 'react-router-dom';
import { Services } from '../service/services';
import TablePaginationFeild from '../components/tablePagination';
import { Menu, MenuItem, Checkbox, TableRow, TableCell, TableHead, TableSortLabe, TablePaginationl, Snackbar, IconButton } from '@mui/material';
import UserListToolbar from '../components/user/userList';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreActionMenu from '../components/moreAction';
import PasswordInput from '../components/password';
import NoData from '../components/noData';
import SnackbarContext from '../context/snackbar';


function Index() {
    const navigate = useNavigate();
    const actiondata = useActionData();
    const loaderData = useRouteLoaderData('user');

    const [companyForm, setCompanyForm] = useState(false);
    const [ListData, setListData] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [snackOpen, setSnackOpen] = useState(false);
    const [companyList, setCompanyList] = useState(false);


    const { contextValue, updateSnackbar } = useContext(SnackbarContext)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const successMessage = queryParams.get('success') === '1' ? 'User Updated Successfully' : false;

    const [pagination, setPagination] = useState({
        rowsPerPage: 10,
        page: 0,
        count: 1,
    });

    const handleSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    };
    const handleChangeForm = () => {
        setCompanyForm(!companyForm);
    };
    
  useEffect(() => {
    if(actiondata?.status){
      handleChangeForm()
      updateSnackbar({
        ...contextValue,
        open : true,
        message : 'New User has been Created!'
      });
    }
    if(successMessage){
      updateSnackbar({
        ...contextValue,
        open : true,
        message : successMessage
      });
    }
  }, [actiondata, successMessage])

    useEffect(() => {
        getListData();
    }, [pagination?.page, pagination?.rowsPerPage])

    useEffect(() => {
        getComapnyList();
    }, []);

    const getComapnyList = async () => {
        let cdata = await Services.companyList({
            page: 1,
            pageSize: 10
        });
        console.log(cdata);
        setCompanyList(cdata?.data?.items)
    }

    const getListData = async () => {
        let listData = await Services.userList({
            page: pagination?.page,
            pageSize: pagination?.rowsPerPage
        });
        setListData(listData?.data?.items)
        setPagination({
            ...pagination,
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

    const handleDeleteUser = () => {

    }
    return (
        <div className='mainwrapper'>
            <Grid container sx={{ mb: 3 }} alignItems="center">
                <Grid item md={6}>
                    <Box className="title_page">Users List</Box>
                </Grid>
                <Grid item md={6} style={{ textAlign: 'right ' }}>
                    <Button variant="outlined" onClick={() => {
                        navigate('/users')
                        handleChangeForm();
                    }} className='add_btn'>Add User</Button>
                </Grid>
            </Grid>

            <Box className="">

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
                            <TableCell sx={{ width: 50 }}> Sno </TableCell>
                            <TableCell> Name </TableCell>
                            <TableCell> Contact No </TableCell>
                            <TableCell> Email </TableCell>
                            <TableCell>  Employee No </TableCell>
                            <TableCell>  </TableCell>
                        </TableHead>

                        <TableBody>
                            {ListData.length > 0 && ListData.map((list, i) => (
                                <TableRow sx={{ '& td': { paddingY: 2, border: 0 }, '&:hover': { backgroundColor: '#F4F6F8' } }} >
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell sx={{ alignItems: 'center', display: 'flex' }}><img src={require('../../assets/users/user.png')} style={{ width: 30, height: 30, marginRight: 10 }} />{list?.first_name ?? '--'}</TableCell>
                                    <TableCell>{list?.mobile_number ?? '00000 00000'}</TableCell>
                                    <TableCell>{list?.email ?? '--'}</TableCell>
                                    <TableCell sx={{ alignItems: 'center', display: 'flex' }}> {list?.empno}</TableCell>
                                    <TableCell sx={{ width: 60 }}>
                                        <MoreActionMenu editRowId={list?._id} openModal={handleChangeForm} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {ListData.length <= 0 && (
                    <NoData />
                )}

                {ListData.length > 0 &&
                    < TablePaginationFeild
                        rowsPerPageOptions={[10, 20]}
                        count={pagination.count}
                        rowsPerPage={pagination.rowsPerPage}
                        pageSize={pagination.pageSize}
                        page={pagination.page}
                        changeEvent={changeEvent}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                }
            </Box>

            <Box>
                <Modal
                    open={companyForm}
                    onClose={handleChangeForm}
                    aria-labelledby="child-modal-title"
                    BackdropComponent={Backdrop}
                    aria-describedby="child-modal-description"
                >
                    <Box className="modal_wrapper">
                        <h2>Add User</h2>
                        <Form method='post'>
                            <Box style={{ height: 300, overflow: 'scroll' }}>
                                <input type={'text'} placeholder="First Name" name='first_name' className='form-control' />
                                <input type={'text'} placeholder="Last Name" name='last_name' className='form-control' />
                                <input type={'email'} placeholder="Email" name='email' className='form-control' />
                                <input type={'text'} placeholder="Mobile No" name='mobile_number' className='form-control' />
                                <input type={'text'} placeholder="Employee No" name='empno' className='form-control' />
                                <input type={'text'} placeholder="Designation" name='designation' className='form-control' />
                                <select placeholder="Company" name='company' className='form-control' >
                                    <option value="" selected disabled hidden>Select Company</option>
                                    {companyList.length > 0 && companyList.map((optionList, i) => (
                                        <option value={optionList?._id} >{optionList?.subsidiarycompany}</option>
                                    ))}
                                </select>
                                <input type={'text'} placeholder="Role" name='role' className='form-control' />
                                <PasswordInput value={loaderData?.password} placeholder="Password" name='password' className='form-control' />
                            </Box>
                            <Box className='modalaction'>
                                <Button onClick={handleChangeForm} className='btn cancel_btn'>Cancel</Button>
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
