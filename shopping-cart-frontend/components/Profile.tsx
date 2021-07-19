import React from "react";
import { useQuery, useMutation } from "react-query";
import { PencilIcon } from "@heroicons/react/solid";
import { UpdateProfile } from "./UpdateProfileDialog";
import { AuthService, getUserId } from "../services";
import { queryClient } from "../constants";
import { Product, User } from "../models";

export const Profile = () => {
  const [isDialogOpen, setDialogStatus] = React.useState<boolean>(false);
  const auth = new AuthService();
  const userId = getUserId();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery("profile", () => auth.getUserById(userId));

  const { mutate: updateProfile } = useMutation(
    (profile: User) => auth.updateUser(profile),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profile");
      },
    }
  );

  const handleUpdateUser = async (profile: User) => {
    updateProfile(profile);
  };

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Errors</div>;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Profile
        </h3>
        <PencilIcon
          className="h-6 w-6 cursor-pointer"
          aria-hidden="true"
          onClick={() => setDialogStatus(true)}
        />
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {`${user.firstName} ${user.lastName}`}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Email/Username
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.username}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Spending History
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {(user.spendingHistory as Product[]).map((x, i) => (
                  <li
                    key={x.name + i}
                    className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                  >
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate">{x.name}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="ml-2 flex-1 w-0 truncate">
                        {x.price}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
      <UpdateProfile
        open={isDialogOpen}
        onClose={() => setDialogStatus(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
};
