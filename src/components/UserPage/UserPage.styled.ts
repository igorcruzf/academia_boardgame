import styled from "styled-components";
import {Title} from "../HomePage/HomePage.styled";
import {colors} from "../../global";

export const UserTitle = styled(Title)`
  margin-bottom: 10px;
`;

export const SendButtonContainer = styled.div`
  margin-top: 30px;
`;

export const CardTitle = styled(Title)`
  margin-left: -20px;
  font-weight: bold;
  color: ${colors.black};
`;