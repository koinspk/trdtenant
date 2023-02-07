import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  redirect
} from "react-router-dom";
import DashboardContent from "./app/shared/theme"
import Company from "./app/company"
import Login from "./app/login"
import CompanyForm from './app/company/companyForm';
import Users from './app/users';
import Truck from './app/truck';
import Dashboard from './app/dashboard';
import Roles from './app/setings/roles';
import Delivery from './app/deliveryplaning';
import loginActionForm from "./app/routerform/loginaction"
import companyActionForm from "./app/routerform/companyaction"
import axios from 'axios';


// // For GET requests
axios.interceptors.request.use(
  (req) => {
    let _localStorage = localStorage.getItem("tsdrftoken")
    if (_localStorage) {
      req.headers.authorization = `Bearer ${_localStorage}`
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
    // Add configurations here
    if (res.status === 200) {
      localStorage.setItem("tsdrftoken", JSON.stringify(res?.headers?.rftoken))
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);



const router = createBrowserRouter(
  createRoutesFromElements(

    <>
      <Route>
        <Route path="/login"
          element={<Login />}
          action={loginActionForm.loginAction}
        />
        <Route path="/" element={<DashboardContent />} >
          <Route path="" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/company" action={companyActionForm.createAction}>
            <Route path="" element={<Company />} />
          </Route>

          <Route path="/users">
            <Route path="" element={<Users />} />
          </Route>
          <Route path="/truck">
            <Route path="" element={<Truck />} />
          </Route>

          <Route path="/setings">
            <Route path="roles" element={<Roles />} />
          </Route>

          <Route path="/setings">
            <Route path="roles" element={<Roles />} />
          </Route>

          <Route path="/deliveryplaning">
            <Route path="" element={<Delivery />} />
          </Route>

        </Route>


      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render( 
//   <BrowserRouter>
//       <App />
//   </BrowserRouter>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
