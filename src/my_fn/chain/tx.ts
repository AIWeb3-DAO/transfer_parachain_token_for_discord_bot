import { ChainInstance } from "../../my_definition/class"


export type CallbackParamType = {
    events?: any[];
    status: any;
    txHash: any;
};
export const sign_and_send = async (chain_instance: ChainInstance, tx: any, if_tip: boolean): Promise<boolean> => {
    // console.log('tx',JSON.stringify(tx))
    if (!tx) {
        console.log('tx is not exist in sign_and_send', chain_instance.chain_name)
        return false
    }

    console.time('fn_sign_and_send')

    try {

        let tx_success = undefined
        const tx_hash = await tx.signAndSend(chain_instance.signer,
            {
                tip:0
            },
            ({ events = [], status, txHash }: CallbackParamType) => {
                // console.log(`Current status is ${status.type}`);

                if (status.isFinalized) {
                    // console.log(`Transaction included at blockHash ${status.asFinalized}`);
                    events.forEach(({ phase, event: { data, method, section } }) => {
                        // console.log(method)
                        if (method == 'ExtrinsicSuccess') {
                            tx_success = true
                            console.log('tx succeed')
                        } else if (method == 'ExtrinsicFailed') {
                            tx_success = false
                            console.log('tx failed')
                        }
                    })
                }
            }
        )
        console.timeEnd('fn_sign_and_send')
        console.log('tx submitted')
        // return true
        var tx_wait_count = 0
        while (true) {
            if (tx_success == true) {
                return true
            } else if (tx_success == false) {

                return false
            }
            tx_wait_count++
            if (tx_wait_count > 60) {
                var text = 'error when waiting tx_success result in fn_sign_and_send ' + chain_instance.chain_name
                console.log(text)
                // telegram_send(text)
                return true // this may be for the connection is down
            }
            await new Promise(f => setTimeout(f, 1 * 1000)); // jam???
        }


    } catch (error) {
        console.log('fn_sign_and_send error')
        console.log(error)
        return false
    }


}

export const batch_all = async (chain_instance: ChainInstance, txs: any, if_tip: boolean): Promise<boolean> => {
    // console.log('txs',JSON.stringify(txs))
    let is_valid_tx = true
    txs.forEach((tx: any) => {
        if (!tx) {
            console.log('txes is not exist in batch_all', chain_instance.chain_name)
            is_valid_tx = false
        }
    })
    if (!is_valid_tx) {
        return false
    }
    let api = chain_instance.api
    if (!api) {
        console.log('api not exist in batch_all', chain_instance.chain_name)
        return false
    }

    console.time('fn_batch_all')


    try {


        let tx_success = undefined
        const tx_hash = await api.tx.utility.batchAll(txs).signAndSend(chain_instance.signer,
            {
                tip:0
            },
            ({ events = [], status, txHash }: CallbackParamType) => {
                // console.log(`Current status is ${status.type}`);

                if (status.isFinalized) {
                    // console.log(`Transaction included at blockHash ${status.asFinalized}`);
                    events.forEach(({ phase, event: { data, method, section } }) => {
                        // console.log(method)
                        if (method == 'ExtrinsicSuccess') {
                            tx_success = true
                            console.log('tx succeed')
                        } else if (method == 'ExtrinsicFailed') {
                            tx_success = false
                            console.log('tx failed')
                        }
                    })
                }
            }
        )

        console.timeEnd('fn_batch_all')
        console.log('tx submitted')
        // return true
        var tx_wait_count = 0
        while (true) {
            if (tx_success == true) {
                return true
            } else if (tx_success == false) {
                return false

            }
            tx_wait_count++
            if (tx_wait_count > 60) {
                var text = 'error when waiting tx_success result in fn_batch_all ' + chain_instance.chain_name
                console.log(text)
                // telegram_send(text)
                return true
            }
            await new Promise(f => setTimeout(f, 1 * 1000)); // jam???
        }


    } catch (error) {
        console.log('fn_batch_all error')
        console.log(error)

        await new Promise(f => setTimeout(f, 5 * 1000));
        return false
    }

}