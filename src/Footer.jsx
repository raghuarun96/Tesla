import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" className="footer">
      <Container className="footer-container">
        <Box className="footer-content">
          <Typography variant="body2" className="copyright">
            © {currentYear} Tesla © All Rights Reserved
          </Typography>
          <Box className="footer-links">
            <Link href="/" className="footer-link">
              Privacy & Legal
            </Link>
            <Link href="/" className="footer-link">
              Contact
            </Link>
            <Link href="/" className="footer-link">
              News
            </Link>
            <Link href="/" className="footer-link">
              Locations
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
