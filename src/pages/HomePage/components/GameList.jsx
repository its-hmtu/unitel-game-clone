import { Container, Row, Col } from "react-bootstrap";
import GameCard from "layout/MainLayout/components/GameCard";
import { queryPoint, useMediaQuery } from "src/utils/hooks/useMediaQuery";
import { useEffect, useState, memo, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGames } from "src/store/game/actions";
import { useQuery } from "react-query";
import { getAllGameQuery } from "src/data/game";
import GameCardLoading from "src/layout/MainLayout/components/GameCard/GameCardLoading";

const GameList = ({ type, searchValue }) => {
  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`);
  // const gameList = useSelector((state) => state.game.games);
  // const dispatch = useDispatch()
  const [list, setList] = useState([]);
  const [listHot, setListHot] = useState([]);
  const [listNotHot, setListNotHot] = useState([]);

  const {data: games, isLoading} = useQuery(getAllGameQuery());

  const isHot = games?.filter((item) => item.isHot);
  const notHot = games?.filter((item) => !item.isHot);

  useEffect(() => {
    console.log(games);
  }, []);

  useEffect(() => {
    if (games) {
      setList(games);
      setListHot(isHot);
      setListNotHot(notHot);
    } else {
      setList([]);
      setListHot([]);
      setListNotHot([]);
    }
  }, [games]);

  useEffect(() => {
    if (searchValue)
      setList(
        list.filter((item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    else setList(games);
  }, [searchValue]);

  return (
    <Container fluid>
      {list?.length > 0 ? (
        <Row>
          {isMobile ? (
            <>
              {list
                ?.filter((item) => item.is_hot)
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
                  {list
                    ?.filter((item) => !item.is_hot)
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
              {list
                ?.filter((item) => item.is_hot)
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
              {list
                ?.filter((item) => !item.is_hot)
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
      ) : (
        <Row>
          <Col className="col-lg-4 col-sm-6 pb-sm-3 px-0 px-sm-2">
            <GameCardLoading isSmall={true} />
          </Col>

          <Col className="col-lg-4 col-sm-6 pb-sm-3 px-0 px-sm-2">
            <GameCardLoading isSmall={true} />
          </Col>

          <Col className="col-lg-4 col-sm-6 pb-sm-3 px-0 px-sm-2">
            <GameCardLoading isSmall={true} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default memo(GameList);
