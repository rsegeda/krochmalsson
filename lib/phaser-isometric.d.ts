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
declare class Cube {
    constructor(x?: number, y?: number, z?: number, widthX?: number, widthY?: number, height?: number);
    /**
     * @property {Number}[x] -The x coordinate of the bottom-back corner of the Cube.
     */
    x: {
        x?: number;
    };
    /**
     * @property {Number}[y]- The y coordinate of the bottom-back corner of the Cube.
     */
    y: {
        y?: number;
    };
    /**
     * @property {Number} [z] - The z coordinate of the bottom-back corner of the Cube.
     */
    z: {
        z?: number;
    };
    /**
     * @property {Number} [widthX] - The X axis width (breadth) of the Cube.
     * @desc This value should never be set to a negative.
     */
    widthX: {
        widthX?: number;
    };
    /**
     * @property {Number} [widthY] - The Y axis width (depth) of the Cube.
     * @desc This value should never be set to a negative.
     */
    widthY: {
        widthY?: number;
    };
    /**
     * @property {Number} [height] - The Z axis height of the Cube.
     * @desc This value should never be set to a negative.
     */
    height: {
        height?: number;
    };
    /**
     * @property {Number} halfWidthX - Half of the widthX of the Cube.
     * @readonly
     */
    readonly halfWidthX: {
        halfWidthX: number;
    };
    /**
     * @property {Number} [halfWidthY] - Half of the widthY of the Cube.
     * @readonly
     */
    readonly halfWidthY: {
        halfWidthY?: number;
    };
    /**
     * @property {Number} [halfHeight] - Half of the height of the Cube.
     * @readonly
     */
    readonly halfHeight: {
        halfHeight?: number;
    };
    /**
     * @desc Changing the bottom property of a Cube object has no effect on the x, y, widthX and
     * widthY properties. * However it does affect the height property,
     * whereas changing the z value does not affect the height property.
     * @method Cube#bottom
     * @returns {Number}
     */
    bottom(): number;
    /**
     * @desc The sum of the z and height properties.
     * Changing the top property of a Cube object has no effect on the x, y, z,
     * widthX and widthY properties, but does change the height property.
     * @name Cube#top
     * @type {Number}
     */
    top: number;
    /**
     * @desc The x coordinate of the back of the Cube.
     * Changing the backX property of a Cube object has no effect on the y, z,
     * widthY and height properties. However it does affect the widthX property,
     * whereas changing the x value does not affect the width property.
     * @method Cube#backX
     * @returns {Number}
     */
    backX(): number;
    /**
     * @desc The y coordinate of the back of the Cube.
     * Changing the backY property of a Cube object has no effect on the x, z,
     * widthX and height properties. However it does affect the widthY property,
     * whereas changing the y value does not affect the width property.
     * @method Cube#backY
     * @returns {Number}
     */
    backY(): number;
    /**
     * @desc The sum of the x and widthX properties.
     * Changing the frontX property of a Cube object has no effect on the x, y, z,
     * widthY and height properties, however it does affect the widthX property.
     * @method Cube#frontX
     * @returns {Number}
     */
    frontX(): number;
    /**
     * @desc The sum of the y and widthY properties.
     * Changing the frontY property of a Cube object has no effect on the x, y, z,
     * widthX and height properties, however it does affect the widthY property.
     * @method Cube#frontY
     * @returns {Number}
     */
    frontY(): number;
    /**
     * @desc The volume of the Cube derived from widthX * widthY * height.
     * @method Cube#volume
     * @returns {Number}
     * @readonly
     */
    volume(): number;
    /**
     * The x coordinate of the center of the Cube.
     * @method Cube#centerX
     * @returns {Number}
     */
    centerX(): number;
    /**
     * @name Cube#centerY
     * @property {Number} centerY - The y coordinate of the center of the Cube.
     */
    centerY: {
        centerY: number;
    };
    /**
     * Determines whether or not this Cube object is empty.
     * A Cube object is empty if its widthX, widthY or height is less than or equal to 0.
     * If set to true then all of the Cube properties are set to 0.
     * @name Cube#empty
     * @property {boolean} empty - Determines whether or not this Cube object is empty.
     */
    empty: {
        empty: boolean;
    };
    /**
     * The size of the Cube object, expressed as a Point3 object with the values of the widthX, widthY and height properties.
     * @method Cube#size
     * @param {Cube} [a] - The Cube object.
     * @param {Point3} [output] - Optional Point3 object.
     * If given the values will be set into the object, otherwise a brand new Point3 object will be created and returned.
     * @returns {Point3} The size of the Cube object
     */
    size(a?: Cube, output?: Point3): Point3;
    /**
     * Returns a new Cube object with the same values for the x, y, z, widthX, widthY, and height properties as the original Cube object.
     * @method Cube#clone
     * @param {Cube} a - The Cube object.
     * @param {Cube} output - Optional Cube object.
     * If given the values will be set into the object, otherwise a brand new Cube object will be created and returned.
     * @returns {Cube}
     */
    clone(a: Cube, output: Cube): Cube;
    /**
     * Determines whether the specified coordinates are contained within the region defined by this Cube object.
     * @method Cube#contains
     * @param {Cube|Body} a - The given object.
     * @param {Number} x - The x coordinate of the point to test.
     * @param {Number} y - The y coordinate of the point to test.
     * @param {Number} z - The z coordinate of the point to test.
     * @returns {boolean} A value of true if the Cube object contains the specified point; otherwise false.
     */
    contains(a: Cube | Body, x: number, y: number, z: number): boolean;
    /**
     * Determines whether the two Cubes intersect with each other.
     * This method checks the x, y, z, widthX, widthY, and height properties of the Cubes.
     * @method Cube#intersects
     * @param {Cube} a - The first Cube object.
     * @param {Cube} b - The second Cube object.
     * @returns {boolean} A value of true if the specified object intersects with this Cube object; otherwise false.
     */
    intersects(a: Cube, b: Cube): boolean;
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
    setTo(x: number, y: number, z: number, widthX: number, widthY: number, height: number): Cube;
    /**
     * Copies the x, y, z, widthX, widthY and height properties from any given object to this Cube.
     * @method Cube#copyFrom
     * @param {Object} source - The object to copy from.
     * @returns {Cube} This Cube object.
     */
    copyFrom(source: any): Cube;
    /**
     * The size of the Cube object, expressed as a Point3 object with the values of the widthX, widthY and height properties.
     * @method Cube#size
     * @param {Cube} [a] - The Cube object.
     * @param {Point3} [output] - Optional Point3 object.
     * If given the values will be set into the object, otherwise a brand new Point3 object will be created and returned.
     * @returns {Point3} The size of the Cube object
     */
    size(a?: Cube, output?: Point3): Point3;
    /**
     * Determines whether the specified coordinates are contained within the region defined by this Cube object.
     * @method Cube#contains
     * @param {Cube|Body} a - The given object.
     * @param {Number} x - The x coordinate of the point to test.
     * @param {Number} y - The y coordinate of the point to test.
     * @param {Number} z - The z coordinate of the point to test.
     * @returns {boolean} A value of true if the Cube object contains the specified point; otherwise false.
     */
    contains(a: Cube | Body, x: number, y: number, z: number): boolean;
    /**
     * Returns a new Cube object with the same values for the x, y, z, widthX, widthY, and height properties as the original Cube object.
     * @method Cube#clone
     * @param {Cube} a - The Cube object.
     * @param {Cube} output - Optional Cube object.
     * If given the values will be set into the object, otherwise a brand new Cube object will be created and returned.
     * @returns {Cube}
     */
    clone(a: Cube, output: Cube): Cube;
    /**
     * Determines whether the two Cubes intersect with each other.
     * This method checks the x, y, z, widthX, widthY, and height properties of the Cubes.
     * @method Cube#intersects
     * @param {Cube} a - The first Cube object.
     * @param {Cube} b - The second Cube object.
     * @returns {boolean} A value of true if the specified object intersects with this Cube object; otherwise false.
     */
    intersects(a: Cube, b: Cube): boolean;
    /**
     * Returns a string representation of this object.
     * @method Cube#toString
     * @returns {string} A string representation of the instance.
     */
    toString(): string;
}

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
declare class IsoPlugin extends Phaser.Plugins.BasePlugin {
    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager);
}

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
declare class IsoSprite extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, z: number, texture: string, frame: string | number);
    /**
     * @desc The const type of IsoSprite.
     * @type {String}
     */
    type: string;
    /**
     * @desc Handy for keeping pixel art snapped to whole pixels.
     * @type {Number}
     */
    snap: number;
    /**
     * @property {number} [isoX] - The axonometric position of the IsoSprite on the x axis.
     * @desc Increasing the x coordinate will move the object down and to the right on the screen.
     */
    isoX: {
        isoX?: number;
    };
    /**
     * @property {number} [isoY] - The axonometric position of the IsoSprite on the y axis.
     * @desc Increasing the y coordinate will move the object down and to the left on the screen.
     */
    isoY: {
        isoY?: number;
    };
    /**
     * @property {number} [isoZ] - The axonometric position of the IsoSprite on the z axis.
     * @desc Increasing the z coordinate will move the object directly upwards on the screen.
     */
    isoZ: {
        isoZ?: number;
    };
    /**
     * @property {Cube} [isoBounds] - A Cube object representing the derived bounds of the IsoSprite.
     * @readonly
     */
    readonly isoBounds: {
        isoBounds?: Cube;
    };
    /**
     * Internal function called by the World update cycle.
     *
     * @method IsoSprite#preUpdate
     */
    preUpdate(): void;
}

