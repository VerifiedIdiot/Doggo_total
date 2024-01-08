import styled from "styled-components"

export const Center = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
//     overflow-x: hidden;
    .scroll::-webkit-scrollbar {
    display: none;
}
`;

export const SideBar =styled.div`
    margin-left: 15vw;
    
    @media only screen and (max-width: 767px) {
    margin-left: 0;
    }
`;