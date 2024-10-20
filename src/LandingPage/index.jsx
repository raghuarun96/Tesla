import { Grid, Button, Typography, Box, Container } from '@mui/material';
import { ChevronDown, Battery, Wind, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { scrollToSection } from '../utils';
import Footer from '../Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  const navigateToCars = () => {
    navigate('/cars-list');
  };
  return (
    <div className="landing-page">
      <Header />
      <Box id="hero" className="hero-section">
        <Container>
          <Grid container justifyContent="center" className="hero-content">
            <Grid item xs={12} sm={8} className="fade-in">
              <Typography variant="h1" component="h1" gutterBottom>
                Model S Plaid
              </Typography>
              <Typography variant="h5" component="p" gutterBottom>
                Beyond Ludicrous
              </Typography>
              <Button
                onClick={navigateToCars}
                className="button_slide slide-up"
                variant="contained"
              >
                Explore Our Cars
              </Button>
            </Grid>
          </Grid>
          <ChevronDown
            className="scroll-indicator bounce"
            size={40}
            onClick={() => scrollToSection('features')}
          />
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" className="section features-section">
        <Container>
          <Typography variant="h2" component="h2" gutterBottom className="section-title">
            Future of Driving
          </Typography>
          <Grid container spacing={4} className="features-grid">
            <Grid item xs={12} md={4}>
              <Box className="feature-card">
                <Battery size={48} className="feature-icon" />
                <Typography variant="h6" component="h3">
                  Advanced Battery
                </Typography>
                <Typography>
                  100kWh battery with up to 396 miles of range and unprecedented performance.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="feature-card">
                <Zap size={48} className="feature-icon" />
                <Typography variant="h6" component="h3">
                  Tri-Motor System
                </Typography>
                <Typography>
                  Three independent motors provide unmatched power and traction control.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="feature-card">
                <Wind size={48} className="feature-icon" />
                <Typography variant="h6" component="h3">
                  Aerodynamic Design
                </Typography>
                <Typography>0.208 drag coefficient, the lowest of any production car.</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Performance Section */}
      <Box id="performance" className="section performance-section">
        <Container>
          <Typography variant="h2" component="h2" gutterBottom textAlign="center">
            Unmatched Performance
          </Typography>
          <Grid container spacing={4} className="performance-grid">
            <Grid item xs={12} sm={4}>
              <Box className="stat-card">
                <Typography variant="h2" className="stat-number">
                  1.99s
                </Typography>
                <Typography variant="h6">0-60 mph</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className="stat-card">
                <Typography variant="h2" className="stat-number">
                  200
                </Typography>
                <Typography variant="h6">mph Top Speed</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className="stat-card">
                <Typography variant="h2" className="stat-number">
                  1,020
                </Typography>
                <Typography variant="h6">Peak Horsepower</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sustainability Section */}
      <Box id="sustainability" className="section sustainability-section ">
        <Container>
          <Typography variant="h2" component="h2" gutterBottom className="section-title">
            Sustainable Future
          </Typography>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box className="sustainability-content">
                <Typography variant="h5" className="more-title" gutterBottom>
                  Zero Emissions
                </Typography>
                <Typography className="more-block">
                  Every Tesla vehicle produces zero direct emissions, helping to accelerate the
                  world{"'"}s transition to sustainable energy. With our solar and energy storage
                  products, we{"'"}re designing a complete sustainable ecosystem.
                </Typography>
                <Button variant="outlined" className="Learn-More">
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="eco-stats">
                <Typography variant="h3" className="impact-number">
                  3.6M+
                </Typography>
                <Typography className="more-title">
                  Metric tons of CO₂ saved by Tesla vehicles
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </div>
  );
};

export default LandingPage;
