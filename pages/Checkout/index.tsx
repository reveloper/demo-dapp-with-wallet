import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { Routes } from '../../constant';
import { useBackButton, useMainButton } from '../../hooks';
import React, { ChangeEvent, useState } from 'react';
import {Address} from '@ton/core';
import ReactJson from 'react-json-view';
import '../../components/TxForm/style.scss';
import {createTransferBody} from '../../components/TxComponents/MessageBuilder';
import {tryProcessJetton} from "../../components/TxComponents/JettonListener";
import {SendTransactionRequest, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import { useAppContext } from '../../app/AppContext';
import { css } from '@emotion/react';
import { Box } from '../../components/Box';
import { Tabs } from '../../components/Tabs';
import { Product } from '../../components/Product';
import { RadioGroup } from '../../components/RadioGroup';

const styles = {
  header: css`
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 16px;
  `
}

export const Checkout = () => {
  const navigate = useNavigate();
  const [tonConnectUi] = useTonConnectUI();

  //TO DO create hooks and Idgenerator
  const orderId = '123456';

  const [flag, setFlag] = useState(false);

  const { setTxHash, cart, addProduct, removeProduct } = useAppContext();


  const wallet = useTonWallet();
  // In this example, we are using a predefined smart contract state initialization (`stateInit`)

  // to interact with an "EchoContract". This contract is designed to send the value back to the sender,
  // serving as a testing tool to prevent users from accidentally spending money.
  const JettonTransfer = createTransferBody(orderId);

  const defaultTx: SendTransactionRequest = {
    // The transaction is valid for 10 minutes from now, in unix epoch seconds.
    validUntil: Math.floor(Date.now() / 1000) + 600,
    messages: [

      {
        // The receiver's address.
        address: Address.parse('INSERT-YOUR-JETTON-WALLET').toString(),
        // Amount to send in nanoTON. We need 0.07 Toncoins to cover Jetton transfer fees
        amount: '70000000',
        // Payload for jetton transfer boc base64 format.
        payload: JettonTransfer.toBoc().toString("base64") ,
      },
    ],
  };
  const [tx, setTx] = useState(defaultTx);


  const handleClick =  useCallback(async() => {
    if (wallet) {
      const txHash = await  handleSend(defaultTx);
      if (txHash === "") {
        console.error('TxHash is empty');
        throw new Error('TxHash is empty');
      }
      setTxHash(txHash);
      navigate(Routes.ORDER_HISTORY);
    }
    else {
      tonConnectUi.openModal();
    }
  }, [defaultTx, handleSend, wallet, tonConnectUi, navigate, setTxHash])


  async function handleSend(tx:SendTransactionRequest) : Promise<string>  {
    try {
      const res = await tonConnectUi.sendTransaction(tx);

      const checkRes = await tryProcessJetton(orderId);
      console.log('found tx', checkRes);
      if (checkRes) {
        return checkRes;
      }
      // Если tryProcessJetton не нашла транзакцию и не было выброшено исключение,
      // можете вернуть здесь стандартное значение или обработать этот случай
    } catch (error) {
      console.error('Error during transaction check:', error);
      // Обработка ошибки, например, можно вернуть null или выбросить исключение дальше
      throw error; // или return null;
    }

    return "";

  }

  function TextForm(props: any) { //copy text button from https://stackoverflow.com/questions/73134601/copy-text-button-function-in-react-js
    const [text, setText] = useState('');

    const handleCopy = () => {
      navigator.clipboard.writeText(text);
    }
    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) =>{
      setText(event.target.value);
    }
    return (
      <>
        <div className='container'>
          <h1>{props.heading} </h1>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={text} id="myBox"
              rows={8}
              onChange={handleOnChange}
            />

            <button className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>

          </div>
        </div>
        <div className="container my-3">
          <h2>Your text summary</h2>
          <p>{text.split(" ").length} Word and {text.length} Characters</p>
          <p>{0.008 * text.split(" ").length} Minute Read</p>
          <h3>Preview</h3>
          <p>{text}</p>
        </div>
      </>
    )
  }

  useBackButton();
  useMainButton({ text: 'Connect Ton Wallet', onClick: handleClick });

  useEffect(() => {
    if (Object.keys(cart).length === 0) {
      navigate(-1);
    }
  }, [cart, navigate]);

  return (
    <Box
      width="100%"
      px="16px"
      pt="16px"
    >
      <header css={styles.header}>Order ID: 123456789</header>

      <Box display="flex" flexDirection="column" width="100%" gap="8px">
        {Object.values(cart).map((product, index) => (
          <Product product={product} size="dense" onAdd={addProduct} onRemove={removeProduct} key={index} />
        ))}
      </Box>

      <Box mt="24px" mb="16px" width="100%">
        <Tabs
          activeTab="1"
          tabs={[
            { id: '1', name: 'Pickup' },
            { id: '2', name: 'Delivery' },
          ]}
        />
      </Box>

      <RadioGroup
        name="address"
        options={[
          { id: 'address1', name: 'Praça Marquês de Pombal 12 A, 1250-162 Lisboa' },
          { id: 'address2', name: 'Momma Reenstiernas Palats, Wollmar Yxkullsgatan 23, 118 50 Stockholm' }
        ]}
      />
    </Box>
  )
}
