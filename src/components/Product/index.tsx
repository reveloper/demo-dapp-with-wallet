import { styles } from './Product.styles';
import { useCallback } from 'react';
import { Box } from '../Box';
import { Product as ProductEntity } from '../../app/AppContext';

type Props = {
  /**
   * Product entity
   * */
  product: ProductEntity;
  /**
   * Invokes when the product is added to cart
   * */
  onAdd?: (product: ProductEntity) => void;
  /**
   * Invokes when the product is removed from cart
   * */
  onRemove?: (product: ProductEntity) => void;
  /**
   * Product appearance variations.
   * Dense - oneline, default - full size
   * */
  size?: 'dense' | 'default';
  /**
   * Determines if new product can be added.
   * Does not affect ability to increase quantity.
   * */
  canAdd?: boolean;
}

export const Product = ({ canAdd = true, product, onAdd, onRemove, size = 'default' }: Props) => {
  const handleAdd = useCallback(() => {
    if (onAdd) {
      onAdd(product);
    }
  }, [product, onAdd])

  const handleRemove = useCallback(() => {
    if (onRemove) {
      onRemove(product);
    }
  }, [product, onRemove])

  if (size === 'dense') {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        background="#f2f2f2"
        px="16px"
        py="8px"
        radius="8px"
      >
        <Box display="flex" alignItems="center" gap="8px" width="40%">
          <h3 css={styles.title}>{product.shortName}</h3>

          <span css={styles.price}>${product.price}</span>
        </Box>

        <Box display="flex" gap="4px">
          <button css={styles.quantityButton} onClick={handleRemove}>-</button>

          <div css={styles.quantity(size)}>{product.quantity}</div>

          <button
            css={styles.quantityButton}
            disabled={product.quantity === 9}
            onClick={handleAdd}
          >
            +
          </button>
        </Box>


        {product.quantity && <span css={styles.price}>${product.quantity * product.price}</span>}
      </Box>
    )
  }

  return (
    <div css={styles.container}>
    <div css={styles.product}>
        <img src={product.image} alt={product.shortName} css={styles.image} />

        <div css={styles.content}>
          <h3 css={styles.title}>{product.shortName}</h3>

          <p css={styles.description}>{product.description}</p>

          <p>
            Price{' '}
            <span css={styles.price}>${product.price}</span>
          </p>
        </div>
      </div>

      {!product.quantity && (
        <button css={styles.button} disabled={!canAdd} onClick={handleAdd}>Add to cart</button>
      )}

      {product.quantity > 0 && (
        <div css={styles.buttonGroup}>
          <button css={styles.quantityButton} onClick={handleRemove}>-</button>

          <div css={styles.quantity()}>
            {product.quantity}
          </div>

          <button css={styles.quantityButton} disabled={product.quantity === 9} onClick={handleAdd}>+</button>
        </div>
      )}
    </div>
  )
}
