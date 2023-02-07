import './App.css';
import { Route, Routes , useNavigate , redirect} from "react-router-dom"
import DashboardContent from "./app/shared/theme"
import Company from "./app/company"
import Login from "./app/login"
import CompanyForm from './app/company/companyForm';
import Users from './app/users';
import Truck from './app/truck';
import Dashboard from './app/dashboard';
import Roles from './app/setings/roles';
import Delivery from './app/deliveryplaning';

import { loginService } from "./app/service/loginService"

function App() {
  return (
    // <>

      <Route >
        <Route path="/login" element={<Login />} 
        
        action={async ({ request, params }) => {
          switch (request.method) {
            case "post": {
              let formData = await request.formData();
              await loginService(formData)
              return true
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
