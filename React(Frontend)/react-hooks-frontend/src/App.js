import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';   //The switch has been replaced with routes 
import ListCustomerComponent from './components/ListCustomerComponent';
import AddCustomerComponent from './components/AddCustomerComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListUserComponent from './components/ListUserComponent';
import WelcomeComponent from './components/WelcomeComponent';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import UserProfileComponent from './components/UserProfileComponent'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateCustomerComponent from './components/UpdateCustomerComponent';




function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className= "container">
          <Routes>
              <Route exact path = "/" element = {<WelcomeComponent/>}></Route>
              <Route path="/signup" element = {<SignUpComponent/>}></Route>
              <Route path="/login" element = {<LoginComponent/>}></Route>
              <Route path = "/customers" element = {<ListCustomerComponent/>}></Route>
              <Route path = "/add-customer" element = {<AddCustomerComponent/>} ></Route>
              <Route path="/customers/:id" element={<UpdateCustomerComponent />} />
              <Route path="/list-users" element={<ListUserComponent />} ></Route> 
              <Route path="/user-profile" element={<UserProfileComponent />}></Route>
            </Routes>
        </div>
        <FooterComponent />
        </Router>
    </div>
  );
}

export default App;
