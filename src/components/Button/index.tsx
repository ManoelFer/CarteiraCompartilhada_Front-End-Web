import { etherIcon } from 'assets';

import { ButtonStyled, IconButton } from './styles'

interface IButtonProps {
    title: string;
    icon?: string;
    // All other props
    [x: string]: any;
}


export const Button = ({ title, typeButton, icon, ...rest }: IButtonProps) => {
    return (
        <ButtonStyled isDisabled={rest.disabled} {...rest}><IconButton src={icon || etherIcon} /> {title}</ButtonStyled>
    )
}