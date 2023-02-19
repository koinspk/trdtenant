import React from 'react'
import { Box } from '@mui/material'



function NoData() {
    return (
        <Box className='nodata_comp'>
          <img src={require('../../assets/nodata.png')} />

          <Box sx={{ textAlign : 'center', marginTop : -3, color : '#27496b' }}>
            <h2 style={{ margin: 0 }} >No Results Found</h2>
          </Box>
        </Box> 
    )
}

export default NoData
