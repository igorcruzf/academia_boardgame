import React from "react";
import pencilIcon from '../../../imgs/pencil.png';
import crownIcon from '../../../imgs/crown.png';
import {Player, Score} from "../../Services/PlayerService";
import {
    CrownIcon,
    EmptyRoundContainer,
    ItemContainer, PencilIcon, PlayerIconContainer,
    RoundContainer, ScoreLineContainer, ScorePlayer,
    ScoreRoundIndex, ScoreRoundsContainer,
    ScoreValue,
    SolidLine, TotalContainer
} from "./ScoreLine.styled";

interface ScoreLineProps{
    player: Player;
    isFirstPlace: boolean;
}

export const getTotalScore = (scores?: Score[]) => {
    if(!scores) return 0;
    let totalScore = 0;
    for (let i = 0; i < scores.length; i++) {
        totalScore += scores[i].score;
    }
    return totalScore;
};
const ScoreLine: React.FC<ScoreLineProps> = ({ player, isFirstPlace }) => {
    function renderEmptyRoundContainers(num: number): JSX.Element[] {
        return [...Array(num)].map((_, index) => (
            <EmptyRoundContainer key={`empty_${index}`}>
                <ScoreRoundIndex/>
                <ScoreValue/>
            </EmptyRoundContainer>
        ));
    }

    function renderScoreRoundContainers(scores: Score[]): JSX.Element[] {
        return scores.slice().reverse().map((score) => (
            <RoundContainer key={`${score.round}`}>
                <ScoreRoundIndex>{score.round}.</ScoreRoundIndex>
                <ScoreValue>{score.score}</ScoreValue>
            </RoundContainer>
        ));
    }

    const ScoreRounds = (): JSX.Element => {
        const numEmptyContainers = Math.max(3 - (player.scores?.length ?? 0), 0);

        return (
            <ScoreRoundsContainer>
                {renderScoreRoundContainers(player.scores ?? [])}
                {renderEmptyRoundContainers(numEmptyContainers)}
            </ScoreRoundsContainer>
        );
    }


    return (
        <ScoreLineContainer>
            {isFirstPlace? <CrownIcon src={crownIcon} alt={'crown icon'}/> : ""}
            <ItemContainer>
                <PlayerIconContainer>
                    <PencilIcon src={pencilIcon} alt={'pencil icon'} />
                    <ScorePlayer>
                        <ScoreValue>{player.name}</ScoreValue>
                        <SolidLine/>
                    </ScorePlayer>
                </PlayerIconContainer>
            </ItemContainer>

            <TotalContainer>
                <ScoreValue>
                    {player.scores? getTotalScore(player.scores) : 0}
                </ScoreValue>
            </TotalContainer>

            <ScoreRounds/>
        </ScoreLineContainer>
    );
};

export default ScoreLine;