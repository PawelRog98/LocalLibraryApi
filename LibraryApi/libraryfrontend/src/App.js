import { BrowserRouter as Router,Route, Routes }from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout';
import Home from './Components/Home';
import Login from './Components/Authorization/Login';
import Register from './Components/Authorization/Register';
import EditAccount from './Components/Authorization/EditAccount';
import AdminDashboard from './Components/Administrator/AdminDashboard';
import { Component } from 'react';
import ProtectedRoute from './ProtectedRoute';
import Categories from './Components/Category/Categories';
import EditCategory from './Components/Category/EditCategory';
import EditBook from './Components/Book/EditBook';
import Details from './Components/Book/Details';
import Cart from './Components/Cart/Cart';
import AllTransactions from './Components/Transactions/AllTransactions';
import TransactionDetails from './Components/Transactions/TransactionDetails';
import MyTransactions from './Components/Transactions/MyTransactions';
import ForgotPassword from './Components/Authorization/ForgotPassword';
import VerifyAccount from './Components/Authorization/VerifyAccount';
import ResetPassword from './Components/Authorization/ResetPassword';

function App(){
    return(
      <div className="App">
      <Layout>
          <Routes>
           <Route path='/' element={<Home/>}>Home</Route>
           <Route path='/Authorization/Login' element={<Login/>}>Login</Route>
           <Route path='/Authorization/Register' element={<Register/>}>Register</Route>
           <Route path='/Authorization/EditAccount' element={<EditAccount/>}>Edit</Route>
           <Route path='/Book/Details/:id' element={<Details/>}>Detail Book</Route>
           <Route element={<ProtectedRoute roles={["Administrator"]}/>}>
              <Route path='/Administrator/AdminDashboard' element={<AdminDashboard/>}>Admin</Route>
           </Route>
           <Route element={<ProtectedRoute roles={["Administrator","Employee"]}/>}>
              <Route path='/Category/Categories' element={<Categories/>}>Categories</Route>
           </Route>
           <Route element={<ProtectedRoute roles={["Administrator","Employee"]}/>}>
              <Route path='/Category/EditCategory/:id' element={<EditCategory/>}>Edit Category</Route>
           </Route>
           <Route element={<ProtectedRoute roles={["Administrator","Employee"]}/>}>
              <Route path='/Category/EditCategory' element={<EditCategory/>}>Create Category</Route>
           </Route>
           <Route element={<ProtectedRoute roles={["Administrator","Employee"]}/>}>
              <Route path='/Book/EditBook' element={<EditBook/>}>Create Book</Route>
           </Route>
           <Route element={<ProtectedRoute roles={["Administrator","Employee"]}/>}>
              <Route path='/Book/EditBook/:id' element={<EditBook/>}>Edit Book</Route>
           </Route>
           <Route element={<ProtectedRoute roles={["Administrator","Employee"]}/>}>
              <Route path='/Transactions/AllTransactions' element={<AllTransactions/>}>All transactions</Route>
           </Route>
           <Route element={<ProtectedRoute roles={["User","Administrator","Employee"]}/>}>
              <Route path='/Transactions/TransactionDetails' element={<TransactionDetails/>}>Transaction details</Route>
           </Route>
           <Route element={<ProtectedRoute roles={["User","Administrator","Employee"]}/>}>
              <Route path='/Transactions/MyTransactions' element={<MyTransactions/>}>My Transactions</Route>
           </Route>
           <Route path='/Cart/Cart' element={<Cart/>}>Cart</Route>
           <Route path='/Authorization/ForgotPassword' element={<ForgotPassword/>}>Forgot password</Route>
           <Route path='/Authorization/VerifyAccount' element={<VerifyAccount/>}>Verify account</Route>
           <Route path='/Authorization/ResetPassword' element={<ResetPassword/>}>Reset password</Route>
          </Routes>

      </Layout>
    </div>
    );
}
export default App;

