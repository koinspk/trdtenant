import axios from "axios";

const login = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/login`,data)
}

export const loginService =  {
    login : login
}