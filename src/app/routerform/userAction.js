import axios from "axios";
import { redirect } from "react-router-dom";
import { Services } from "../service/services"

const create = async ({ request, params }) => {

  switch (request.method) {
    case "POST": {
      let formData = await request.formData();
      var object = {};
      formData.forEach((value, key) => object[key] = value); 
      try {
        let data = await Services.userCreate(object);
        let pstatus = data?.status || [];
        console.log(data);
        if (pstatus == 200) {
          let obj = {
            status: pstatus,
          }
          return obj
        }
        return redirect('/users?success=1')
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


const getUserId = async ({ request, params : { id} }) => {
  try {
    let data =  await Services.getUserId({id : id});
    let pstatus = data?.status || [];
    let obj = {
      data : data?.data
    }
   return data?.data
 } catch (error) {
   console.log(error);
   let obj = {
     status : error.response?.status,
     message : error?.response?.data?.message
   }
   return obj
 }
}

const _update = async ({ request, params: { id } }) => {
  let formData = await request.formData();
  console.log(formData);
  var object = formData;
  try {

    let data = await Services.updateUser(id, object);
    let pstatus = data?.status || [];
    console.log(data?.data);
    let obj = {
      data: data?.data
    }
    return redirect('/users?success=1')

  } catch (error) {
    console.log(error);
    let obj = {
      status: error.response?.status,
      message: error?.response?.data?.message
    }
    return obj
  }
}

const designationActionForm = {
  createAction: create,
  getUserId: getUserId,
  updateUser: _update
}

export default designationActionForm