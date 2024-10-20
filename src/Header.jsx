import {
  AppBar,
  Box,
  Button,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from './utils';
import logoImage from '../src/assets/logo.png';

const navMenus = ['features', 'performance', 'sustainability'];
const navCarsListMenus = ['Home'];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (section) => {
    if (location.pathname === '/') {
      scrollToSection(section);
    } else {
      navigate('/');
    }
    handleMenuClose();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['hero', 'features', 'performance', 'sustainability'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const bounds = element.getBoundingClientRect();
          return bounds.top <= 100 && bounds.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar position="fixed" className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Toolbar className="navbar-section">
        <Button
          className="logo"
          onClick={() => {
            navigate('/');
          }}
        >
          <img src={logoImage} alt="Tesla Logo" />
        </Button>
        {!isMobile && (
          <Box className="nav-links">
            {location.pathname === '/'
              ? [...navMenus].map((section) => (
                  <Button
                    key={section}
                    onClick={() => {
                      scrollToSection(section);
                    }}
                    className={activeSection === section ? 'active' : ''}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Button>
                ))
              : [...navCarsListMenus].map((section) => (
                  <Button
                    key={section}
                    onClick={() => {
                      navigate('/');
                    }}
                    className={activeSection === section ? 'active' : ''}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Button>
                ))}
          </Box>
        )}
        {isMobile && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ marginLeft: 'auto' }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {location.pathname === '/'
                ? navMenus.map((section) => (
                    <MenuItem
                      key={section}
                      onClick={() => handleMenuClick(section)}
                      className={activeSection === section ? 'active' : ''}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </MenuItem>
                  ))
                : navCarsListMenus.map((section) => (
                    <MenuItem
                      key={section}
                      onClick={() => handleMenuClick(section)}
                      className={activeSection === section ? 'active' : ''}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </MenuItem>
                  ))}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
