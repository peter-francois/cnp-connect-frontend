import PrimaryTitle from "../components/utils/PrimaryTitle";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user";
import User from "../components/User";
import HeaderUsers from "../components/HeaderUsers";

const Users = () => {
  const [search, setSearch] = useState("");
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const filteredUsers = data.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PrimaryTitle customClass="text-center my-5">Tous les utilisateurs</PrimaryTitle>
      <HeaderUsers  search={search} setSearch={setSearch} />
      
      <section className="border border-indigo-600 rounded-2xl py-5 relative">
        <div className="flex items-center justify-between border-b-1 border-indigo-600 pb-2 font-bold w-full ">
          <span className="pl-14">Nom</span>
          <span className="pr-10">Poste</span>
        </div>
        <ul>
          {filteredUsers.map((user) => (
            <User userData={user} key={user.id}/>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Users;
