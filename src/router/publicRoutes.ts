import NotFound from "../components/common/NotFound";

const generalRoutes = [
  {
    path: "*",
    component: NotFound,
    isProtected: false,
    name: "Not Found",
    // meta: {
    //   title: "Not Found",
    // },
  },
];

export const publicRoutes = [...generalRoutes];
