import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { CheckCircle } from "lucide-react";
import { ROLE_USER, useAuthentication } from "../../../Hooks/useAuthentication";
import { OrderPayload, PaymentService } from "../../../services";
import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";

export function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthentication(ROLE_USER);
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const { enqueueSnackbar } = useSnackbar();

  interface PaymentPayload {
    weight: number;
    recipientFirstName: string;
    recipientLastName: string;
    senderAddress: string;
    recipientAddress: string;
  }

  const confirmPaymentAndCreateOrder = useCallback(async () => {
    if (sessionStorage.getItem("orderCreated") || !sessionId) return;

    try {
      const data = sessionStorage.getItem("shipmentPayload");
      if (data) {
        const payload: PaymentPayload = JSON.parse(data);

        const orderPayload: OrderPayload = {
          weight: payload.weight,
          recipientFirstName: payload.recipientFirstName,
          recipientLastName: payload.recipientLastName,
          senderAddress: payload.senderAddress,
          recipientAddress: payload.recipientAddress,
          sessionId,
        };

        sessionStorage.setItem("orderCreated", "true");

        const res = await PaymentService.CreateOrder(orderPayload);
        setTrackingNumber(res.trackingNumber);
        enqueueSnackbar(res.message, { variant: "success" });
      }
    } catch (err: any) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      sessionStorage.removeItem("shipmentPayload");
      sessionStorage.removeItem("orderCreated");
    }
  }, [enqueueSnackbar, sessionId]);

  useEffect(() => {
    confirmPaymentAndCreateOrder();
  }, [confirmPaymentAndCreateOrder]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0D0D0D, #1A1A1A)",
      }}
    >
      <Card
        sx={{
          width: "600px",
          borderRadius: "30px",
          textAlign: "center",
          backgroundColor: "#FFFFFF",
          padding: "40px 20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <CheckCircle color="#28a745" size={64} />
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Montserrat", serif',
              fontWeight: "bold",
              color: "#071528",
              marginTop: "20px",
            }}
          >
            Shipment Confirmed!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Inter", serif',
              color: "#848D9D",
              marginTop: "10px",
              fontSize: "16px",
            }}
          >
            Your shipment has been successfully created. A confirmation email
            has been sent to your inbox with tracking details.
          </Typography>

          {/* Shipment Details Section */}
          <Box
            sx={{
              marginTop: "30px",
              textAlign: "left",
              borderRadius: "20px",
              backgroundColor: "#F9FAFB",
              padding: "20px",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Montserrat", serif',
                fontWeight: "medium",
                color: "#071528",
                fontSize: "16px",
              }}
            >
              Tracking Number: <strong>{trackingNumber}</strong>
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Montserrat", serif',
                fontWeight: "medium",
                color: "#071528",
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              Recipient:{" "}
              <strong>
                {user?.userInfo?.firstName} {user?.userInfo?.lastName}
              </strong>
            </Typography>
          </Box>

          {/* Button to go back */}
          <Button
            onClick={() => navigate(`/user-dashboard/${user?.userInfo?.id}`)}
            variant="contained"
            fullWidth
            sx={{
              marginTop: "30px",
              borderRadius: "30px",
              backgroundColor: "#071528",
              fontFamily: '"Montserrat", serif',
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "medium",
              height: "50px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#0A1733",
              },
            }}
          >
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
