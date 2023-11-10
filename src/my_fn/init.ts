
import { ApiPromise, ApiRx, Keyring, WsProvider } from "@polkadot/api";
import { user_input } from "../../config/user_input";
import { MultiChainName, TaskData } from "../my_definition/type";
import { Observable } from "rxjs";
import { ChainInstance } from "../my_definition/class";
import { program } from "commander";
import * as fn_parachain from "../my_fn/chain/parachain";
import { get_bn_from_chain_data, get_bn_from_point_number } from "./math";
import BN from "bn.js";

program
    // .option('--chain <string>', 'chain_name')
    .option('--seed_phase <string>', 'seed_phase')
.option('--task_path <string>', 'task_path')
program.parse(process.argv)

const command_input = program.opts()

export const chain_instance_init = async (chain_name:MultiChainName): Promise<ChainInstance> => {



    // const chain_name = command_input.chain as MultiChainName
    const rpc_url = user_input.chain[chain_name].rpc
    const wsProvider = new WsProvider(rpc_url)
    const api = await ApiPromise.create({ provider: wsProvider })
    const api_rx$: Observable<ApiRx> = ApiRx.create({ provider: wsProvider })
    const api_rx = await api_rx$.toPromise() as ApiRx
    const pallet_seed_phase = command_input.seed_phase as string
    const keyring = new Keyring({ type: 'sr25519' })
    const signer = keyring.addFromUri(pallet_seed_phase)
    const chain_instance = new ChainInstance(
        chain_name,
        api,
        api_rx,
        signer
    )
    chain_instance.method = {
        balance_monitor: fn_parachain.balance_monitor,
        currence_transfer: fn_parachain.currence_transfer

    }
    return chain_instance
}

export const task_init = async () => {
    const task_path = command_input.task_path as string
    // const task_path = 'src/public_data/transfer_data.csv'
    const fs = require('fs')
    const Papa = require('papaparse')
    let csvData = fs.readFileSync(task_path, 'utf8');
    let results = Papa.parse(csvData, {
        header: true
    });
    const task_data: TaskData[] = []
    
    // console.log('task_data', results.data)
    results.data.forEach((row: any) => {
        if (!row.chain_name) {
            return
        }
        task_data.push(
            {
                chain_name: row.chain_name,
                token: row.token,
                amount: get_bn_from_point_number(Number(row.amount),user_input.decimal[row.token])   ,// get_bn_from_chain_data can not handle the point number   get_bn_from_chain_data(row.amount.toString()).mul(user_input.decimal[row.token]),
                receiver_address: row.receiver_address
            }
        )
    })
    return task_data
}
// new BN(Number(row.amount) * user_input.decimal[row.token].toNumber())