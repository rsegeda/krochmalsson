import Point3 from './Point3';

/**
 * @class Cube
 *
 * @classdesc
 * Creates a new Cube object with the bottom-back corner specified by the x, y and z parameters,
 * with the specified breadth (widthX), depth (widthY) and height parameters.
 * If you call this function without parameters,
 * a Cube with x, y, z, breadth, depth and height properties set to 0 is created.
 *
 * @constructor
 * @param {Number} [x] - The x coordinate of the bottom-back corner of the Cube.
 * @param {Number} [y] - The y coordinate of the bottom-back corner of the Cube.
 * @param {Number} [z] - The z coordinate of the bottom-back corner of the Cube.
 * @param {Number} [widthX] - The X axis width (breadth) of the Cube. Should always be either
 * zero or a positive value.
 * @param {Number} [widthY] - The Y axis width (depth) of the Cube. Should always be either zero
 * or a positive value.
 * @param {Number} [height] - The Z axis height of the Cube. Should always be either zero or a
 * positive value.
 * @returns {Cube} This Cube object.
 */
class Cube {

  constructor(x = 0, y = 0, z = 0, widthX = 0, widthY = 0, height = 0) {
    /**
     * @property {Number}[x] -The x coordinate of the bottom-back corner of the Cube.
     */
    this.x = x;

    /**
     * @property {Number}[y]- The y coordinate of the bottom-back corner of the Cube.
     */
    this.y = y;

    /**
     * @property {Number} [z] - The z coordinate of the bottom-back corner of the Cube.
     */
    this.z = z;

    /**
     * @property {Number} [widthX] - The X axis width (breadth) of the Cube.
     * @desc This value should never be set to a negative.
     */
    this.widthX = widthX;

    /**
     * @property {Number} [widthY] - The Y axis width (depth) of the Cube.
     * @desc This value should never be set to a negative.
     */
    this.widthY = widthY;

    /**
     * @property {Number} [height] - The Z axis height of the Cube.
     * @desc This value should never be set to a negative.
     */
    this.height = height;

    /**
     * @property {Array<Point3>} [_corners] - The 8 corners of the Cube.
     * @private
     */
    this._corners = [
      new Point3(this.x, this.y, this.z),
      new Point3(this.x, this.y, this.z + this.height),
      new Point3(this.x, this.y + this.widthY, this.z),
      new Point3(this.x, this.y + this.widthY, this.z + this.height),
      new Point3(this.x + this.widthX, this.y, this.z),
      new Point3(this.x + this.widthX, this.y, this.z + this.height),
      new Point3(this.x + this.widthX, this.y + this.widthY, this.z),
      new Point3(this.x + this.widthX, this.y + this.widthY, this.z + this.height)
    ];
  }

  /**
   * @property {Number} halfWidthX - Half of the widthX of the Cube.
   * @readonly
   */
  get halfWidthX() {
    return Math.round(this.widthX * 0.5);
  }

  /**
   * @property {Number} [halfWidthY] - Half of the widthY of the Cube.
   * @readonly
   */
  get halfWidthY() {
    return Math.round(this.widthY * 0.5);
  }

  /**
   * @property {Number} [halfHeight] - Half of the height of the Cube.
   * @readonly
   */
  get halfHeight() {
    return Math.round(this.height * 0.5);
  }

  /**
   * @desc Changing the bottom property of a Cube object has no effect on the x, y, widthX and
   * widthY properties. * However it does affect the height property,
   * whereas changing the z value does not affect the height property.
   * @method Cube#bottom
   * @returns {Number}
   */
  get bottom() {
    return this.z;
  }

  set bottom(value) {
    if (value >= this.top) {
      this.height = 0;
    } else {
      this.height = (this.top - value);
    }
    this.z = value;
  }

  /**
   * @desc The sum of the z and height properties.
   * Changing the top property of a Cube object has no effect on the x, y, z,
   * widthX and widthY properties, but does change the height property.
   * @name Cube#top
   * @type {Number}
   */
  get top() {
    return this.z + this.height;
  }

  set top(value) {
    if (value <= this.z) {
      this.height = 0;
    } else {
      this.height = (value - this.z);
    }
  }

  /**
   * @desc The x coordinate of the back of the Cube.
   * Changing the backX property of a Cube object has no effect on the y, z,
   * widthY and height properties. However it does affect the widthX property,
   * whereas changing the x value does not affect the width property.
   * @method Cube#backX
   * @returns {Number}
   */
  get backX() {
    return this.x;
  }

