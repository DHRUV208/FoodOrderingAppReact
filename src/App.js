import React, { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import { Provider } from "react-redux";


const Grocery = lazy(()=> import("./components/Grocery"))


const AppLayout = () => {
    const [userInfo, setUserInfo] = useState();
  
    useEffect(() => {
      const data = {
        name: "Dhruv Mehta",
      };
      setUserInfo(data.name);
    }, []);
    return (
      <Provider store={appStore}>
      <UserContext.Provider value={{loggedInUser: userInfo, setUserInfo}}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
       </Provider>
    );
  };
  
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Body />
        },
        {
          path: "/about",
          element: <Suspense fallback={<h1>Loading ...</h1>}><About /> </Suspense>
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/restaurant/:resId",
          element: <RestaurantMenu />
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/test",
          element: <Test />,
        },
        {
          path: "/grocery",
          element: <Suspense fallback={<h1>Loading ...</h1>}> <Grocery /> </Suspense>
        }
      ],
      errorElement: <Error />
    }
  ]);
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  
  root.render(<RouterProvider router={appRouter} />);
  