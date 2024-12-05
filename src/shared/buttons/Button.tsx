interface ButtonProps {
  children: React.ReactElement;
  title: string;
}

const Button = ({ children, title }: ButtonProps) => {
  return (
    <button className="md:px-4 py-2 flex items-center bg-blackLight rounded-xl hover:bg-orange text-xs px-1">
      {title} <div className="ml-2">{children}</div>
    </button>
  );
};

export default Button;
