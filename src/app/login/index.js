import { Button, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, Form, useRouteError } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios';


export default function Index() {
    const navigate = useNavigate();
    let error = useRouteError();
  console.error(error);

    const [companyList, setCompanyList] = React.useState([]);

    const submitLogin = async (values) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}//login`, values)
    }


    return (
        <div className='login_page'>
            <Box className='login_wrap'>
                <Grid container>
                    <Grid item md={6} className="login_left">
                        <img src={require('../../assets/sales_img.png')} width="100%" />
                    </Grid>
                    <Grid item md={6} className="login_right">
                        <h1>Login</h1>
                        <Form method='post' action='/login' >
                            <Box>
                                <Box>Email </Box>
                                <input type={'text'} value="test@gmail.com" className='form-control' />
                            </Box>
                            <Box>
                                <Box>Password </Box>
                                <input type={'password'} value="test@gmail.com" className='form-control' />
                            </Box>
                            <Box>
                                <button type='submit' className='btn login_btn' variant='contained' fullWidth >Login</button>
                            </Box>
                        </Form>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
