export class GeoMetric {
  private static messageNumber0 =
    "The parameter must be greater than 0";
  private static Instance: GeoMetric;
  public static y: number;
  public static x: number;
  private static constPermimeter = 2;

  private constructor() {}

  public static getInstance() {
    if (!this.Instance) {
      this.Instance = new GeoMetric();
      return this.Instance;
    } else return this.Instance;
  }

  private static throw_error(message: string) {
    throw new Error(message).message;
  }

  public static getArea() {
    if (this.x <= 0 || this.y <= 0) this.throw_error(this.messageNumber0);
    return this.x * this.y;
  }
  public static getPerimeter() {
    if (this.x <= 0 || this.y <= 0) this.throw_error(this.messageNumber0);
    return (this.x + this.y) * this.constPermimeter;
  }

  public static setY(y: number) {
    if (y <= 0) this.throw_error(this.messageNumber0);
    this.y = y;
  }

  public static setX(x: number) {
    if (x <= 0) this.throw_error(this.messageNumber0);
    this.x = x;
  }
}
