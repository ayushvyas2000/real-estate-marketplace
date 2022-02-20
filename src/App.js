import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';
function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route path='/' element={<Explore/>} />
      <Route path='/category/:categoryName' element={<Category/>} />
      <Route path='/offers' element={<Offers/>} />
      <Route path='/profile' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile />} />
      </ Route>
      <Route path='/sign-in' element={<Signin/>} />
      <Route path='/sign-up' element={<Signup/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/category/:categoryName/:listingID'
      element={<Listing />} />
      <Route path='/create-listing' element={<CreateListing />} />
      <Route path='/contact/:landlordID'element={<Contact />} />
      <Route path='/edit-listing/:listingID' element={<EditListing />} />
    </Routes>
    <Navbar />
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
