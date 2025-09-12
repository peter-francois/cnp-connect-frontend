interface AlerteItemInterface {
  customClass?: string;
  notificationNumber: number;
}

const AlertsIem = ({ customClass, notificationNumber }: AlerteItemInterface) => {
  return <li className={`${customClass} rounded-full size-7 center`}>{notificationNumber}</li>;
};

export default AlertsIem;
