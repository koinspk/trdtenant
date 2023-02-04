import React from 'react';
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid, Box, Modal, Backdrop } from '@mui/material';
import { Form } from "react-router-dom";


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email ', width: 200 },
    {
        field: 'contact',
        headerName: 'Contact No',
        width: 150,
    },
    {
        field: 'designation',
        headerName: 'Designation',
        width: 180,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 160,
    },
];

const rows = [
    { id: 1, name: 'Jhon Mickel', email: 'jhonmickel@gmail.com', contact: '98832 32322', role: 'loadman', designation: 'desgnation aa' },
    { id: 2, name: 'jhonsmithl', email: 'jhonsmith@gmail.com', contact: '98832 32327', role: 'loadman', designation: 'desgnation aa' },
    { id: 3, name: 'Jhon Mickel', email: 'jhonmickel@gmail.com', contact: '98832 32322', role: 'loadman', designation: 'desgnation aa' },
    { id: 4, name: 'Jhon Mickel', email: 'jhonmickel@gmail.com', contact: '98832 88282', role: 'loadman', designation: 'desgnation aa' },
    { id: 5, name: 'jhonsmithl', email: 'jhonsmith@gmail.com', contact: '98832 32322', role: 'loadman', designation: 'desgnation aa' },
    { id: 6, name: 'Jhon Mickel', email: 'jhonmickel@gmail.com', contact: '98832 32322', role: 'loadman', designation: 'desgnation aa' },
    { id: 7, name: 'Jhon Mickel', email: 'jhonmickel@gmail.com', contact: '98832 88282', role: 'loadman', designation: 'desgnation aa' },
    { id: 8, name: 'jhonsmithl', email: 'jhonsmith@gmail.com', contact: '98832 32322', role: 'loadman', designation: 'desgnation aa' },
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
            <Grid container sx={{ mb: 3 }}>
                <Grid item md={6}>
                    Users List
                </Grid>
                <Grid item md={6} style={{ textAlign: 'right ' }}>
                    <Button variant="outlined" onClick={handleOpen} className='add_btn'>Add User</Button>
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
                        <h2>Add User</h2>
                        <Form>
                            <Box style={{ height: 300, overflow: 'scroll' }}>

                                <input type={'text'} placeholder="First Name" className='form-control' />
                                <input type={'text'} placeholder="Last Name" className='form-control' />
                                <input type={'email'} placeholder="Email" className='form-control' />
                                <input type={'text'} placeholder="Designation" className='form-control' />
                                <input type={'text'} placeholder="Role" className='form-control' />
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
