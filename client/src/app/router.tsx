import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/home/Home';
import ShopCategory from '../pages/shop/shopCategory';
import ProductDetail from '../pages/shop/ProductDetail';
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/checkout/Checkout';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import AccountDashboard from '../pages/profile/AccountDashboard';
import Wishlist from '../pages/wishlist/Wishlist';
import OrderHistory from '../pages/orders/OrderHistory';
import SkinQuiz from '../pages/quiz/SkinQuiz';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "shop",
                element: <ShopCategory />,
            },
            {
                path: "shop/vitamin-c-glow-serum",
                element: <ProductDetail />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "checkout",
                element: <Checkout />,
            },
            {
                path: "account/order-history",
                element: <OrderHistory />,
            },
            {
                path: "account",
                element: <AccountDashboard />,
            },
            {
                path: "wishlist",
                element: <Wishlist />,
            },
            {
                path: "quiz",
                element: <SkinQuiz />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    }
]);