import axios from "axios";

// company
const _companyCreate = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/subsidiary`,data)
}
const _getCompany = async ({
  page,
  pageSize
}) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/subsidiary?page=${page}&pageSize=${pageSize}`)
}
const _getCompanyId = async ({ id }) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/subsidiary/${id}`)
}
const _updateCompany = async (id, formdata) => {
  return await axios.put(`${process.env.REACT_APP_BASE_URL}/subsidiary/${id}`, formdata)
}
const _deleteCompany = async ({ id }) => {
  return await axios.delete(`${process.env.REACT_APP_BASE_URL}/subsidiary/${id}`)
}

// Dashboard
const _getDashboardData = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/subsidiarycount`)
}

// User
const _userCreate = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/user`,data)
}
const _getUser = async ({
  page,
  pageSize
}) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/user?page=${page}&pageSize=${pageSize}`)
}
const _getUserId = async ({ id }) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${id}`)
}
const _updateUser = async (id, formdata) => {
  return await axios.put(`${process.env.REACT_APP_BASE_URL}/user/${id}`, formdata)
}

// Designation
const _designationCreate = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/designation`,data)
}
const _getdesignation = async ({
  page,
  pageSize
}) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/designation?page=${page}&pageSize=${pageSize}`)
}
const _getDesignationId = async ({ id }) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/designation/${id}`)
}
const _updateDesignation = async (id, dat) => {
  return await axios.put(`${process.env.REACT_APP_BASE_URL}/designation/${id}`, dat)
}

// Roles
const _rolesCreate = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/role`,data)
}
const _getroles = async ({
  page,
  pageSize
}) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/role?page=${page}&pageSize=${pageSize}`)
}
const _getRoleId = async ({ id }) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/role/${id}`)
}

// Truck API
const _truckCreate = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/truck`,data)
}
const _getTrucks = async ({
  page,
  pageSize
}) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/truck?page=${page}&pageSize=${pageSize}`)
}
const _getTruckId = async ({ id }) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/truck/${id}`)
}




// get Local user
const _getLocalUser = async ({ setCurentUser }) => {
   let user =  localStorage.getItem('tsdtenant');
   user = JSON.parse(user)
   return user;
}



export const Services =  {
  getDashboard : _getDashboardData,
  companyCreate : _companyCreate,
  companyList : _getCompany,
  getCompanyId : _getCompanyId,
  updateCompany : _updateCompany,
  deleteCompany : _deleteCompany,

  userCreate : _userCreate,
  userList : _getUser,
  getUserId : _getUserId,
  getCurentUser : _getLocalUser,
  updateUser : _updateUser,

  designationCreate : _designationCreate,
  designationList : _getdesignation,
  getDesignationId : _getDesignationId,
  updateDesig : _updateDesignation, 

  rolesCreate : _rolesCreate,
  rolesList : _getroles,
  getRoleId : _getRoleId,

  createTruck : _truckCreate,
  getTruckList : _getTrucks,
}