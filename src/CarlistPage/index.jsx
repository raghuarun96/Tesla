import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Car,
  Battery,
  Gauge,
  Timer,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const CarsListPage = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    range: 'all',
    acceleration: 'all',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    axios
      .get('/teslaCarsData.json')
      .then((response) => {
        setCars(response.data.teslaFlagshipCars);
        setFilteredCars(response.data.teslaFlagshipCars);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the data: ', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = cars;

    if (searchTerm) {
      result = result.filter((car) => car.model.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter((car) => {
        const price = parseFloat(car.price.replace(/[^0-9.-]+/g, ''));
        return price >= min && price <= max;
      });
    }
    if (filters.range !== 'all') {
      const [min, max] = filters.range.split('-').map(Number);
      result = result.filter((car) => {
        const range = parseFloat(car.range.replace(/[^0-9.-]+/g, ''));
        return range >= min && range <= max;
      });
    }
    if (filters.acceleration !== 'all') {
      const [min, max] = filters.acceleration.split('-').map(Number);
      result = result.filter((car) => {
        const range = parseFloat(car['0to60'].replace(/[^0-9.-]+/g, ''));
        return range >= min && range <= max;
      });
    }

    setFilteredCars(result);
    setCurrentPage(1);
  }, [searchTerm, filters, cars]);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const handleDetail = (car) => {
    navigate('/car-detail', { state: { car: car } });
  };
  const CarCard = ({ car }) => (
    <div className="car-card" onClick={() => handleDetail(car)}>
      <div className="car-image">
        <img src={car?.imageUrl} alt={car.model} />
      </div>
      <div className="car-details">
        <div className="car-model">
          <h2>{car.model}</h2>
        </div>
        <div className="specs-grid">
          <div className="spec-item">
            <Timer size={20} />
            <span>{car['0to60']}s</span>
            <small>0-60 mph</small>
          </div>
          <div className="spec-item">
            <Gauge size={20} />
            <span>{car.topSpeed}</span>
            <small>Top Speed</small>
          </div>
          <div className="spec-item">
            <Battery size={20} />
            <span>{car.range}mi</span>
            <small>Range</small>
          </div>
          <div className="spec-item">
            <Zap size={20} />
            <span>{car.horsepower}hp</span>
            <small>Power</small>
          </div>
        </div>
        <div className="car-price">
          <span>Starting at</span>
          <h3>{car.price}</h3>
        </div>
        <button className="order-button">Book Now</button>
      </div>
    </div>
  );

  return (
    <>
      {' '}
      <Header />
      <div className="cars-list-page">
        <div className="page-header">
          <h1>Tesla Flagship Cars</h1>
          <p>Discover our lineup of electric vehicles</p>
        </div>

        <div className="controls-section">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filters">
            <Filter size={20} />
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
            >
              <option value="all">Prices</option>
              <option value="60000-80000">$60k - $80k</option>
              <option value="80000-100000">$80k - $100k</option>
              <option value="100000-150000">$100k - $150k</option>
            </select>

            <select
              value={filters.range}
              onChange={(e) => setFilters({ ...filters, range: e.target.value })}
            >
              <option value="all"> Ranges</option>
              <option value="300-350">300-350 miles</option>
              <option value="350-400">350-400 miles</option>
              <option value="400-500">400+ miles</option>
            </select>

            <select
              value={filters.acceleration}
              onChange={(e) => setFilters({ ...filters, acceleration: e.target.value })}
            >
              <option value="all">All Acceleration</option>
              <option value="1.5-2.0">1.5-2.0s</option>
              <option value="2.0-2.5">2.0-2.5s</option>
              <option value="2.5-3.0">2.5-3.0s</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <Car className="loading-icon" />
            <p>Loading vehicles...</p>
          </div>
        ) : (
          <>
            {filteredCars.length === 0 ? (
              <div className="no-results">
                <p>No vehicles found matching your criteria</p>
              </div>
            ) : (
              <div className="cars-grid">
                {currentCars.map((car, index) => (
                  <CarCard key={index} car={car} />
                ))}
              </div>
            )}

            {filteredCars.length > carsPerPage && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={20} sx={{ color: 'white' }} />
                </button>

                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={20} sx={{ color: 'white' }} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CarsListPage;
