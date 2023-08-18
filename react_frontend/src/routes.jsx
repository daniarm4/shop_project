import CheckoutCancel from "./components/orders/CheckoutCancel"
import CheckoutSuccess from "./components/orders/CheckoutSuccess"
import CreateOrderPage from "./pages/CreateOrderPage"
import LoginPage from "./pages/LoginPage"
import OrderListPage from "./pages/OrderListPage"
import ProductListPage from "./pages/ProductListPage"
import ProductPage from "./pages/ProductPage"
import RegisterPage from "./pages/RegisterPage"


export const publicRoutes = [
    {path: '/products', element: <ProductListPage />},
    {path: '/product/:slug', element: <ProductPage />},
]

export const unauthRoutes = [
    {path: '/login', element: <LoginPage />},
    {path: '/register', element: <RegisterPage />},
]

export const authRoutes = [
    {path: '/orders', element: <OrderListPage />},
    {path: '/orders/create', element: <CreateOrderPage />},
    {path: '/checkout/success', element: <CheckoutSuccess />},
    {path: '/checkout/cancel', element: <CheckoutCancel />},
]
