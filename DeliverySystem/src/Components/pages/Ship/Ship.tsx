import { Box, Button, Card, CardContent, Typography, styled } from '@mui/material'
import { useBodyBackground } from "../../../Hooks/useBodyBackground.ts";
import { BACKGROUND_BOTTOM, BACKGROUND_RIGHT, IMAGE4 } from "../../../constants.ts";
import { PageTitle } from "../../PageTitle.tsx";
import { StyledTextField } from "../../StyledTextField.tsx";
import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {ROLE_USER, useAuthentication} from "../../../Hooks/useAuthentication.ts";

const Price = styled(Typography)(() => ({
    fontFamily: '"Inter", serif',
    fontSize: '16px',
    color: "#848D9D",
    textAlign: 'right'
}))

interface ShipmentData {
    productName: string;
    totalPrice: number;
    tax: number;
    totalWithTax: number;
}

export default function Ship() {

    const user = useAuthentication(ROLE_USER);

    const [step, setStep] = useState('sender')
    const [shipmentData, setShipmentData] = useState<ShipmentData>({
        productName: '',
        totalPrice: 0,
        tax: 0,
        totalWithTax: 0
    })
    const [senderAddress, setSenderAddress] = useState('')
    const [recipientAddress, setRecipientAddress] = useState('')
    const [recipientFirstName, setRecipientFirstName] = useState('')
    const [recipientLastName, setRecipientLastName] = useState('')


    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state) {
            setShipmentData(location.state as ShipmentData);
        } else {
            // If there's no state, redirect back to the quote page
            navigate('/quote');
        }
    }, [location, navigate]);

    useBodyBackground({
        backgroundImage: IMAGE4,
        backgroundPosition: `${BACKGROUND_RIGHT} ${BACKGROUND_BOTTOM}`,
        backgroundSize: "cover",
    })

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const address = `${formData.get('senderApartment') ? formData.get('senderApartment') + '-' : ''}${formData.get('senderAddress')}, ${formData.get('senderCity')}, ${formData.get('senderState')} ${formData.get('senderPostalCode')}, ${formData.get('senderCountry')}`
        setSenderAddress(address)
        setStep('recipient')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const address = `${formData.get('recipientApartment') ? formData.get('recipientApartment') + '-' : ''}${formData.get('recipientAddress')}, ${formData.get('recipientCity')}, ${formData.get('recipientState')} ${formData.get('recipientPostalCode')}, ${formData.get('recipientCountry')}`
        const firstName = formData.get('recipientFirstName') as string
        const lastName = formData.get('recipientLastName') as string


        setRecipientAddress(address)
        setRecipientFirstName(firstName)
        setRecipientLastName(lastName)

        const initiatePayment = async () => {
            const token = localStorage.getItem("authToken"); // Retrieve the token

            if (!token) {
                console.error("Authentication token is missing");
                navigate('/login', { state: { from: location.pathname } });
                return;
            }

            try {
                const response = await axios.post(
                    "http://localhost:3001/api/payment/checkout",
                    {
                        amount: Math.round(shipmentData.totalWithTax * 100), // Convert to cents and ensure it's an integer
                        userEmail: user?.userInfo?.email,
                        productName: shipmentData.productName || "Shipment",
                    },
                    {
                        headers: {
                            Authorization: `${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                window.location.href = response.data.url;
            } catch (error) {
                console.error("Payment initiation failed:", error.response?.data || error.message);
            }
        };

        // Call the initiatePayment function
        await initiatePayment();
    }

    console.log({
        senderAddress,
        recipientAddress,
        recipientFirstName,
        recipientLastName,
        ...shipmentData
    })


    const renderFormFields = () => {
        const fields = [
            { id: 'FirstName', label: 'First Name' },
            { id: 'LastName', label: 'Last Name' },
            { id: 'Address', label: 'Address' },
            { id: 'Apartment', label: 'Apartment, suite, etc. (optional)' },
            { id: 'City', label: 'City' },
            { id: 'State', label: 'State' },
            { id: 'PostalCode', label: 'Postal Code' },
            { id: 'Country', label: 'Country' }
        ];

        return (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '14px' }}>
                    {fields.slice(0, 2).map((field) => {
                        const id = `${step}${field.id}`
                        return (
                            <StyledTextField
                                key={id}
                                fullWidth
                                id={id}
                                name={id}
                                label={field.label}
                                placeholder={field.label}
                            />
                        );
                    })}
                </Box>
                {fields.slice(2, 4).map((field) => {
                    const id = `${step}${field.id}`
                    return (
                        <StyledTextField
                            key={id}
                            fullWidth
                            id={id}
                            name={id}
                            label={field.label}
                            placeholder={field.label}
                        />
                    );
                })}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '14px' }}>
                    {fields.slice(4, 7).map((field) => {
                        const id = `${step}${field.id}`
                        return (
                            <StyledTextField
                                key={id}
                                fullWidth
                                id={id}
                                name={id}
                                label={field.label}
                                placeholder={field.label}
                            />
                        );
                    })}
                </Box>
                {fields.slice(-1).map((field) => {
                    const id = `${step}${field.id}`
                    return (
                        <StyledTextField
                            key={id}
                            fullWidth
                            id={id}
                            name={id}
                            label={field.label}
                            placeholder={field.label}
                        />
                    );
                })}
            </>
        );
    };

    return (
        <>
            <Box sx={{ width: 'fit-content', display: 'flex', mx: 'auto', justifyContent: 'space-between', gap: '40px'}}>
                <Box>
                    <PageTitle title={"Create a Shipment"}/>
                    <Card sx={{ width: '700px', mx: 'auto', borderRadius: '50px', p: '0' }}>
                        <CardContent sx={{ m: '25px', p: '0 !important' }}>
                            <Typography sx={{ml: '20px', mb: '12px', fontFamily: '"Montserrat", serif', fontSize: '18px', fontWeight: 'medium', color: "#071528"}}>
                                {step === 'sender' ? 'Ship From:' : 'Ship To:'}
                            </Typography>
                            <form onSubmit={step === 'sender' ? handleNext : handleSubmit}>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: '14px' }}>
                                    {renderFormFields()}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        disableRipple
                                        sx={{
                                            borderRadius: '30px',
                                            backgroundColor: "#071528",
                                            fontFamily: '"Montserrat", serif',
                                            textTransform: 'none',
                                            fontSize: '16px',
                                            fontWeight: 'medium',
                                            height: '50px',
                                            boxShadow: 'none'
                                        }}
                                    >
                                        {step === 'sender' ? 'Next' : 'Pay'}
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
                <Box>
                    <Box sx={{ height: '104px'}}>
                    </Box>
                    <Card sx={{ width: '280px', mx: 'auto', borderRadius: '50px', p: '0' }}>
                        <CardContent sx={{ m: '25px', p: '0 !important' }}>
                            <Box sx={{ p: '15px', mb: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
                                    <Typography sx={{ fontFamily: '"Montserrat", serif', fontSize: '16px', fontWeight: 'medium', color: "#071528" }}>
                                        Shipment
                                    </Typography>
                                    <Typography sx={{ fontFamily: '"Montserrat", serif', fontSize: '16px', fontWeight: 'medium', color: "#071528" }}>
                                        Tax
                                    </Typography>
                                    <Typography sx={{ fontFamily: '"Montserrat", serif', fontSize: '16px', fontWeight: 'medium', color: "#071528" }}>
                                        Total
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
                                    <Price>${shipmentData.totalPrice.toFixed(2)}</Price>
                                    <Price>${shipmentData.tax.toFixed(2)}</Price>
                                    <Price>${shipmentData.totalWithTax.toFixed(2)}</Price>
                                </Box>
                            </Box>
                            <StyledTextField
                                fullWidth
                                id="promocode"
                                name="promocode"
                                label="Promo Code"
                                placeholder="Promo Code"
                            />
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </>
    )
}