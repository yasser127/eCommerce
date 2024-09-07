import { Col, Row } from "react-bootstrap";

type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
};

type HasId = { id?: number };

const GridList = <T extends HasId>({
  records,
  renderItem,
}: GridListProps<T>) => {
  const categoriesList =
    records.length > 0
      ? records.map((record) => (
          <Col
            xs={3}
            key={record.id}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {renderItem(record)}
          </Col>
        ))
      : "there are no categories";
  return <Row>{categoriesList}</Row>;
};

export default GridList;
