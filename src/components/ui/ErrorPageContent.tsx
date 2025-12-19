import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import { Link } from "react-router";

interface PropsInterface {
  children: ReactNode;
}

const ErrorPageContent = ({ children }: PropsInterface) => {
  return (
    <div className="center flex-col gap-10 h-screen px-3 text-center">
      <div className="center flex-col gap-3 text-red-600 text-xl">
        <ExclamationTriangleIcon width={60} />
        <p>{children}</p>
      </div>

      <Link to="/" className="text-indigo-500 underline hover:text-indigo-600">
        Retouner à la connexion
      </Link>
    </div>
  );
};

export default ErrorPageContent;
