import IsoPlugin from 'phaser-isometric/src/isometric/IsoPlugin';
import IsoPhysics from 'phaser-isometric/src/isometric/physics/IsoPhysics';
import {DIRECTIONS} from "../constants";
import {playerSpriteSheetFileConfig} from "../config";
import Group = Phaser.GameObjects.Group;
import Sprite = Phaser.GameObjects.Sprite;

export class MainScene extends Phaser.Scene {
    private player: IsoSprite;
    private tile: IsoSprite;
    private isoGroup: Phaser.GameObjects.Group;
    private isoPhysics: IsoPhysics;
    private controls: any;

    constructor() {
        super({
            key: "MainScene",
            mapAdd: {isoPlugin: 'iso', isoPhysics: 'isoPhysics'}
        });

        this.player = null;
        this.tile = null;
    }

    preload(): void {
        this.load.image('tile', '../assets/img/grass-isometric.png');

        this.load.spritesheet(playerSpriteSheetFileConfig);

        this.load.scenePlugin({
            key: 'IsoPlugin',
            url: IsoPlugin,
            sceneKey: 'iso'
        });

        this.load.scenePlugin({
            key: 'IsoPhysics',
            url: IsoPhysics,
            sceneKey: 'isoPhysics'
        });
    }

    create(): void {
        this.isoGroup = new Group(this);
        this.isoPhysics.world.gravity.setTo(0, 0, -500);

        this.tile = this.addTile(0, 0, 0, 'tile', this.isoGroup);

        this.player = this.addPlayer(0, 0, 0, 'playerSpriteSheet', this.isoGroup);
        this.cameras.main.startFollow(this.player, undefined, undefined, undefined, -300, -300);
        this.controls = this.createControls();
    }

    createControls(): any {
        const forward_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        const backward_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        const left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        const right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        return {
            forward_key,
            backward_key,
            left_key,
            right_key
        }
    }

    update(): void {
        this.isoPhysics.world.collide(this.isoGroup);
        // console.debug("player position", this.player.body.position);
        // console.debug("tile position", this.tile.body.position);

        this.updatePlayerVelocity(this.player);

        MainScene.playPlayerAnimations(this.player);
    }

    /**
     * Apply velocity on the player after the controls change
     * @param player
     */
    private updatePlayerVelocity(player: Sprite): void {
        const speed = 750;
        const corr = 0.5 * Math.sqrt(2);

        const {forward_key, backward_key, left_key, right_key} = this.controls;

        // Desktop moving
        if (forward_key.isDown && left_key.isUp && right_key.isUp) {
            // NORTH
            player.body.velocity.y = -speed * corr;
            player.body.velocity.x = -speed * corr;
        } else if (backward_key.isDown && left_key.isUp && right_key.isUp) {
            // SOUTH
            player.body.velocity.y = speed * corr;
            player.body.velocity.x = speed * corr;
        } else if (left_key.isDown && forward_key.isUp && backward_key.isUp) {
            // EAST
            player.body.velocity.x = -speed * corr;
            player.body.velocity.y = speed * corr;
        } else if (right_key.isDown && forward_key.isUp && backward_key.isUp) {
            // EAST
            player.body.velocity.x = speed * corr;
            player.body.velocity.y = -speed * corr;
        } else if (forward_key.isDown && left_key.isDown) {
            // NORTH_WEST
            player.body.velocity.x = -speed;
            player.body.velocity.y = 0;
        } else if (forward_key.isDown && right_key.isDown) {
            // NORTH_EAST
            player.body.velocity.y = -speed;
            player.body.velocity.x = 0;
        } else if (backward_key.isDown && left_key.isDown) {
            // SOUTH_WEST
            player.body.velocity.y = speed;
            player.body.velocity.x = 0;
        } else if (backward_key.isDown && right_key.isDown) {
            // SOUTH_EAST
            player.body.velocity.x = speed;
            player.body.velocity.y = 0;
        } else {
            player.body.velocity.y = 0;
            player.body.velocity.x = 0;
        }
    }