/**
 * @class Octree
 *
 * @classdesc A Octree implementation based on Phaser.QuadTree.
 * Original version at https://github.com/timohausmann/quadtree-js/
 *
 * @constructor
 * @param {number} x - The bottom-back coordinate of the octree.
 * @param {number} y - The bottom-back coordinate of the octree.
 * @param {number} z - The bottom-back coordinate of the octree.
 * @param {number} widthX - The width X (breadth) of the octree.
 * @param {number} widthY - The width Y (depth) of the octree.
 * @param {number} height - The height (Z) of the octree.
 * @param {number} [maxObjects=10] - The maximum number of objects per node.
 * @param {number} [maxLevels=4] - The maximum number of levels to iterate to.
 * @param {number} [level=0] - Which level is this?
 */
declare class Octree {
    constructor(x: number, y: number, z: number, widthX: number, widthY: number, height: number, maxObjects?: number, maxLevels?: number, level?: number);
    /**
     * @property {number} [maxObjects] - The maximum number of objects per node.
     * @default
     */
    maxObjects: {
        maxObjects?: number;
    };
    /**
     * @property {number} [maxLevels] - The maximum number of levels to break down to.
     * @default
     */
    maxLevels: {
        maxLevels?: number;
    };
    /**
     * @property {number} [level] - The current level.
     */
    level: {
        level?: number;
    };
    /**
     * @property {Object} [bounds] - Object that contains the octree bounds.
     */
    bounds: {
        bounds?: any;
    };
    /**
     * @property {Object[]} [objects] - Array of octree children.
     */
    objects: {
        objects?: object[];
    };
    /**
     * @property {Octree[]} [nodes] - Array of associated child nodes.
     */
    nodes: {
        nodes?: Octree[];
    };
    /**
     * Resets the QuadTree.
     *
     * @method Octree#reset
     * @param {number} x - The bottom-back coordinate of the octree.
     * @param {number} y - The bottom-back coordinate of the octree.
     * @param {number} z - The bottom-back coordinate of the octree.
     * @param {number} widthX - The width X (breadth) of the octree.
     * @param {number} widthY - The width Y (depth) of the octree.
     * @param {number} height - The height (Z) of the octree.
     * @param {number} [maxObjects=10] - The maximum number of objects per node.
     * @param {number} [maxLevels=4] - The maximum number of levels to iterate to.
     * @param {number} [level=0] - Which level is this?
     */
    reset(x: number, y: number, z: number, widthX: number, widthY: number, height: number, maxObjects?: number, maxLevels?: number, level?: number): void;
    /**
     * Populates this octree with the children of the given Group. In order to be added the child must exist and have a body property.
     *
     * @method Octree#populate
     * @param {Phaser.GameObjects.Group} group - The Group to add to the octree.
     */
    populate(group: Phaser.GameObjects.Group): void;
    /**
     * Handler for the populate method.
     *
     * @method Octree#populateHandler
     * @param {Phaser.GameObjects.GameObject} sprite - The Sprite to check.
     */
    populateHandler(sprite: Phaser.GameObjects.GameObject): void;
    /**
     * Split the node into 8 subnodes
     *
     * @method Octree#split
     */
    split(): void;
    /**
     * Insert the object into the node. If the node exceeds the capacity, it will split and add all objects to their corresponding subnodes.
     *
     * @method Octree#insert
     * @param {Body|Cube|object} body - The Body object to insert into the octree.
     * Can be any object so long as it exposes x, y, z, frontX, frontY and top properties.
     */
    insert(body: Body | Cube | any): void;
    /**
     * Determine which node the object belongs to.
     *
     * @method Octree#getIndex
     * @param {Cube|object} cube - The bounds in which to check.
     * @returns {number} Index of the subnode (0-7), or -1 if cube cannot completely fit within a subnode and is part of the parent node.
     */
    getIndex(cube: Cube | any): number;
    /**
     * Return all objects that could collide with the given IsoSprite or Cube.
     *
     * @method Octree#retrieve
     * @param {IsoSprite|Cube} source - The source object to check the Octree against. Either a IsoSprite or Cube.
     * @param {Body} source.body - The source object's iso body.
     * @returns {Array<Object>} Array with all detected objects.
     */
    retrieve(source: {
        body: Body;
    }): object[];
    /**
     * Clear the octree.
     * @method Octree#clear
     */
    clear(): void;
}

