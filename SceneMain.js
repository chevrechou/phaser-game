
var jumpButton;
var timeInSeconds=0;
var scoreText;
var score=0;
var timer;
var travis;
var cursors;
var stars;
class SceneMain extends Phaser.Scene{
  constructor(){
    super('SceneMain');
    // this.tick()=tick();
  }

   preload() {
    console.log("HERE");
    this.load.image("block","https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/games/breakout/green1.png");

    this.load.image("travis", "travis.png");
    this.load.image("fatL", "L.png");

  //  let timer = scene.time.delayedCall(delay, callback, args, scope);  // delay in ms

    // TO DO 2: Load assets (player, platform, pick a star)
  }

  // TO DO 3: Set up game state (score)



   create() {


    travis=this.physics.add.sprite(game.config.width/2,game.config.height/2,"travis");
    gameState.player=travis;

    travis.displayWidth=50;
    travis.displayHeight=60;
    cursors = this.input.keyboard.createCursorKeys();
      // const x=game.config.width/3;
      //   const y=game.config.width/3;
  travis.setCollideWorldBounds(true);
  // this.physics.accelerateTo(gameState.player, x, y ,50)

    var timerEvent = this.time.addEvent({
      delay: 600,
      callback: this.tick,
      loop:true
    });



    timer = this.add.text(32, 32, timeInSeconds,{
      fill:"#ffffff"
    });
    scoreText = this.add.text(32, 62, score,{
      fill:"#ffffff"
    });

    var platforms = this.physics.add.staticGroup();
    platforms.create(120, 240, 'block');
platforms.create(250, 250, 'block');
platforms.create(450, 120, 'block');

    // platforms.create(0, 64, 'block');

    // game.enable(travis);
    // travis.body.bounce.y = 0.2;

    var fatell=this.physics.add.group();
      // {
      //   key:'fatL',
      //     setXY: { x: 12, y: 0, stepX: 70 },
      //     setScale: { x: 0.1, y:.2  }
      //   });
    // fatell.setScale(0.5);
    //
  fatell.createMultiple({
    key: 'fatL',
    // frame: Phaser.Utils.Array.NumberArray(0, 3),
    randomFrame: true,
    // loop:true,
    setXY: { x: 12, y: 0, stepX: 70 },
    setScale: { x: 0.1, y:.2  }
  })

  // fatell.children.iterate((child) => {
  //
  //   let y = Phaser.Math.Between(-200, -2000)
  //   let x = Phaser.Math.Between(0, 800)
  //
  //   // child.setY(y)
  //   // child.setX(x)
  //   child.setMaxVelocity(200)
  //
  // })



  stars = this.physics.add.group();
  const starGenLoop = this.time.addEvent({
    delay: 300,
    callback: this.starGen,
    callbackScope: this,
    loop: true,
  });


    // this.physics.add.collider(travis, fatell, this.hit);
    this.physics.add.overlap(travis, stars, this.hit, null, this);

//     this.physics.add.collider(stars, travis, function (star) {
//     stars.destroy();
//     // gameState.score += 3;
//     // gameState.scoreText.setText("score: " + gameState.score);
// });

    this.physics.add.collider(travis, platforms, this.bounce);

    // this.anims.create({
    //     key: 'left',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    // this.anims.create({
    //     key: 'turn',
    //     frames: [ { key: 'dude', frame: 4 } ],
    //     frameRate: 20
    // });
    //
    // this.anims.create({
    //     key: 'right',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    var gridConfig = {
        'scene': this,
        'cols': 5,
        'rows': 5
    }

    this.aGrid = new AlignGrid(gridConfig);
    this.aGrid.showNumbers();
    this.aGrid.placeAtIndex(3,travis);
    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //   // make the camera follow the player
    // this.cameras.main.startFollow(travis
    // this.aGrid.placeAtIndex(18, this.plaforms);

  }


  starGen () {
    const xCoord = Math.random() * 450;
    var star=stars.create(xCoord, 10, 'fatL').setDisplaySize(60, 40);

  }


  bounce(travis){
      travis.destroy();
      console.log(game);
      this.scene.restart();
      // this.gameState.state.start('main');

  }
  hit (travis,star){
    star.destroy();
    score+=1;
      scoreText.setText("Score: "+ score);
        // travis.destroy

  }
  tick(){
    timeInSeconds++;

    timer.setText("Time: "+ timeInSeconds);
    // console.log(timeInSeconds);
  }

  update() {
    if ((cursors.space.isDown || cursors.up.isDown) ){
      travis.body.setVelocityY(-80); // jump up
    }
    else if (cursors.left.isDown){
      travis.body.setVelocityX(-75);
      // travis.anims.play('left', true);

    }
    else if (cursors.right.isDown){
      travis.body.setVelocityX(75);
       // travis.anims.play('right', true);
    }
    // what else?

    // else {
    //   gameState.player.setVelocityX(0);
    // }
  }

}
