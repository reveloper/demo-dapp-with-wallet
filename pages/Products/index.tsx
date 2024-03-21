import data from '../../assets/products.json';
import { Box } from '../../components/Box';
import { Product } from '../../components/Product';
import { useMainButton } from '../../hooks';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../constant';
import {useAppContext} from "../../app/AppContext";

export const Products = () => {
  const navigate = useNavigate();

  const { cart, addProduct, removeProduct } = useAppContext();

  const handleClick = useCallback(() => {
    if (Object.keys(cart).length === 0) {
      return;
    }

    navigate(Routes.CHECKOUT);
  }, [cart, navigate])

  const mainButton = useMainButton({ text: 'View order', onClick: handleClick, isEnabled: false });

  useEffect(() => {
    if (Object.keys(cart).length > 0 && !mainButton.isEnabled) {
      mainButton.enable();
      return;
    }
  }, [cart, mainButton]);

  return (
    <Box display="flex" flexDirection="column" gap="24px" width="100%" p="16px">
      {data.products.map((product, index) => (
        <Product
          canAdd={Object.keys(cart).length < 3}
          product={product.id in cart ? cart[product.id] : { ...product, quantity: 0 }}
          onAdd={addProduct}
          onRemove={removeProduct}
          key={index}
        />
      ))}
    </Box>
  )
}
