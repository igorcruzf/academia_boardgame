import styled from "styled-components";
import {animated} from "react-spring";


export const DraggableCardContainer = styled(animated.div)<{ active: boolean }>`
  margin-top: ${({ active }) => (active ? "0" : "-225px")};
`;

export const CardStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  margin: 0 auto;
  perspective: 1000px;
`;