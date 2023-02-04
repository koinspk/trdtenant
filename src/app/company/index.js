import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import ExpandableRowTable from './gridTable';
import { Button, Grid, Modal, Backdrop, Box } from '@mui/material'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export default function Index() {
  const [open, setOpen] = React.useState(false);
  // const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const [companyList, setCompanyList] = React.useState([]);


  return (
    <div className='mainwrapper'>
      <Grid container >
        <Grid item md={6}>
          Company List
        </Grid>
        <Grid item md={6} style={{ textAlign: 'right ' }}>
          <Button onClick={handleOpen} variant="outlined" className='add_btn'>Add Company</Button>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%' }}>


        <ExpandableRowTable />


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
              <h2>Add Company</h2>
              <Box style={{ height: 300, overflow: 'scroll' }}>
                <input type={'text'} placeholder="Company Name" className='form-control' />
                <input type={'text'} placeholder="Contact No" className='form-control' />
                <input type={'text'} placeholder="Email ID" className='form-control' />
                {/* <input type={'text'} placeholder="DB Name" className='form-control' /> */}
                <input type={'text'} placeholder="Status" className='form-control' />
              </Box>
              <Box className='modalaction'>
                <Button onClick={handleClose} className='btn cancel_btn'>Cancel</Button>
                <Button className='btn submit_btn'>Submit</Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
      {/* <div className='nodata_comp'>
        <img src={require('../../assets/nodata.png')} />
      </div> */}
    </div>
  )
}
