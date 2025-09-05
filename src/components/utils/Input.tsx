interface InputInterface {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  errors: any; //change the any to right type
}

const Input = ({ id, type, placeholder, label, errors }: InputInterface) => {
  return (
    <div className="flex flex-col items-start gap-2 my-5">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-200/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
      />
      {errors[id] && <p>{errors[id].message}</p>}
    </div>
  );
};

export default Input;
