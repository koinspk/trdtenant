import { Box, Grid } from '@mui/material'
import React from 'react'
import StoreIcon from '@mui/icons-material/StoreOutlined';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttleOutlined';
import Inventory2Icon from '@mui/icons-material/Inventory2Outlined';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import RevenueChart from './revenueChart';

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels : false
        },
    },
};

//   import faker from 'faker';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [0, 1, 2, 3, 4, 5],
            backgroundColor: 'rgb(236 166 65)',
        },
    ],
};


function Index() {
    return (
        <Box className="dashboard dashboard_card" >
            <Grid container spacing={4}>
                <Grid item md="3">
                    <Box className="card">
                        <Box className="card-content">
                            <StoreIcon className='icon' />
                            <Box className="count">100</Box>
                            <Box className='title'>Sub Companies</Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md="3">
                    <Box className="card">
                        <Box className="card-content">
                            <PeopleIcon className='icon' />
                            <Box className="count">200</Box>
                            <Box className='title'>Users</Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md="3">
                    <Box className="card">
                        <Box className="card-content">
                            <AirportShuttleIcon className='icon' />
                            <Box className="count">130</Box>
                            <Box className='title'>Total Trucks</Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item md="3">
                    <Box className="card">
                        <Box className="card-content">
                            <Inventory2Icon className='icon' />
                            <Box className="count">170</Box>
                            <Box className='title'>Total Delivery</Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ mt: 4 }} className="divider" />
            <Grid container spacing={4} >
                <Grid item md="6">
                    <Box className="card">
                        <Box className="card-content">
                            <Box className='box_title'>Delivery Summary</Box>
                            <Bar options={options} data={data} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item md="6 ">
                    <Box className="card">
                        <Box className="card-content">
                            <Box className='box_title'>Revenue</Box>
                            <RevenueChart />
                        </Box>
                    </Box>
                </Grid>
            </Grid>


        </Box>
    )
}

export default Index