    /**
     * Plays dedicated animations for player- according to the velocity value
     * @param player
     */
    private static playPlayerAnimations(player: Sprite) {
        if (player.body.velocity.x > 0 && player.body.velocity.y === 0) {
            player.anims.play(DIRECTIONS.SOUTH_EAST, true);
        } else if (player.body.velocity.y > 0 && player.body.velocity.x === 0) {
            player.anims.play(DIRECTIONS.SOUTH_WEST, true);
        } else if (player.body.velocity.y < 0 && player.body.velocity.x === 0) {
            player.anims.play(DIRECTIONS.NORTH_EAST, true);
        } else if (player.body.velocity.x < 0 && player.body.velocity.y === 0) {
            player.anims.play(DIRECTIONS.NORTH_WEST, true);
        } else if (player.body.velocity.x < 0 && player.body.velocity.y < 0) {
            player.anims.play(DIRECTIONS.NORTH, true);
        } else if (player.body.velocity.x > 0 && player.body.velocity.y < 0) {
            player.anims.play(DIRECTIONS.EAST, true);
        } else if (player.body.velocity.x > 0 && player.body.velocity.y > 0) {
            player.anims.play(DIRECTIONS.SOUTH, true);
        } else if (player.body.velocity.x < 0 && player.body.velocity.y > 0) {
            player.anims.play(DIRECTIONS.WEST, true);
        } else if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
            player.anims.stop();
        }
    }

    /**
     * Adds tile to the scene.
     * @param x - coordination.x
     * @param y - coordination.y
     * @param z - coordination.z
     * @param spriteKey - tile's sprite key
     * @param isoGroup - isometric physics group
     */
    private addTile(x: number, y: number, z: number, spriteKey: string, isoGroup: Group) {
        let tile = this.add.isoSprite(x, y, z, spriteKey, isoGroup);
        this.isoPhysics.world.enable(tile);
        tile.body.allowGravity = false;
        return tile;
    }

    /**
     * Adds player to the scene.
     * @param x - coordination.x
     * @param y - coordination.y
     * @param z - coordination.z
     * @param spriteKey - player's sprite key
     * @param isoGroup - isometric physics group
     */
    private addPlayer(x: number, y: number, z: number, spriteKey: string, isoGroup: Group): any {
        let player = this.add.isoSprite(x, y, z, spriteKey, isoGroup);
        this.isoPhysics.world.enable(player);
        player.body.collideWorldBounds = true;

        this.createPlayerAnimations(spriteKey);

        return player;
    }

    /**
     * Registers player animations in the scene.
     * @param spriteKey - key of the player's sprite key
     */
    private createPlayerAnimations(spriteKey: string): void {
        const frameRate = 5;

        this.anims.create({
            key: DIRECTIONS.SOUTH,
            frames: this.anims.generateFrameNumbers(spriteKey, {start: 0, end: 3}),
            frameRate,
        });
        this.anims.create({
            key: DIRECTIONS.NORTH,
            frames: this.anims.generateFrameNumbers(spriteKey, {start: 12, end: 15}),
            frameRate,
        });
        this.anims.create({
            key: DIRECTIONS.WEST,
            frames: this.anims.generateFrameNumbers(spriteKey, {start: 4, end: 7}),
            frameRate,
        });
        this.anims.create({
            key: DIRECTIONS.EAST,
            frames: this.anims.generateFrameNumbers(spriteKey, {start: 8, end: 11}),
            frameRate,
        });
        this.anims.create({
            key: DIRECTIONS.SOUTH_EAST,
            frames: this.anims.generateFrameNumbers(spriteKey, {start: 16, end: 19}),
            frameRate,
        });
        this.anims.create({
            key: DIRECTIONS.SOUTH_WEST,
            frames: this.anims.generateFrameNumbers(spriteKey, {start: 20, end: 23}),
            frameRate,
        });
        this.anims.create({
            key: DIRECTIONS.NORTH_WEST,
            frames: this.anims.generateFrameNumbers(spriteKey, {start: 24, end: 27}),
            frameRate,
        });
        this.anims.create({
            key: DIRECTIONS.NORTH_EAST,
            frames: this.anims.generateFrameNumbers(spriteKey, {start: 28, end: 31}),
            frameRate,
        });
    }
}
