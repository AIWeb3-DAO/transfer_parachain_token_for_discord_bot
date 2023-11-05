import { chain_instance_init, task_init } from "./my_fn/init"
import { simple_transfer } from "./strategy/simple_transfer"

async function main(){
    
    const chain_instance = await chain_instance_init()
    const task_data_list = await task_init()

    await simple_transfer(chain_instance,task_data_list)

    console.log('process end in 5s')
    await new Promise(f => setTimeout(f, 5 * 1000))
    process.exit()
}
main().then(() => {
   
})