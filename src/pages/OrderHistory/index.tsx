import { Box } from '../../components/Box';
import { styles } from './OrderHistory.styles';
import { useBackButton, useMainButton } from '../../hooks';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../constant';
import {useAppContext} from "../../app/AppContext";
import {tryGetResult} from '../../components/TxComponents/TxListener';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type Order = {
  id: string;
  status: 'pending' | 'fulfilled';
  link: string;
}

const browserURL = "https://tonviewer.com/";
const browserTx = "transaction/";


//TO DO create hooks and Idgenerator
const orderId = '12345';

const orders: Order[] = [
  { id: '12345', status: 'pending', link : "" },
  { id: '54321', status: 'fulfilled', link: "" },
]

const statusMap = {
  pending: 'Awaiting payment',
  fulfilled: 'Ready for pickup'
}

export const OrderHistory = () => {

  const {txHash} = useAppContext();

  if (typeof(txHash) !== 'string') {
    throw new Error("Invalid txHash");
  }



  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(Routes.PRODUCTS)
  }, [navigate])

  useBackButton(handleClick);
  useMainButton({ text: 'Back to catalog', onClick: handleClick });

  return (
    <Box px="16px">
      <header css={styles.header}>Order history</header>

      <Box display="flex" flexDirection="column" gap="8px" mt="16px">
        {orders.map((order) => (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            radius="8px"
            background="#f2f2f2"
            width="100%"
            py="8px"
            px="16px"
            key={order.id}
          >
            <h3 css={styles.title}>ID: {order.id}</h3>

            <div css={styles.status}>
              <img src={`/images/order-${order.status}.svg`} alt={order.status}  css={styles.statusImage} />
               <span>{statusMap[order.status]}</span>
              <a href={browserURL + browserTx + txHash} target="_blank" rel="noopener noreferrer">View Tx</a>
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
