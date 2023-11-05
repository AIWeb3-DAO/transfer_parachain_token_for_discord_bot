import { ApiPromise, ApiRx } from "@polkadot/api";
import { MultiChainName, UserInput } from "./type";
import { chain_instance_init } from "../my_fn/init";
import { user_input } from "../../config/user_input";
import * as fn_parachain from "../my_fn/chain/parachain";
import BN from "bn.js";




export class ChainInstance {
    chain_name: MultiChainName;
    chain_type: "pallet" | "evm" = "pallet" // default is pallet
    api: ApiPromise
    api_rx: ApiRx
    user_input:UserInput
    method?:{
        currence_transfer:typeof fn_parachain.currence_transfer
        balance_monitor: typeof fn_parachain.balance_monitor
    }
    signer:any
    balance_real_time:Record<
        string, Record<string,BN>
    >={}  // should be like 5xxxxx: { ACA: 100, ASTR: 100 }
    constructor(chain_name: MultiChainName,api:ApiPromise,api_rx:ApiRx) {
        this.chain_name = chain_name
        this.api = api
        this.api_rx = api_rx
        this.user_input =  user_input
    }
}