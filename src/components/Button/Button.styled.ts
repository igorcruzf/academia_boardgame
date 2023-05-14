import styled from "styled-components";
import {fontConfigs} from "../../global";

export const ButtonStyled = styled.button<{ width: string, height: string, backgroundColor: string, fontColor: string, borderColor: string}>`
  font-family: ${fontConfigs.fontFamily};
  text-transform: none;
  font-size: ${fontConfigs.sizes.normal};
  background: ${({ backgroundColor }) => backgroundColor};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  border-radius: 5px;
  color: ${({ fontColor }) => fontColor};
  overflow: hidden;
  text-overflow: ellipsis;
`;

