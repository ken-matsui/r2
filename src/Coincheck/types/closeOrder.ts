import {cast, Castable} from "@bitr/castable";

export class CloseOrder extends Castable {
    @cast public id: string;
    @cast public side: string;
    @cast public rate: number;
    @cast public amount: number;
    @cast public pending_amount: number;
    @cast public status: string;
    @cast public created_at: Date;
}
