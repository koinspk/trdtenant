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
        let data = await Services.designationCreate(object);
        let pstatus = data?.status || [];
        console.log(data);
        if (pstatus == 200) {
          let obj = {
            status: pstatus,
          }
          return obj
        }
        return redirect('/designation')
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


const getDesigId = async ({ request, params : { id} }) => {
  try {
    let data =  await Services.getDesignationId({id : id});
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

const userActionForm = {
  createAction: create,
  getDesignationId : getDesigId
}

export default userActionForm