import axios from "axios";

const _companyCreate = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/subsidiary`,data)
}

export const Services =  {
    companyCreate : _companyCreate
}