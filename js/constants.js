const NUM_OF_EDGE_IN_PENTAGON = 5;
const NUM_OF_EDGE_IN_TRIANGLE = 3;

const PHI = (1 + NUM_OF_EDGE_IN_PENTAGON ** (1 / 2)) / 2;
const RECIPROCAL_OF_PHI = PHI - 1;
const ALPHA = 1.;
const SCALE = 1.;
const MAX_COLOR_CHANNEL = 255;

const WHITE       = [1., 1., 1., ALPHA];
const GREEN       = [0., .5, 0., ALPHA];
const RED         = [1., 0., 0., ALPHA];
const BLUE        = [0., 0., 1., ALPHA];
const YELLOW      = [1., 1., 0., ALPHA];
const PURPLE      = [
  160 / MAX_COLOR_CHANNEL,
  32 / MAX_COLOR_CHANNEL,
  240 / MAX_COLOR_CHANNEL, 
  ALPHA
];
const LIGHT_GREEN = [0., 1., 0., ALPHA];
const ORANGE      = [1., .5, 0., ALPHA];
const LIGHT_BLUE  = [.0, 1., 1., ALPHA];
const BEIGE       = [
  245 / MAX_COLOR_CHANNEL, 
  245 / MAX_COLOR_CHANNEL, 
  220 / MAX_COLOR_CHANNEL, 
  ALPHA
];
const PINK        = [
  255 / MAX_COLOR_CHANNEL, 
  192 / MAX_COLOR_CHANNEL, 
  203 / MAX_COLOR_CHANNEL, 
  ALPHA
];
const GRAY        = [.5, .5, .5, ALPHA];
