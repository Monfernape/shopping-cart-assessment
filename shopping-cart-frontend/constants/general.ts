
import { QueryClient } from "react-query";

export const queryClient = new QueryClient()

export const Navigation = {
    user: [
        { name: "Home", href: "/" },
    ],
    admin: [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products-list" },
    ]
}