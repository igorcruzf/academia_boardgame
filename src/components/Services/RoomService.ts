import axios, {AxiosError} from "axios";

export interface PlayerScore {
    playerId: number;
    score: number;

}
class RoomService {
    private readonly baseURL: string;

    constructor() {
        this.baseURL = 'https://academia-4oto.onrender.com/rooms';
    }
    public async createRoom(roomName: string): Promise<void> {
        try{
            await axios.post(this.baseURL, {roomName}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 409) {
                throw new Error("Room already exists");
            }
            throw new Error("Error creating room");
        }
    }

    public async nextRound(roomName: string, scoreMap: Map<number, number>): Promise<void> {
        const scores: PlayerScore[] = Array.from(scoreMap.entries()).map(([playerId, score]) => ({
            playerId,
            score
        }));
        try{
            await axios.post(this.baseURL + "/newRound", { roomName, scores }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            throw new Error("Error creating scores");
        }
    }

    public async endGame(roomName: string): Promise<void> {
        try{
            await axios.post(this.baseURL + "/newGame", { roomName }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            throw new Error("Error creating scores");
        }
    }
}

export default RoomService;
