import Login from "../pages/provider/login/Login";

const AuthRoutes = [
  {
    path: "/",
    component: Login,
    isProtected: false,
    name: "Login",
    // meta: {
    //   title: "Login",
    // },
  },
];

export const providerRoutes = [...AuthRoutes];
