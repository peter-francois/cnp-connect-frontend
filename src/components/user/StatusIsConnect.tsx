

interface StatusIsConnectInterface {
    status: boolean;
}
const StatusIsConnect = ({status}: StatusIsConnectInterface) => {
  return (
    <div className="flex">
      status :{" "}
      {status ? (
        <div className=" rounded-full mt-1 ml-2 w-3 h-3 p-2 bg-green-600"></div>
      ) : (
        <div className=" rounded-full mt-1 ml-2 w-3 h-3 p-2 bg-red-600"></div>
      )}
    </div>
  );
};

export default StatusIsConnect;
