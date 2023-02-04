import React from 'react';
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid, Box, Modal, Backdrop, Typography, Fab, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import DnsIcon from '@mui/icons-material/Dns';
import Chip from '@mui/material/Chip';
import { Tag, Add, LocalShipping, CalendarMonth, Circle } from '@mui/icons-material';




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
    { id: 1, tripid: 'Jhon Mickel', truckno: 'jhonmickel@gmail.com',  pending: '5', canceled: '3',  completed: '8', status : 'Pending' },
    { id: 2, tripid: 'jhonsmithl', truckno: 'jhonsmith@gmail.com',  pending: '6', canceled: '4', completed: '7', status : 'Canceled'  },
    { id: 3, tripid: 'Jhon Mickel', truckno: 'jhonmickel@gmail.com',  pending: 2, canceled: 5, completed: 7, status : ''   },
    { id: 4, tripid: 'Jhon Mickel', truckno: 'jhonmickel@gmail.com',  pending: 1, canceled: 2, completed: 3, status : ''   },
    { id: 5, tripid: 'jhonsmithl', truckno: 'jhonsmith@gmail.com',  pending: 1, canceled: 2, completed: 3, status : ''   },
    { id: 6, tripid: 'Jhon Mickel', truckno: 'jhonmickel@gmail.com',  pending: 5, canceled: 2, completed: 7 , status : ''  },
    { id: 7, tripid: 'Jhon Mickel', truckno: 'jhonmickel@gmail.com',  pending: 1, canceled: 2, completed: 3 , status : ''  },
    { id: 8, tripid: 'jhonsmithl', truckno: 'jhonsmith@gmail.com',  pending: 4, canceled: 2, completed: 6 , status : ''  },
];
// const statusAction = () => {
//     const [count, setCount] = React.useState(0);
  
//     return (
//       <Button onClick={() => setCount((prev) => prev + 1)}>{count} click(s)</Button>
//     );
// };

function Index() {
    const [open, setOpen] = React.useState(false);
    const [vehicleType, setVehicleType] = React.useState('');
    const [driver, setDriver] = React.useState('');
    const [loadman, setLoadman] = React.useState('');
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();
    const [layout, setLayout] = React.useState('list');

    const handleAlignment = (event, newAlignment) => {
        setLayout(newAlignment);
        console.log(newAlignment)
    };

    return (
        <>
            <Grid container>
                <Grid md={6}>
                    <h3 className='title'>Delivery Planing</h3>
                </Grid>
                <Grid md={6}>
                    <ToggleButtonGroup className='grid_butons'
                        value={layout}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                        sx={{ justifyContent: 'end', textAlign: 'right', width: '100%', marginBottom: 2 }}
                    >
                        <ToggleButton value="list" aria-label="left aligned">
                            <DnsIcon />
                        </ToggleButton>
                        <ToggleButton value="grid" aria-label="centered">
                            <AutoAwesomeMosaicIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>





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
                            <Button onClick={handleClose} className='btn cancel_btn'>Cancel</Button>
                            <Button className='btn submit_btn'>Submit</Button>
                        </Box>
                    </Box>
                </Modal>
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

                        <Fab color="primary" aria-label="add" onClick={handleOpen} className='fab_button right bottom'>
                            <Add />
                        </Fab>
                    </>
                )}
            </Box>


            {layout == 'list' && (
                <div className='mainwrapper'>

                    <Grid container sx={{ mb: 3 }}>
                        <Grid item md={6}>
                            Delivery List
                        </Grid>
                        <Grid item md={6} style={{ textAlign: 'right ' }}>
                            <Button variant="outlined" onClick={handleOpen} className='add_btn'>Create Delivery</Button>
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
                </div>
             )}
        </>
    )
}

export default Index
