import { Link } from "react-router";
import FunctionalButtons from "./FunctionalButtons";
import Settings from "./Settings";
import Logo from "../logo/Logo";

const Header = () => {
  return (
    <header className="w-screen py-2 px-4 border-b border-blackBorder bg-blackBg">
      <div className="flex justify-between">
        <div className="flex items-center justify-center">
          <Link to={"/"}>
            <div onClick={() => alert("you are gay")} className="m-0">
              <Logo />
            </div>
          </Link>
        </div>
        <Settings />
        <FunctionalButtons />
      </div>
    </header>
  );
};

export default Header;
