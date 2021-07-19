import React from "react";
import { Cart, UserProductsList } from "./";

export const Dashboard = () => {
  return (
    <div className="flex gap-5">
      <UserProductsList />
      <Cart />
    </div>
  );
};
