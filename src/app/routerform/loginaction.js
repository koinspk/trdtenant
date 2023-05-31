import axios from "axios";
import { redirect } from "react-router-dom";
import { loginService } from "../service/loginService"

const login = async ({ request, params }) => {

  return redirect('/')
  switch (request.method) {
    case "POST": {
      let formData = await request.formData();
      var object = {};
      formData.forEach((value, key) => object[key] = value);
      try {
        let data = await loginService.login(object)
        let resdata = data?.data?.message || []
        localStorage.setItem("tsdtenant", JSON.stringify(resdata))
        localStorage.setItem("tsdrftoken", resdata.refreshToken)

        return redirect('/')
      } catch (error) {
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

const loginActionForm = {
  loginAction: login
}

export default loginActionForm