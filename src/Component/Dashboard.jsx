import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Button, Grid, CircularProgress } from '@mui/material';
import { getCrypto } from '../services/authapi';
import CryptoCardSkeleton from './CryptoCardSkeleton';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [cryptos, setCryptos] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0); // Track current offset for pagination
    const navigate = useNavigate();
    const containerRef = useRef(null); // Ref for the container element to monitor scroll

    // Function to fetch crypto data
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getCrypto(limit); // Pass limit and offset to API
            setCryptos(prevCryptos => [...prevCryptos, ...response]); // Append new data to existing cryptos
            setOffset(prevOffset => prevOffset + limit); // Increment offset for next fetch
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Function to handle infinite scrolling
    const handleScroll = () => {
        if (
            containerRef.current.scrollHeight - containerRef.current.scrollTop ===
            containerRef.current.clientHeight
        ) {
            fetchData(); // Fetch more data when scrolled to the bottom
        }
    };

    // Attach scroll event listener to container element
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [containerRef]);

    // Navigate to detail page
    const handleNavigateToDetail = (cryptoId) => {
        navigate(`/list-detail/${cryptoId}`, { state: cryptoId });
    };

    // Navigate to buy page
    const handleNavigateToBuy = (cryptoId) => {
        navigate(`/list-buy/${cryptoId}`);
    };

    if (loading && cryptos.length === 0) return <CryptoCardSkeleton />;

    return (
        <Grid container spacing={2} ref={containerRef} style={{ overflowY: 'scroll', height: '80vh' }}>
            <Typography variant="h6" textAlign="center" style={{ width: '100%', marginBottom: '1rem' }}>
                Crypto Listing
            </Typography>
            {cryptos.map((crypto, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6" component="div" gutterBottom>
                                {crypto.symbol}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" gutterBottom>
                                Current Price: ${crypto.lastPrice}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Price Change: {crypto.priceChange}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Price Change Percent: {crypto.priceChangePercent}%
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Volume: {crypto.volume}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Quote Volume: {crypto.quoteVolume}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                High Price: {crypto.highPrice}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Low Price: {crypto.lowPrice}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => { handleNavigateToDetail(crypto.symbol) }}
                                style={{ marginTop: '1rem' }}
                            >
                                View Details
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => { handleNavigateToBuy(crypto.symbol) }}
                                style={{ marginTop: '0.5rem' }}
                            >
                                Buy
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            {loading && (
                <Grid item xs={12} style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <CircularProgress />
                </Grid>
            )}
        </Grid>
    );
};

export default Dashboard;
