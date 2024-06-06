import { use } from "i18next";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getAllGame } from "src/api/game";
import SearchBar from "src/components/SearchBar";
import GameCard from "src/layout/MainLayout/components/GameCard";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAllGame } from "src/store/actions";

const OtherGames = ({gameList, roomId}) => {
  const { t } = useTranslation();
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setList(gameList?.filter((item) => item.id != roomId))
  }, [gameList, roomId])

  useEffect(() => {
    if (searchValue)
      setList(list.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())))
    else 
      setList(gameList.filter((item) => item.id != roomId))
   }, [searchValue])

  return (
    <Container fluid className="other-game">
      <Row className="justify-content-between align-items-center">
        <h1 className="other-game-title">{t("room.other_game")}</h1>
        <div className="search-bar other-game-search-bar">
          <SearchBar
            type="text"
            placeholder={t("search_bar")}
            onChange={(e) => setSearchValue(e.target.value)}
            searchIcon={true}
          />
        </div>
      </Row>

      <Row className="mt-1 g-3">
        {list
          .filter((item) => item.isHot)
          .map((item) => (
            <Col
              className="pe-2 px-0 px-sm-2 col-lg-3 col-sm-6 col-6"
              key={item.id}
            >
              <GameCard
                type={'play'}
                isSmall={true}
                data={item}
                idGame={item.id}
              />
            </Col>
          ))}
        {Array.isArray(list) &&
          list
            .filter((item) => !item.isHot)
            .map((item, index) => {
              return (
                <Col
                  className="pe-2 px-0 px-sm-2 col-lg-3 col-sm-6 col-6" 
                  key={index}>
                  <GameCard
                    isSmall={true}
                    data={item}
                    type={"play"}
                    idGame={item.id}
                  />
                </Col>
              );
            })}
      </Row>
    </Container>
  );
};

export default OtherGames;
