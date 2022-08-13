import styled from 'styled-components'

import { IButtonStyledProps } from './interfaces'

export const ButtonStyled = styled.button<IButtonStyledProps>`
    height: 63px;

    border-radius: 20px;
    border: none;
    background-image:${({ theme }) => theme.colors.colorGradientButton} ;
    color:${({ theme }) => theme.colors.lettersWhite};

    font-weight: 400;
    font-size:${({ theme }) => theme.fontSizes.small};
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;

    text-transform: uppercase;
`

export const IconButton = styled.img` 
    width: 30px;
    margin-right: 20px;
`