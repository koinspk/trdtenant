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
import CompanyEdit from "./app/company/edit"
import Login from "./app/login"
import CompanyForm from './app/company/companyForm';
import Users from './app/users';
import UsersEdit from "./app/users/edit"
import Truck from './app/truck';
import TruckEdit from "./app/truck/edit"
import Dashboard from './app/dashboard';
import Roles from './app/setings/roles';
import RolesEdit from './app/setings/roles/edit';
import RolesAndPermission from './app/setings/roles/assign';
import Designation from './app/setings/designation';
import Edit from './app/setings/designation/edit';
import Delivery from './app/deliveryplaning';
import loginActionForm from "./app/routerform/loginaction"
import companyActionForm from "./app/routerform/companyaction"
import userActionForm from "./app/routerform/userAction"
import roleActionForm from "./app/routerform/roleAction"
import designationActionForm from "./app/routerform/designationAction"
import truckActionForm from "./app/routerform/truckAction"
import Profile from './app/profile'
import axios from 'axios';


// // For GET requests
axios.interceptors.request.use(
  (req) => {
    let _localStorage = localStorage.getItem("tsdrftoken")
    console.log(_localStorage);
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

          <Route path="/" >
            <Route path='company' element={<Company />} action={companyActionForm.createAction} />
            <Route
              path="company/edit/:id"
              element={<CompanyEdit />}
              loader={companyActionForm.getCompanyId}
              action={companyActionForm.update}
            />
          </Route>

          <Route path="/" >
            <Route path="users" element={<Users />} action={userActionForm.createAction} />
            <Route path="users/edit/:id"
              id="user"
              element={<UsersEdit />}
              loader={userActionForm.getUserId}
              action={userActionForm.updateUser}
            />
          </Route>

          <Route path="/truck" >
            <Route index element={<Truck />}
              action={truckActionForm.createAction} />
            <Route path="edit/:id"
              id="truck"
              element={<TruckEdit />}
              loader={truckActionForm.getTruckId}
            />
          </Route>

          {/* <Route path="/setings">
            <Route path="roles" element={<Roles />} action={roleActionForm.createAction} >
              <Route path=":id"
                id="role"
                element={<Roles />}
                loader={roleActionForm.getRoleId}
              />
              <Route path="edit/:id"
              element={<RolesEdit />}
              // loader={roleActionForm.getDesignationId}
              // action={roleActionForm.updateDesignation}
            />
            </Route>
          </Route> */}
          <Route path="/setings">
            <Route path="roles" element={<Roles />} action={roleActionForm.createAction}>
              <Route path=":id" element={<Roles />} loader={roleActionForm.getRoleId} />
              <Route path="edit/:id" element={<RolesEdit />} />
            </Route>
            <Route path="roles-permission" element={<RolesAndPermission />} action={roleActionForm.createAction}>
              <Route path=":id" element={<Roles />} loader={roleActionForm.getRoleId} />
              <Route path="edit/:id" element={<RolesEdit />} />
            </Route>
          </Route>

          <Route path="/designation" >
            <Route index element={<Designation />} action={designationActionForm.createAction} />
            <Route path=":id"
              element={<Designation />}
              loader={designationActionForm.getDesignationId}
            />
            <Route path="edit/:id"
              element={<Edit />}
              loader={designationActionForm.getDesignationId}
              action={designationActionForm.updateDesignation}
            />
          </Route>

          <Route path="/deliveryplaning">
            <Route path="" element={<Delivery />} />
          </Route>

          <Route path="/profile">
            <Route path="" element={<Profile />} />
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
