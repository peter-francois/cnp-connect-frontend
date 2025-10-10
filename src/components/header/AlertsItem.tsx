interface AlerteItemInterface {
  customClass?: string;
  notificationNumber: number;
}

const AlertsItem = ({ customClass, notificationNumber }: AlerteItemInterface) => {
  return <li className={`${customClass} rounded-full size-7 center`}>{notificationNumber}</li>;
};

export default AlertsItem;
