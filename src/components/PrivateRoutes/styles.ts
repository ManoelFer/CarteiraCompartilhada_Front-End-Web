import styled from 'styled-components'

import { backgroundAdmin } from "assets";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    height: 100%;

    width: 100%;

    background-image: url(${backgroundAdmin});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;


    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.scrollPageColor}; 
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.scrollPageColorHover}; 
    }
    
   
`