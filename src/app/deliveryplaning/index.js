import React, { useState, useEffect } from 'react';
import { useNavigate, Form, useActionData } from "react-router-dom";
import { Button, Grid, Modal, Backdrop, Box, Typography, Table, TableBody, TableContainer, TablePagination, Chip, Pagination } from '@mui/material'
import { Menu, MenuItem, FormControl, InputLabel, Select, Fab, TableRow, TableCell, TableHead, } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import DnsIcon from '@mui/icons-material/Dns';
import { Tag, Add, LocalShipping, CalendarMonth, Circle } from '@mui/icons-material';
import { Services } from '../service/services';
import TablePaginationFeild from '../components/tablePagination';
import UserListToolbar from '../components/user/userList';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment'
import MoreActionMenu from '../components/moreAction';
import NoData from '../components/noData';



const columns = [
    { field: 'id', headerName: 'Sno', width: 70 },
    { field: 'tripid', headerName: 'Trip ID', width: 200 },
    { field: 'truckno', headerName: 'Truck No ', width: 200 },
    {
        field: 'completed',
        headerName: 'Completed',
        width: 150,
    },
    {
        field: 'pending',
        headerName: 'Pending',
        width: 180,
    },
    {
        field: 'canceled',
        headerName: 'Canceled',
        width: 160,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 160,
    },
];

const rows = [
    { id: 1, tripid: 'Jhon Mickel', truckno: 'jhonmickel@gmail.com', pending: '5', canceled: '3', completed: '8', status: 'Pending' },
    { id: 2, tripid: 'jhonsmithl', truckno: 'jhonsmith@gmail.com', pending: '6', canceled: '4', completed: '7', status: 'Canceled' },
    { id: 3, tripid: 'Jhon Mickel', truckno: 'jhonmickel@gmail.com', pending: 2, canceled: 5, completed: 7, status: '' },
    { id: 4, tripid: 'Jhon Mickel', truckno: 'jhonmickel@gmail.com', pending: 1, canceled: 2, completed: 3, status: '' },
    { id: 5, tripid: 'jhonsmithl', truckno: 'jhonsmith@gmail.com', pending: 1, canceled: 2, completed: 3, status: '' },
    { id: 6, tripid: 'Jhon Mickel', truckno: 'jhonmickel@gmail.com', pending: 5, canceled: 2, completed: 7, status: '' },
    { id: 7, tripid: 'Jhon Mickel', truckno: 'jhonmickel@gmail.com', pending: 1, canceled: 2, completed: 3, status: '' },
    { id: 8, tripid: 'jhonsmithl', truckno: 'jhonsmith@gmail.com', pending: 4, canceled: 2, completed: 6, status: '' },
];

