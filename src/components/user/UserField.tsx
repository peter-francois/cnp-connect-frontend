interface UserLiInterface {
  label: string;
  value: string;
  customClass?: string;
}

// mettre des ul dans le li a la place de la div

const UserField = ({ label, value, customClass }: UserLiInterface) => {
  return (
    <li className={`my-3 ${customClass}`}>
      <div className="flex justify-between">
        <h3 className="font-bold mb-1">{label}: </h3>
      </div>
      <p>{value}</p>
    </li>
  );
};

export default UserField;