/**
 * @class Point3
 *
 * @classdesc
 * The Point3 object represents a location in a three-dimensional coordinate system,
 * where x and y represent the horizontal axes and z represents the vertical axis.
 * The following code creates a point at (0,0,0):
 * `var myPoint = new Point3();`
 *
 * Creates a new Point3 object. If you pass no parameters a Point3 is created set to (0, 0, 0).
 *
 * @constructor
 * @param {number} [x=0] - The horizontal X position of this Point.
 * @param {number} [y=0] - The horizontal Y position of this Point.
 * @param {number} [z=0] - The vertical position of this Point.
 */
declare class Point3 {
    constructor(x?: number, y?: number, z?: number);
    /**
     * The x value of the point.
     * @name Point3#x
     * @type number
     */
    x: number;
    /**
     * The y value of the point.
     * @name Point3#y
     * @type number
     */
    y: number;
    /**
     * The z value of the point.
     * @name Point3#z
     * @type number
     */
    z: number;
    /**
     * Adds the coordinates of two points together to create a new point.
     *
     * @method Point3.add
     * @param {Point3} a - The first Point3 object.
     * @param {Point3} b - The second Point3 object.
     * @param {Point3} [out] - Optional Point3 to store the value in, if not supplied a new Point3 object will be created.
     * @returns {Point3} The new Point3 object.
     */
    static add(a: Point3, b: Point3, out?: Point3): Point3;
    /**
     * Subtracts the coordinates of two points to create a new point.
     *
     * @method Point3.subtract
     * @param {Point3} a - The first Point3 object.
     * @param {Point3} b - The second Point3 object.
     * @param {Point3} [out] - Optional Point3 to store the value in, if not supplied a new Point3 object will be created.
     * @returns {Point3} The new Point3 object.
     */
    static subtract(a: Point3, b: Point3, out?: Point3): Point3;
    /**
     * Multiplies the coordinates of two points to create a new point.
     *
     * @method Point3.multiply
     * @param {Point3} a - The first Point3 object.
     * @param {Point3} b - The second Point3 object.
     * @param {Point3} [out] - Optional Point3 to store the value in, if not supplied a new Point3 object will be created.
     * @returns {Point3} The new Point3 object.
     */
    static multiply(a: Point3, b: Point3, out?: Point3): Point3;
    /**
     * Divides the coordinates of two points to create a new point.
     *
     * @method Point3.divide
     * @param {Point3} a - The first Point3 object.
     * @param {Point3} b - The second Point3 object.
     * @param {Point3} [out] - Optional Point3 to store the value in, if not supplied a new Point3 object3 will be created.
     * @returns {Point3} The new Point3 object.
     */
    static divide(a: Point3, b: Point3, out?: Point3): Point3;
    /**
     * Determines whether the two given Point3 objects are equal. They are considered equal if they have the same x, y and z values.
     *
     * @method Point3.equals
     * @param {Point3} a - The first Point3 object.
     * @param {Point3} b - The second Point3 object.
     * @returns {boolean} A value of true if the Points3 are equal, otherwise false.
     */
    static equals(a: Point3, b: Point3): boolean;
    /**
     * Copies the x, y and z properties from any given object to this Point3.
     *
     * @method Point3#copyFrom
     * @param {Object} source - The object to copy from.
     * @returns {Point3} This Point3 object.
     */
    copyFrom(source: any): Point3;
    /**
     * Determines whether the given object's x/y/z values are equal to this Point3 object.
     *
     * @method Point3#equals
     * @param {Point3} a - The object to compare with this Point3.
     * @returns {boolean} A value of true if the x and y points are equal, otherwise false.
     */
    equals(a: Point3): boolean;
    /**
     * Sets the x, y and z values of this Point3 object to the given values.
     * If you omit the y and z value then the x value will be applied to all three, for example:
     * `Point3.set(2)` is the same as `Point3.set(2, 2, 2)`
     * If however you set both x and y, but no z, the z value will be set to 0.
     *
     * @method Point3#set
     * @param {number} [x] - The x value of this point.
     * @param {number} [y] - The y value of this point. If not given the x value will be used in its place.
     * @param {number} [z] - The z value of this point. If not given and the y value is also not given, the x value will be used in its place.
     * @returns {Point3} This Point3 object. Useful for chaining method calls.
     */
    set(x?: number, y?: number, z?: number): Point3;
    /**
     * Sets the x, y and z values of this Point3 object to the given values.
     * If you omit the y and z value then the x value will be applied to all three, for example:
     * `Point3.setTo(2)` is the same as `Point3.setTo(2, 2, 2)`
     * If however you set both x and y, but no z, the z value will be set to 0.
     *
     * @method Point3#setTo
     * @param {number} [x] - The x value of this point.
     * @param {number} [y] - The y value of this point. If not given the x value will be used in its place.
     * @param {number} [z] - The z value of this point. If not given and the y value is also not given, the x value will be used in its place.
     * @returns {Point3} This Point3 object. Useful for chaining method calls.
     */
    setTo(x?: number, y?: number, z?: number): Point3;
    /**
     * Adds the given x, y and z values to this Point3.
     *
     * @method Point3#add
     * @param {number} x - The value to add to Point3.x.
     * @param {number} y - The value to add to Point3.y.
     * @param {number} z - The value to add to Point3.z.
     * @returns {Point3} This Point3 object. Useful for chaining method calls.
     */
    add(x: number, y: number, z: number): Point3;
    /**
     * Subtracts the given x, y and z values from this Point3.
     *
     * @method Point3#subtract
     * @param {number} x - The value to subtract from Point3.x.
     * @param {number} y - The value to subtract from Point3.y.
     * @param {number} z - The value to subtract from Point3.z.
     * @returns {Point3} This Point3 object. Useful for chaining method calls.
     */
    subtract(x: number, y: number, z: number): Point3;
    /**
     * Multiplies Point3.x, Point3.y and Point3.z by the given x and y values. Sometimes known as `Scale`.
     *
     * @method Point3#multiply
     * @param {number} x - The value to multiply Point3.x by.
     * @param {number} y - The value to multiply Point3.y by.
     * @param {number} z - The value to multiply Point3.z by.
     * @returns {Point3} This Point3 object. Useful for chaining method calls.
     */
    multiply(x: number, y: number, z: number): Point3;
    /**
     * Divides Point3.x, Point3.y and Point3.z by the given x, y and z values.
     *
     * @method Point3#divide
     * @param {number} x - The value to divide Point3.x by.
     * @param {number} y - The value to divide Point3.y by.
     * @param {number} z - The value to divide Point3.z by.
     * @returns {Point3} This Point3 object. Useful for chaining method calls.
     */
    divide(x: number, y: number, z: number): Point3;
}

