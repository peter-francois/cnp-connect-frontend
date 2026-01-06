import { useState } from "react";
import HeaderUsersPage from "../../components/user/HeaderUsersPage";
import UserInfos from "../../components/user/UserInfos";
import PrimaryTitle from "../../components/ui/PrimaryTitle";
import type { SafeUserWithLinesAndTrainsInterface } from "../../types/interfaces/UserInterface";
import { useUserService } from "../../hooks/useUserService";

const UsersListPage = () => {
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
  const { findManyWithLinesAndTrains } = useUserService();
  const { isPending, isError, data, error } = findManyWithLinesAndTrains();

  if (!data) return <p>Aucun d'utilisateurs trouvés.</p>;

  const users: SafeUserWithLinesAndTrainsInterface[] = data.data.users;

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  //@dev see with limit ?
  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PrimaryTitle customClass="text-center my-5">Tous les utilisateurs</PrimaryTitle>
      <HeaderUsersPage search={search} setSearch={setSearch} />

      <section className="border border-indigo-600 rounded-2xl py-5 relative">
        <div className="flex items-center justify-between border-b-1 border-indigo-600 pb-2 font-bold w-full ">
          <span className="pl-14">Nom</span>
          <span className="pr-10">Poste</span>
        </div>

        <ul>
          {filteredUsers.map((user) => (
            <UserInfos userData={user} key={user.id} currentUser={currentUser} setCurrentUser={setCurrentUser} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default UsersListPage;
