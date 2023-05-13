import styled from "styled-components";
import {colors, fontConfigs} from "../../global";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;
export const Text = styled.div`
  font-family: ${fontConfigs.fontFamily};
  font-style: normal;
  font-size: ${fontConfigs.sizes.normal};
  color: ${fontConfigs.fontColor};
  margin-bottom: 20px;
`;

export const Subtitle = styled(Text)`
  margin-top: 200px;
`;

export const NameLabel = styled(Text)`
  margin-top: 80px;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  font-family: ${fontConfigs.titleFontFamily};
  font-size: ${fontConfigs.sizes.biggest};
  color: ${colors.primaryStrong};
  margin-top: 40px;
`;

export const CreateRoomCustomButton = styled.div`
    margin-top: 10px;
`;