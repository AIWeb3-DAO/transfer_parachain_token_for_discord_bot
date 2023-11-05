import { ChainInstance } from "../my_definition/class"
import { TaskData } from "../my_definition/type"
import { batch_all, sign_and_send } from "../my_fn/chain/tx";


export const simple_transfer = async (chain_instance: ChainInstance, task_list: TaskData[]) => {
    // monitor the balance of receiver
    await chain_instance.method?.balance_monitor(chain_instance, task_list[0].token, task_list.map(task => task.receiver_address))
    console.log('start monitor the balance of receiver, and wait 10s')
    await new Promise(f => setTimeout(f, 10 * 1000));
    // transfer token
    const tx_list: any = [], amount_before_tx_list = JSON.parse(JSON.stringify(chain_instance.balance_real_time))
    for (let task of task_list) {
        const tx_transfer = await chain_instance.method?.currence_transfer(chain_instance, task.token, task.amount, task.receiver_address)
        tx_list.push(tx_transfer)
    }
   
    task_list.length > 1 ? await batch_all(chain_instance, tx_list, false) : await sign_and_send(chain_instance, tx_list[0], false)
    //generate array including 0 1 2 3 ... task_list.length
    let imcomplete_task_list = Array.from({ length: task_list.length }, (_, i) => i)
    // monitor the balance change
    while (true) {
        const imcomplete_task_list_copy = JSON.parse(JSON.stringify(imcomplete_task_list))
        for (let i = 0; i < imcomplete_task_list_copy.length; i++) {

            let index = imcomplete_task_list_copy[i]
            let token = task_list[index].token, receiver_address = task_list[index].receiver_address
            if (chain_instance.balance_real_time[receiver_address][token].gt(amount_before_tx_list[receiver_address][token])) {
                console.log('tx success: '+ receiver_address + ' ' + token + ' ' + amount_before_tx_list[receiver_address][token].toString()+ '->'+chain_instance.balance_real_time[receiver_address][token].toString())
                imcomplete_task_list.splice(i, 1)
                // break
            }

            
        }
        console.log((task_list.length - imcomplete_task_list.length) + '/' + task_list.length + ' received the token')
        if (imcomplete_task_list.length == 0) {
            
            console.log('task completed')
            return
        }
        await new Promise(f => setTimeout(f, 1 * 1000));
    }
    // return tx_list
}