  set backX(value) {
    if (value >= this.frontX) {
      this.widthX = 0;
    } else {
      this.widthX = (this.frontX - value);
    }
    this.x = value;
  }

  /**
   * @desc The y coordinate of the back of the Cube.
   * Changing the backY property of a Cube object has no effect on the x, z,
   * widthX and height properties. However it does affect the widthY property,
   * whereas changing the y value does not affect the width property.
   * @method Cube#backY
   * @returns {Number}
   */
  get backY() {
    return this.y;
  }

  set backY(value) {
    if (value >= this.frontY) {
      this.widthY = 0;
    } else {
      this.widthY = (this.frontY - value);
    }
    this.y = value;
  }

  /**
   * @desc The sum of the x and widthX properties.
   * Changing the frontX property of a Cube object has no effect on the x, y, z,
   * widthY and height properties, however it does affect the widthX property.
   * @method Cube#frontX
   * @returns {Number}
   */
  get frontX() {
    return this.x + this.widthX;
  }

  set frontX(value) {
    if (value <= this.x) {
      this.widthX = 0;
    } else {
      this.widthX = (value - this.x);
    }
  }

  /**
   * @desc The sum of the y and widthY properties.
   * Changing the frontY property of a Cube object has no effect on the x, y, z,
   * widthX and height properties, however it does affect the widthY property.
   * @method Cube#frontY
   * @returns {Number}
   */
  get frontY() {
    return this.y + this.widthY;
  }

  set frontY(value) {
    if (value <= this.y) {
      this.widthY = 0;
    } else {
      this.widthY = (value - this.y);
    }
  }

  /**
   * @desc The volume of the Cube derived from widthX * widthY * height.
   * @method Cube#volume
   * @returns {Number}
   * @readonly
   */
  get volume() {
    return this.widthX * this.widthY * this.height;
  }

  /**
   * The x coordinate of the center of the Cube.
   * @method Cube#centerX
   * @returns {Number}
   */
  get centerX() {
    return this.x + this.halfWidthX;
  }

  set centerX(value) {
    this.x = value - this.halfWidthX;
  }

  /**
   * @name Cube#centerY
   * @property {Number} centerY - The y coordinate of the center of the Cube.
   */
  get centerY() {
    return this.y + this.halfWidthY;
  }

  set centerY(value) {
    this.y = value - this.halfWidthY;
  }

  /**
   * Determines whether or not this Cube object is empty.
   * A Cube object is empty if its widthX, widthY or height is less than or equal to 0.
   * If set to true then all of the Cube properties are set to 0.
   * @name Cube#empty
   * @property {boolean} empty - Determines whether or not this Cube object is empty.
   */
  get empty() {
    return (!this.widthX || !this.widthY || !this.height);
  }

  set empty(value) {
    if (value === true) {
      this.setTo(0, 0, 0, 0, 0, 0);
    }
  }

  /**
   * The size of the Cube object, expressed as a Point3 object with the values of the widthX, widthY and height properties.
   * @method Cube#size
   * @param {Cube} [a] - The Cube object.
   * @param {Point3} [output] - Optional Point3 object.
   * If given the values will be set into the object, otherwise a brand new Point3 object will be created and returned.
   * @returns {Point3} The size of the Cube object
   */
  static size(a, output) {
    if (!output) {
      output = new Point3(a.widthX, a.widthY, a.height);
    } else {
      output.setTo(a.widthX, a.widthY, a.height);
    }

    return output;
  }

  /**
   * Returns a new Cube object with the same values for the x, y, z, widthX, widthY, and height properties as the original Cube object.
   * @method Cube#clone
   * @param {Cube} a - The Cube object.
   * @param {Cube} output - Optional Cube object.
   * If given the values will be set into the object, otherwise a brand new Cube object will be created and returned.
   * @returns {Cube}
   */
  static clone(a, output) {
    if (!output) {
      output = new Cube(a.x, a.y, a.z, a.widthX, a.widthY, a.height);
    } else {
      output.setTo(a.x, a.y, a.z, a.widthX, a.widthY, a.height);
    }

    return output;
  }

