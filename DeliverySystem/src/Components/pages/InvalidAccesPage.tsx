import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  INVALID_ACCESS_MESSAGE,
  INVALID_ACCESS_TITLE,
  INVALID_ACCESS_RETURN,
} from "./constants";
import {BACKGROUND_BOTTOM, HOME_PAGE_URL, IMAGE2} from "../../constants";
import { useBodyBackground } from "../../Hooks/useBodyBackground";

export const InvalidAccessPage: React.FC = () => {
  const navigate = useNavigate();

  useBodyBackground({
    backgroundImage: IMAGE2,
    backgroundPosition: BACKGROUND_BOTTOM,
    backgroundSize: "cover",
  });

  const handleGoBack = () => {
    navigate(HOME_PAGE_URL);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "white",
        borderRadius: "50px",
        height: "400px",
        width: "600px",
        marginTop: "150px",
      }}
    >
      <TriangleAlert size={60} color={"#D3302F"} style={{ marginBottom: 20 }} />
      <Typography
        variant="h4"
        color="error"
        gutterBottom
        sx={{ fontFamily: '"Montserrat", serif' }}
      >
        {INVALID_ACCESS_TITLE}
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: "30px", fontFamily: '"Montserrat", serif', width: "450px" }}
      >
        {INVALID_ACCESS_MESSAGE}
      </Typography>
      <Box>
        <Button
          variant="contained"
          onClick={handleGoBack}
          sx={{
            borderRadius: "30px",
            backgroundColor: "#071528",
            fontFamily: '"Montserrat", serif',
            textTransform: "none",
            fontSize: "16px",
            fontWeight: "medium",
            height: "50px",
            boxShadow: "none",
            px: 3,
          }}
        >
          {INVALID_ACCESS_RETURN}
        </Button>
      </Box>
    </Container>
  );
};

export default InvalidAccessPage;
