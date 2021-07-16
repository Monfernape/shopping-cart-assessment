import React from "react";
import { useRouter } from "next/router";
import type { User } from "../models";
import {
  Navbar,
  Login,
  SignUp,
  AdminProductsList,
  ProductForm,
  Profile,
  UserProductsList,
  Cart,
} from "../components";

export default function Home() {
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const serializedUser = JSON.parse(user);
      setUser(serializedUser);
    } else router.push("/login");
  }, []);

  if(!user) return null

  return (
    <div>
      <Navbar />
      <Login />
      <SignUp />
      <AdminProductsList />
      <ProductForm />
      <Profile />
      <UserProductsList />
      <Cart />
    </div>
  );
}
