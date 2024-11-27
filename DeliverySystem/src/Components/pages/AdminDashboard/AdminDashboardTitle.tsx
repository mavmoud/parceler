import { Button, ButtonGroup } from "@mui/material";
import {
  ACCOUNTS_INDEX,
  BUTTON_ACCOUNTS_TITLE,
  BUTTON_ORDERS_TITLE,
  ORDERS_INDEX,
} from "./constant";
import { getClassName } from "./adminUtils";
import "./adminDashboard.css";

export const AdminDashboardTitle = ({ mode, setMode }) => {
  return (
    <ButtonGroup>
      <Button
        className={getClassName(mode)}
        onClick={() => setMode(ACCOUNTS_INDEX)}
      >
        {BUTTON_ACCOUNTS_TITLE}
      </Button>
      <Button
        className={getClassName(!mode)}
        onClick={() => setMode(ORDERS_INDEX)}
      >
        {BUTTON_ORDERS_TITLE}
      </Button>
    </ButtonGroup>
  );
};
