import styled from "styled-components";
import {fontConfigs} from "../../global";
import {CustomButton} from "../Button/Button";

export const ScorePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;
export const BackButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
export const Subtitle = styled.div`
  font-family: ${fontConfigs.fontFamily};
  font-style: normal;
  font-weight: 400;
  font-size: ${fontConfigs.sizes.normal};
  line-height: ${fontConfigs.sizes.normal};
  color: ${fontConfigs.fontColor};
  margin-top: 16px;
  margin-bottom: 25px;
`;

const ScoreLabel = styled.div`
  font-family: ${fontConfigs.fontFamily};
  font-size: ${fontConfigs.sizes.small};
  font-weight: 400;
  color: ${fontConfigs.fontColor};
`;

export const PlayerLabel = styled(ScoreLabel)`
  text-align: center;
`;

export const TotalLabel = styled(ScoreLabel)`
  margin-right: 18px;
`;

export const RoundLabel = styled(ScoreLabel)`
  margin-right: 50px;
`;

export const LabelsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 319px;
  justify-content: space-between;
  margin-left: 65px;
`;

export const ScoreLinesContainer = styled.div`
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const EndGameButtonContainer = styled.div`
  margin-top: 100px;
`;