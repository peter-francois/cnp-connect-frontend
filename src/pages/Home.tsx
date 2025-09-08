import type { UserInterface } from "../interfaces/UsersInterface";
import { addUser,getUsers, getUsersById } from "../services/api/user";
import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState<UserInterface[]>([])

useEffect(() => {
 const getData = async  () => {
const userClaire = await addUser()

console.log("Claire", userClaire)
 }
 getData()
}, [])

useEffect(() => {
  const getData = async () => {
    const data= await getUsers();
      setUsers(data)
  }
  getData()
},[])

console.log("users: ",users)

const id = 5

useEffect(()=> {
  const getData = async () =>{
  const user = await getUsersById(id)
  console.log('Peter', user)
}
getData()
}, [])

  return <div>Home page</div>;
};

export default Home;
