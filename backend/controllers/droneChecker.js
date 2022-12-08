const ORIGIN = {
  x : 250000,
  y : 250000
};

const RADIUS = 100;
const RADIUS_SQUARE = RADIUS*RADIUS;

const dist_square = (pointA, pointB) => {
  return (pointA.x - pointB.x) * (pointA.x - pointB.x) + (pointA.y - pointB.y) * (pointA.y - pointB.y);
}

const coordValidate = ( coord, timestamp ) => {
  const violated = dist_square(coord, ORIGIN) < RADIUS_SQUARE;
  const coordObj = { timestamp, coord, violated }
  return { coordObj, isViolated : violated }
} 

export default coordValidate