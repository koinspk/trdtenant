import axios from "axios";
import { redirect } from "react-router-dom";
import { Services } from "../service/services"

const create = async ({ request, params }) => {

        switch (request.method) {
          case "POST": {
            let formData = await request.formData();
            try {
               await Services.companyCreate(formData)
            //    return redirect('/')
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