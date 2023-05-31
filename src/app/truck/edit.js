import React from 'react';
import { Button, Box, } from '@mui/material'
import { Form, useActionData, useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Grid } from '@mui/material';

function Edit() {
    const loaderData = useLoaderData();
    return (
        <div className='mainwrapper'>
            <Box className="title_page" sx={{ mb: 2 }}>Update Users</Box>
            <Form method='post' enctype="multipart/form-data">
                <Grid container spacing={2}>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.vehicleNo} placeholder="Vehicle No" name='vehicleNo' className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.truckName} placeholder="Truck Name" name="truckName" className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.vehicleType} placeholder="Vehicle Type" name="vehicleType" className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.color} placeholder="Color" name="Color" className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.plateNo} placeholder="Plate No" name="plateNo" className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.madeBy} placeholder="Made By" name="madeBy" className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.model} placeholder="Model" name="model" className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.year} placeholder="Year" name="year" className='form-control' />
                    </Grid> 
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.driver} placeholder="Driver" name="driver" className='form-control' />
                    </Grid> 
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.expireDate} placeholder="Expire Date" name="expireDate" className='form-control' />
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

export default Edit
