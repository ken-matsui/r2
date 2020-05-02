import {cast, Castable} from "@bitr/castable";

export class AccountsBalanceResponse extends Castable {
    @cast public success: boolean;
    @cast public jpy: number;
    @cast public btc: number;
    @cast public usd: number;
    @cast public cny: number;
    @cast public eth: number;
    @cast public etc: number;
    @cast public dao: number;
    @cast public lsk: number;
    @cast public fct: number;
    @cast public xmr: number;
    @cast public rep: number;
    @cast public xrp: number;
    @cast public zec: number;
    @cast public xem: number;
    @cast public ltc: number;
    @cast public dash: number;
    @cast public bch: number;
    // tslint:disable-next-line:variable-name
    @cast public jpy_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public btc_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public usd_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public cny_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public eth_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public etc_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public dao_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public lsk_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public fct_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public xmr_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public rep_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public xrp_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public zec_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public xem_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public ltc_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public dash_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public bch_reserved: number;
    // tslint:disable-next-line:variable-name
    @cast public jpy_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public btc_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public usd_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public cny_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public eth_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public etc_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public dao_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public lsk_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public fct_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public xmr_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public rep_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public xrp_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public zec_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public xem_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public ltc_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public dash_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public bch_lend_in_use: number;
    // tslint:disable-next-line:variable-name
    @cast public jpy_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public btc_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public usd_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public cny_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public eth_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public etc_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public dao_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public lsk_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public fct_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public xmr_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public rep_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public xrp_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public zec_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public xem_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public ltc_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public dash_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public bch_lent: number;
    // tslint:disable-next-line:variable-name
    @cast public jpy_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public btc_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public usd_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public cny_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public eth_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public etc_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public dao_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public lsk_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public fct_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public xmr_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public rep_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public xrp_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public zec_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public xem_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public ltc_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public dash_debt: number;
    // tslint:disable-next-line:variable-name
    @cast public bch_debt: number;
}
