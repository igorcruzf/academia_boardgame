import axios from "axios";
import {AxiosError} from "axios";
export interface Room{
    name: string;
    actualRound: number;
}
export interface Player{
    name: string;
    id: number;
    room?: Room;
    scores?: Score[];
}

export interface Score{
    round: number;
    score: number;
}

class PlayerService {
    private readonly baseURL: string;
    constructor() {
        this.baseURL = 'http://localhost:3001/players';
    }
    public async getPlayers(roomName: string): Promise<Player[]> {
        try{
            const response = await axios.get(this.baseURL + `?roomName=${roomName}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                throw new Error("Room doesn't exists");
            }
            throw new Error("Error getting players");
        }
    }

    public async createPlayer(name: string, roomName: string): Promise<Player> {
        try{
            const response = await axios.post(this.baseURL, {name, roomName}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                throw new Error("Room doesn't exists");
            }
            throw new Error("Error creating player");
        }
    }
}

export default PlayerService;
