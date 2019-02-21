import Point3 from './Point3';
import Cube from './Cube';

export const ISO_SPRITE = 'IsoSprite';

/**
 * @class IsoSprite
 * @extends Phaser.GameObjects.Sprite
 *
 * @classdesc
 * Create a new `IsoSprite` object. IsoSprites are extended versions of standard Sprites that are suitable for axonometric positioning.
 *
 * IsoSprites are simply Sprites that have three new position properties (isoX, isoY and isoZ)
 * and ask the instance of Projector what their position should be in a 2D scene whenever these properties are changed.
 * The IsoSprites retain their 2D position property to prevent any problems and allow you
 * to interact with them as you would a normal Sprite. The upside of this simplicity is that things
 * should behave predictably for those already used to Phaser.
 *
 * @constructor
 * @param {Phaser.Scene} scene - A reference to the current scene.
 * @param {number} x - The x coordinate (in 3D space) to position the IsoSprite at.
 * @param {number} y - The y coordinate (in 3D space) to position the IsoSprite at.
 * @param {number} z - The z coordinate (in 3D space) to position the IsoSprite at.
 * @param {string} texture - This is the image or texture
 * used by the IsoSprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
 * @param {string|number} frame - If this IsoSprite is using part of a sprite sheet
 * or texture atlas you can specify the exact frame to use by giving a string or numeric index.
 */
export default class IsoSprite extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, z, texture, frame) {
    super(scene, x, y, texture, frame);

    /**
     * @desc The const type of IsoSprite.
     * @type {String}
     */
    this.type = ISO_SPRITE;

    /**
     * @desc Handy for keeping pixel art snapped to whole pixels.
     * @type {Number}
     */
    this.snap = 0;

    /**
     * @property {Point3} [_isoPosition] - Internal 3D position.
     * @private
     */
    this._isoPosition = new Point3(x, y, z);

    /**
     * @property {boolean} [_isoPositionChanged] - Internal invalidation control for positioning.
     * @readonly
     * @private
     */
    this._isoPositionChanged = true;

    /**
     * @property {boolean} [_isoBoundsChanged] - Internal invalidation control for isometric bounds.
     * @readonly
     * @private
     */
    this._isoBoundsChanged = true;

    this._project();

    /**
     * @property {Cube} [_isoBounds] - Internal derived 3D bounds.
     * @private
     */
    this._isoBounds = this.resetIsoBounds();
  }

  /**
   * @property {number} [isoX] - The axonometric position of the IsoSprite on the x axis.
   * @desc Increasing the x coordinate will move the object down and to the right on the screen.
   */
  get isoX() {
    return this._isoPosition.x;
  }

  set isoX(value) {
    this._isoPosition.x = value;
    this._isoPositionChanged = this._isoBoundsChanged = true;
    if (this.body) {
      this.body._reset = true;
    }
  }

  /**
   * @property {number} [isoY] - The axonometric position of the IsoSprite on the y axis.
   * @desc Increasing the y coordinate will move the object down and to the left on the screen.
   */
  get isoY() {
    return this._isoPosition.y;
  }

  set isoY(value) {
    this._isoPosition.y = value;
    this._isoPositionChanged = this._isoBoundsChanged = true;

    if (this.body) {
      this.body._reset = true;
    }
  }

  /**
   * @property {number} [isoZ] - The axonometric position of the IsoSprite on the z axis.
   * @desc Increasing the z coordinate will move the object directly upwards on the screen.
   */
  get isoZ() {
    return this._isoPosition.z;
  }

  set isoZ(value) {
    this._isoPosition.z = value;
    this._isoPositionChanged = this._isoBoundsChanged = true;
    if (this.body) {
      this.body._reset = true;
    }
  }

  /**
   * @property {Cube} [isoBounds] - A Cube object representing the derived bounds of the IsoSprite.
   * @readonly
   */
  get isoBounds() {
    if (this._isoBoundsChanged || !this._isoBounds) {
      this.resetIsoBounds();
      this._isoBoundsChanged = false;
    }

    return this._isoBounds;
  }

  /**
   * Internal function that performs the axonometric projection from 3D to 2D space.
   * @method IsoSprite#_project
   * @private
   */
  _project() {
    if (this._isoPositionChanged) {
      const pluginKey = this.scene.sys.settings.map.isoPlugin;
      const sceneProjector = this.scene[pluginKey].projector;
      const {x, y} = sceneProjector.project(this._isoPosition);

      this.x = x;
      this.y = y;
      this.depth = (this._isoPosition.x + this._isoPosition.y) + (this._isoPosition.z * 1.25);

      if (this.snap > 0) {
        this.x = Phaser.Math.Snap.SnapTo(this.x, this.snap);
        this.y = Phaser.Math.Snap.SnapTo(this.y, this.snap);
      }

      this._isoPositionChanged = this._isoBoundsChanged = true;
    }
  }

  /**
   * Internal function called by the World update cycle.
   *
   * @method IsoSprite#preUpdate
   */
  preUpdate(time, delta) {
    Phaser.GameObjects.Sprite.prototype.preUpdate.call(this, time, delta);
    this._project();
  }

  resetIsoBounds() {
    if (typeof this._isoBounds === 'undefined') {
      this._isoBounds = new Cube();
    }

    const asx = Math.abs(this.scaleX);
    const asy = Math.abs(this.scaleY);

    this._isoBounds.widthX = Math.round(Math.abs(this.width) * 0.5) * asx;
    this._isoBounds.widthY = Math.round(Math.abs(this.width) * 0.5) * asx;
    this._isoBounds.height = Math.round(Math.abs(this.height) - (Math.abs(this.width) * 0.5)) * asy;

    this._isoBounds.x = this.isoX + (this._isoBounds.widthX * -this.originX) + this._isoBounds.widthX * 0.5;
    this._isoBounds.y = this.isoY + (this._isoBounds.widthY * this.originX) - this._isoBounds.widthY * 0.5;
    this._isoBounds.z = this.isoZ - (Math.abs(this.height) * (1 - this.originY)) + (Math.abs(this.width * 0.5));

    return this._isoBounds;
  }
}