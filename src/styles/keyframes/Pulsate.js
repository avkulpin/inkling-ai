import { keyframes } from 'styled-components';

export const Pulsate = keyframes`
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.15);
  }
  39% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.92);
  }
`;