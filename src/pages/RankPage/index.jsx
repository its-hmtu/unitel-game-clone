import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import RankTable from "./RankTable";
import { useTranslation } from "react-i18next";
import { useMediaQuery, queryPoint } from "src/utils/hooks/useMediaQuery";
import RankTableMobile from "./RankTableMobile";
import Table from "src/components/Table";

const RankPage = () => {
  const { t } = useTranslation();
  const [key, setKey] = useState(1);
  const [tab, setTab] = useState("rank");
  const FILTER_RANKING = {
    1: t("profile.gift_hist.today"),
    2: t("profile.gift_hist.this_week"),
    3: t("profile.gift_hist.this_month"),
  };

  const isMobile = useMediaQuery(`(max-width: ${queryPoint.md}px)`);

  const [rankData, setRankData] = useState([]);
  useEffect(() => {
    const data = [
      {
        rank: 1,
        playerName: "0123456789",
        gold: "1,680",
        win: 2,
        lose: 0,
      },
      {
        rank: 2,
        playerName: "2222222222",
        gold: "320",
        win: 2,
        lose: 2,
      },
      {
        rank: 3,
        playerName: "111111111",
        gold: "320",
        win: 2,
        lose: 1,
      },
      {
        rank: 4,
        playerName: "0123456789",
        gold: "240",
        win: 1,
        lose: 0,
      },
      {
        rank: 5,
        playerName: "0123456789",
        gold: "240",
        win: 1,
        lose: 0,
      },
      {
        rank: 5,
        playerName: "0123456789",
        gold: "240",
        win: 1,
        lose: 0,
      }
    ];

    setRankData(data);
  }, []);

  useEffect(() => {
    console.log(key);
  }, [key]);
  return (
    <Container fluid className="rankpage-container">
      <div
        className={`d-flex flex-column justify-content-between align-items-start my-3 ${
          isMobile ? "rank-mobile" : ""
        }`}
      >
        <Tabs activeKey={tab} onSelect={(t) => setTab(t)}>
          <Tab
            eventKey={"rank"}
            title={isMobile ? t("rankpage.title") : null}
            className="rank-tab"
          >
            {isMobile ? (
              <>
                <div className="rank-filter-mobile">
                  <Nav activeKey={key} onSelect={(k) => setKey(k)}>
                    <NavDropdown title={FILTER_RANKING[key]} align="end">
                      <NavDropdown.Item eventKey={1}>
                        {t("rankpage.day")}
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey={2}>
                        {t("rankpage.week")}
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey={3}>
                        {t("rankpage.month")}
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </div>
                <RankTableMobile data={rankData}/>
              </>
            ) : (
              <Table rankTable data={rankData} />
            )}
          </Tab>
        </Tabs>

        {isMobile ? null : (
          <div className="rank-filter-right">
            <Nav activeKey={key} onSelect={(k) => setKey(k)}>
              <NavDropdown title={FILTER_RANKING[key]} align="end">
                <NavDropdown.Item eventKey={1}>
                  {t("rankpage.day")}
                </NavDropdown.Item>
                <NavDropdown.Item eventKey={2}>
                  {t("rankpage.week")}
                </NavDropdown.Item>
                <NavDropdown.Item eventKey={3}>
                  {t("rankpage.month")}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        )}
      </div>
    </Container>
  );
};

export default RankPage;
