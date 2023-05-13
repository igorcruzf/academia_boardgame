import React, {useRef, useState} from "react";

import Hamburger from "./Hamburger/Hamburger";
import {StyledMenu} from "./Menu.styled";

import {useOnClickOutside} from "../../hooks";
import {CustomButton} from "../Button/Button";

export interface Action {
    text?: string;
    icon?: JSX.Element;
    actionFunction: () => void;
    isLoading?: boolean
}
interface MenuProps {
    actions: Action[];
}
const Menu: React.FC<MenuProps> = ({ actions }) => {
    const [open, setOpen] = useState<boolean>(false);
    const node = useRef<HTMLDivElement>(null);
    const close = () => setOpen(false);

    useOnClickOutside(node, () => setOpen(false));

    const handleOnClick = (actionFunction: () => void, isLoading?: boolean) => {
        actionFunction();
        if(!isLoading) {
            close();
        }
    }

    return (
        <div ref={node} >
            <StyledMenu open={open}>
                {actions.map( (action) => {
                    return <CustomButton isLoading={action.isLoading}
                                         handleOnClick={() => handleOnClick(action.actionFunction, action.isLoading)}
                                         buttonText={action.text}
                                         icon={action.icon}
                    />
                })}
            </StyledMenu>
            <Hamburger open={open} setOpen={setOpen} />
        </div>
    );
};

export default Menu;
