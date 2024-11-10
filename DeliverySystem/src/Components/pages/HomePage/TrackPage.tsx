import { Grid2, Typography } from "@mui/material";
import { useBodyBackground } from "../../../Hooks/useBodyBackground.ts";
import { BACKGROUND_BOTTOM, BACKGROUND_RIGHT, IMAGE1, IMAGE2, IMAGE3 } from "../../../constants.ts";
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
  
  export const TrackPage = () => {
    useBodyBackground({
      backgroundImage: IMAGE2,
      backgroundPosition: BACKGROUND_BOTTOM,
      backgroundSize: "cover",
    });
  
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", justifyContent: "flex-start", paddingTop: "100px" }}>
          <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", marginBottom: "20px" }}>
            Track Package
          </Typography>
          <TrackDisplay />
        </div>
      );
    };
  
  const TrackDisplay = () => {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    return (
      <Card sx={{
        width: "100%",
        maxWidth: 400,
        padding: "20px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        boxShadow: 3,
      }}>
        <Formik
          initialValues={{ trackingNumber: "" }}
          onSubmit={async (values: FormValues, { setSubmitting }) => {
            setSubmitError(null);
            setSubmitting(true);
            try {
              const orderData = await OrderService.GetOrderByTrackingNumber(values.trackingNumber);
              if (orderData?.order?.trackingNumber === values.trackingNumber) {
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
            <form onSubmit={formik.handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <TextField
                id="trackingNumber"
                label="Tracking Number"
                variant="outlined"
                name="trackingNumber"
                fullWidth
                value={formik.values.trackingNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{
                  marginBottom: "20px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                  },
                }}
                error={Boolean(formik.errors.trackingNumber) && formik.touched.trackingNumber}
                helperText={formik.touched.trackingNumber && formik.errors.trackingNumber}
              />
              {submitError && (
                <Typography color="error" sx={{ marginBottom: "20px" }}>
                  {submitError}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "#111827",
                  color: "white",
                  padding: "10px",
                  borderRadius: "20px",
                  "&:hover": { backgroundColor: "#333" },
                }}
                disabled={formik.isSubmitting}
              >
                Track Package
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    );
  };