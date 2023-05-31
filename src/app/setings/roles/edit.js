import React from 'react';
import { Button, Box, } from '@mui/material'
import { Form, useActionData, useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Grid } from '@mui/material';

function Edit() {
    const loaderData = useLoaderData();
    const actionData = useActionData();
    console.log(actionData);
    return (
        <div className='mainwrapper'>
            <Box className="title_page" sx={{ mb: 2 }}>Update Users</Box>
            <Form method='post' >
                <Grid container spacing={2}>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.designation} placeholder="Designation" name='designation' className='form-control' />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <input type={'text'} defaultValue={loaderData?.description} placeholder="Description" name="description" className='form-control' />
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
