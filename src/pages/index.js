import Head from 'next/head';
import Image from 'next/Image';
import styled from 'styled-components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Inkling AI</title>
        <meta name="description" content="Inkling AI Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Root>
        <InklingLogo src='/icons/inkling.svg' alt='Inkling Icon' width={240} height={122} priority />
      </Root>
    </>
  );
}

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
  background: linear-gradient(180deg, rgba(17, 17, 17, 0) 0.9%, #111111 100%),
    url(/images/wallpaper.png) no-repeat #111111;
  background-size: cover;
`;

const InklingLogo = styled(Image)`
  display: flex;
  overflow: hidden;
  border-radius: 55px;

  filter: grayscale(200);
  transition: 1500ms filter ease;

  &:hover {
    filter: grayscale(0);
  }
`