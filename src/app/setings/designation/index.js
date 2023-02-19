import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Grid, Modal, Backdrop, Box, Alert, Table, TableBody, TableContainer, TablePagination, Chip, Pagination } from '@mui/material'
import { Form, useActionData } from 'react-router-dom';
import { Services } from '../../service/services';
import TablePaginationFeild from '../../components/tablePagination';
import { Menu, MenuItem, Checkbox, TableRow, TableCell, TableHead, TableSortLabe, TablePaginationl, Snackbar, IconButton } from '@mui/material';
import UserListToolbar from '../../components/user/userList';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment'
import MoreActionMenu from '../../components/moreAction';
import NoData from '../../components/noData';


function Index() {
    const navigate = useNavigate();
    const actiondata = useActionData();

    const [companyForm, setCompanyForm] = useState(false);
    const [listData, setListData] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [snackOpen, setSnackOpen] = useState(false);
    const [actionMenu, setActionMenu] = useState(false);

    const [pagination, setPagination] = useState({
        rowsPerPage: 5,
        page: 0,
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
    useEffect(() => {
        actiondata?.status && handleChangeForm(false)
    }, [actiondata])

    useEffect(() => {
        getCompany();
    }, [pagination?.page, pagination?.rowsPerPage])

    const getCompany = async () => {
        let listData = await Services.designationList({
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
                    <Box className="title_page">Designation List</Box>
                </Grid>
                <Grid item md={6} style={{ textAlign: 'right ' }}>
                    <Button onClick={handleChangeForm} variant="outlined" className='add_btn'>Add Designation</Button>
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
                        Designation has beeen Created
                    </Alert>
                </Snackbar>
                {/* <UserListToolbar
        filterName={filterName}
        onFilterName={handleFilterByName}
    // onDeleteUsers={() => handleDeleteMultiUser(selected)}
    /> */}

                <TableContainer>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#F4F6F8', borderRadius: 5 }}>
                            <TableCell sx={{ width: 50 }}> Sno </TableCell>
                            <TableCell> Designation </TableCell>
                            <TableCell> Description</TableCell>
                            <TableCell> Create At </TableCell>
                            <TableCell>  </TableCell>
                        </TableHead>

                        <TableBody>
                            {listData.length > 0 && listData.map((list, i) => (
                                <TableRow sx={{ '& td': { paddingY: 2, border: 0 }, '&:hover': { backgroundColor: '#F4F6F8' } }} >
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell sx={{ alignItems: 'center', display: 'flex' }}><img src={require('../../../assets/users/user.png')} style={{ width: 30, height: 30, marginRight: 10 }} />{list?.designation ?? '--'}</TableCell>
                                    <TableCell>{list?.description ?? '00000 00000'}</TableCell>
                                    <TableCell>{moment(list?.createdAt).format("DD MMM yyyy") ?? '--'}</TableCell>
                                    <TableCell sx={{ width: 60 }}>
                                        <MoreActionMenu onDelete={() => handleDeleteUser(list?._id)} editRowId={list?._id} openModal={handleChangeForm} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {listData.length <= 0 && (
                    <NoData />
                )}

                {listData.length > 0 && (
                    <TablePaginationFeild
                        rowsPerPageOptions={[5, 10, 20]}
                        count={pagination.count}
                        rowsPerPage={pagination.rowsPerPage}
                        pageSize={pagination.pageSize}
                        page={pagination.page}
                        changeEvent={changeEvent}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Box>

            <Box>
                <Modal
                    open={companyForm}
                    // onClose={handleChangeForm}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box className="modal_wrapper">
                        <h2>New Role</h2>
                        <Form method='post'>
                            <Box style={{ height: 300, overflow: 'scroll' }}>
                                <input type={'text'} name="designation" placeholder="Designation" className='form-control' />
                                <input type={'text'} name="description" placeholder="Description" className='form-control' />
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
