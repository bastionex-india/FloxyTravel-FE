import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const CardDetails = ({ data }) => {
  return (
    <Card style={{ marginBottom: "3%" }}>
      {data !== null && (
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            style={{ paddingBottom: "23px" }}
          >
            {data.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Email: {data.email}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Contact: {data.mobile}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Bank name: {data.bankName}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Account Number: {data.accountNumber}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Account Holder name: {data.accountHolderName}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            IFSC code: {data.ifsc}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default CardDetails;
