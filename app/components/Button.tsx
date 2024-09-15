'use client'; 

import React from 'react';
import { ButtonProps } from "../interfaces/ButtonProps";

const Button = ({ onClick, label }: ButtonProps) => (
    <button
        onClick={onClick}
    >
        {label}
    </button>
    );

    export default Button;