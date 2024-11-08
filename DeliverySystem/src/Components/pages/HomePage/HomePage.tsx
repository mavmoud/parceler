import { Grid2, Typography } from "@mui/material";
import { useBodyBackground } from "../../../Hooks/useBodyBackground.ts";
import { BACKGROUND_RIGHT, IMAGE3 } from "../../../constants.ts";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Truck, PackageSearch } from "lucide-react";
import { useState } from "react";
import { Formik, FormikErrors } from "formik";
import { useNavigate } from "react-router-dom";
import { OrderService } from "../../../services/OrderService";

interface FormValues {
  trackingNumber: string;
}

export const HomePage = () => {
  useBodyBackground({
    backgroundImage: IMAGE3,
    backgroundPosition: BACKGROUND_RIGHT,
    backgroundSize: "cover",
  });

  const [isQuoteDisplay, setIsQuoteDisplay] = useState(false);
  const navigate = useNavigate();

  const handleQuoteClick = () => {
    setIsQuoteDisplay(true);
  };

  const handleTrackClick = () => {
    setIsQuoteDisplay(false);
  };

  return (
    <>
      <p style={{ margin: "20px", color: "white", fontSize: "30px" }}>
        Global Reach,
        <br />
        Reliable Deliveries.
      </p>
      {isQuoteDisplay ? (
        <QuoteDisplay handleTrackClick={handleTrackClick} />
      ) : (
        <TrackDisplay handleQuoteClick={handleQuoteClick} navigate={navigate} />
      )}
    </>
  );
};

const TrackDisplay = ({
  handleQuoteClick,
  navigate,
}: {
  handleQuoteClick: () => void;
  navigate: any;
}) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  return (
    <Grid2 mt={1}>
      <Card sx={{ maxWidth: 275 }}>
        <CardContent>
          <Grid2 mt={1}>
            <Card sx={{ maxWidth: 220 }}>
              <CardContent>
                <ButtonGroup
                  variant="outlined"
                  aria-label="Basic button group"
                  sx={{ width: "190px" }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: "50%",
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": { backgroundColor: "gray" },
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <PackageSearch size={24} style={{ marginRight: "8px" }} />
                      Track
                    </span>
                  </Button>
                  <Button
                    sx={{
                      width: "50%",
                      color: "black",
                      borderColor: "black",
                      "&:hover": {
                        borderColor: "black",
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                    onClick={handleQuoteClick}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <Truck size={24} style={{ marginRight: "8px" }} />
                      Quote
                    </span>
                  </Button>
                </ButtonGroup>
              </CardContent>
            </Card>
          </Grid2>
          <Formik
            initialValues={{ trackingNumber: "" }}
            onSubmit={async (values: FormValues, { setSubmitting }) => {
              setSubmitError(null);
              setSubmitting(true);
              try {
                const orderData = await OrderService.GetOrderByTrackingNumber(
                  values.trackingNumber
                );
                if (
                  orderData?.order?.trackingNumber === values.trackingNumber
                ) {
                  navigate(`/Track/${values.trackingNumber}`);
                } else {
                  setSubmitError("Invalid tracking number");
                }
              } catch (error) {
                console.error("Error tracking the order:", error);
                setSubmitError("Invalid tracking number");
              } finally {
                setSubmitting(false);
              }
            }}
            validate={(values: FormValues) => {
              const errors: FormikErrors<FormValues> = {};
              if (!values.trackingNumber) {
                errors.trackingNumber = "Required";
              }
              return errors;
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Grid2 mt={1}>
                  <div>
                    <TextField
                      id="trackingNumber"
                      label="Tracking Number"
                      variant="outlined"
                      name="trackingNumber"
                      value={formik.values.trackingNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      sx={{ mt: "1rem" }}
                      error={
                        Boolean(formik.errors.trackingNumber) &&
                        formik.touched.trackingNumber
                      }
                      helperText={
                        formik.touched.trackingNumber &&
                        formik.errors.trackingNumber
                      }
                    />
                  </div>
                </Grid2>
                {submitError && (
                  <Typography color="red" mt={1}>
                    {submitError}
                  </Typography>
                )}
                <Grid2 mt={1}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "220px",
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": { backgroundColor: "gray" },
                    }}
                    disabled={formik.isSubmitting}
                  >
                    Track Package
                  </Button>
                </Grid2>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Grid2>
  );
};

const QuoteDisplay = ({
  handleTrackClick,
}: {
  handleTrackClick: () => void;
}) => {
  return (
    <Grid2 mt={1}>
      <Card sx={{ maxWidth: 275 }}>
        <CardContent>
          <Grid2 mt={1}>
            <Card sx={{ maxWidth: 220 }}>
              <CardContent>
                <ButtonGroup
                  variant="outlined"
                  aria-label="Basic button group"
                  sx={{ width: "190px" }}
                >
                  <Button
                    sx={{
                      width: "50%",
                      color: "black",
                      borderColor: "black",
                      "&:hover": {
                        borderColor: "black",
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                    onClick={handleTrackClick}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <PackageSearch size={24} style={{ marginRight: "8px" }} />
                      Track
                    </span>
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      width: "50%",
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": { backgroundColor: "gray" },
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <Truck size={24} style={{ marginRight: "8px" }} />
                      Quote
                    </span>
                  </Button>
                </ButtonGroup>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 mt={1}>
            <TextField id="outlined-basic" label="Origin" variant="outlined" />
          </Grid2>
          <Grid2 mt={1}>
            <TextField
              id="outlined-basic"
              label="Destination"
              variant="outlined"
            />
          </Grid2>
          <Grid2 mt={1}>
            <Button
              variant="contained"
              sx={{
                width: "220px",
                backgroundColor: "black",
                color: "white",
                "&:hover": { backgroundColor: "gray" },
              }}
            >
              Get Quote
            </Button>
          </Grid2>
        </CardContent>
      </Card>
    </Grid2>
  );
};
