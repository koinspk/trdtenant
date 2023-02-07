import React, { useEffect, useState } from 'react'
import ExpandableRowTable from './gridTable';
import { Button, Grid, Modal, Backdrop, Box, Alert, Table, TableBody, TableContainer, TablePagination, Chip, Pagination } from '@mui/material'
import { Form, useActionData } from 'react-router-dom';
import { Services } from '../service/services';
import { Menu,MenuItem,Checkbox, TableRow, TableCell, TableHead, TableSortLabe, TablePaginationl, Snackbar, IconButton } from '@mui/material';
import Scrollbar from '../components/scrollbar';
import UserListToolbar from '../components/user/userList';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TablePaginationFeild from '../components/tablePagination';



export default function Index() {

  const actiondata = useActionData();

  const [companyForm, setCompanyForm] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [actionMenu, setActionMenu] = useState(false);

  const [pagination, setPagination] = useState({
    rowsPerPage: 5,
    page: 1,
    count : 1,
  });


  const handleSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  const changeActionMenu = () => {
    setActionMenu(!actionMenu);
  };
  const handleChangeForm = () => {
    setCompanyForm(!companyForm);
  };
  useEffect(() => {
    console.log(actiondata);
    if (actiondata?.status == 201) {
      handleChangeForm(false);
    }
  }, [actiondata])

  useEffect(() => {
    getCompany();
  }, [pagination?.page])


  const getCompany = async () => {
    let listData = await Services.companyList({
      page: pagination?.page,
      pageSize: pagination?.rowsPerPage
    });
    setCompanyList(listData?.data?.items)
    console.log(listData);
    setPagination({
      ...pagination,
      rowsPerPage : listData?.data?.pageSize,
      count : listData?.data?.total,
    })
  }
  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
  };

  const changeEvent = (page) => {
    setPagination({
      ...pagination,
      page: page
    })
  }
  const handleChangeRowsPerPage = (event) => {
    setPagination({
      ...pagination,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    })
  };


  return (
    <div className='mainwrapper'>
      <Grid container >
        <Grid item md={6}>
          Company List
        </Grid>
        <Grid item md={6} style={{ textAlign: 'right ' }}>
          <Button onClick={handleChangeForm} variant="outlined" className='add_btn'>Add Company</Button>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%' }}>
        {/* <ExpandableRowTable /> */}

        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#F4F6F8', borderRadius: 5 }}>
              <TableCell sx={{ width: 50 }}> Sno </TableCell>
              <TableCell> Name </TableCell>
              <TableCell> Contact No </TableCell>
              <TableCell> Email </TableCell>
              <TableCell> Address </TableCell>
              <TableCell> Status </TableCell>
              <TableCell>  </TableCell>
            </TableHead>

            <TableBody>
              {companyList && companyList.slice(pagination.page * pagination.rowsPerPage, pagination.page * pagination.rowsPerPage + pagination.rowsPerPage).map((list, i) => (
                <TableRow>
                  <TableCell>{i+1 }</TableCell>
                  <TableCell sx={{ alignItems: 'center', display: 'flex' }}><img src={require('../../assets/users/user.png')} style={{ width: 30, height: 30, marginRight: 10 }} />{list?.subsidiarycompany}</TableCell>
                  <TableCell>{list?.contactno}</TableCell>
                  <TableCell>{list?.emailid}</TableCell>
                  <TableCell sx={{ alignItems: 'center', display: 'flex' }}> <PlaceOutlinedIcon sx={{ opacity: .3 }} />{list?.street}, {list?.street}</TableCell>
                  <TableCell>
                    <Chip label={list?.status} size="small" variant="outlined" color="error" />
                  </TableCell>
                  <TableCell>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>



        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ pagination.count }
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={(e, page) => setPagination({ ...pagination, page: page })}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        {pagination.rowsPerPage}
        <TablePaginationFeild
          rowsPerPageOptions={[5,10, 20]}
          count={ pagination.count }
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          changeEvent={changeEvent}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Box>
          {/* <Button >Open Child Modal</Button> */}
          <Modal
            open={companyForm}
            onClose={handleChangeForm}
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
                  <Button onClick={handleChangeForm} className='btn cancel_btn'>Cancel</Button>
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
