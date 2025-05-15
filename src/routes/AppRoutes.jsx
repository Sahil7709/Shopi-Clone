import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from '../pages/Home';
import Category from '../pages/Category';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';
import MyOrders from '../pages/MyOrders';
import MyAccount from '../pages/MyAccount';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Navigate to="/category/all" replace/>}/>
            
            <Route path="/category/:categoryName" element={<Category/>}/>
            <Route path="/product/:id" element={<ProductDetails/>}/>

            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>

            <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
            <Route path="/my-orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>}/>
            <Route path="/my-account" element={<ProtectedRoute><MyAccount/></ProtectedRoute>}/>

            <Route path="*" element={<NotFound/>}/>


        </Routes>
    </>
  )
}

export default AppRoutes
