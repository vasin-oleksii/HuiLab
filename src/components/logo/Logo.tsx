import { GiPisaTower } from "react-icons/gi";
import { MdConnectingAirports } from "react-icons/md";

const Logo = () => {
  return (
    <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <GiPisaTower />
      Hui
      <MdConnectingAirports />
      Lab
      <GiPisaTower />
    </div>
  );
};

export default Logo;
