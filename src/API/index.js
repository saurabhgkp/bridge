import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const fetchTokens = async () => {
    const response = await axios.get(`${API_URL}/tokens`);
    return response.data;
};

export const fetchQuote = async (token, chain) => {
    const response = await axios.post(`${API_URL}/quotes`, { token, chain });
    return response.data;
};

export const fetchTransactionParams = async (quote) => {
    const response = await axios.post(`${API_URL}/params`, { quote });
    return response.data;
};
