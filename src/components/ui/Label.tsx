interface LabelInterface {
  htmlFor: string;
  label: string;
  isSelected: boolean;
  customClass?: string;
}

const Label = ({ htmlFor, label, isSelected, customClass }: LabelInterface) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`border border-gray-200/50 rounded-md  py-2 px-3 cursor-pointer ${customClass} ${
        isSelected && "border-indigo-400 bg-indigo-700"
      }`}
    >
      {label}
    </label>
  );
};

export default Label;
