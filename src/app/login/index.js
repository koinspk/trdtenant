import { Button, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, Form, useRouteError, useActionData } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import Network from '../service/network';


export default function Index() {

    const errors = useActionData();


    console.log(errors);



    return (
        <div className='login_page'>
            <Box className='login_wrap'>
                <Grid container alignItems={'center'}>
                    <Grid item md={6} className="login_left">
                        <img src={require('../../assets/sales_img.png')} width="100%" />
                    </Grid>
                    <Grid item md={6} className="login_right">
                            <Box sx={{ mb: 2 }}>
                                <h2 component={'span'} style={{ marginBottom: 5 }}>Sign In to TSD </h2>
                                <small style={{ marginTop: 0, marginBottom: 30 }}>Please login with your Username and Password</small>
                            </Box>
                        {errors?.message}
                        <Form method='post' >
                            <Box>
                                <Box>Email </Box>
                                <input type={'text'} name="email" className='form-control' />
                            </Box>
                            <Box>
                                <Box>Password </Box>
                                <input type={'password'} name="password" className='form-control' />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Button type='submit' className='btn login_btn' variant='contained' fullWidth >Login</Button>
                            </Box>
                        </Form>
                    </Grid>
                </Grid>
            </Box>

            <Network />
        </div>
    )
}


