# 2D GAME ENGINE

this repo is a simple game engine concept, inspired by principles of web programming, in particular reactivity system.

## why?

I always found game engine a fun part of programming. While growing as a programmer, I've sticked to js, and learned a lot from it, in particular about reactive programming, better known to non-js programmer as event-driven development or subscriber pattern. For me, this way of programming allow real declarative programming, defining what an action should look like, while the true process of execution is made under the hood by someone else. I think this concept is kind a cool to build a game engine on top. Generically, with this project, I'd like to achieve a small library, similar to [kaplay](https://kaplayjs.com/), based on strongly typed ECS and function similar to hooks for system management. As current state, I decided to build all the library on top of WebGL API, even if I know is outdated and being replaced by WebGPU (that as, remind, is not fully supported). This library doesn't aim to be a contender for bigger libraries like [phaser](https://phaser.io/), that have already made an awesome work, but aims to test new way of programming games in web.

## how it looks now?

at current state (very early) this is a simple script that draws 2 images onto the screen: 

```javascript
import { useRendering } from "./rendering/Rendering.js";
import Image from "./rendering/shader/lib/buffer/Image.js";

Image
.preload("./.assets/t.jpg")
.then(() => {
      const [ctx,engine] = useRendering();
      const img1 = ctx.image();
      const img2 = ctx.image();

      img1.image = "./.assets/t.jpg";
      img2.image = "./.assets/t.jpg";
      img1.scaleX = 0.5;
      img1.scaleY = 0.5;
      img2.scaleX = 0.3;
      img2.scaleY = 0.3;
      img2.x = -0.5;
      img1.x = 0.5;
      engine.add(img2)
      engine.add(img1)
});
```

this is obviously the core, in the near future this will be hidden to the end user, that should only call hooks to create entities. Simple entity declaration (**Not working yet**) look something like this:

```javascript
export function Player() {
      const sprite = useSprite('./sprite.png');
      const position = usePosition();
      const controls = useControls();

      sprite.bind(position);
      controls.on('up', () => position.y += 1);
      controls.on('down', () => position.y -= 1);
      controls.on('left', () => position.x -= 1);
      controls.on('right', () => position.x += 1);

      return createEntity()
            .add(sprite)
            .add(position);
}
```

that later could be called in a scene like this

```javascript
export const MainScene() {
      const player = Player();

      game.add(player);
      game.camera.follow(player);
      return scene;
}

game.use(MainScene)
```