import { FC, useState } from 'react';
import styled from 'styled-components';

interface WeatherSearchProps {
  onSearch: (city: string) => void;
}

const StyledSearch = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const WeatherSearch: FC<WeatherSearchProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSearch(city);
    }
  };

  return (
    <StyledSearch>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
    </StyledSearch>
  );
};
