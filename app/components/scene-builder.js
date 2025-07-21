import { html } from "@alle0017!/photonjs"
import { useGame, useWorld, createComponent, createEntity } from "../src/index.js"

export default function SceneBuilder() {
      /**@param {HTMLElement} el */
      const move = el => {
            world.entities.forEach(e => console.log(e.getAll()))
            useGame().ctx.moveRoot(el);
      };

      const world = useWorld();

      world.add(createEntity())

      return html`<div id="cvs-root" use=${move}></div>`
}