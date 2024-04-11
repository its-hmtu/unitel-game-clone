import { Container, Row, Col } from "react-bootstrap";
import GameCard from "layout/MainLayout/components/GameCard";
import { queryPoint, useMediaQuery } from "src/utils/hooks/useMediaQuery";

const GameList = ({ type }) => {
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`);

  return (
    <Container fluid>
      <Row>
        {isMobile ? (
          <>
            <Col xs={12} lg={6} className="col-lg-4 col-sm-6 mb-sm-2 mb-2 px-2 px-sm-2 w-100">
              <GameCard type={type} isSmall={false}/>
            </Col>
            <Col xs={12} lg={6}>
              <Row className="row-cols-2">
                <Col className="px-2 px-sm-2 mt-sm-2 mt-2">
                  <GameCard type={type} isSmall={true}/>
                </Col>
                <Col className="px-2 px-sm-2 mt-sm-2 mt-2">
                  <GameCard type={type} isSmall={true}/>
                </Col>
              </Row>
            </Col>
          </>
        ) : (
          <>
            <Col className="col-lg-4 col-sm-6 pb-sm-3 px-0 px-sm-2">
              <GameCard type={type} isSmall={true}/>
            </Col>
            <Col className="col-lg-4 col-sm-6 pb-sm-3 px-0 px-sm-2">
              <GameCard type={type} isSmall={true}/>
            </Col>
            <Col className="col-lg-4 col-sm-6 pb-sm-3 px-0 px-sm-2">
              <GameCard type={type} isSmall={true}/>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default GameList;
