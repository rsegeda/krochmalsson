import SpriteSheetFileConfig = Phaser.Loader.FileTypes.SpriteSheetFileConfig;

export const playerSpriteSheetFileConfig: SpriteSheetFileConfig = {
    key: 'playerSpriteSheet',
    url: '../assets/img/player.png',
    frameConfig: {
        frameWidth: 64,
        frameHeight: 64
    }
};