import { GeoMetric } from './geo';
const a:any=0;
GeoMetric.getInstance();
GeoMetric.setX(a);
GeoMetric.setY(45);
(()=>{
console.log(`The perimeter of the rect  is: ${GeoMetric.getPerimeter()}`);
console.log(`The area of the rect  is: ${GeoMetric.getArea()}`);

})();