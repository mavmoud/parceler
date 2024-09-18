import { Button, Grid2, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountBar } from './AccountBar/AccountBar';
import { TextFieldsConfig, initialValuesCreateAccount, initialValuesSignIn } from './types';
import { COLOR_MAIN, HOME_PAGE_URL } from '../../constants';
import { SUBMIT_BUTTON, CANCEL_BUTTON, EMPTY_STRING, signInSchema, createAccountSchema, isPasswordField } from './constants';

export const AuthForm = ({ title, textFields, initialValues, signInAuth }: { title: string, textFields: Array<TextFieldsConfig>, initialValues: initialValuesCreateAccount | initialValuesSignIn, signInAuth: boolean }) => {
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState<string>('customer');
    const formik = useFormik({
        initialValues: signInAuth
            ? (initialValues as initialValuesSignIn)
            : (initialValues as initialValuesCreateAccount),
        validationSchema: signInAuth ? signInSchema : createAccountSchema,
        onSubmit: values => {
            console.log(values);
            navigate(HOME_PAGE_URL);
        },
    });

    useEffect(() => {
        formik.resetForm({
            values: signInAuth
                ? (initialValues as initialValuesSignIn)
                : (initialValues as initialValuesCreateAccount),
        });
    }, [initialValues, signInAuth]);
    return (
        <Grid2 mt={1} pt={5} container direction="column" alignItems="center" spacing={3}>
            <Typography variant='h4' textAlign={'center'} color={'#154864'}>{title}</Typography>
            <AccountBar accountType={accountType}
                setAccountType={setAccountType}
                formik={formik}
                signInAuth={signInAuth}
            />
            <Grid2 size={3}>
                <form onSubmit={formik.handleSubmit}>
                    {textFields.map((textField, index) => {
                        const fieldName = textField.name as keyof (initialValuesCreateAccount | initialValuesSignIn);
                        return (
                            <TextField key={`${index}${title}`}
                                fullWidth
                                sx={{ mb: 2 }}
                                name={textField.name}
                                label={textField.label}
                                value={formik.values[fieldName]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched[fieldName] && formik.errors[fieldName]}
                                helperText={formik.touched[fieldName] ? formik.errors[fieldName] : EMPTY_STRING}
                                type={isPasswordField(fieldName)}
                            />
                        );
                    })}
                    <Grid2 mb={3}>
                        <Button type='submit' variant='contained' sx={{ mr: 2, backgroundColor: COLOR_MAIN }}>{SUBMIT_BUTTON}</Button>
                        <Button onClick={() => formik.resetForm()} sx={{ color: COLOR_MAIN }}>{CANCEL_BUTTON}</Button>
                    </ Grid2>
                </form>
            </Grid2>
        </Grid2>
    );
}