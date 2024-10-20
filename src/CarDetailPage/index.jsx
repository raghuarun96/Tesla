import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Battery,
  Gauge,
  Timer,
  Zap,
  Wind,
  Shield,
  ChevronLeft,
  CircleDot,
  Palette,
  Monitor,
  Wifi,
  Check,
} from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';

const CarDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [car, setCar] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');
  const [color, setColor] = useState('initial');

  useEffect(() => {
    setCar(location.state.car);
  }, [location.state]);
  console.log(location.state.car, 'location');

  if (!car) {
    return (
      <div className="error-state">
        <p>Vehicle not found</p>
        <button onClick={() => navigate('/cars-list')}>Back to Vehicles</button>
      </div>
    );
  }

  const colorOptions = [
    {
      name: 'Solid Black',
      code: '#1E1E1E',
      price: '$1,500',
      filterOption: 'grayscale(80)',
    },
    {
      name: 'Deep Blue Metallic',
      code: '#041E42',
      price: '$1,500',
      filterOption: 'hue-rotate(207deg)',
    },
    {
      name: 'Red Multi-Coat',
      code: '#AF1E2D',
      price: '$2,500',
      filterOption: 'hue-rotate(358deg)',
    },
    {
      name: 'Green Multi-Coat',
      code: '#166502',
      price: '$2,500',
      filterOption: 'hue-rotate(124deg)',
    },
  ];

  return (
    <div className="car-detail-page">
      <Header />
      <button className="back-button" onClick={() => navigate('/cars-list')}>
        <ChevronLeft size={20} />
        Back to Vehicles
      </button>

      <div className="car-hero">
        <div className="car-hero-content">
          <h1>{car.model}</h1>
          <div className="key-specs">
            <div className="spec-item">
              <Timer size={24} />
              <span>{car['0to60']}s</span>
              <p>0-60 mph</p>
            </div>
            <div className="spec-item">
              <Gauge size={24} />
              <span>{car.topSpeed}</span>
              <p>Top Speed</p>
            </div>
            <div className="spec-item">
              <Battery size={24} />
              <span>{car.range}mi</span>
              <p>Range (EPA est.)</p>
            </div>
            <div className="spec-item">
              <Zap size={24} />
              <span>{car.horsepower}</span>
              <p>Peak Power</p>
            </div>
          </div>
        </div>
        <div className="car-image">
          <img
            src={car?.imageUrl}
            alt={`${car.model} in ${colorOptions[selectedColor].name}`}
            style={{
              filter: color,
            }}
          />
        </div>
      </div>

      <nav className="section-nav">
        <button
          className={activeSection === 'overview' ? 'active' : ''}
          onClick={() => setActiveSection('overview')}
        >
          Overview
        </button>
        <button
          className={activeSection === 'specs' ? 'active' : ''}
          onClick={() => setActiveSection('specs')}
        >
          Specifications
        </button>
        <button
          className={activeSection === 'features' ? 'active' : ''}
          onClick={() => setActiveSection('features')}
        >
          Features
        </button>
      </nav>

      <div className="content-section">
        {activeSection === 'overview' && (
          <div className="overview-section">
            <div className="color-selector">
              <h2>
                <Palette size={24} />
                Color Variant
              </h2>
              <div className="color-options">
                {colorOptions.map((color, index) => (
                  <button
                    key={color.name}
                    className={`color-option ${selectedColor === index ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedColor(index);
                      setColor(color.filterOption);
                    }}
                  >
                    <span className="color-preview" style={{ backgroundColor: color.code }} />
                    <div className="color-info">
                      <span>{color.name}</span>
                      <small className="price-rate">{color.price}</small>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="price-section">
              <div className="price-details">
                <h2>Purchase Price</h2>
                <h3>{car.price}</h3>
                <p>Est. lease from $789/mo for 36 months</p>
              </div>
              <div className="cta-buttons">
                <button className="order-button">Order Now</button>
                <button className="demo-button">Demo Drive</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'specs' && (
          <div className="overview-section">
            <div className="specs-group">
              <h2>Performance</h2>
              <p>{car.performance?.description}</p>

              <h2>Durability</h2>
              <p>{car.durability}</p>
              <h2>Engine Capacity</h2>
              <p>{car.engineCapacity}</p>
              <h2>Safety</h2>
              <p>{car.safety}</p>
              <div className="specs-grid">
                <div className="spec-detail">
                  <Timer size={20} />
                  <h3>Acceleration</h3>
                  <p>{car['0to60']} seconds 0-60 mph</p>
                </div>
                <div className="spec-detail">
                  <Gauge size={20} />
                  <h3>Top Speed</h3>
                  <p>{car.topSpeed}</p>
                </div>
                <div className="spec-detail">
                  <Wind size={20} />
                  <h3>Drag Coefficient</h3>
                  <p>0.208 Cd</p>
                </div>
                <div className="spec-detail">
                  <Zap size={20} />
                  <h3>Peak Power</h3>
                  <p>{car.horsepower} hp</p>
                </div>
              </div>
            </div>

            <div className="specs-group">
              <h2>Range & Battery</h2>
              <div className="specs-grid">
                <div className="spec-detail">
                  <Battery size={20} />
                  <h3>Range (EPA est.)</h3>
                  <p>{car.range} miles</p>
                </div>
                <div className="spec-detail">
                  <CircleDot size={20} />
                  <h3>Supercharging Max</h3>
                  <p>250 kW</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'features' && (
          <div className="features-overview">
            <h2>Feature</h2>
            <div>
              {car?.features?.map((feature) => {
                return (
                  <div key={feature} className="feature-item">
                    <h3>
                      <Check size={20} />
                      {feature?.featureName}
                    </h3>
                    <p>{feature?.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="feature-group specs-group">
              <h2>Interior</h2>
              <p>{car.interior}</p>
              <h2>Exterior</h2>
              <p>{car.exterior}</p>
              <div className="features-grid">
                <div className="feature-item">
                  <Monitor size={24} />
                  <h3>17{`"`} Touchscreen</h3>
                  <p>Cinematic experience with immersive sound</p>
                </div>
                <div className="feature-item">
                  <Wifi size={24} />
                  <h3>Connected Features</h3>
                  <p>Premium connectivity with over-the-air updates</p>
                </div>
                <div className="feature-item">
                  <Shield size={24} />
                  <h3>Safety Features</h3>
                  <p>Advanced autopilot capabilities</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CarDetail;
