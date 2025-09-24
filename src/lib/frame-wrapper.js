/**@import {FrameSource} from "../rendering/shader/entity/common" */
export default class FrameWrapper {
      /**
       * @type {number}
       */
      #id = -1;
      /**
       * @readonly
       * @type {FrameSource}
       */
      #entity;
      /**
       * @readonly
       * @type {number}
       */
      #frames;
      /**
       * @readonly
       * @type {number}
       */
      #costumes;

      /**
       * @param {FrameSource} entity
       * @param {number} frames 
       * @param {number} [costumes=1] 
       */
      constructor(entity, frames, costumes = 1) {  
            this.#entity = entity;
            this.#frames = frames;
            this.#costumes = costumes;
      }

      get costume() {
            return Math.trunc(this.#entity.startY/(this.#entity.height/this.#costumes));
      }

      /**
       * @param {number} n 
       */
      set costume(n) {
            if (n > (this.#costumes - 1)) {
                  throw new Error("costume index exceeds the declared number of costumes");
            }

            const costumeHeight = this.#entity.height/this.#costumes;
            this.#entity.startY = costumeHeight * n;
            this.#entity.endY = costumeHeight * (n + 1);
      }

      get frame() {
            return Math.trunc(this.#entity.startX/(this.#entity.width/this.#frames));
      }

      /**
       * @param {number} n 
       */
      set frame(n) {
            if (n > (this.#frames - 1)) {
                  throw new Error("frame index exceeds the declared number of frames " + n);
            }

            const frameWidth = this.#entity.width/this.#frames;
            this.#entity.startX = frameWidth * n;
            this.#entity.endX = frameWidth * (n + 1);
      }

      get isPlaying() {
            return this.#id >= 0;
      }

      animate(timing = 60) {
            if (this.isPlaying) {
                  return;
            }


            this.#id = setInterval(() => {
                  if (this.frame >= (this.#frames - 1)) {
                        this.frame = 0;
                  } else {
                        this.frame ++;
                  }
            }, timing);
      }

      stop(reset = true) {
            if (!this.isPlaying) {
                  return;
            }
            clearInterval(this.#id);
            this.#id = -1;

            if (reset) {
                  this.frame = 0;
            }
      }
}