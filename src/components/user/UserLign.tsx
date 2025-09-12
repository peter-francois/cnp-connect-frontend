
interface UserLignInterface {
    lignesId: number[] | null | undefined;
}

const UserLign = ({lignesId}: UserLignInterface) => {
    return (
        <>
            {lignesId && (
                <span className="flex">
                    ligne{lignesId.length >= 2 && "s"} :{" "}
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

export default UserLign;