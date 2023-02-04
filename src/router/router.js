import React from "react";
import { Route } from 'react-router-dom';
import Login from '../app/login'

export default [ <Route path="/login">
<Route path="" element={<Login />} 
action={async ({ request, params }) => {
  switch (request.method) {
    case "POST": {
      let formData = await request.formData();
      let name = formData.get("projectName");
      console.log(formData);
      return true;
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}}
/>
</Route>
 ]