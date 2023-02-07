import axios from "axios";
import { redirect } from "react-router-dom";
import { Services } from "../service/services"

const create = async ({ request, params }) => {

        switch (request.method) {
          case "POST": {
            let formData = await request.formData();
            try {
               let data =  await Services.companyCreate(formData);
               let pstatus = data?.status || [];
               console.log(data);
              if(pstatus == 201){
                let obj = {
                  status : pstatus,
                }
                return obj
              }
               return redirect('/company')
            } catch (error) {
              console.log(error);
              let obj = {
                status : error.response?.status,
                message : error?.response?.data?.message
              }
              return obj
            }
          }
          default: {
            throw new Response("", { status: 405 });
          }
        }
}

const companyActionForm = {
  createAction : create
}

export default companyActionForm