interface StatusIsConnectInterface {
  status: boolean;
}
const StatusIsConnected = ({ status }: StatusIsConnectInterface) => {
  return <div className={`rounded-full mt-1 ml-2 size-3 p-2 ${status ? "bg-green-600" : "bg-red-600"}`}></div>;
};

export default StatusIsConnected;
