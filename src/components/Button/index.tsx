import { etherIcon } from 'assets';

import { ButtonStyled, IconButton } from './styles'

interface IButtonProps {
    title: string;
    // All other props
    [x: string]: any;
}


export const Button = ({ title, typeButton, ...rest }: IButtonProps) => {
    return (
        <ButtonStyled isDisabled={rest.disabled} {...rest}><IconButton src={etherIcon} /> {title}</ButtonStyled>
    )
}