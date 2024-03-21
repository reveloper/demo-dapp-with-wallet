import {beginCell, toNano, Address} from '@ton/ton'
import {ENV} from "../../local-env";
// transfer#0f8a7ea5 query_id:uint64 amount:(VarUInteger 16) destination:MsgAddress
// response_destination:MsgAddress custom_payload:(Maybe ^Cell)
// forward_ton_amount:(VarUInteger 16) forward_payload:(Either Cell ^Cell)
// = InternalMsgBody;

export function createTransferBody(orderID:string) {

    const destinationAddress = Address.parse(ENV.tonwallet);

    const forwardPayload = beginCell()
        .storeUint(0, 32) // 0 opcode means we have a comment
        .storeStringTail(orderID)
        .endCell();

    const body = beginCell()
        .storeUint(0x0f8a7ea5, 32) // opcode for jetton transfer
        .storeUint(0, 64) // query id
        .storeCoins(1000000) // jetton amount, amount * 10^6
        .storeAddress(destinationAddress) // TON wallet destination address
        .storeAddress(destinationAddress) // response excess destination
        .storeBit(0) // no custom payload
        .storeCoins(toNano('0.02')) // forward amount (if >0, will send notification message)
        .storeBit(1) // we store forwardPayload as a reference
        .storeRef(forwardPayload)
        .endCell();

    return body;

}