import React from 'react';
import { Button, Box, } from '@mui/material'
import { Form, useActionData, useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Grid } from '@mui/material';

function Edit() {
    const loaderData = useLoaderData();
    console.log(loaderData);
    return (
        <div className='mainwrapper'>
            <Box className="title_page" sx={{ mb: 2 }}>Update Users</Box>
            <Form method='post' >
                <Grid container spacing={2}>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.first_name} placeholder="Name" name='first_name' className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.mobile_number} placeholder="Contact No" name="mobile_number" className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.email} placeholder="Email ID" name="email" className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.employeeno} placeholder="Employee No" name="employeeno" className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'password'} defaultValue={loaderData?.password} placeholder="Employee No" name="password" className='form-control' />
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
