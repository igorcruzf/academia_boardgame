import React from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import Card, { CardData } from "../card/Card";
import "./style.css";

interface CardStackProps {
    cards: CardData[];
    onSwipe: () => void;
}

const Deck: React.FC<CardStackProps> = ({ cards, onSwipe }) => {
    const swipeThreshold = 100; // Define the threshold distance for swipe

    return (
        <div className="card-stack">
            {cards.map((props, index) => (
                <DraggableCard
                    card={cards[index]}
                    key={cards[index].id}
                    isActive={index === 0}
                    onSwipe={onSwipe}
                    swipeThreshold={swipeThreshold}
                    index={index}
                />
            ))}
        </div>
    );
};

const DraggableCard: React.FC<{
    card: CardData;
    isActive: boolean;
    onSwipe: () => void;
    swipeThreshold: number;
    index: number;
}> = ({ card, isActive, onSwipe, swipeThreshold, index }) => {
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
        <animated.div
            {...bind()}
            className={`draggable-card ${isActive ? "active" : "inactive"}`}
            style={{
                transform: x.to((x) => `translate3d(${x}px, 0, 0)`),
                touchAction: "none",
                zIndex: -index
            }}
        >
            <Card
                initialName={card.name}
                initialAnswer={card.answer}
                initialTitle={card.title}
                isModerator={true}
            />
        </animated.div>
    );
};

export default Deck;
