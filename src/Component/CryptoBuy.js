// CryptoDetail.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Typography, Card, CardContent, Button } from '@mui/material';
import { getCryptoBuy } from '../services/authapi';

const CryptoBuy = () => {
    const { id } = useParams();
    const [cryptoDetails, setCryptoDetails] = useState(null);
    const navigate = useNavigate();

    const fetchCryptoDetails = async () => {
        const response = await getCryptoBuy({ symbol: id })

        setCryptoDetails(response.symbols[0])
    };

    useEffect(() => {
        fetchCryptoDetails();
    }, [id]);

    if (!cryptoDetails) {
        return <Typography variant="h6">Loading...</Typography>;
    }
    console.log(cryptoDetails)
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {cryptoDetails?.symbol}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    status : {cryptoDetails?.status}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    Filter Type: {cryptoDetails?.filters[0]?.filterType}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    Min Price: {cryptoDetails?.filters[0]?.maxPrice}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    Max Price: {cryptoDetails?.filters[0]?.minPrice}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    Tick Size : {cryptoDetails?.filters[0]?.tickSize}
                </Typography>
                <Typography variant="body2" component="div" style={{ marginTop: 20 }}>
                    <div dangerouslySetInnerHTML={{ __html: cryptoDetails?.description?.en }} />
                </Typography>
                <Button variant="contained" onClick={() => { navigate(-1) }} color="primary" style={{ marginTop: 20 }}>
                    Back to List
                </Button>
            </CardContent>
        </Card>
    );
};

export default CryptoBuy;
