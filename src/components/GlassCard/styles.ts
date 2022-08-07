import styled from 'styled-components'

export const Container = styled.div`
    background-color: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    border: 1px solid rgba(255, 255, 255, 0.18);

    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);

    height: 500px;
    width: 900px;
    
    border-radius: 25px;
    

    @media (max-width: 900px) {
        height: 600px;
        margin: 0px 20px;
    }
`