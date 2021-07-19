import React from "react"
import { User } from "../../models"

export const useUser = () => {
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
          const serializedUser = JSON.parse(user);
          setUser(serializedUser);
        }
      }, []);

      return { user, setUser }

}