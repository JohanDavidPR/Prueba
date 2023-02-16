import "./Styles/App.css";
import Routers from "./Routers";
import { BrowserRouter } from "react-router-dom";
/* State */
import UserState from "./Context/User/UserState";
import ClinicalState from "./Context/Clinical/ClinicalState";
import PetState from "./Context/Pet/PetState";

function App() {
  return (
    <div className="App">
      <UserState>
        <PetState>
          <ClinicalState>
            <BrowserRouter>
              <Routers />
            </BrowserRouter>
          </ClinicalState>
        </PetState>
      </UserState>
    </div>
  );
}

export default App;
