const config = {
  type: Phaser.AUTO,
  // TO DO 1: Have something show up
  width: 450,
  height: 500,

  backgroundColor:  "C3D9E6",
  // colors: https://www.design-seeds.com/
  // use this for now: "C3D9E6"

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
      debug:true
    }
  },
  scene: [SceneMain]
};

const game = new Phaser.Game(config);
const gameState={
  score:0,
  fatells:1

};
game.state.add('main', SceneMain);
game.state.start('main');
