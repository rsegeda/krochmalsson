import * as Phaser from "phaser";
import Projector, {ISOMETRIC} from './Projector';
import IsoSprite from './IsoSprite';

/**
 * @classdesc
 * Isometric is a comprehensive axonometric plugin for Phaser which provides an API for handling axonometric projection of assets in 3D space to the screen.
 * The goal has been to mimic as closely as possible the existing APIs provided by Phaser for standard orthogonal 2D projection, but add a third dimension.
 * Also included is an Arcade-based 3D AABB physics engine, which again is closely equivalent in functionality and its API.
 *
 * @class IsoPlugin
 * @extends Phaser.Plugins.BasePlugin
 * @constructor
 * @param {Phaser.Scene} scene The current scene instance
 * @param {Phaser.Plugins.PluginManager} pluginManager - A reference to the Plugin Manager.
 */
export default class IsoPlugin extends Phaser.Plugins.BasePlugin {

  constructor(scene, pluginManager) {
    super(pluginManager);

    this.scene = scene;
    this.systems = scene.sys;

    if (!scene.sys.settings.isBooted) {
      scene.sys.events.once('boot', this.boot, this);
    }

    this.projector = new Projector(scene, ISOMETRIC);

    /**
     * Create a new IsoSprite with specific position and sprite sheet key.
     *
     * @param {number} x - X position of the new IsoSprite.
     * @param {number} y - Y position of the new IsoSprite.
     * @param {number} y - Z position of the new IsoSprite.
     * @param {string} key - This is the image or texture used by the Sprite during rendering.
     * It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or Pixi.Texture.
     * @param {string|number} [frame] - If the sprite uses an image from a texture atlas
     * or sprite sheet you can pass the frame here. Either a number for a frame ID or a string for a frame name.
     * @returns {IsoSprite} the newly created IsoSprite object.
     */

    Phaser.GameObjects.GameObjectCreator.register('isoSprite', (x, y, z, key, frame) =>
      new IsoSprite(this.scene, x, y, z, key, frame));

    /**
     * Create a new IsoSprite with specific position and sprite sheet key.
     *
     * @param {number} x - X position of the new IsoSprite.
     * @param {number} y - Y position of the new IsoSprite.
     * @param {number} y - Z position of the new IsoSprite.
     * @param {string|Phaser.RenderTexture} key - This is the image or texture used
     * by the Sprite during rendering.
     * It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or Pixi.Texture.
     * @param {string|number} [frame] - If the sprite uses an image from a texture atlas or sprite sheet you can pass the frame here.
     * Either a number for a frame ID or a string for a frame name.
     * @param {Phaser.GameObjects.Group} [group] - Optional Group to add the object to. If not specified it will be added to the World group.
     * @returns {IsoSprite} the newly created IsoSprite object.
     */
    Phaser.GameObjects.GameObjectFactory.register('isoSprite', function (x, y, z, key, group, frame = 0) {
      const sprite = new IsoSprite(this.scene, x, y, z, key, frame);

      if (typeof group === 'undefined') {
        this.displayList.add(sprite);
        this.updateList.add(sprite);
      } else {
        group.add(sprite, true);
      }

      return sprite;
    });
  }

  static register(PluginManager) {
    PluginManager.register('IsoPlugin', IsoPlugin, 'isoPlugin');
  }

  boot() {
  }
}
