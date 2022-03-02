import React from "react";

interface IProps {
  className?: string;
  label?: string;
  symbol: string;
}

const Emoji:React.FC<IProps> = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);

export default Emoji;
