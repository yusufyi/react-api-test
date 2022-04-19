import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

export default function Coin() {
  const { id } = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;

  return (
    <QueryClientProvider client={queryClient}>
      <CoinData url={url} />
    </QueryClientProvider>
  );
}

function CoinData(props) {
  const navigate = useNavigate();
  const url = props.url;
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState([]);

  const { error } = useQuery('repoData', () =>
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCard(data);
        setLoading(false);
      })
  );

  if (loading)
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}
      >
        <CircularProgress color="inherit" />
      </Grid>
    );

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia component="img" image={card.image.large} alt="random" />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {card.name}
          </Typography>
          <Typography>
            <ul>
              <li>Currency.name: {card.name}</li>
              <li>
                Current Price:{' '}
                {new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'USD',
                }).format(card.market_data.current_price.usd)}
              </li>
              <li>
                All Time High:{' '}
                {new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'USD',
                }).format(card.market_data.ath.usd)}
              </li>
              <li>
                MarketCap:{' '}
                {new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'USD',
                }).format(card.market_data.market_cap.usd)}
              </li>
              <li>Market Cap Rank: {card.market_cap_rank}</li>
            </ul>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate(-1)}>
            Back
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
