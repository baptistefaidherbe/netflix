import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card, CardMedia, Typography, Box, CardActionArea } from '@mui/material';
import { log } from 'console';

type CarouselProps = {
  data: any;
  setHoveredIndex: (index: number) => void;
  setShowModal: (show: boolean) => void;
  category: string;
  setHoveredCategory: (category: string) => void;
};

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const arrowsStyle = {
  cursor: 'pointer',
  width: '50px',
  height: '50px',
  fontSize: '300px',
  color: 'white',
  '&:hover': { color: 'white', background: '#18181862', height: '100%' },
};

const Carousel = ({
  data,
  setHoveredIndex,
  setShowModal,
  category,
  setHoveredCategory
}: CarouselProps) => {
  const matchData = data.filter((show: any) => show.Genre.includes(category));
  console.log('ici', matchData);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setHoveredCategory(category);
    setShowModal(true);
  };

  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <ArrowBackIosIcon
        className={className}
        style={{ ...style }}
        onClick={onClick}
        sx={arrowsStyle}
      />
    );
  };

  const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <ArrowForwardIosIcon
        className={className}
        style={{ ...style }}
        onClick={onClick}
        sx={arrowsStyle}
      />
    );
  };


  return (
    <>
      <Slider
        {...settings}
        prevArrow={<CustomPrevArrow />}
        nextArrow={<CustomNextArrow />}
      >
        {matchData &&
          matchData.map((show: any, index: number) => (
            <Card
              key={index}
              onClick={() => handleMouseEnter(index)}
              sx={{
                maxWidth: 450,
                height: '100%',
                bgcolor: '#CECECE',
                overflow: 'visible',
                position: 'relative',
              }}
            >
              <CardActionArea
                sx={{
                  cursor: 'pointer',
                  position: 'absolute',
                  transition: 'all 0.6s ease',
                  '&:hover .MuiCardMedia-root': {
                    transform: 'scale(1.1) translateY(-5%)',
                  },
                }}
              >
                <CardMedia
                  component='img'
                  height='140'
                  image={show.Images[0]}
                  alt={show.title}
                  sx={{
                    transition: 'transform 0.6s ease',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    color: 'white',
                    padding: '10px',
                  }}
                >
                  <Typography variant='h5' component='div'>
                    {show.Title}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          ))}
      </Slider>
    </>
  );
};

export default Carousel;