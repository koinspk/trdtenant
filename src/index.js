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

const router = createBrowserRouter(
  createRoutesFromElements(
    
    <>
      <Route path="/" element={<DashboardContent />} >
        <Route path="/">
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/company">
          <Route path="" element={<Company />} />
          <Route path="add" element={<CompanyForm />} />
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

      <Route path="/login">
        <Route path="" element={<Login />} 
        errorElement={<Login />}

        action={async ({ request, params }) => {
          switch (request.method) {
            case "post": {
              let formData = await request.formData();
              // let name = formData.get("projectName");
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
