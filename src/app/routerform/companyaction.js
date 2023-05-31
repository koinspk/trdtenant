import axios from "axios";
import { Navigate, redirect } from "react-router-dom";
import { Services } from "../service/services"

const create = async ({ request, params  }) => {
  console.log(request.method);
  switch (request.method) {
    case "POST": {
      let formData = await request.formData();
      try {
        let data = await Services.companyCreate(formData);
        let pstatus = data?.status || [];
        console.log(data);
        if (pstatus == 200) {
          let obj = {
            status: pstatus,
          }
          return obj
        }
        return redirect('/company')
      } catch (error) {
        console.log(error);
        let obj = {
          status: error.response?.status,
          message: error?.response?.data?.message
        }
        return obj
      }
    }

    default: {
      throw new Response("", { status: 405 });
    }
  }
}


const getCompanyId = async ({ request, params: { id } }) => {
  try {
    let data = await Services.getCompanyId({ id: id });
    let pstatus = data?.status || [];
    console.log(data?.data);
    let obj = {
      data: data?.data
    }
    return data?.data

  } catch (error) {
    console.log(error);
    let obj = {
      status: error.response?.status,
      message: error?.response?.data?.message
    }
    return obj
  }
}

const _update = async ({ request, params: { id } }) => {
  let formData = await request.formData();
  try {
    let data = await Services.updateCompany(id, formData);
    let pstatus = data?.status || [];
    console.log(data);
    let obj = {
      data: data?.data,
      status : pstatus,
    }
    // return obj
    return redirect('/company?success=1')

  } catch (error) {
    console.log(error);
    let obj = {
      status: error.response?.status,
      message: error?.response?.data?.message
    }
    return obj
  }
}

const companyActionForm = {
  createAction: create,
  getCompanyId: getCompanyId,
  update: _update
}

export default companyActionForm