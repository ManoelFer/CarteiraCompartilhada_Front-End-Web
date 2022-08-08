import styled from 'styled-components'

export const Container = styled.div`
    background-color: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    border: 1px solid rgba(255, 255, 255, 0.18);

    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);

    height: auto;
    width: 1000px;
    
    border-radius: 25px;

    padding: 50px;
    
    @media (max-width: 1024px) {
        margin: 150px 20px 0px 20px;

        padding: 40px;
    }

`