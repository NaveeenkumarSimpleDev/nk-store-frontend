import { cn } from "../../lib/utils";

const Button = ({ children, disabled, onClick, className, ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-4 bg-black disabled:bg-muted-foreground disabled:cursor-not-allowed py-2 text-white rounded-md hover:opacity-90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
