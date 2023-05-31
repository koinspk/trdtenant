import React from 'react';
import { Button, Box, } from '@mui/material'
import { Form, useActionData, useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Grid } from '@mui/material';

function CompanyEdit() {
    const loaderData = useLoaderData(); 
    console.log(loaderData);
    return (
        <div className='mainwrapper'>
            <Box className="title_page" sx={{ mb: 2 }}>Update Company</Box>
            <Form method='post' enctype="multipart/form-data">
                <Grid container spacing={2}>
                    <Grid item md={6} sm={12}>
                        <input type={'text'}  defaultValue={loaderData?.subsidiarycompany} placeholder="Company Name" name='subsidiarycompany' className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.contactno} placeholder="Contact No" name="contactno" className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.emailid} placeholder="Email ID" name="emailid" className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.address} placeholder="Address" name="address" className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.street} placeholder="Street" name="street" className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.status} placeholder="Status" className='form-control' />
                    </Grid>
                    <Grid item md={12} sm={12}>
                        <input type="file" name="logo"></input>
                    </Grid>
                </Grid>
                <Box className='modalaction'>
                    {/* <Button onClick={handleChangeForm} className='btn cancel_btn'>Cancel</Button> */}
                    <Button className='btn submit_btn' type="submit">Submit</Button>
                </Box>
            </Form>
        </div>
    )
}

export default CompanyEdit
