import React, { Children } from "react";

interface buttonProp {
  children: string;
  color?: string;
  onClick: () => void;
}
const Button = ({ children, color, onClick }: buttonProp) => {
  return (
    <div className={color} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
