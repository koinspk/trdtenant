import React, { useContext, useEffect, useState } from 'react'
import ExpandableRowTable from './gridTable';
import { Button, Grid, Modal, Backdrop, Box, Alert, Table, TableBody, TableContainer, TablePagination, Chip, Pagination } from '@mui/material'
import { Form, useActionData, useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Services } from '../service/services';
import { Menu, MenuItem, Checkbox, TableRow, TableCell, TableHead, TableSortLabe, TablePaginationl, Snackbar, IconButton } from '@mui/material';
import Scrollbar from '../components/scrollbar';
import UserListToolbar from '../components/user/userList';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TablePaginationFeild from '../components/tablePagination';
import MoreActionMenu from '../components/moreAction';
import NoData from '../components/noData'; 
import SnackbarContext from '../context/snackbar';

export default function Index() {

  const actiondata = useActionData();
  const loaderData = useRouteLoaderData('root');
  const navigate = useNavigate();

  const { contextValue, updateSnackbar } = useContext(SnackbarContext)

  const [companyForm, setCompanyForm] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [filterName, setFilterName] = useState('');

  const location = useLocation();
  const [snackOpen, setSnackOpen] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const successMessage = queryParams.get('success') === '1' ? 'Company Updated Successfully' : false;

  useEffect(()=>{
    setSnackOpen(successMessage ? true : false);
  },[successMessage])
  const [pagination, setPagination] = useState({
    rowsPerPage: 5,
    page: 0,
    count: 1,
  });


  const handleSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false)
  };

  const handleChangeForm = () => {
    setCompanyForm(!companyForm);
  };
  useEffect(() => {
    if(actiondata?.status){
      handleChangeForm()
      updateSnackbar({
        ...contextValue,
        open : true,
        message : 'New Sub Company has been Created!'
      });
    }
    if(successMessage){
      updateSnackbar({
        ...contextValue,
        open : true,
        message : successMessage
      });
    }

  }, [actiondata, successMessage])

  // useEffect(() => {
  //   handleChangeForm()
  // }, [loaderData?._id])

  useEffect(() => {
    getCompany();
  }, [pagination?.page, pagination?.rowsPerPage])


  const getCompany = async () => {
    let listData = await Services.companyList({
      page: pagination?.page + 1,
      pageSize: pagination?.rowsPerPage
    });
    setCompanyList(listData?.data?.items)
    console.log(listData);
    setPagination({
      ...pagination,
      count: listData?.data?.total,
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

  const removeCompany = async (companyId) => {
    let delRes = await Services.deleteCompany({
      id : companyId
    });

    console.log(delRes);
  }



  return (
    <div className='mainwrapper'>
      <Grid container sx={{ mb: 3 }} alignItems="center">
        <Grid item md={6}>
          <Box className="title_page">Companies List</Box>
        </Grid>
        <Grid item md={6} style={{ textAlign: 'right ' }}>
          <Button onClick={() => {
            navigate('/company')
            handleChangeForm();
          }} variant="outlined" className='add_btn'>Add Company</Button>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%' }}>
        {/* <Snackbar
          open={snackOpen}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          autoHideDuration={3000}
          onClose={handleSnackbar}
          message="Subsidiary Company Created"
          key={"top" + "right"}
        >
          <Alert onClose={handleSnackbar} severity="success" sx={{ width: '100%' }}>
            {contextValue?.message}
          </Alert>
        </Snackbar> */}

        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#F4F6F8', borderRadius: 5, }}>
              <TableCell sx={{ width: 50 }}> Sno </TableCell>
              <TableCell> Name </TableCell>
              <TableCell> Contact No </TableCell>
              <TableCell> Email </TableCell>
              <TableCell> Address </TableCell>
              <TableCell> Status </TableCell>
              <TableCell>  </TableCell>
            </TableHead>

            <TableBody   >
              {companyList.length > 0 && companyList.map((list, i) => (
                <TableRow sx={{ '& td': { paddingY: 2, border: 0 }, '&:hover': { backgroundColor: '#F4F6F8' } }} >
                  <TableCell>{i + 1}</TableCell>
                  <TableCell sx={{ alignItems: 'center', display: 'flex' }}><img src={require('../../assets/users/user.png')} style={{ width: 30, height: 30, marginRight: 10 }} />{list?.subsidiarycompany}</TableCell>
                  <TableCell>{list?.contactno}</TableCell>
                  <TableCell>{list?.emailid}</TableCell>
                  <TableCell sx={{ alignItems: 'center', display: 'flex' }}> <PlaceOutlinedIcon sx={{ opacity: .3 }} />{list?.street}, {list?.address}</TableCell>
                  <TableCell>
                    <Chip label={list?.status} size="small" variant="outlined" color="error" />
                  </TableCell>
                  <TableCell>
                    <MoreActionMenu editRowId={list?._id} openModal={handleChangeForm} onDelete={()=> removeCompany(list?._id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {companyList.length <= 0 && (
          <NoData />
        )}

        {companyList.length > 0 &&
          <TablePaginationFeild
            rowsPerPageOptions={[5, 10, 20]}
            count={pagination.count}
            rowsPerPage={pagination.rowsPerPage}
            page={pagination.page}
            changeEvent={changeEvent}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        }

        <Box>
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
    </div>
  )
}
