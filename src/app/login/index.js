import { Alert, Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, Form, useRouteError, useActionData } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import axios from 'axios';
import Network from '../service/network';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function Index() {

    const errors = useActionData();

    const [showPassword, setShowPassword] = useState(false);

    console.log(errors);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div className='login_page'>
            <Box className='login_wrap'>
                <Grid container >
                    <Grid item md={6} className="login_left">
                        <img src={require('../../assets/sales_img.png')} width="100%" />
                    </Grid>
                    <Grid item md={6} className="login_right">
                        {errors?.message && <Alert severity='error' style={{ textTransform : 'lowercase' }}> {errors?.message}</Alert>}
                        <Box sx={{ mb: 2 }}>
                            <h2 component={'span'} style={{ marginBottom: 5 }}>Sign In to TSD </h2>
                            <small style={{ marginTop: 0, marginBottom: 30 }}>Please login with your Username and Password</small>
                        </Box>
                        <Form method='POST' >
                            <Box>
                                <Box>Email </Box>
                                <input style={{ borderColor : errors?.message ? '#f14d4d' : '' }} type={'text'} name="email" className='form-control' defaultValue={'mohan@gmail.com'} />
                            </Box>
                            <Box>
                                <Box>Password </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                    <input  style={{ borderColor : errors?.message ? '#f14d4d' : '' }} type={showPassword ? 'text' : 'password'} name="password" className='form-control' defaultValue={'1132323'} />
                                    <IconButton
                                        sx={{ position: 'absolute', right: 5, top: 10, color : '#25476a' }}
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        size="small"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </Box>
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


