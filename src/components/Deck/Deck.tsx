import React from "react";
import { useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import Card, { CardData } from "../Card/Card";
import {CardStack, DraggableCardContainer} from "./Deck.styled";
import {ModeratorCardContainer} from "../ModeratorPage/ModeratorPage.styled";

interface CardStackProps {
    cards: CardData[];
    onSwipe: () => void;
    setCardScoreMap: React.Dispatch<React.SetStateAction<Map<number, number>>>;
    cardScoreMap: Map<number, number>;
}

const Deck: React.FC<CardStackProps> = ({ cards, onSwipe, setCardScoreMap, cardScoreMap }) => {
    const swipeThreshold = 150;

    return (
        <CardStack>
            {cards.map((props, index) => (
                <DraggableCard
                    card={cards[index]}
                    key={cards[index].id}
                    isActive={index === 0}
                    onSwipe={onSwipe}
                    swipeThreshold={swipeThreshold}
                    index={index}
                    setCardScoreMap={setCardScoreMap}
                    cardScoreMap={cardScoreMap}
                />
            ))}
        </CardStack>
    );
};

const DraggableCard: React.FC<{
    card: CardData;
    isActive: boolean;
    onSwipe: () => void;
    swipeThreshold: number;
    index: number;
    setCardScoreMap: React.Dispatch<React.SetStateAction<Map<number, number>>>;
    cardScoreMap: Map<number, number>;
}> = ({ card, isActive, onSwipe, swipeThreshold, index, setCardScoreMap, cardScoreMap }) => {
    const [{ x }, set] = useSpring(() => ({ x: 0 }));

    const bind = useDrag(({ down, movement: [mx] }) => {
        if (!isActive) return;

        set({ x: down ? mx : 0 });
        if (!down) {
            if (Math.abs(mx) > swipeThreshold) {
                onSwipe();
            }
        }
    });

    return (
        <DraggableCardContainer
            {...bind()}
            active={isActive}
            style={{
                transform: x.to((x) => `translate3d(${x}px, 0, 0)`),
                touchAction: "none",
                zIndex: -index
            }}>
            <ModeratorCardContainer>
                <Card
                    name={card.isRightAnswer? "Resposta certa" : card.player!.name}
                    initialAnswer={card.answer}
                    initialTitle={card.title}
                    isModerator={true}
                    isMultiline={isActive}
                    onUpdateScore={(newScore) =>
                        setCardScoreMap((prevMap) => new Map(prevMap).set(card.player!.id, newScore))
                    }
                    initialScore={cardScoreMap.get(card.player!.id)}
                />
            </ModeratorCardContainer>
        </DraggableCardContainer>
    );
};

export default Deck;
