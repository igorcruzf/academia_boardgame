import styled from "styled-components";
import { colors } from "../../../global";
import { fontConfigs } from "../../../global";

export const ScoreLineContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  width: 319px;
  min-width: 319px;
  height: 41px;

  > *:not(:last-child) {
    margin-right: 5px;
  }
`;

export const ScoreRoundsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;

  > *:not(:last-child) {
    margin-right: 5px;
  }
`;
export const ScoreValue = styled.div`
  font-family: ${fontConfigs.fontFamily};
  margin-top: 2px;
  font-size: ${fontConfigs.sizes.micro};
  color: ${fontConfigs.fontColor};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ScoreRoundIndex = styled.div`
  font-family: ${fontConfigs.fontFamily};
  font-size: ${fontConfigs.sizes.smallest};
  color: ${fontConfigs.fontColor};
  text-align: left;
  margin-left: -25px;
  margin-top: -7px;
`;

export const SolidLine = styled.div`
  border-top: 1px solid ${colors.primary};
  width: 70px;
  margin-top: 4px
`;

export const CrownIcon = styled.img`
  position: absolute;
  width: 35px;
  height: 35px;
  top: -25px;
  left: -18px;
  z-index: 0;
`;

export const PlayerIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
`;

export const PencilIcon = styled.img`
  height: 17px;
  width: 17px;
`;
export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${colors.secondary};
  border-radius: 5px;
  border: 1px solid ${colors.primary};
  width: 110px;
  min-width: 110px;
`;

export const RoundContainer = styled(ItemContainer)`
  width: 42px;
  min-width: 42px;
`;

export const EmptyRoundContainer = styled(RoundContainer)`
  background: ${colors.block};
  border: 1px solid ${colors.block};
`;


export const TotalContainer = styled(ItemContainer)`
  width: 80px;
  min-width: 80px;
`;

export const ScorePlayer = styled.div`
  margin-top: 4px;
  margin-right: 17px;
  max-width: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
`;