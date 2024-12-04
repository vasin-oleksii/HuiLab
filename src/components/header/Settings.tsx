import { BsCursorFill, BsTrash2Fill } from "react-icons/bs";
import { FaHandPointer } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";

const Settings = () => {
  const buttons = [
    <BsCursorFill />,
    <FaHandPointer />,
    <BsTrash2Fill />,
    <FaRegPenToSquare />,
  ];

  return (
    <div className="flex gap-6 items-center">
      {buttons.map((btn, i) => (
        <div
          key={i}
          className="hover:text-orangeLight text-white hover:cursor-pointer"
        >
          {btn}
        </div>
      ))}
    </div>
  );
};

export default Settings;
