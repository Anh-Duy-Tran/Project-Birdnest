const ORIGIN = {
  x : 250000,
  y : 250000
};

const RADIUS = 100000;

const dist = (pointA, pointB) => {
  return Math.sqrt((pointA.x - pointB.x) * (pointA.x - pointB.x) + (pointA.y - pointB.y) * (pointA.y - pointB.y));
}

const coordValidate = ( coord, timestamp ) => {
  const distance = dist(coord, ORIGIN)
  const violated = distance < RADIUS;
  const coordObj = { timestamp, coord, violated }
  return { coordObj, isViolated : violated, distanceToOrigin : distance }
} 

export default coordValidate