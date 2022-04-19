import React, { Fragment, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import BarChartIcon from '@mui/icons-material/BarChart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import Coin from './components/Coin';
import LinearProgress from '@mui/material/LinearProgress';

const theme = createTheme();

export default function Album() {
  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=45';
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  //Fetch Data
  const getData = () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  //Run Function on Page Load
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <>
        <LinearProgress />
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <BarChartIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            CoinGecko Market Pairs (USD)
          </Typography>
        </Toolbar>
      </AppBar>

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <main>
                {/* Hero unit */}
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                  }}
                >
                  <Container maxWidth="sm">
                    <Typography
                      component="h1"
                      variant="h2"
                      align="center"
                      color="text.primary"
                      gutterBottom
                    >
                      Market Pairs (USD)
                    </Typography>
                    <Typography
                      variant="h5"
                      align="center"
                      color="text.secondary"
                      paragraph
                    >
                      The following is a list of crypto currencies with
                      information related to the USD trading pair.
                    </Typography>
                  </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                  {/* End hero unit */}
                  <Grid container spacing={4}>
                    {coins.map((card) => (
                      <Grid item key={card.id} xs={12} sm={6} md={4}>
                        <Card
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={card.image}
                            alt="random"
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {card.name}
                            </Typography>
                            <Typography>
                              <ul>
                                <li>
                                  Current Price:{' '}
                                  {new Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'USD',
                                  }).format(card.current_price)}
                                </li>
                                <li>
                                  24h High:{' '}
                                  {new Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'USD',
                                  }).format(card.high_24h)}
                                </li>
                                <li>
                                  24h Low:{' '}
                                  {new Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'USD',
                                  }).format(card.low_24h)}
                                </li>
                              </ul>
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              component={Link}
                              to={`/currency/${card.id}`}
                            >
                              More
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </main>
            }
          />
          {/* Individual Coin Information */}
          <Route path="/currency/:id" element={<Coin />} />
        </Routes>
      </Router>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
