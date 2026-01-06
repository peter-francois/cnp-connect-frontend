import type { AssignedTrainsInterface } from "../../types/interfaces/train/AssignedTrainInterface";

interface UserTrainInterface {
  assignedTrains: AssignedTrainsInterface[];
}
const UserTrain = ({ assignedTrains }: UserTrainInterface) => {
  return (
    <>
      {assignedTrains && (
        <span className="flex">
          <ul className=" px-2 flex flex-wrap justify-around gap-2">
            {assignedTrains.map((assignedTrain) => (
              <li key={assignedTrain.train.id}>{assignedTrain.train.name}</li>
            ))}
          </ul>
        </span>
      )}
    </>
  );
};
export default UserTrain;
