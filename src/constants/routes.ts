export const ROUTES = {
  home: "/",
  products: "/products",
  product: (id: string) => `/products/${id}`,
  cart: "/cart",
  login: "/login",
  about: "/about",
  contact: "/contact",
} as const;
