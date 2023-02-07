import axios from "axios";

const _companyCreate = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/subsidiary`,data)
}

const _getCompany = async ({
  page,
  pageSize
}) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/subsidiary?page=${page}&pageSize=${pageSize}`)
}

export const Services =  {
    companyCreate : _companyCreate,
    companyList : _getCompany
}