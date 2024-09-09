import { ButtonProps } from "../interfaces/ButtonProps";

const Button = ({ onClick, label }: ButtonProps) => (
    <button
        onClick={onClick}
        className="button hover:bg-blingGray"
    >
        {label}
    </button>
    );

    export default Button;