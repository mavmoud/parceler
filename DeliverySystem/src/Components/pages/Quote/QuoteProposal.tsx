import { MapPinCheck, Calendar1, Weight, MapPinHouse } from "lucide-react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface QuoteProposalProps {
  type: "document" | "package";
  subtype: "standard" | "large" | "small";
  originStreetNumber: string;
  originStreetName: string;
  originCity: string;
  originProvince: string;
  originPostalCode: string;
  originCountry: string;
  destinationStreetNumber: string;
  destinationStreetName: string;
  destinationCity: string;
  destinationProvince: string;
  destinationPostalCode: string;
  destinationCountry: string;
  weight?: number;
  totalPrice: number;
  distance: number;
  basePrice: number;
}

export default function QuoteProposal({
  type = "document",
  subtype = "large",
  originStreetNumber,
  originStreetName,
  originCity,
  originProvince,
  originPostalCode,
  originCountry,
  destinationStreetNumber,
  destinationStreetName,
  destinationCity,
  destinationProvince,
  destinationPostalCode,
  destinationCountry,
  weight = 5000,
  totalPrice = 10,
  distance = 500,
  basePrice = 10,
}: QuoteProposalProps) {
  const navigate = useNavigate();

  const origin = `${originCity}, ${originProvince}`;
  const destination = `${destinationCity}, ${destinationProvince}`;

  const getMaxDimensions = (): string => {
    if (type === "document") {
      return subtype === "standard"
        ? "Max dimensions: 245mm x 156mm"
        : "Max dimensions: 380mm x 270mm";
    } else {
      return subtype === "small"
        ? "Max dimensions: 35cm x 26cm x 5cm"
        : "Max dimensions: 40cm x 30cm x 20cm";
    }
  };

  const getWeight = (): { value: number; unit: string } => {
    if (type === "document") {
      return subtype === "standard"
        ? { value: 50, unit: "g" }
        : { value: 500, unit: "g" };
    }
    return { value: weight, unit: "g" };
  };

  const getDistancePrice = (): string => {
    if (type === "document") return "$0";
    return `$${(distance * 0.01).toFixed(2)}`;
  };

  const getWeightPrice = (): string => {
    if (type === "document") return "$0";
    return `$${Math.floor(weight / 100)}`;
  };

  const getTitle = (): string => {
    if (type === "document") {
      return `${subtype === "standard" ? "Standard" : "Large"} Envelope`;
    }
    return `${subtype === "small" ? "Small" : "Large"} Package`;
  };
  const handleShip = () => {
    const productName = getTitle();
    const weight = getWeight().value;
    const tax = totalPrice * 0.15;
    const totalWithTax = totalPrice + tax;

    navigate("/ship", {
      state: {
        productName,
        totalPrice,
        tax,
        totalWithTax,
        // Pass along all address components
        originStreetNumber,
        originStreetName,
        originCity,
        originProvince,
        originPostalCode,
        originCountry,
        destinationStreetNumber,
        destinationStreetName,
        destinationCity,
        destinationProvince,
        destinationPostalCode,
        destinationCountry,
        type,
        subtype,
        weight,
        distance,
        weight,
      },
    });
  };

  return (
    <Box sx={{ width: "800px", mx: "auto", borderRadius: "50px" }}>
      <Card sx={{ borderRadius: "50px" }}>
        <CardContent sx={{ m: "25px", p: "0 !important" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left Section */}
            <Box sx={{ m: "15px" }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}
              >
                <img
                  src={`/${
                    type === "document"
                      ? subtype === "standard"
                        ? "StandardEnvelope"
                        : "LargeEnvelope"
                      : subtype === "small"
                        ? "SmallPackage"
                        : "LargePackage"
                  }.svg`}
                  alt={getTitle()}
                  style={{ width: "90px", objectFit: "contain" }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontFamily: '"Montserrat", serif',
                      fontSize: "18px",
                      color: "#071528",
                    }}
                  >
                    {getTitle()}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Montserrat", serif',
                      fontSize: "12px",
                      color: "#071528",
                    }}
                  >
                    {getMaxDimensions()}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: "30px" }}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "25px" }}
                >
                  {[
                    { icon: MapPinHouse, label: "Origin", value: origin },
                    {
                      icon: Calendar1,
                      label: "Estimated Delivery",
                      value: "6-10 Business Days",
                    },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <item.icon size={"16px"} />
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: '"Inter", serif',
                            fontSize: "12px",
                            color: "#848D9D",
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"Montserrat", serif',
                            fontSize: "14px",
                            color: "#071528",
                          }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "25px" }}
                >
                  {[
                    {
                      icon: MapPinCheck,
                      label: "Destination",
                      value: destination,
                    },
                    {
                      icon: Weight,
                      label: "Weight",
                      value: `${getWeight().value} ${getWeight().unit}`,
                    },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <item.icon size={"16px"} />
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: '"Inter", serif',
                            fontSize: "12px",
                            color: "#848D9D",
                          }}
                        >
                          {item.label}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"Montserrat", serif',
                            fontSize: "14px",
                            color: "#071528",
                          }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Right Section */}
            <Box
              sx={{
                width: "340px",
                border: "1px solid rgba(132, 141, 157, 0.35)",
                borderRadius: "30px",
              }}
            >
              <Box sx={{ m: "40px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Montserrat", serif',
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: "#071528",
                    }}
                  >
                    Total Cost
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Montserrat", serif',
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: "#071528",
                    }}
                  >
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{}}>
                  {[
                    { label: getTitle(), value: `$${basePrice}` },
                    { label: "Distance", value: getDistancePrice() },
                    { label: "Weight", value: getWeightPrice() },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: '"Montserrat", serif',
                          fontSize: "16px",
                          fontWeight: "medium",
                          color: "#848D9D",
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Montserrat", serif',
                          fontSize: "16px",
                          color: "#071528",
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
          <Button
            disableRipple
            fullWidth
            variant="contained"
            onClick={handleShip}
            sx={{
              mt: "25px",
              borderRadius: "30px",
              backgroundColor: "#071528",
              fontFamily: '"Montserrat", serif',
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "medium",
              height: "50px",
              boxShadow: "none",
            }}
          >
            Ship
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
