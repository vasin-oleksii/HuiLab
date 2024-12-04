import { IoArrowUndo } from "react-icons/io5";
import Button from "../../shared/buttons/Button";
import { IoIosRedo } from "react-icons/io";
import { FaClock, FaShareAltSquare } from "react-icons/fa";

const FunctionalButtons = () => {
  const icons = [
    { label: "Undo", icon: <IoArrowUndo /> },
    { label: "Redo", icon: <IoIosRedo /> },
    { label: "Time ?", icon: <FaClock /> },
    { label: "Share App", icon: <FaShareAltSquare /> },
  ];
  return (
    <div className="flex gap-3">
      {icons.map((iconItem, i) => {
        const { label, icon } = iconItem;

        return (
          <Button title={label} key={i}>
            {icon}
          </Button>
        );
      })}
    </div>
  );
};

export default FunctionalButtons;
