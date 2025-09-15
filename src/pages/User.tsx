import { Link } from "react-router";
import PrimaryButton from "../components/utils/PrimaryButton";

const User = () => {
  return (
    <>
      <section className="flex justify-around items-center">
        <div>
          <img className="rounded-full  " src="https://randomuser.me/api/portraits/women/1.jpg" alt="user lastName" />
          <Link to={"/"}>Changer la photo</Link>
        </div>
        <ul>
          <li>Nom: </li>
          <li>Rôle: </li>
          <li>Embauché depuis le:</li>
        </ul>
      </section>
      <section>
        <ul>
          <li>Email: </li>
          <li>Status: </li>
          <li>Affectation: </li>
        </ul>
        <PrimaryButton type="button">Lignes</PrimaryButton>
        <PrimaryButton type="button">Trains</PrimaryButton>
        <PrimaryButton type="submit">Réasignations</PrimaryButton>
        <PrimaryButton type="submit">Nouveau message</PrimaryButton>
      </section>
    </>
  );
};

export default User;
