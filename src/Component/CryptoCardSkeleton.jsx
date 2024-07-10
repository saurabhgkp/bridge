// CryptoCardSkeleton.js
import React from 'react';
import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CryptoCardSkeleton = () => {
    const navigate = useNavigate();

  const handleNavigateToDetail = (cryptoId) => {
    navigate(`/list-detail/${cryptoId}`);
  };
    return (
        <>
            <Typography variant='h6' textAlign={"center"}>Crypto Listing</Typography>
            <Grid container spacing={2}>
                {Array.from(new Array(25)).map((_, index) => (
                    <Grid item xs={12} sm={4} md={3} key={index}>
                        <Card onClick={() => {handleNavigateToDetail(index) }}>
                            <CardContent>
                                <Skeleton variant="text" height={40} />
                                <Skeleton variant="text" height={20} width="60%" />
                                <Skeleton variant="rectangular" height={40} width="40%" style={{ marginTop: 16 }} />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default CryptoCardSkeleton;
