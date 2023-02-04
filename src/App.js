import './App.css';
import { Route, Routes } from "react-router-dom"
import DashboardContent from "./app/shared/theme"
import Company from "./app/company"
import Login from "./app/login"
import CompanyForm from './app/company/companyForm';
import Users from './app/users';
import Truck from './app/truck';
import Dashboard from './app/dashboard';
import Roles from './app/setings/roles';
import Delivery from './app/deliveryplaning';

function App() {
  return (
    // <>

      <Route path="/login">
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
    // </>
  );
}

export default App;
