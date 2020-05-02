import {cast, Castable} from "@bitr/castable";

export class NewOrder extends Castable {
    @cast public id: string;
    @cast public side: string;
    @cast public rate?: number;
    @cast public amount?: number;
    // tslint:disable-next-line:variable-name
    @cast public pending_amount: number;
    @cast public status: string;
    // tslint:disable-next-line:variable-name
    @cast(Date) public created_at: Date;
}
