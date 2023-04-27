import axios from "axios";
import {CardData} from "../card/Card";
class CardService {
    private readonly baseURL: string;

    constructor() {
        this.baseURL = 'https://iglu.onrender.com/cards';
    }

    public async createCard(cardData: CardData): Promise<void> {
        try {
            await axios.post(this.baseURL, cardData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Card created successfully!');
        } catch (error) {
            console.error('Failed to create card:', error);
        }
    }

    public async getCards(): Promise<CardData[]> {
        try {
            const response = await axios.get(this.baseURL);
            return response.data as CardData[];
        } catch (error) {
            console.error('Failed to fetch cards:', error);
            return [];
        }
    }

    public async deleteCards(): Promise<void>{
        try {
            await axios.delete(this.baseURL);
        } catch (error) {
            console.error('Failed to delete cards:', error);
        }
    }
}

export default CardService;
