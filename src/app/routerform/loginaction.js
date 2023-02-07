import axios from "axios";
import { redirect } from "react-router-dom";
import { loginService } from "../service/loginService"

const login = async ({ request, params }) => {

        switch (request.method) {
          case "POST": {
            let formData = await request.formData(); 
            try {
               let data = await loginService.login(formData)
               let resdata = data?.data?.message || []
              localStorage.setItem("tsdtenant",JSON.stringify(resdata))
              localStorage.setItem("tsdrftoken",resdata.refreshToken)

               return redirect('/')
            } catch (error) {
              console.log(error);
              let obj = {
                status : error.response?.status,
                message : error?.response?.data?.message
              }
              return redirect('/')
              return obj
            }
          }
          default: {
            throw new Response("", { status: 405 });
          }
        }
}

const loginActionForm = {
  loginAction : login
}

export default loginActionForm