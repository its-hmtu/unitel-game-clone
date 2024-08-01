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
                <RankTableMobile time={key}/>
              </>
            ) : (
              // <Table rankTable data={rankData} />
              <RankTable time={key} />
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
