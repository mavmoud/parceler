import { Typography } from "@mui/material";
import { useBodyBackground } from "../../../Hooks/useBodyBackground.ts";
import { BACKGROUND_BOTTOM, IMAGE2 } from "../../../constants.ts";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Formik, FormikErrors } from "formik";
import { useNavigate } from "react-router-dom";
import { OrderService } from "../../../services/OrderService";
import { PageTitle } from "../../PageTitle.tsx"
import { StyledTextField } from "../../StyledTextField.tsx";

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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
            <PageTitle title="Track Package" />
            <TrackDisplay />
        </div>
      );
    };
  
  const TrackDisplay = () => {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    return (
      <Card sx={{
        width: "450px",
        padding: "25px",
        borderRadius: "50px",
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
              <StyledTextField
                id="trackingNumber"
                label="Tracking Number"
                variant="outlined"
                name="trackingNumber"
                fullWidth
                value={formik.values.trackingNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{
                  marginBottom: "15px",
                }}
                error={Boolean(formik.errors.trackingNumber) && formik.touched.trackingNumber}
                // helperText={formik.touched.trackingNumber && formik.errors.trackingNumber}
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
                    borderRadius: '30px',
                    backgroundColor: "#071528",
                    fontFamily: '"Montserrat", serif',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 'medium',
                    height: '50px',
                    boxShadow: 'none'
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