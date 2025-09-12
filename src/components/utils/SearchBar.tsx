interface SearchBarInterface {
  value: string;
  onChange: (value: string) => void;
}
const SearchBar = ({ value, onChange }: SearchBarInterface) => {
  return (
    <div className="w-full">
      <input className="my-5 w-full rounded-md text-base outline-1 -outline-offset-1 outline-gray-200/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 block pl-9 pr-3 py-2 "
        onChange={(e) => onChange(e.target.value)}
        type="text"
        value={value}
        placeholder="Rechercher un utilisateur..."
      />
    </div>
  );
};

export default SearchBar;
