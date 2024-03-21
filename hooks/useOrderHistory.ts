import { useCloudStorage } from '@tma.js/sdk-react';
import { useCallback, useEffect, useState } from 'react';
import { Cart } from '../app/AppContext';

export type Order = {
  id: string;
  cart: Cart;
  status: 'pending' | 'fulfilled';
}

export const useOrderHistory = () => {
  const { get, set } = useCloudStorage();

  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = useCallback((cart: Cart) => {
    setOrders((previousOrders) => {
      if (previousOrders.length === 0) {
        return [{ id: '0', cart, status: 'pending' }]
      }

      const newOrder: Order = { id: String(previousOrders.length), cart, status: 'pending' }
      const newOrders: Order[] = [...previousOrders, newOrder];

      set('orderHistory', JSON.stringify(newOrders)).then(() => {
        console.log('Order created');
      });

      return newOrders;
    })
  }, [set])

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    const orderIndex = orders.findIndex((order) => order.id === orderId);

    if (orderIndex === -1) {
      return;
    }

    setOrders((previousOrders) =>
      previousOrders.map((order, index) => index === orderIndex ? { ...order, status } : order)
    )
  }, [orders])

  useEffect(() => {
    get('orderHistory').then((value) => {
      if (!value) {
        return;
      }

      setOrders(JSON.parse(value));
    })
  }, [])

  return { orders, createOrder, updateOrderStatus }
}
