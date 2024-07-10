// import {
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";
// import App from "../App";
// import { SignIn, Main, Category, Products, Workers, SinglePage } from "@pages";
// const Index = () => {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<App />}>
//         <Route path="/" element={<Main />}>
//           <Route index element={<Category />} />
//           <Route path="/products" element={<Products />}>
//             <Route path="/products/:id" element={<SinglePage />} />
//           </Route>
//           <Route path="/workers" element={<Workers />} />2
//         </Route>
//         <Route path="/sign-in" element={<SignIn />} />
//       </Route>
//     )
//   );
//   return <RouterProvider router={router} />;
// };
// export default Index;

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { SignIn, Main, Category, Products, Workers, SinglePage } from "@pages";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route element={<Main />}>
          <Route index element={<Category />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<SinglePage />} />
          <Route path="workers" element={<Workers />} />
        </Route>
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Index;

