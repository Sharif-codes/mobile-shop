import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import Login from "../pages/login/login";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ContactForm from "../pages/Home/ContactForm";
import About from "../pages/About/About";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

import SellerProducts from "../pages/Dashboard/Seller/Products/SellerProducts";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import Cart from "../pages/Dashboard/Buyer/Cart";
import Wishlist from "../pages/Dashboard/Buyer/Wishlist";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import AllProducts from "../pages/Dashboard/Admin/AllProducts";

import AddProduct from "../pages/Dashboard/Seller/Products/AddProduct";
import Categories from "../pages/Dashboard/Admin/Categories/Categories";
import AddCategory from "../pages/Dashboard/Admin/Categories/AddCategory";
import UpdateProduct from "../pages/Dashboard/Seller/Products/UpdateProduct";
import PaymentFail from "../pages/Dashboard/Payment/PaymentFail";
import PurchasedProduct from "../pages/Dashboard/Buyer/PurchasedProduct";
import SoldProducts from "../pages/Dashboard/Seller/SoldProduct/SoldProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout> ,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/products",
        element: <PrivateRoute><Products></Products></PrivateRoute> 
      },
      {
        path: "/products/details",
        element: <PrivateRoute><ProductDetailsPage></ProductDetailsPage></PrivateRoute> 
      },
      {
        path: "/contact",
        element: <ContactForm></ContactForm>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/settings",
        element: <SettingsPage></SettingsPage>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute> ,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome></DashboardHome>
      },
      {
        path: "/dashboard/contact",
        element: <ContactForm></ContactForm>
      },
      {
        path: "/dashboard/addProducts",
        element: <AddProduct></AddProduct>
      },
      {
        path: "/dashboard/Categories",
        element: <Categories></Categories>
      },
      {
        path: "/dashboard/categories/addCategories",
        element: <AddCategory></AddCategory>
      },
      {
        path: "/dashboard/sellerProducts",
        element: <SellerProducts></SellerProducts>
      },
      {
        path: "/dashboard/updateProduct",
        element: <UpdateProduct></UpdateProduct>
      },
      {
        path: "/dashboard/allUsers",
        element: <AllUsers></AllUsers>
      },
      {
        path: "/dashboard/allProducts",
        element: <AllProducts></AllProducts>
      },
      {
        path: "/dashboard/cart",
        element: <Cart></Cart>
      },
      {
        path: "/dashboard/wishList",
        element: <Wishlist></Wishlist>
      },
      {
        path: "/dashboard/settings",
        element: <SettingsPage></SettingsPage>
      },
      {
        path: "/dashboard/paymentFail",
        element: <PaymentFail></PaymentFail>
      },
      {
        path: "/dashboard/buyer/purchasedProduct",
        element: <PurchasedProduct></PurchasedProduct>
      },
      {
        path: "/dashboard/sellerSoldProducts",
        element: <SoldProducts></SoldProducts>
      },
    ]
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/register",
    element: <Register></Register>
  }
]);