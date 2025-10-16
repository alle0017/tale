# Tale — terminal-first ECS game toolkit

Tale is a compact, modular toolkit for building terminal (text-mode) games and interactive applications in JavaScript. The project centers on a small Entity-Component-System (ECS) core and a renderer that targets terminal output — together with a layout library for composing text-based UIs and game screens.

This README has been updated to reflect the project's current scope: terminal game programming (ECS + terminal renderer + layout primitives).

Key features
- Small, focused ECS (entities, components, systems, world management, task scheduling).
- Terminal renderer and framing utilities to draw characters, boxes and simple layouts to a terminal canvas.
- Layout primitives (box / horizontal / vertical) for composing screens and HUDs.
- Utilities: input handling, sprites (text-based), collision helpers and basic physics utilities.

Why terminal-first?
- Fast iteration: no graphics toolchain required — run in any terminal.
- Low dependencies: easy to experiment with gameplay and systems.
- Great for roguelike-style games, turn-based games, editors and prototyping.

Repository layout (important files)

src/
- `index.js` — top-level entry and bootstrap (wires game and renderer together).
- `layout.js` — higher-level layout helpers.

src/ecs/
- `Component.js`, `Entity.js`, `System.js`, `World.js`, `WorldManager.js`, `TaskManager.js`, `Event.js` — ECS and scheduling primitives.

src/game/
- `Game.js`, `Scene.js` — game lifecycle and scene orchestration.

src/layout/
- `box.js`, `horizontal.js`, `vertical.js` — layout primitives used to compose text UIs and game views.

src/lib/
- `Drawable.js`, `Sprite.js`, `Physics.js`, `Position.js`, `input.js`, `frame-wrapper.js`, `layout.js`, `box.js` — core utilities and building blocks.
- `collisions/` — collision helpers such as `ChunkIterator.js` and `Collision.js`.

src/rendering/
- `Rendering.js`, `Context.js`, `screen/screen.js`, `pipe/pipe.js` — rendering pipeline and terminal output helpers. These modules implement a terminal-oriented renderer that maps game objects and layout primitives to characters and terminal regions.

src/types/
- `List.js`, `OrderedList.js` — small collection utilities.

Quick start (run in Node.js)

The project is plain JavaScript. To run a simple terminal demo you can create a tiny runner file and execute it with Node. If your code uses ES modules, add a minimal `package.json` with "type": "module".

> note that it uses requestAnimationFrame and derived methods, 
> so a polyfill should be added.
```js
// polyfill
const REFRESH_RATE = 16;
(function() {
      /**
       * 
       * @param {FrameRequestCallback} callback 
       * @returns 
       */
      globalThis.requestAnimationFrame = callback => {
            const id = setTimeout(() => callback(REFRESH_RATE), REFRESH_RATE); 
            return id;
      };
      /**
       * 
       * @param {IdleRequestCallback} callback 
       * @returns 
       */
      globalThis.requestIdleCallback = callback => {
            const id = setTimeout(() => callback(null), REFRESH_RATE*2); 
            return id;
      };
 
      globalThis.cancelAnimationFrame = function(id) {
            clearTimeout(id);
      };
      globalThis.cancelIdleCallback = function(id) {
            clearTimeout(id);
      };
}());
```

Renderer and layout overview

- Terminal renderer: maps Drawable-like objects to character buffers and writes them to stdout (or a pty). Look at `src/rendering/screen/screen.js` and `src/rendering/pipe/pipe.js` for terminal output plumbing.
- Layout primitives: `src/layout/box.js`, `horizontal.js`, and `vertical.js` provide flexible stacking and region allocation — useful for HUDs, panels, menus and game maps.
- Sprites: `src/lib/Sprite.js` supports text-based sprites (single characters or small glyph blocks).

Contributing

Contribution are well accepted

## License

This project is licensed under the [MIT License](LICENSE).