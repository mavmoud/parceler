import { Card, Typography } from "@mui/material";

export const AdminCustomCard = ({ title, first, second, third }) => {
  return (
    <Card className="card-content">
      <Typography variant="h6" p={1} sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography p={1}>{first}</Typography>
      <Typography p={1}>{second}</Typography>
      <Typography p={1}>{third}</Typography>
    </Card>
  );
};
