import { UserInput } from "../src/my_definition/type";
import { bn_from_decimal } from "../src/my_fn/math";



export const user_input: UserInput = {

    chain: {
        'acala': {
            rpc: 'wss://acala.polkawallet.io',
            gas_token: 'ACA',
        },
        'polkadot': {
            rpc: 'wss://polkadot-rpc.dwellir.com',
            gas_token: 'DOT',
        },
        'bifrost_dot': {
            rpc: 'wss://hk.p.bifrost-rpc.liebi.com/ws',
            gas_token: 'BNC_dot',
        },
        'astar': {
            rpc: 'wss://rpc.astar.network',
            gas_token: 'ASTR',
        },
        'zeitgeist':{
            rpc:'wss://zeitgeist-rpc.dwellir.com',
            gas_token:'ZTG'
        },
        'centrifuge':{
            rpc:'wss://rpc-centrifuge.luckyfriday.io',
            gas_token:'CFG'
        },


        'kusama': {
            rpc:'wss://kusama-rpc.polkadot.io',
            gas_token:'KSM'
        },
        'bifrost_ksm':{
            rpc: 'wss://bifrost-rpc.liebi.com/ws',// 'wss://bifrost-rpc.dwellir.com', 
            gas_token:'BNC_ksm'
        }

    },


    decimal: {
        'DOT': bn_from_decimal(10),
        'ASTR': bn_from_decimal(18),
        'ACA': bn_from_decimal(12),
        'BNC_dot': bn_from_decimal(12), // this is BNC of bifrost_dot

        'ZTG':bn_from_decimal(10),
        'CFG':bn_from_decimal(18),

        'KSM':bn_from_decimal(12),
        'BNC_ksm': bn_from_decimal(12), // this is BNC of bifrost_dot
    }
}
