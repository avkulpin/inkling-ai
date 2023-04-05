import { useEffect, useRef } from 'react';
import Head from 'next/head';
import clamp from 'lodash/clamp';
import styled, { keyframes } from 'styled-components';
import { Howler, Howl } from 'howler';

const drawCanvas = (canvas, context, analyzer, wallpaper, isRunningRef) => {
  const bufferLength = analyzer.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const img = new Image();
  img.onload = function() {
    draw();
  }
  img.src = '/icons/inkling.svg';

  function draw() {
    requestAnimationFrame(draw);
    context.clearRect(0, 0, canvas.width, canvas.height)
    analyzer.getByteTimeDomainData(dataArray);

    context.lineWidth = 2;
    context.strokeStyle = "rgb(0, 0, 0)";

    context.beginPath();

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    let z = -Infinity;
    let zz = Infinity;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;
      z = Math.max(dataArray[i], z);
      zz = Math.min(dataArray[i], zz);

      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }

      x += sliceWidth;
    }

    const f = z - zz;
    const scale = 2;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const k = clamp(scale * (f / 50), 0.5, 1.6);
    const scaledWidth = 120 * k;
    const scaledHeight = 61 * k;

    if (k < 1.4) {
      context.filter = 'grayscale(1)';
    }

    if (f > 1) {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        wallpaper.style.animationPlayState = 'running';
      }

      context.lineWidth = 0.5;
      context.strokeStyle = `#0b6fff`;
      context.lineTo(canvas.width, canvas.height / 2);
      context.stroke();
    }

    if (f === 1) {
      if (isRunningRef.current) {
        isRunningRef.current = false;
        wallpaper.style.animationName = 'none';
      }
    }

    context.drawImage(img, (canvasWidth - scaledWidth) / 2, (canvasHeight - scaledHeight) / 2, scaledWidth, scaledHeight);
    context.filter = 'grayscale(0)';
  }

  draw();
}

export default function Home() {
  const isRunningRef = useRef(false);
  const wallpaperRef = useRef(null);
  const canvasRef = useRef(null);
  const once = useRef(false);

  useEffect(() => {
    if (!once.current) {
      once.current = true;
      const sound = new Howl({
        src: 'sounds/moog-pulse.mp3',
        format: ['mp3'],
      });

      sound.play();

      const analyzer = Howler.ctx?.createAnalyser();
      Howler.masterGain.connect(analyzer)
      analyzer.fftSize = 2048;

      drawCanvas(canvasRef.current, canvasRef.current.getContext("2d"), analyzer, wallpaperRef.current, isRunningRef);
    }
  }, [])

  return (
    <>
      <Head>
        <title>Inkling AI</title>
        <meta name="description" content="Inkling AI Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <Root>
        <Wallpaper ref={wallpaperRef} />
        <CanvasContainer>
          <canvas ref={canvasRef} />
        </CanvasContainer>
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
  background: black;
`;

export const Blurry = keyframes`
  0% {
    filter: blur(0);
  }
  50% {
    filter: blur(5px);
  }
`;

const Wallpaper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
  background: linear-gradient(180deg, rgba(17, 17, 17, 0) 0.9%, #111111 100%), url(/images/wallpaper.png) no-repeat #111111;
  background-size: cover;

  animation-name: ${Blurry};
  animation-duration: 1000ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: paused;
`

const CanvasContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`