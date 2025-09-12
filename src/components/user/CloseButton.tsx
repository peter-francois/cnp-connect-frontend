import { XCircleIcon } from "@heroicons/react/24/solid";

interface CloseButtonInterface {
  onClose: () => void;
}

const CloseButton = ({ onClose }: CloseButtonInterface) => {
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };
  return (
    <>
      <button onClick={handleClose} aria-label="Fermer">
        {<XCircleIcon width={30} className="absolute -top-3 -left-3 cursor-pointer" />}
      </button>
    </>
  );
};

export default CloseButton;
