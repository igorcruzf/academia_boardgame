import styled from "styled-components";
import {colors, fontConfigs} from "../../global";
import {animated} from "react-spring";

export const CardContainer = styled.div<{ background: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  padding: 10px;
  border-radius: 15px;
  background: ${({ background }) => background};
`;
export const ScoreAndNameContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const DecreaseButton = styled.button`
  background: none;
  color: ${fontConfigs.fontColor};
  font-size: 25px;
  margin-bottom: 5px;
  border: none;
  cursor: pointer;
`;

export const IncreaseButton = styled.button`
  background: none;
  color: ${fontConfigs.fontColor};
  font-size: 25px;
  margin-bottom: 5px;
  border: none;
  cursor: pointer;
`;

export  const FlipContainer = styled.div`
  perspective: 1000px;
`;

export const Flipper = styled(animated.div)`
  width: 320px;
  max-width: 320px;
  height: 413px;
  max-height: 413px;
  transform-style: preserve-3d;
  border: 2px solid ${colors.primary};
  border-radius: 10px;
`;

export const Front = styled.div<{flipped: boolean}>`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

export const Back = styled.div<{flipped: boolean}>`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);

  & > div {
    position: absolute;
    margin-top: -300px;
    margin-left: 80px;
    transform: rotate(-45deg);
  }
`;

export const LogoIcon = styled.img`
  width: 50%;
`;