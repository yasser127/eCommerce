import styles from "./styles.module.css";

type productInfoProps = {
  title: string;
  img: string;
  price: number;
  quantity?: number;
  children?: React.ReactNode;
  direction?: "row" | "column";
  style?: React.CSSProperties;
};

const ProductInfo = ({
  title,
  img,
  price,
  children,
  quantity,
  direction = "row",
  style,
}: productInfoProps) => {
  return (
    <div className={`${styles[`product-${direction}`]}`} style={style}>
      <div className={`${styles[`productImg-${direction}`]}`}>
        <img src={img} alt={title} />
      </div>
      <div className={`${styles[`productInfo-${direction}`]}`}>
        <h2 title={title}>{title}</h2>
        <h3>{price.toFixed(2)} LBP</h3>
        {quantity && <h3>Total Quantity: {quantity}</h3>}
        {quantity && <h3>Total Price: {(quantity * price).toFixed(2)}</h3>}
        {children}
      </div>
    </div>
  );
};

export default ProductInfo;
