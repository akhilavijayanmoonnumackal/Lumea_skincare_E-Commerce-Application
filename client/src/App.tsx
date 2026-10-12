import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';

import React from 'react';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
// import { ProtectedRoute } from './components/ProtectedRoute';
// import Cart from './pages/cart/Cart';
// import Wishlist from './pages/wishlist/Wishlist';
// import OrdersPage from './pages/admin/OrdersPage';
// import Login from './pages/auth/Login';
// import Signup from './pages/auth/Signup';
// import ShopCategory from './pages/shop/ShopCategory';
// import Home from './pages/home/Home';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/store' element={<ShopCategory /> } />

          <Route element={<ProtectedRoute />} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/orders' element={<OrdersPage />} />

        </Routes>
      </BrowserRouter> */}
    </AuthProvider>
  )
}

export default App;
