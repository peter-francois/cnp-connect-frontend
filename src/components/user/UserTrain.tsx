
interface UserTrainInterface {
  train: number | null | undefined;
}
const UserTrain = ({ train }: UserTrainInterface) => {
  return <>{train ? <span>train {train}</span> : ""}</>;
};

export default UserTrain;
