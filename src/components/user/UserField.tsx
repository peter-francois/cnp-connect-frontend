interface UserLiInterface {
  label: string;
  value: string;
  customClass?: string;
  pCustomClass?: string;
}

// mettre des ul dans le li a la place de la div

const UserField = ({ label, value, customClass, pCustomClass }: UserLiInterface) => {
  return (
    <li className={`my-3 ${customClass}`}>
      <div className="flex justify-between">
        <h3 className="font-bold mb-1">{label}: </h3>
      </div>
      <p className={`whitespace-normal break-words ${pCustomClass}`}>{value}</p>
    </li>
  );
};

export default UserField;
