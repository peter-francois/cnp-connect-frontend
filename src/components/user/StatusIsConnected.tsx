interface StatusIsConnectInterface {
  status: boolean;
  customClass?: string;
}

const StatusIsConnected = ({ status, customClass }: StatusIsConnectInterface) => {
  return (
    <div className={`rounded-full mt-1 ml-2 size-3 p-2 ${status ? "bg-green-600" : "bg-red-600"} ${customClass}`}></div>
  );
};

export default StatusIsConnected;
