import BN from "bn.js"



export type MultiChainName = 'acala' | 'polkadot' | 'bifrost_dot' | 'astar' | 'zeitgeist' | 'centrifuge' | 'kusama' | 'bifrost_ksm'

export type UserInput = {
    chain:{[chain_name in MultiChainName]: {
        rpc:string,
        gas_token:string,
    }}

    decimal:{
        [token:string]:BN
    }

}
export type TaskData = {
    chain_name: MultiChainName,
    token: string,
    amount: BN,
    receiver_address:string
}


