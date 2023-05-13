import axios from "axios";
import {CardData} from "../Card/Card";

export interface CreateCardRequest {
    playerId: number;
    title: string;
    answer: string;
    isRightAnswer: boolean;
}

class CardService {
    private readonly baseURL: string;

    constructor() {
        this.baseURL = 'https://academia-4oto.onrender.com/cards';
    }

    public async createCard(createCardRequest: CreateCardRequest): Promise<void> {
        await axios.post(this.baseURL, createCardRequest, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async getCards(room: string): Promise<CardData[]> {
        const response = await axios.get(this.baseURL + `?roomName=${room}`);
        return response.data as CardData[];
    }

    public async deleteCards(room: string): Promise<void> {
        await axios.delete(this.baseURL + `?roomName=${room}`);
    }
}

export default CardService;