function Index() {
    const navigate = useNavigate();
    const actiondata = useActionData();

    const [layout, setLayout] = React.useState('list');
    const [vehicleType, setVehicleType] = React.useState('');
    const [driver, setDriver] = React.useState('');
    const [loadman, setLoadman] = React.useState('');
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
        console.log(listData);
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

    const handleAlignment = (event, newAlignment) => {
        setLayout(newAlignment);
        console.log(newAlignment)
    };

    return (
        <>
            <Box>
                <Modal
                    open={companyForm}
                    // onClose={handleChangeForm}
                    aria-labelledby="child-modal-title"
                    BackdropComponent={Backdrop}
                    aria-describedby="child-modal-description"
                >
                    <Box className="modal_wrapper">
                        <h2>Add New Delivery</h2>
                        <Box style={{ height: 300, overflow: 'scroll' }}>
                            <input type={'text'} placeholder="Vehicle No" className='form-control' />

                            <FormControl fullWidth>
                                <InputLabel >Vehicle Type</InputLabel>
                                <Select
                                    value={vehicleType}
                                    onChange={(e) => {
                                        setVehicleType(e.target.value)
                                    }}
                                    label='Vehicle Type'
                                >
                                    <MenuItem value="">
                                        <em>Vehicle Type</em>
                                    </MenuItem>
                                    <MenuItem value={10}>4 Wheeler</MenuItem>
                                    <MenuItem value={20}>4 Wheeler</MenuItem>
                                    <MenuItem value={30}>4 Wheeler</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel >Driver</InputLabel>
                                <Select
                                    value={driver}
                                    label='Driver'
                                >
                                    <MenuItem value="">
                                        <em>Driver</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel >Loadman</InputLabel>
                                <Select
                                    value={loadman}
                                    label='Driver'
                                >
                                    <MenuItem value="">
                                        <em>Loadman</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className='modalaction'>
                            <Button onClick={handleChangeForm} className='btn cancel_btn'>Cancel</Button>
                            <Button className='btn submit_btn'>Submit</Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>


            <Box className='carrdwrapper' sx={{ mb: 3 }}>
                <Grid container sx={{ mb: 2 }} alignItems="center">
                    <Grid item md={6}>
                        <Box className="title_page">Delivery Planing</Box>
                    </Grid>
                    <Grid item md={6} style={{ textAlign: 'right ', display: 'flex', alignItems: 'center', justifyContent: 'end', width: '100%' }}>
                        <ToggleButtonGroup className='grid_butons'
                            value={layout}
                            exclusive
                            onChange={handleAlignment}
                            aria-label="text alignment"
                            sx={{ textAlign: 'right', marginBottom: 0, mr: 2 }}
                        >
                            <ToggleButton value="list" aria-label="left aligned">
                                <DnsIcon />
                            </ToggleButton>
                            <ToggleButton value="grid" aria-label="centered">
                                <AutoAwesomeMosaicIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <Button variant="outlined" onClick={handleChangeForm} className='add_btn' >Create Delivery</Button>
                    </Grid>
                </Grid>


                {layout == 'list' && (
                    <>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#F4F6F8', borderRadius: 5, }}>
                                    <TableCell sx={{ width: 50 }}> Sno </TableCell>
                                    <TableCell> Name </TableCell>
                                    <TableCell> Contact No </TableCell>
                                    <TableCell> Email </TableCell>
                                    <TableCell> Address </TableCell>
                                    <TableCell> Status </TableCell>
                                    <TableCell>  </TableCell>
                                </TableHead>

                                <TableBody   >
                                    {listData.length > 0 && listData.map((list, i) => (
                                        <TableRow sx={{ '& td': { paddingY: 2, border: 0 }, '&:hover': { backgroundColor: '#F4F6F8' } }} >
                                            <TableCell>{i + 1}</TableCell>
                                            <TableCell sx={{ alignItems: 'center', display: 'flex' }}><img src={require('../../assets/users/user.png')} style={{ width: 30, height: 30, marginRight: 10 }} />{list?.subsidiarycompany}</TableCell>
                                            <TableCell>{list?.contactno}</TableCell>
                                            <TableCell>{list?.emailid}</TableCell>
                                            <TableCell sx={{ alignItems: 'center', display: 'flex' }}> <PlaceOutlinedIcon sx={{ opacity: .3 }} />{list?.street}, {list?.street}</TableCell>
                                            <TableCell>
                                                <Chip label={list?.status} size="small" variant="outlined" color="error" />
                                            </TableCell>
                                            <TableCell>
                                                <MoreActionMenu editRowId={list?._id} openModal={handleChangeForm} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {listData.length <= 0 && (
                                <NoData />
                            )}
                        </TableContainer>


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
                    </>
                )}
            </Box>

            <Box className='delivery_wrapper'>
                {layout == 'grid' && (
                    <>
                        <Grid container className='delivery_planing_grid' spacing={3}>
                            <Grid md={3} item >
                                <Box className='delivery_box'>
                                    <Box className='status pending'><Circle /> </Box>
                                    <Box className='listitem'><Tag /> 323232</Box>
                                    <Box className='listitem'><LocalShipping /> 323232</Box>
                                    <Box className='listitem'><CalendarMonth /> 323232</Box>
                                    <Box className='orderscount_box'>
                                        <Box>
                                            <Typography>Completed</Typography>
                                            <Chip className='complete' label={4} />
                                        </Box>
                                        <Box>
                                            <Typography>Canceled</Typography>
                                            <Chip className='cancel' label={5} />
                                        </Box>
                                        <Box>
                                            <Typography>Total</Typography>
                                            <Chip className='total' label={9} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid md={3} item >
                                <Box className='delivery_box'>
                                    <Box className='status complete'><Circle /> </Box>
                                    <Box className='listitem'><Tag /> 323232</Box>
                                    <Box className='listitem'><LocalShipping /> 323232</Box>
                                    <Box className='listitem'><CalendarMonth /> 323232</Box>
                                    <Box className='orderscount_box'>
                                        <Box>
                                            <Typography>Completed</Typography>
                                            <Chip className='complete' label={4} />
                                        </Box>
                                        <Box>
                                            <Typography>Canceled</Typography>
                                            <Chip className='cancel' label={4} />
                                        </Box>
                                        <Box>
                                            <Typography>Total</Typography>
                                            <Chip className='total' label={8} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid md={3} item >
                                <Box className='delivery_box'>
                                    <Box className='status pending'><Circle /> </Box>
                                    <Box className='listitem'><Tag /> 323232</Box>
                                    <Box className='listitem'><LocalShipping /> 323232</Box>
                                    <Box className='listitem'><CalendarMonth /> 323232</Box>
                                    <Box className='orderscount_box'>
                                        <Box>
                                            <Typography>Completed</Typography>
                                            <Chip className='complete' label={4} />
                                        </Box>
                                        <Box>
                                            <Typography>Canceled</Typography>
                                            <Chip className='cancel' label={5} />
                                        </Box>
                                        <Box>
                                            <Typography>Total</Typography>
                                            <Chip className='total' label={9} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                    </>
                )}
            </Box>

        </>
    )
}

export default Index
