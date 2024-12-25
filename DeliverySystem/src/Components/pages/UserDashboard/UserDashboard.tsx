import { Grid2, Typography, Button } from "@mui/material";
import { useAuthentication, ROLE_USER } from "../../../Hooks/useAuthentication";
import { QUOTE_URL } from "../../../constants";
import { USER_DASHBOARD_TITLE } from "./constants";
import { UserOrderTable } from "./UserOrderTable";
import { Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../../PageTitle.tsx";

export const UserDashboard = () => {

  const navigate = useNavigate();
  const user = useAuthentication(ROLE_USER);

  return (
    <Grid2
        // xs={12} md={7}
    >
      <Grid2 container direction="column" alignItems="center">
        <Grid2>
          <PageTitle
            title={`${user?.userInfo?.firstName}'s ${USER_DASHBOARD_TITLE}`}
          />
        </Grid2>

        <Grid2
          width={"800px"}
          sx={{
            height: "400px",
            overflowY: "auto",
            borderRadius: "50px",
          }}
        >
          <UserOrderTable />

        </Grid2>
        <Grid2 pt={"40px"}>
          <Button
            variant="contained"
            disableRipple
            sx={{
              borderRadius: "30px",
              height: "50px",
              width: "250px",
              boxShadow: "none",
              color: "#071528",
              gap: "10px",
              backgroundColor: "white",
            }}
            onClick={() => navigate(QUOTE_URL)}
          >
            <Truck />
            <Typography
              sx={{
                fontFamily: '"Montserrat", serif',
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "medium",
              }}
            >
              Create Shipment
            </Typography>
          </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
