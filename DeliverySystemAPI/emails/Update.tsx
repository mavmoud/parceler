import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface UpdateEmailProps {
  trackingNumber: string;
  statusName: string;
  userName: string;
}

export const UpdateEmail = ({
  trackingNumber,
  statusName,
  userName,
}: UpdateEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>You Parceler Shipment status has been updated!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={`https://utfs.io/f/LzXUnoR8qPwfLokpzGR8qPwfCkOY1nvRFe9VB3NpZjz4abDJ`}
              height="35"
              alt="Parceler"
            />
            <Hr style={hr} />
            <Text style={paragraph}>Hi {userName},</Text>
            <Text style={paragraph}>
              Your order with tracking number <b> {trackingNumber} </b> has been
              updated to status: {statusName}.
            </Text>
            <Text style={paragraph}>Thank you for using Parceler!</Text>
            <Button
              style={button}
              href={`http://localhost:5173/track/${trackingNumber}`}
            >
              Track your Shipment
            </Button>
            <Text style={paragraph}>— The Parceler team</Text>
            <Hr style={hr} />
            <Text style={footer}>
              Parceler, 10 Parceler Blvd, Montreal, QC P4R 0E7
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default UpdateEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const button = {
  backgroundColor: "#071528",
  borderRadius: "50px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
