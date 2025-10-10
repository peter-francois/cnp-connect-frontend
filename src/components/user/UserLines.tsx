interface UserLignInterface {
  lignesId: number[] | null | undefined;
}

const UserLines = ({ lignesId }: UserLignInterface) => {
  return (
    <>
      {lignesId && (
        <span className="flex">
          <ul className=" px-2 flex gap-2">
            {lignesId.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </span>
      )}
    </>
  );
};

export default UserLines;
