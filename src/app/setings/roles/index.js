import React from 'react';
import { Button, Grid, Box, Modal, Backdrop } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
 
const columns = [
    { field: 'id', headerName: 'ID', width: 15 },
    { field: 'name', headerName: 'Name', width: 170 },
    { field: 'external_name', headerName: 'External Name', width: 160 },
    { field: 'permission', headerName: 'Permissions', width: 300, renderCell:params=><div>{params.value}</div> },
    {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        width: 160,
        renderCell:params=><><Button sx={{ mr: 1 }} color='secondary' variant='outlined'>Edit</Button><Button color='secondary' variant='outlined'>Delete</Button> </>
    },
];

const rows = [
    { id: 1, name: 'Admin', external_name: 'admin', permission: ['Route Management', 'Truck Management', 'Collection'],  action: '' },
    { id: 2, name: 'Super Admin', external_name: 'seradmin', permission: ['Route Management', 'Truck Management', 'Collection'],  action: '' },
    { id: 3, name: 'Driver', external_name: 'driver', permission: ['Route Management', 'Truck Management', 'Collection'],  action: '' },
    { id: 4, name: 'Loadman', external_name: 'loadman', permission: ['Route Management', 'Truck Management', 'Collection'],  action: '' },
    { id: 5, name: 'Admin', external_name: 'admin', permission: ['Route Management', 'Truck Management', 'Collection'],  action: '' },
    { id: 6, name: 'Super Admin', external_name: 'seradmin', permission: ['Route Management', 'Truck Management', 'Collection'],  action: '' },
    { id: 7, name: 'Admin', external_name: 'admin', permission: ['Route Management', 'Truck Management', 'Collection'],  action: '' },
    { id: 8, name: 'Super Admin', external_name: 'seradmin', permission: ['Route Management', 'Truck Management', 'Collection'],  action: '' },

];

function Index() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();

    return (
        <div className='mainwrapper'>
            <Grid container sx={{ mb: 2 }}>
                <Grid item md={6}>
                    Roles
                </Grid>
                <Grid item md={6} style={{ textAlign: 'right ' }}>
                    <Button onClick={handleOpen} variant="outlined" className='add_btn'>Add Role</Button>
                </Grid>
            </Grid>

            <Box style={{ height: 420, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={6}
                    rowsPerPageOptions={[5]}
                />
            </Box>

            <Box>
                {/* <Button >Open Child Modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box className="modal_wrapper">
                        <h2>New Role</h2>
                        <Box style={{ height: 300, overflow: 'scroll' }}>
                            <input type={'text'} placeholder="Name" className='form-control' />
                            <input type={'text'} placeholder="External Name" className='form-control' />
                            <input type={'text'} placeholder="Description" className='form-control' />
                        </Box>
                        <Box className='modalaction'>
                            <Button onClick={handleClose} className='btn cancel_btn'>Cancel</Button>
                            <Button className='btn submit_btn'>Submit</Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </div>
    )
}

export default Index
