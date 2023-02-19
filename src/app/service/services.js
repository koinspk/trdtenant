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
const _updateCompany = async ({ id }) => {
  return await axios.patch(`${process.env.REACT_APP_BASE_URL}/subsidiary/${id}`)
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

// get Local user
const _getLocalUser = async ({ setCurentUser }) => {
   let user =  localStorage.getItem('tsdtenant');
   user = JSON.parse(user)
   return user;
}



export const Services =  {
    companyCreate : _companyCreate,
    companyList : _getCompany,
    getCompanyId : _getCompanyId,
    updateCompany : _updateCompany,

    userCreate : _userCreate,
    userList : _getUser,
    getUserId : _getUserId,
    getCurentUser : _getLocalUser,

    designationCreate : _designationCreate,
    designationList : _getdesignation,
    getDesignationId : _getDesignationId,

    rolesCreate : _rolesCreate,
    rolesList : _getroles,
    getRoleId : _getRoleId,
}