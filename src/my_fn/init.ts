
import { ApiPromise, ApiRx, WsProvider } from "@polkadot/api";
import { user_input } from "../../config/user_input";
import { MultiChainName } from "../my_definition/type";
import { Observable } from "rxjs";
import { ChainInstance } from "../my_definition/class";
import { program } from "commander";
import * as fn_parachain from "../my_fn/chain/parachain";

program
    .option('--chain <string>', 'chain_name')
    .option('--test <number>', 'if test', parseFloat, 0)

program.parse(process.argv)

const command_input = program.opts()

export const chain_instance_init = async ():Promise<ChainInstance> => {
    const chain_name = command_input.chain as MultiChainName
    const rpc_url = user_input.chain[chain_name].rpc
    const wsProvider = new WsProvider(rpc_url)
    const api = await ApiPromise.create({ provider: wsProvider })
    const api_rx$: Observable<ApiRx> = ApiRx.create({ provider: wsProvider })
    const api_rx = await api_rx$.toPromise() as ApiRx

    const chain_instance = new ChainInstance(
        chain_name,
        api,
        api_rx
    )
    chain_instance.method = {
        balance_monitor: fn_parachain.balance_monitor,
        currence_transfer: fn_parachain.currence_transfer

    }
    return chain_instance
}
