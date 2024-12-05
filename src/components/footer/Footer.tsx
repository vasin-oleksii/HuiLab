import { BsLightningFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-screen py-2 px-4 border-t border-blackBorder  flex items-start flex-row gap-6 align-middle">
      <div className="flex items-center">
        <div className="mr-2 text-orangeLight hover:text-white">
          <BsLightningFill />
        </div>
        <h3 className="text-xs">Running</h3>
      </div>
      <div>
        <h4 className="text-xs">View: ?</h4>
      </div>
    </footer>
  );
};

export default Footer;
