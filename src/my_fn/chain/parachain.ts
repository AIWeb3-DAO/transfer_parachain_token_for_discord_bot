import BN from "bn.js";
import { ChainInstance } from "../../my_definition/class";
import { get_bn_from_chain_data } from "../math";


export const currence_transfer = async (chain_instance:ChainInstance,token:string, amount:BN, receiver:string)=>{
    const gas_token = chain_instance.user_input.chain[chain_instance.chain_name].gas_token
    if ( token != gas_token) {
       
        console.log('error, token is not gas token in currence_transfer',token, gas_token)
        return undefined
    }
    const tx = await chain_instance.api.tx.balances.transferKeepAlive(
        {Id: receiver},
        amount.toString()
        
    )
    return tx
}


export const balance_monitor = async (chain_instance:ChainInstance,token:string,receiver_list:string[])=>{
    const gas_token = chain_instance.user_input.chain[chain_instance.chain_name].gas_token
    if ( token != gas_token) {
       
        console.log('error, token is not gas token in balance_monitor',token, gas_token)
        return undefined
    }
    const call_data:any = []
    receiver_list.forEach(receiver => {
        call_data.push(
            [chain_instance.api_rx.query.system.account, receiver]
        )
    })
    const result = chain_instance.api_rx.queryMulti(call_data)
    
    result.subscribe((data:any)=>{
        for (let i =0;i<receiver_list.length;i++){
            const balance = data[i].toHuman().data.free

            const balance_record = chain_instance.balance_real_time[receiver_list[i]]
            if (!balance_record){
                chain_instance.balance_real_time[receiver_list[i]] = {}
            }
            chain_instance.balance_real_time[receiver_list[i]][token] =  get_bn_from_chain_data(balance.toString())  
        }
    })
}