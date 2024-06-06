import { useState, useEffect } from "react";
import GameList from "./components/GameList";
import Slider from "./components/Slider";
import { Row, Tabs, Tab } from "react-bootstrap";
import SearchBar from "components/SearchBar";
import { useTranslation } from "react-i18next";
import { queryPoint, useMediaQuery } from "src/utils/hooks/useMediaQuery";
import SliderMobile from "./components/SliderMobile";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { t } = useTranslation();
  const [key, setKey] = useState("all-game");

  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`);

  const [searchValue, setSearchValue] = useState('')

  return (
    <>
      <div className="slider">
        {isMobile ? <SliderMobile /> : <Slider />}
        <div className="noti">
          <marquee>Congrats</marquee>
        </div>
      </div>
      <Row className="game-list mx-0 mx-auto">
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mx-0 mx-sm-2 px-3"
        >
          <Tab eventKey={"all-game"} title={t("all-game")}>
            <GameList type="play" searchValue={searchValue} />
          </Tab>

          <Tab eventKey="how-to-play" title={t("game_card.how_to_play")}>
            <GameList type="how-to-play" searchValue={searchValue} />
          </Tab>
        </Tabs>

        {isMobile ? null : (
          <div className="search-bar">
            <SearchBar 
              searchIcon={true}
              type="text" 
              placeholder={t("search_bar")} 
              onChange={e => setSearchValue(e.target.value)} 
            />
          </div>
        )}
      </Row>
    </>
  );
};

export default HomePage;
