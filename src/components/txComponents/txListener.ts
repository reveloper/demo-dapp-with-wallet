
import {Cell, Address, beginCell, storeMessage, TonClient} from "@ton/ton";
import {ENV} from "../../local-env";

const client = new TonClient({
    endpoint: 'https://toncenter.com/api/v2/jsonRPC',
    apiKey: ENV.apikey, // https://t.me/tonapibot
});


export async function retry<T>(fn: () => Promise<T>, options: { retries: number, delay: number }): Promise<T> {
    let lastError: Error | undefined;
    for (let i = 0; i < options.retries; i++) {
        try {
            return await fn();
        } catch (e) {
            if (e instanceof Error) {
                lastError = e;
            }
            await new Promise(resolve => setTimeout(resolve, options.delay));
        }
    }
    throw lastError;
}


export async function getTxByBOC(exBoc: string): Promise<string> {

    const myAddress = Address.parse(ENV.tonwallet); // Address to fetch transactions from

    return retry(async () => {
        const transactions = await client.getTransactions(myAddress, {
            limit: 5,
        });
        for (const tx of transactions) {
            const inMsg = tx.inMessage;
            if (inMsg?.info.type === 'external-in') {

                const inBOC = inMsg?.body;
                if (typeof inBOC === 'undefined') {

                    reject(new Error('Invalid external'));
                    continue;
                }
                const extHash = Cell.fromBase64(exBoc).hash().toString('hex')
                const inHash = beginCell().store(storeMessage(inMsg)).endCell().hash().toString('hex')

                console.log(' hash BOC', extHash);
                console.log('inMsg hash', inHash);
                console.log('checking the tx', tx, tx.hash().toString('hex'));


                // Assuming `inBOC.hash()` is synchronous and returns a hash object with a `toString` method
                if (extHash === inHash) {
                    console.log('Tx match');
                    const txHash = tx.hash().toString('hex');
                    console.log(`Transaction Hash: ${txHash}`);
                    console.log(`Transaction LT: ${tx.lt}`);
                    return (txHash);
                }
            }
        }
        throw new Error('Transaction not found');
    }, {retries: 30, delay: 1000});
}