/**
 * @class Projector
 *
 * @classdesc
 * Creates a new Isometric Projector object, which has helpers for projecting x, y and z coordinates into axonometric x and y equivalents.
 *
 * @constructor
 * @param {Phaser.Game} game - The current game object.
 * @param {number} projectionAngle - The angle of the axonometric projection in radians.
 * Defaults to approx. 0.4636476 (Math.atan(0.5) which is suitable for 2:1 pixel art dimetric)
 * @returns {Cube} This Cube object.
 */
declare class Projector {
    constructor(game: Phaser.Game, projectionAngle: number);
    /**
     * The current scene object.
     * @name Projector#scene
     * @type {Phaser.Scene}
     */
    scene: Phaser.Scene;
    /**
     * @property {number} [projectionAngle] - The angle of projection in radians.
     * @default
     */
    projectionAngle: {
        projectionAngle?: number;
    };
    /**
     * The x and y offset multipliers as a ratio of the game world size.
     * @name Projector#origin
     * @type {Phaser.Geom.Point}
     * @default
     */
    origin: Phaser.Geom.Point;
    /**
     * Use axonometric projection to transform a 3D Point3 coordinate to a 2D Point coordinate. If given the coordinates will be set into the object, otherwise a brand new Point object will be created and returned.
     * @method Projector#project
     * @param {Point3} point3 - The Point3 to project from.
     * @param {Phaser.Geom.Point} out - The Point to project to.
     * @returns {Phaser.Geom.Point} The transformed Point.
     */
    project(point3: Point3, out: Phaser.Geom.Point): Phaser.Geom.Point;
    /**
     * Use reverse axonometric projection to transform a 2D Point coordinate to a 3D Point3 coordinate. If given the coordinates will be set into the object, otherwise a brand new Point3 object will be created and returned.
     * @method Projector#unproject
     * @param {Phaser.Geom.Point} point - The Point to project from.
     * @param {Point3} out - The Point3 to project to.
     * @param {number} [z] - Specified z-plane to project to.
     * @returns {Point3} The transformed Point3.
     */
    unproject(point: Phaser.Geom.Point, out: Point3, z?: number): Point3;
}

