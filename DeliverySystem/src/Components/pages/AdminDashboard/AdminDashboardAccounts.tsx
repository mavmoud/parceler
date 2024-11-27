import { Grid2, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserService } from "../../../services";
import { useQuery } from "@tanstack/react-query";
import {
  useAuthentication,
  ROLE_ADMIN,
} from "../../../Hooks/useAuthentication";
import { userTypeMapper } from "../../AuthForm/authFormUtils";
import "./adminDashboard.css";

export const AdminDashboardAccounts = () => {
  const user = useAuthentication(ROLE_ADMIN);
  const { data: users, isLoading } = useQuery(
    ["users", user?.userInfo?.id],
    () => UserService.GetAllUsers()
  );

  return (
    <Grid2 className="container-content" sx={{ width: "100%" }}>
      {!isLoading &&
        users &&
        users?.map((user, index) => {
          return (
            <Accordion
              key={user.email}
              sx={{
                bgcolor: "#FFFFFF",
                color: "black",
                border: "1px solid rgba(0, 0, 0, .125)",
                boxShadow: 2,
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {`Account ${++index}: ${user.firstName} ${user.lastName}`}
              </AccordionSummary>
              <AccordionDetails>
                <Typography p={1} variant="h6">{`Account Details`}</Typography>
                <Typography pl={1}>{`Account type: ${userTypeMapper.get(
                  user.userTypeId
                )}`}</Typography>
                <Typography pl={1}>{`Email: ${user.email}`}</Typography>
                <Typography
                  pl={1}
                >{`Phone number: ${user.phoneNumber}`}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </Grid2>
  );
};
