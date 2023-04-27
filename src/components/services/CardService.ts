import axios from "axios";
import {CardData} from "../card/Card";

class CardService {
    private readonly baseURL: string;

    constructor() {
        this.baseURL = 'https://academia-4oto.onrender.com/cards';
    }

    public async createCard(cardData: CardData): Promise<void> {
        await axios.post(this.baseURL, cardData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async getCards(): Promise<CardData[]> {
        const response = await axios.get(this.baseURL);
        return response.data as CardData[];
    }

    public async deleteCards(): Promise<void> {
        await axios.delete(this.baseURL);
    }
}

export default CardService;
