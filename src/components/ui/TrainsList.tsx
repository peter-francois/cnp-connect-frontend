import { useState } from "react";
import type { LineInterface } from "../../types/interfaces/line/LineInterface";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TrainInterface } from "../../types/interfaces/train/TrainInterface";
import SelectableInput from "../ui/SelectableInput";
import ErrorMessage from "./ErrorMessage";

interface TrainListInterface {
  register: UseFormRegister<any>; // @dev find right type '--'
  type: string; // @dev enum
  line: LineInterface;
  registerError: FieldErrors;
}

const TrainsList = ({ register, type, line, registerError }: TrainListInterface) => {
  const [selecttrain, setSelectTrain] = useState<TrainInterface>();

  const handleSelectTrain = (train: TrainInterface) => {
    setSelectTrain(train);
  };

  return (
    <>
      <div className="card-border justify-around relative grid grid-flow-col grid-rows-3 gap-y-7 gap-x-2 p-5">
        {line.trains?.map((train) => (
          <SelectableInput
            key={train.id}
            label="train"
            data={train}
            onClick={() => handleSelectTrain(train)}
            isSelected={selecttrain?.id == train.id}
            register={register}
            type={type}
            customClass="px-3 py-2"
          />
        ))}
      </div>
      <ErrorMessage id="train" errors={registerError} />
    </>
  );
};

export default TrainsList;
