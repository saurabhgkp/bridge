import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CryptoList = () => {
    const [cryptos, setCryptos] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchCryptos();
    }, []);

    const fetchCryptos = async () => {
        try {
            const response = await axios.get('http://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 10,
                    page: page
                }
            });
            setCryptos((prevCryptos) => [...prevCryptos, ...response.data]);
            setPage((prevPage) => prevPage + 1);
            if (response.data.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching cryptos:', error);
        }
    };

    return (
        <Container>
            <h1 className="my-4">Cryptocurrency List</h1>
            <InfiniteScroll
                dataLength={cryptos.length}
                next={fetchCryptos}
                hasMore={hasMore}
                loader={<Spinner animation="border" variant="primary" />}
                endMessage={<p className="text-center">No more data to load</p>}
            >
                <Row>
                    {cryptos.map((crypto) => (
                        <Col sm={12} md={6} lg={4} key={crypto.id}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>{crypto.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Symbol:</strong> {crypto.symbol.toUpperCase()}<br />
                                        <strong>Price:</strong> ${crypto.current_price}<br />
                                        <strong>Market Cap:</strong> ${crypto.market_cap}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </InfiniteScroll>
        </Container>
    );
};

export default CryptoList;
