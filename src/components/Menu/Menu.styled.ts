import styled from "styled-components";
import { colors } from "../../global";
import img from '../../imgs/menu-background.png'

export const StyledMenu = styled.nav<{ open: boolean }>`
  top: 0;
  left: 0;
  height: 100vh;
  width: 35vw;
  position: fixed;
  background-image: url(${img});
  background-size: 305%;
  background-color: rgba(255,255,255,0.7);
  background-blend-mode: lighten;
  background-repeat: no-repeat;
  z-index: 4;
   

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rem 0;

  transition: transform 0.3s ease-in-out;
  
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  gap: 15px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const StyledLink = styled.a`
  padding: 0 2rem;
  font-size: 2rem;
  color: ${colors.primary};
  text-decoration: none;

  :hover {
    color: ${colors.yellowmellow};
  }
`;
