import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayouts";
import Login from "../pages/login/login";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ContactForm from "../pages/Home/ContactForm";
import About from "../pages/About/About";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "/products",
          element: <Products></Products>
        },
        {
          path: "/contact",
          element: <ContactForm></ContactForm>
        },
        {
          path: "/about",
          element: <About></About>
        }
      ]
      
    },
    {
      path: "/login",
      element: <Login></Login>
    }
  ]);