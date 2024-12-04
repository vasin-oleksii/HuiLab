interface ButtonProps {
  children: React.ReactElement;
  title: string;
}

const Button = ({ children, title }: ButtonProps) => {
  return (
    <button className="px-4 py-2 flex items-center bg-blackLight rounded-xl hover:bg-orange text-xs">
      {title} <div className="ml-2">{children}</div>
    </button>
  );
};

export default Button;
