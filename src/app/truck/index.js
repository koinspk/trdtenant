import React from 'react';
import { Button, Grid, Box, Modal, Backdrop } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const columns = [
    { field: 'id', headerName: 'ID', width : 15, },
    { field: 'tname', headerName: 'Truck Name', width: 140 },
    { field: 'tno', headerName: 'Truck No', width: 130 },
    { field: 'vtype', headerName: 'Vehicle Type', width: 130 },
    {
        field: 'insurancedate',
        headerName: 'Insurance Expire',
        width: 140,
    },
    {
        field: 'driver',
        headerName: 'Default Driver',
        width: 160,
    },
    {
        field: 'vno',
        headerName: 'Vehicle No',
        width: 160,
    },
    {
        field: 'ownedby',
        headerName: 'Owned By',
        width: 160,
    },
    {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        width: 160,
        type : 'boolean',
        editable : true,
        renderCell:params=><><Button sx={{ mr: 1 }} color='secondary' variant='outlined'>Edit</Button><Button color='secondary' variant='outlined'>Delete</Button> </>
    },
];

const rows = [
    { id: 1, tname: 'Truck A', tno: 'TT4343', vtype: 'Two Wheeler', insurancedate: '20/12/1999', insurancedate: 'Driver A', vno: 'TN 15 2199', ownedby: 'Owned AA', },
    { id: 2, tname: 'Truck B', tno: 'TT4343', vtype: 'Two Wheeler', insurancedate: '20/12/1999', insurancedate: 'Driver B', vno: 'TN 17 2023', ownedby: 'Owned AA', },
    { id: 3, tname: 'Truck C', tno: 'TT4343', vtype: 'Two Wheeler', insurancedate: '20/12/1999', insurancedate: 'Driver C', vno: 'TN 18 4345', ownedby: 'Owned AA', },
    { id: 4, tname: 'Truck D', tno: 'TT4343', vtype: 'Two Wheeler', insurancedate: '20/12/2001', insurancedate: 'Driver D', vno: 'TN 20 2199', ownedby: 'Owned AA', },
    { id: 5, tname: 'Truck E', tno: 'TT4343', vtype: 'Two Wheeler', insurancedate: '20/12/1999', insurancedate: 'Driver E', vno: 'TN 11 3232', ownedby: 'Owned AA', },
    { id: 6, tname: 'Truck F', tno: 'TT4343', vtype: 'Two Wheeler', insurancedate: '20/12/2004', insurancedate: 'Driver F', vno: 'TN 05 2323', ownedby: 'Owned AA', },
    { id: 7, tname: 'Truck G', tno: 'TT4343', vtype: 'Two Wheeler', insurancedate: '20/12/2007', insurancedate: 'Driver G', vno: 'TN 07 3232', ownedby: 'Owned AA', },
    { id: 8, tname: 'Truck A', tno: 'TT4343', vtype: 'Two Wheeler', insurancedate: '20/12/2006', insurancedate: 'Driver A', vno: 'TN 09 2323', ownedby: 'Owned AA', },
    { id: 3, tname: 'Truck C', tno: 'TT4343', vtype: 'Two Wheeler', insurancedate: '20/12/1999', insurancedate: 'Driver C', vno: 'TN 18 4345', ownedby: 'Owned AA', },
    { id: 4, tname: 'Truck D', tno: 'TT4343', vtype: 'Two Wheeler', insurancedate: '20/12/2001', insurancedate: 'Driver D', vno: 'TN 20 2199', ownedby: 'Owned AA', },
    { id: 5, tname: 'Truck E', tno: 'TT4343', vtype: 'Two Wheeler', insurancedate: '20/12/1999', insurancedate: 'Driver E', vno: 'TN 11 3232', ownedby: 'Owned AA', },

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
                    Truck List
                </Grid>
                <Grid item md={6} style={{ textAlign: 'right ' }}>
                    <Button onClick={handleOpen} variant="outlined" className='add_btn'>Add Truck</Button>
                </Grid>
            </Grid>

            <Box style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
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
                        <h2>Add Truck</h2>
                        <Box style={{ height: 300, overflow: 'scroll' }}>
                            <input type={'text'} placeholder="Truck Name" className='form-control' />
                            <input type={'text'} placeholder="Vechicle No" className='form-control' />
                            <input type={'text'} placeholder="Vechicle Type" className='form-control' />
                            <input type={'text'} placeholder="Plate No" className='form-control' />
                            <input type={'text'} placeholder="Plate No" className='form-control' />
                            <input type={'text'} placeholder="Make" className='form-control' />
                            <input type={'text'} placeholder="Modal" className='form-control' />
                            <input type={'text'} placeholder="Year" className='form-control' />
                            <input type={'text'} placeholder="Owned By" className='form-control' />
                            <input type={'text'} placeholder="Insurance Expiry Date" className='form-control' />
                            <input type={'text'} placeholder="Vehicle Color" className='form-control' />
                            <input type={'text'} placeholder="Max Load Capacity" className='form-control' />
                            <input type={'text'} placeholder="Max Speed" className='form-control' />
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
