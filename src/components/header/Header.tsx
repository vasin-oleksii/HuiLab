import { Link } from "react-router";
import FunctionalButtons from "./FunctionalButtons";
import Settings from "./Settings";

const Header = () => {
  return (
    <header className="w-screen py-2 px-4 border-b border-blackBorder bg-blackBg">
      <div className="flex justify-between">
        <div className="flex items-center justify-center">
          <Link to={"/"}>
            <h1
              className="hover:text-orangeLight text-base cursor-pointer text-white"
              onClick={() => alert("you are gay")}
            >
              HuiLab
            </h1>
          </Link>
        </div>
        <Settings />
        <FunctionalButtons />
      </div>
    </header>
  );
};

export default Header;
