import { useState, useRef, useEffect } from 'react';
import VideoDragBar from './VideoDragBar';
import InstructBox from './InstructBox';

export interface HomeVideoProps {
  url: string;
  muted: boolean;
  handleDoubleClick: () => void;
  hovering: boolean;
  setHovering: (hover: boolean) => void;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  index: number;
}

const HomeVideo = (props: HomeVideoProps) => {
  const {
    url,
    muted,
    handleDoubleClick,
    hovering,
    setHovering,
    playing,
    setPlaying,
    index,
  } = props;
  const [opacity, setOpacity] = useState(1);
  const videoRef = useRef(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoPlayerRef.current) {
      // 음소거 상태로 만들기
      videoPlayerRef.current.defaultMuted = true;
      videoPlayerRef.current.playsInline = true;
    }
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && playing) {
          const playPromise = videoPlayerRef.current?.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Automatic playback started!
                // Show playing UI.
                setLoading(false);
              })
              .catch((error) => {
                // Auto-play was prevented
                // Show paused UI.
              });
          }
        } else {
          videoPlayerRef.current?.pause();
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [playing]);

  const handleVideoClick = () => {
    setPlaying(!playing);
    if (videoPlayerRef.current && videoPlayerRef.current.paused) {
      videoPlayerRef.current.play();
    } else if (videoPlayerRef.current && !videoPlayerRef.current.paused) {
      videoPlayerRef.current.pause();
    }
  };
  return (
    <div onClick={handleVideoClick}>
      {hovering && <VideoDragBar opacity={opacity} />}
      {((loading && index === 0) || (loading && index !== 0 && !playing)) && (
        <InstructBox />
      )}
      {loading && index !== 0 && playing && (
        <div className="absolute w-10 h-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 loader" />
      )}
      <div
        ref={videoRef}
        onDoubleClick={handleDoubleClick}
        className="h-[70vh] items-center justify-center"
        onMouseEnter={() => {
          setHovering(true);
          setOpacity(1);
          setTimeout(() => {
            setHovering(false);
          }, 1500);
          setTimeout(() => {
            setOpacity(0);
          }, 1300);
        }}
      >
        <video
          className="w-full h-full"
          ref={videoPlayerRef}
          muted={!muted}
          autoPlay={playing}
          loop
          playsInline
        >
          <source src={url} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default HomeVideo;
