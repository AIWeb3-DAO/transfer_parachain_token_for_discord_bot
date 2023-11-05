import BN from "bn.js"
import { decimal } from "../../config"


export type MultiChainName = 'acala' | 'polkadot' | 'bifrost_dot' | 'astar'

export type UserInput = {
    chain:{[chain_name in MultiChainName]: {
        rpc:string,
        gas_token:string,
    }}

    decimal:{
        [token:string]:BN
    }
    
}



