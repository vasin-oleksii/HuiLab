import FunctionalButtons from "./FunctionalButtons";
import Settings from "./Settings";

const Header = () => {
  return (
    <header className="w-screen py-2 px-4 border-b border-blackBorder">
      <div className="flex justify-between">
        <div className="flex items-center justify-center">
          <h1
            className="hover:text-orangeLight text-base cursor-pointer"
            onClick={() => alert("you are gay")}
          >
            HuiLab
          </h1>
        </div>
        <Settings />
        <FunctionalButtons />
      </div>
    </header>
  );
};

export default Header;
