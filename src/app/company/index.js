import React, { useEffect } from 'react'
import ExpandableRowTable from './gridTable';
import { Button, Grid, Modal, Backdrop, Box } from '@mui/material'
import { Form } from 'react-router-dom';


export default function Index() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };




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


        {/* <ExpandableRowTable /> */}


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
              <Form method='post' enctype="multipart/form-data">
              <Box style={{ height: 300, overflow: 'scroll' }}>
              
                <input type={'text'} placeholder="Company Name" name='subsidiarycompany' className='form-control' />
                <input type={'text'} placeholder="Contact No" name="contactno" className='form-control' />
                <input type={'text'} placeholder="Email ID" name="emailid" className='form-control' />
                <input type={'text'} placeholder="Address" name="address" className='form-control' />
                <input type={'text'} placeholder="Street" name="street" className='form-control' />
                {/* <input type={'text'} placeholder="DB Name" className='form-control' /> */}
                <input type={'text'} placeholder="Status" className='form-control' />
                <input type="file" name="logo"></input>
                
              </Box>
              <Box className='modalaction'>
                <Button onClick={handleClose} className='btn cancel_btn'>Cancel</Button>
                <Button className='btn submit_btn' type="submit">Submit</Button>
                
              </Box>
              </Form>
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
