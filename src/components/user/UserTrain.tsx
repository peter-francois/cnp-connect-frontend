interface UserTrainInterface {
  train: number | undefined;
}
const UserTrain = ({ train }: UserTrainInterface) => {
  return <>{train && <span className="pl-2">{train}</span>}</>;
};

export default UserTrain;
