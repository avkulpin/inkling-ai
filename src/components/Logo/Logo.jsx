import Image from 'next/image';
import styled  from 'styled-components';
import { Pulsate } from '../../styles/keyframes/Pulsate';

export const Logo = () => {
  return <Root>
    <IconLogo src='/icons/inkling.svg' alt='Inkling Icon' width={30} height={15} priority />
  </Root>
}

const Root = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  display: flex;
`

const IconLogo = styled(Image)`
  display: flex;
  border-radius: 55px;
  cursor: pointer;

  // animation-name: ${Pulsate};
  // animation-duration: 1000ms;
  // animation-timing-function: linear;
  // animation-iteration-count: infinite;
  
  filter: grayscale(200);
  //transition: 1500ms filter ease;
  //
  //&:hover {
  //  filter: grayscale(0);
  //}
`