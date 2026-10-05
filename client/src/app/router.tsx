import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/home/Home';
import ShopCategory from '../pages/shop/shopCategory';
import ProductDetail from '../pages/shop/ProductDetail';
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/checkout/Checkout';

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
            }
        ],
    },
]);