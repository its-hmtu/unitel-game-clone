import { Skeleton } from "@mui/material";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSettingQuery } from "src/data/user";

const SettingPage = () => {
  const { type } = useParams();
  const { data: helpData, isLoading } = useQuery(getSettingQuery());
  const HTML = (helpData && helpData.find((item) => item.type === type)) || "";

  return (
    <Container fluid className="setting-container">
      {isLoading ? (
        <div className="my-5">
          <Skeleton
            variant="text"
            width={200}
            height={30}
            style={{
              borderRadius: "10px",
              margin: "0",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          />
          <Skeleton
            variant="text"
            width={500}
            height={30}
            style={{
              borderRadius: "10px",
              margin: "0",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          />

          <Skeleton
            variant="text"
            width={400}
            height={30}
            style={{
              borderRadius: "10px",
              margin: "0",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          />

          <Skeleton
            variant="text"
            width={100}
            height={30}
            style={{
              borderRadius: "10px",
              margin: "0",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          />

          <Skeleton
            variant="text"
            width={700}
            height={30}
            style={{
              borderRadius: "10px",
              margin: "0",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          />

          <Skeleton
            variant="text"
            width={400}
            height={30}
            style={{
              borderRadius: "10px",
              margin: "0",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          />
        </div>
      ) : (
        <div
          className="setting-content"
          dangerouslySetInnerHTML={{ __html: HTML.content }}
        />
      )}
    </Container>
  );
};

export default SettingPage;
