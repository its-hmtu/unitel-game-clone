import { Skeleton } from "@mui/material";
import React from "react";
import { Card } from "react-bootstrap";

const GameCardLoading = ({ isSmall }) => {
  return (
    <Card className={isSmall ? "card-small" : "card-medium"}>
      <div style={{backgroundColor: "#001B32"}}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={isSmall ? 150 : 300}
          style={{
            borderRadius: "4px 4px 0 0",
            backgroundColor: "#ffffff21",
          }}
        />
      </div>

      <Card.Body>
        <div>
          <Card.Title>
            <Skeleton
              animation="wave"
              variant="text"
              width={80}
              style={{ backgroundColor: "#ffffff21" }}
            />
          </Card.Title>
          <Card.Text>
            <Skeleton
              animation="wave"
              variant="text"
              width={100}
              style={{ backgroundColor: "#ffffff21" }}
            />
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GameCardLoading;
