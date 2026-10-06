import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

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
import EditProfile from '../pages/profile/EditProfile';
import AddressBook from '../pages/profile/AddressBook';
import GlowRewards from '../pages/rewards/GlowRewards';
import Subscriptions from '../pages/profile/Subscriptions';
import OrderDetail from '../pages/orders/orderDetail';
import SkincareGuide from '../pages/support/SkincareGuide';
import NotFound from '../pages/error/NotFound';

//Admin Pages
import DashboardPage from '../pages/admin/AdminDashboard';
import OrdersPage from '../pages/admin/OrdersPage';
import AdminProductsPage from '../pages/admin/ProductsPage';
import AdminSubscriptionsPage from '../pages/admin/SubscriptionsPage';
import AdminCustomersPage from '../pages/admin/CustomersPage';
import AdminCategoriesPage from '../pages/admin/CategoriesPage';
import AdminReviewsPage from '../pages/admin/ReviewsPage';
import AdminInventoryPage from '../pages/admin/InventoryPage';


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
                path: "account/profile",
                element: <EditProfile />,
            },
            {
                path: "account/address",
                element: <AddressBook />,
            },
            {
                path: "account/subscriptions",
                element: <Subscriptions />,
            },
            {
                path: "account/orders/:id",
                element: <OrderDetail />,
            },
            {
                path: "wishlist",
                element: <Wishlist />,
            },
            {
                path: "quiz",
                element: <SkinQuiz />,
            },
            {
                path: "rewards",
                element: <GlowRewards />,
            },
            {
                path: "support/guide",
                element: <SkincareGuide />
            },
            {
                path: "*",
                element: <NotFound />,
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
    },

    // ADMIN CONTROL
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="dashboard" replace />
            },
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
            {
                path: "orders",
                element: <OrdersPage />,
            },
            {
                path: "products",
                element: <AdminProductsPage />,
            },
            {
                path: "subscriptions",
                element: <AdminSubscriptionsPage />,
            },
            {
                path: "customers",
                element: <AdminCustomersPage />,
            },
            {
                path: "categories",
                element: <AdminCategoriesPage />,
            },
            {
                path: "reviews",
                element: <AdminReviewsPage />,
            },
            {
                path: "inventory",
                element: <AdminInventoryPage />,
            },
        ]
    }
]);