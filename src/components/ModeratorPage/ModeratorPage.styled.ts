import styled from "styled-components";
import {Title} from "../HomePage/HomePage.styled";
import {colors} from "../../global";

export const ModeratorTitle = styled(Title)`
  margin-bottom: 20px;
  margin-top: 0;
`;
export const ModeratorCardContainer = styled.div`
  border: 1px solid ${colors.primaryStrong};
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  background: white;
`

export const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 15px;
  margin-bottom: 15px;
`;