import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from "react-router-dom";
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


function Index() {
    const navigate = useNavigate();
    const actiondata = useActionData();
    const loaderData = useRouteLoaderData('user');

    const [companyForm, setCompanyForm] = useState(false);
    const [ListData, setListData] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [snackOpen, setSnackOpen] = useState(false);
    const [companyList, setCompanyList] = useState(false);


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
        actiondata?.status && handleChangeForm(false)
    }, [actiondata])

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
        setCompanyList(cdata?.data?.items)
    }

    const getListData = async () => {
        let listData = await Services.getTruckList({
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

    return (
        <div className='mainwrapper'>
            <Grid container sx={{ mb: 2 }}>
                <Grid item md={6}>
                    Truck List
                </Grid>
                <Grid item md={6} style={{ textAlign: 'right ' }}>
                    <Button onClick={handleChangeForm} variant="outlined" className='add_btn'>Add Truck</Button>
                </Grid>
            </Grid>



            <TableContainer>
                <Table>
                    <TableHead sx={{
                        backgroundColor: '#F4F6F8', borderRadius: 5,
                        borderBottom: `solid 1px #ccc`,
                        '& th': { backgroundColor: 'transparent' },
                    }}>
                        <TableCell sx={{ width: 50 }}> Sno </TableCell>
                        <TableCell> No</TableCell>
                        <TableCell> Name </TableCell>
                        <TableCell> Type </TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>Plate No</TableCell>
                        <TableCell>Made By</TableCell>
                        <TableCell>Model & Year</TableCell>
                        <TableCell>Driver</TableCell>
                        <TableCell>Expire Date </TableCell>
                        <TableCell> </TableCell>
                    </TableHead>

                    <TableBody>
                        {ListData.length > 0 && ListData.map((list, i) => (
                            <TableRow sx={{ '& td': { paddingY: 2, border: 0 }, '&:hover': { backgroundColor: '#F4F6F8' } }} >
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{list?.vehicleNo ?? '--'}</TableCell>
                                <TableCell>{list?.truckName ?? '00000 00000'}</TableCell>
                                <TableCell>{list?.vehicleType ?? '--'}</TableCell>
                                <TableCell > {list?.vehicleColor}</TableCell>
                                <TableCell > {list?.plateNo}</TableCell>
                                <TableCell > {list?.madeBy}</TableCell>
                                <TableCell > {list?.model ?? '--'} {list?.year ?? '--'} </TableCell>
                                <TableCell > {list?.driver}</TableCell>
                                <TableCell > {list?.insuranceExpire}</TableCell>
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

            <Box>
                {/* <Button >Open Child Modal</Button> */}
                <Modal
                    open={companyForm}
                    // onClose={handleChangeForm}
                    aria-labelledby="child-modal-title"
                    BackdropComponent={Backdrop}
                    aria-describedby="child-modal-description"
                >
                    <Box className="modal_wrapper">
                        <h2>Add Truck</h2>
                        <Form method='post'>
                            <Box style={{ height: 300, overflow: 'scroll' }}>
                                <input type={'text'} name="vehicleNo" placeholder="Vehicle No" className='form-control' />
                                <input type={'text'} name="truckName" placeholder="Truck Name" className='form-control' />
                                <input type={'text'} name="vehicleType" placeholder="Vechicle Type" className='form-control' />
                                <input type={'text'} name="color" placeholder="Vehicle Color" className='form-control' />
                                <input type={'text'} name="plateNo" placeholder="Plate No" className='form-control' />
                                <input type={'text'} name="madeBy" placeholder="Made By" className='form-control' />
                                <input type={'text'} name="modal" placeholder="Modal" className='form-control' />
                                <input type={'text'} name="year" placeholder="Year" className='form-control' />
                                <input type={'text'} name="defaultDriver" placeholder="Driver" className='form-control' />
                                <input type={'text'} name="ownedBy" placeholder="Owned By" className='form-control' />
                                <input type={'text'} name="maxLoad" placeholder="Max Load Capacity" className='form-control' />
                                <input type={'text'} name="maxSpeed" placeholder="Max Speed" className='form-control' />
                                <input type={'text'} name="insuranceExpire" placeholder="Insurance Expiry Date" className='form-control' />
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
