import Point3 from '../Point3';
import World from './World';

/**
 * IsoPhysics Physics constructor.
 *
 * @class IsoPhysics
 * @classdesc IsoPhysics Physics
 *
 * @constructor
 * @param {Phaser.Scene} scene Reference to the current scene instance.
 */
export default class IsoPhysics {

  constructor(scene) {
    /**
     * @property {Phaser.Scene} scene - Local reference to scene.
     */
    this.scene = scene;

    /**
     * @property {Projector} projector - Local reference to the current projector.
     */
    const pluginKey = this.scene.sys.settings.map.isoPlugin;
    this.projector = this.scene[pluginKey].projector;

    /**
     * @property {World} world - The physics World that gets created on start.
     */
    this.world = new World(this.scene);
  }

  static register(PluginManager) {
    PluginManager.register('IsoPhysics', IsoPhysics, 'isoPhysics');
  }

  /**
   * Find the distance between a display object (like a Sprite) and the given x/y/z coordinates.
   * The calculation is made from the display objects x/y/z coordinate. This may be the top-left if its anchor hasn't been changed.
   * If you need to calculate from the center of a display object instead use the method distanceBetweenCenters()
   *
   * @method IsoPhysics#distanceToXYZ
   * @param {Body} displayObjectBody - The Display Object to test from.
   * @param {number} x - The x coordinate to test to.
   * @param {number} y - The y coordinate to test to.
   * @param {number} z - The y coordinate to test to
   * @returns {number} The distance between the object and the x/y coordinates.
   */
  distanceToXYZ(displayObjectBody, x, y, z) {
    this._dx = displayObjectBody.x - x;
    this._dy = displayObjectBody.y - y;
    this._dz = displayObjectBody.z - z;

    return Math.sqrt(this._dx * this._dx + this._dy * this._dy + this._dz * this._dz);
  }

  /**
   * Find the angles in radians between a display object (like a IsoSprite) and the given x/y/z coordinate.
   *
   * @method Phaser.Physics.Isometric.Isometric.IsoPhysics#anglesToXYZ
   * @param {Body} displayObjectBody - The Display Object to test from.
   * @param {number} x - The x coordinate to get the angle to.
   * @param {number} y - The y coordinate to get the angle to.
   * @param {number} z - The z coordinate to get the angle to.
   * @returns {{phi: number, r: number, theta: number}} The angle in radians between displayObjectBody.x/y to Pointer.x/y
   */
  anglesToXYZ(displayObjectBody, x, y, z) {
    // Spherical polar coordinates
    const r = this.distanceToXYZ(displayObjectBody, x, y, z);
    const theta = Math.atan2(y - displayObjectBody.y, x - displayObjectBody.x);
    const phi = Math.acos((z - displayObjectBody.z) / r);

    return {r: r, theta: theta, phi: phi};
  }

  /**
   * Given the angle (in degrees) and speed calculate the velocity and return it as a Point object, or set it to the given point object.
   * One way to use this is: velocityFromAngle(angle, 200, sprite.velocity) which will set the values directly to the sprites velocity and not create a new Point object.
   *
   * @method Phaser.Physics.IsoPhysics#velocityFromAngle
   * @param {number} theta - The angle in radians for x,y in the isometric co-ordinate system
   * @param {number} [phi=Math.PI/2] - The angle in radians for z in the isometric co-ordinate system
   * @param {number} [speed=60] - The speed it will move, in pixels per second sq.
   * @returns {Point3} A Point where point.x contains the velocity x value and so on for y and z.
   */
  static velocityFromAngles(theta, phi, speed) {
    if (phi === undefined) {
      phi = Math.sin(Math.PI / 2);
    }
    if (speed === undefined) {
      speed = 60;
    }

    return new Point3(
      Math.cos(theta) * Math.sin(phi) * speed,
      Math.sin(theta) * Math.sin(phi) * speed,
      Math.cos(phi) * speed
    );
  }

  /**
   * Move the given display object towards the x/y coordinates at a steady velocity.
   * If you specify a maxTime then it will adjust the speed (over-writing what you set) so it arrives at the destination in that number of seconds.
   * Timings are approximate due to the way browser timers work. Allow for a variance of +- 50ms.
   * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
   * Note: The display object doesn't stop moving once it reaches the destination coordinates.
   * Note: Doesn't take into account acceleration, maxVelocity or drag (if you've set drag or acceleration too high this object may not move at all)
   *
   * @method Phaser.Physics.Isometric.IsoPhysics#moveToXYZ
   * @param {Object} displayObject - The display object to be moved
   * @param {Body} displayObject.body - body of the displayObject
   * @param {number} x - The x coordinate to move towards.
   * @param {number} y - The y coordinate to move towards.
   * @param {number} z - The z coordinate to move towards.
   * @param {number} [speed=60] - The speed it will move, in pixels per second (default is 60 pixels/sec)
   * @param {number} [maxTime=0] - Time given in milliseconds (1000 = 1 sec). If set the speed is adjusted so the object will arrive at destination in the given number of ms.
   * @returns {number} The angle (in radians).
   */
  moveToXYZ(displayObject, x, y, z, speed, maxTime) {
    if (typeof speed === 'undefined') {
      speed = 60;
    }
    if (typeof maxTime === 'undefined') {
      maxTime = 0;
    }

    if (maxTime > 0) {
      //  We know how many pixels we need to move, but how fast?
      speed = this.distanceToXYZ(displayObject.body, x, y, z) / (maxTime / 1000);
    }
    const a = this.anglesToXYZ(displayObject.body, x, y, z);
    const v = IsoPhysics.velocityFromAngles(a.theta, a.phi, speed);

    displayObject.body.velocity.copyFrom(v);

    return a.theta;
  }

  /**
   * Move the given display object towards the destination object at a steady velocity.
   * If you specify a maxTime then it will adjust the speed (overwriting what you set) so it arrives at the destination in that number of seconds.
   * Timings are approximate due to the way browser timers work. Allow for a variance of +- 50ms.
   * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
   * Note: The display object doesn't stop moving once it reaches the destination coordinates.
   * Note: Doesn't take into account acceleration, maxVelocity or drag (if you've set drag or acceleration too high this object may not move at all)
   *
   * @method Phaser.Physics.Isometric.IsoPhysics#moveToObject
   * @param {Object} displayObject - The display object to move.
   * @param {Object} destination - The display object to move towards. Can be any object but must
   * have visible x/y/z properties.
   * @param {number} [speed=60] - The speed it will move, in pixels per second (default is 60 pixels/sec)
   * @param {number} [maxTime=0] - Time given in milliseconds (1000 = 1 sec). If set the speed is adjusted so the object will arrive at destination in the given number of ms.
   * @returns {number} The angle (in radians).
   */
  moveToObject(displayObject, destination, speed, maxTime) {
    return this.moveToXYZ(displayObject, destination.x, destination.y, destination.z, speed, maxTime);
  }

  boot() {
    const eventEmitter = this.scene.sys.events;

    eventEmitter.on('update', this.world.update, this.world);
    eventEmitter.on('postupdate', this.world.postUpdate, this.world);
  }
}