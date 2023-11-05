import BN from "bn.js"

export const bn_from_decimal = (decimal:number):BN=>{
    return new BN('1'+'0'.repeat(decimal))
}
export const get_bn_from_chain_data = (chain_data: string): BN => {
    // let chain_data = JSON.stringify(_chain_data)
    // console.log(chain_data,Number(chain_data.replace(/[^a-zA-Z0-9]/g, '')).toString())
    if (chain_data.startsWith('0x')) {
        return new BN(chain_data.substring(2), 16); // Use base 16 for hexadecimal
    }
   
    return new BN(chain_data.replace(/[^0-9]/g, ''))

}


export const get_bn_from_point_number = (point_number: number,decimal:BN): BN => {
   
    return new BN(point_number * 1e6).mul(decimal).div(new BN(1e6))
    // return new BN(chain_data.replace(/[^0-9]/g, ''))

}