import { FC } from 'react';
import { styled } from 'styled-components';

import { WeatherSearch } from '../weather-search';

interface HeaderProps {
  onSearch: (city: string) => void;
}

const Container = styled.div`
  border: 1px solid purpel;
  background: purple;
  height: 60px;
  display: flex;
  flex: 1;
  align-items: center;
`;

export const Header: FC<HeaderProps> = ({ onSearch }) => {
  return (
    <Container>
      <WeatherSearch onSearch={onSearch} />
    </Container>
  );
};
