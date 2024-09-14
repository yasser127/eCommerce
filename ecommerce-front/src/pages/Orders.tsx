import { Heading } from "@components/common";
import { Table, Modal } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { ProductInfo } from "@components/eCommerce";
import useOrders from "@hooks/useOrders";

const Orders = () => {
  const {
    loading,
    error,
    showModal,
    viewDetailsHandler,
    closeMdoalHandler,
    orderList,
    selectedProduct
  } = useOrders();
  return (
    <>
      <Modal show={showModal} onHide={closeMdoalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Products Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              quantity={el.quantity}
              direction="column"
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Modal.Body>
      </Modal>
      <Heading title="My Order" />
      <Loading status={loading} error={error} type="category">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Ttoal Price</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((el) => (
              <tr key={el.id}>
                <td>#{el.id}</td>
                <td>
                  {el.items.length} items
                  {" / "}
                  <span
                    onClick={() => viewDetailsHandler(el.id)}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Product Details
                  </span>
                </td>
                <td>{el.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Orders;
