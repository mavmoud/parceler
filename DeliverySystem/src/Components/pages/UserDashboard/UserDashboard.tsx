import { Grid2, Card, Typography, Button } from "@mui/material";
import { useBodyBackground } from "../../../Hooks/useBodyBackground";
import { useAuthentication, ROLE_USER } from "../../../Hooks/useAuthentication";
import {
  USER_INFO,
  USER_FIRST_NAME,
  USER_LAST_NAME,
} from "../../../Hooks/constants";
import { BACKGROUND_RIGHT, IMAGE3 } from "../../../constants";
import { USER_DASHBOARD_TITLE, USER_ORDER_SECTION_TITLE } from "./constants";
import { UserOrderTable } from "./UserOrderTable";

export const UserDashboard = () => {
  useBodyBackground({
    backgroundImage: IMAGE3,
    backgroundPosition: BACKGROUND_RIGHT,
    backgroundSize: "cover",
  });

  const user = useAuthentication(ROLE_USER);

  return (
    <Grid2>
      <Grid2 container justifyContent="center">
        <Grid2>
          <Typography color="white" variant="h3" p={5}>
            {`${user[USER_INFO][USER_FIRST_NAME]} ${user[USER_INFO][USER_LAST_NAME]} ${USER_DASHBOARD_TITLE}`}
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2>
        <UserOrderTable />
      </Grid2>
    </Grid2>
  );
};
