import Login from "../pages/business/login/Login";

const AuthRoutes = [
  {
    path: "/business",
    component: Login,
    isProtected: false,
    name: "Login",
    // meta: {
    //   title: "Login",
    // },
  },
];

export const businessRoutes = [...AuthRoutes];
