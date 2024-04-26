import { Container, Row, Col } from "react-bootstrap";
import GameCard from "layout/MainLayout/components/GameCard";
import { queryPoint, useMediaQuery } from "src/utils/hooks/useMediaQuery";
import banner_daovang from "images/banne-daovang.png";
import banner_phidao from "images/banner-phidao.png";
import banner_dapchuot from "images/banner-dapchuot.png";
import { useEffect, useState, memo } from "react";
import { getAllGame } from "src/api/game";

const GameList = ({ type, searchValue }) => {
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`);
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    const fetchGameList = async () => {
      const data = await getAllGame();
      setGameList(data);
    }

    fetchGameList();
  }, []);

  useEffect(() => {
    let searched =
      Array.isArray(gameList) &&
      gameList.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );

    setGameList(searched);
  }, [searchValue]);

  return (
    <Container fluid>
      <Row>
        {isMobile ? (
          <>
            {gameList
              .filter((item) => item.isHot)
              .map((item) => (
                <Col
                  xs={12}
                  lg={6}
                  className="col-lg-4 col-sm-6 mb-sm-2 mb-2 px-2 px-sm-2 w-100"
                  key={item.id}
                >
                  <GameCard
                    type={type}
                    isSmall={false}
                    data={item}
                    idGame={item.id}
                  />
                </Col>
              ))}
            <Col xs={12} lg={6}>
              <Row className="row-cols-2">
                {gameList
                  .filter((item) => !item.isHot)
                  .map((item) => (
                    <Col className="px-2 px-sm-2 mt-sm-2 mt-2" key={item.id}>
                      <GameCard
                        type={type}
                        isSmall={true}
                        data={item}
                        idGame={item.id}
                      />
                    </Col>
                  ))}
              </Row>
            </Col>
          </>
        ) : (
          <>
            {gameList
              .filter((item) => item.isHot)
              .map((item) => (
                <Col
                  className="col-lg-4 col-sm-6 pb-sm-3 px-0 px-sm-2"
                  key={item.id}
                >
                  <GameCard
                    type={type}
                    isSmall={true}
                    data={item}
                    idGame={item.id}
                  />
                </Col>
              ))}
            {gameList
              .filter((item) => !item.isHot)
              .map((item) => (
                <Col
                  className="col-lg-4 col-sm-6 pb-sm-3 px-0 px-sm-2"
                  key={item.id}
                >
                  <GameCard
                    type={type}
                    isSmall={true}
                    data={item}
                    idGame={item.id}
                  />
                </Col>
              ))}
          </>
        )}
      </Row>
    </Container>
  );
};

export default memo(GameList);
