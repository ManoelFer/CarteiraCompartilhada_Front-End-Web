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
`