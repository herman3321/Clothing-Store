import styled from 'styled-components'


export const ButtonContainer = styled.div`
display: flex;
gap: 1rem;
`;


export const Button = styled.button`
width: 100px;
height: 40px;
text-transform: uppercase;
color: #fff;
background: #000;
transition: 0.3 ease-out;
border-style: none;
cursor: pointer;
margin: auto;

&:hover{
  background-color: white;
  color: black;
  border: 1px solid black;
` ;

export const GoogleButton = styled.button`
background-color: #4285f4;
color: white;
&:hover{
    background-color: #357ae8;
    border: none;
}
`;

export const InvertedButton = styled.button`
background-color: white;
color: black;
border: 1px solid black;

&:hover {
  background-color: black;
  color: white;
  border: none;
}
`;