  /**
   * Determines whether the specified coordinates are contained within the region defined by this Cube object.
   * @method Cube#contains
   * @param {Cube|Body} a - The given object.
   * @param {Number} x - The x coordinate of the point to test.
   * @param {Number} y - The y coordinate of the point to test.
   * @param {Number} z - The z coordinate of the point to test.
   * @returns {boolean} A value of true if the Cube object contains the specified point; otherwise false.
   */
  static contains(a, x, y, z) {
    if (a.widthX <= 0 || a.widthY <= 0 || a.height <= 0) {
      return false;
    }

    return (x >= a.x && x <= a.frontX && y >= a.y && y <= a.frontY && z >= a.z && z <= a.top);
  }

  /**
   * Determines whether the two Cubes intersect with each other.
   * This method checks the x, y, z, widthX, widthY, and height properties of the Cubes.
   * @method Cube#intersects
   * @param {Cube} a - The first Cube object.
   * @param {Cube} b - The second Cube object.
   * @returns {boolean} A value of true if the specified object intersects with this Cube object; otherwise false.
   */
  static intersects(a, b) {
    if (a.widthX <= 0 || a.widthY <= 0 || a.height <= 0 || b.widthX <= 0 || b.widthY <= 0 || b.height <= 0) {
      return false;
    }
    return !(a.frontX < b.x || a.frontY < b.y || a.x > b.frontX || a.y > b.frontY || a.z > b.top || a.top < b.z);
  }

  /**
   * Sets the members of Cube to the specified values.
   * @method Cube#setTo
   * @param {Number} x - The x coordinate of the bottom-back corner of the Cube.
   * @param {Number} y - The y coordinate of the bottom-back corner of the Cube.
   * @param {Number} z - The z coordinate of the bottom-back corner of the Cube.
   * @param {Number} widthX - The X axis width (breadth) of the Cube. This value should never be set to a negative.
   * @param {Number} widthY - The Y axis width (depth) of the Cube. This value should never be set to a negative.
   * @param {Number} height - The Z axis height of the Cube. This value should never be set to a negative.
   * @returns {Cube} This Cube object
   */
  setTo(x, y, z, widthX, widthY, height) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.widthX = widthX;
    this.widthY = widthY;
    this.height = height;

    return this;
  }

  /**
   * Copies the x, y, z, widthX, widthY and height properties from any given object to this Cube.
   * @method Cube#copyFrom
   * @param {Object} source - The object to copy from.
   * @returns {Cube} This Cube object.
   */
  copyFrom(source) {
    this.setTo(source.x, source.y, source.z, source.widthX, source.widthY, source.height);
  }

  /**
   * The size of the Cube object, expressed as a Point3 object with the values of the widthX, widthY and height properties.
   * @method Cube#size
   * @param {Point3} [output] - Optional Point3 object.
   * If given the values will be set into the object, otherwise a brand new Point3 object will be created and returned.
   * @returns {Point3} The size of the Cube object.
   */
  size(output) {
    return Cube.size(this, output);
  }

  /**
   * Determines whether the specified coordinates are contained within the region defined by this Cube object.
   * @method Cube#contains
   * @param {Number} x - The x coordinate of the point to test.
   * @param {Number} y - The y coordinate of the point to test.
   * @param {Number} z - The z coordinate of the point to test.
   * @returns {boolean} A value of true if the Cube object contains the specified point; otherwise false.
   */
  contains(x, y, z) {
    return Cube.contains(this, x, y, z);
  }

  /**
   * Returns a new Cube object with the same values for the x, y, z, widthX, widthY and height properties as the original Cube object.
   * @method Cube#clone
   * @param {Cube} [output] - Optional Cube object.
   * If given the values will be set into the object, otherwise a brand new Cube object will be created and returned.
   * @returns {Cube}
   */
  clone(output) {
    return Cube.clone(this, output);
  }

  /**
   * Determines whether the two Cubes intersect with each other.
   * This method checks the x, y, z, widthX, widthY, and height properties of the Cubes.
   * @method Cube#intersects
   * @param {Cube} b - The second Cube object.
   * @returns {boolean} A value of true if the specified object intersects with this Cube object; otherwise false.
   */
  intersects(b) {
    return Cube.intersects(this, b);
  }

  /**
   * Returns a string representation of this object.
   * @method Cube#toString
   * @returns {string} A string representation of the instance.
   */
  toString() {
    return `[{Cube (x=${this.x} y=${this.y} z=${this.z} widthX=${this.widthX} widthY=${this.widthY} height=${this.height} empty=${this.empty})}]`;
  }
}

export default Cube;
