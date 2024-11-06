import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { REST_API } from "./restAPI";
import { Snackbar, Alert, Button, TextField, Box } from '@mui/material';

axios.defaults.withCredentials = false; // global に設定してしまう場合

export const Email = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [isDataInvalid, setIsDataInvalid] = useState(true);

    const onChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        setIsDataInvalid(emailValue === '');
    };

    // メール送信
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log('Sending request with headers:', REST_API.headers_email);
        console.log('Sending request with data:', REST_API.createEmailSendBody(email));

        try {
            const response = await axios({
                url: REST_API.ENDPOINT_EMAIL,
                method: 'post',
                headers: REST_API.headers_email,
                timeout: REST_API.REQUEST_TIMEOUT_MS,
                data: REST_API.createEmailSendBody(email)
            });

            console.log('Response:', response);

            if (response.status == 200) {
                setEmail('');
                setOpenSuccessSnackbar(true);
            }
        } catch (error) {
            console.error('Error details:', error.response || error);
            setOpenErrorSnackbar(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseSuccessSnackbar = () => {
        setOpenSuccessSnackbar(false);
    };

    const handleCloseErrorSnackbar = () => {
        setOpenErrorSnackbar(false);
    };

    return (
        <div>
            <h1>メール送信</h1>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column">
                    <TextField
                        type="email"
                        name="email"
                        required
                        id="email"
                        label="メールアドレス"
                        value={email}
                        onChange={onChange}
                    />
                </Box>
                <br />
                <Button 
                    variant="contained" 
                    type="submit"
                    disabled={isSubmitting || isDataInvalid}
                >
                    {'送信'}
                </Button>
            </form>

            <Snackbar
                open={openSuccessSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSuccessSnackbar}
            >
                <Alert onClose={handleCloseSuccessSnackbar} severity="success">
                    メールの送信に成功しました！
                </Alert>
            </Snackbar>
            <Snackbar
                open={openErrorSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseErrorSnackbar}
            >
                <Alert onClose={handleCloseErrorSnackbar} severity="error">
                    メールの送信に失敗しました。
                </Alert>
            </Snackbar>
        </div>
    );
};