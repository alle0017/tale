import { Shader } from "../../rendering/shaders/shader.js";
import { BorderComponent } from "./components/border.js";
import { BoundingBoxComponent } from "./components/bounding-box.js";
import { OverflowHiddenStrategy } from "./components/overflow/overflow-hidden-strategy.js";
import { OverflowStrategy } from "./components/overflow/overflow-strategy.js";
import { HorizontalPositioningStrategy } from "./components/positioning/horizontal-positioning-strategy.js";
import { PositioningStrategy } from "./components/positioning/positioning-strategy.js";
import { VerticalPositioningStrategy } from "./components/positioning/vertical-positioning-strategy.js";
/**@import Screen from "../../rendering/screen/screen.js";*/
/**@import {HexColor} from "../../rendering/rendering/canvas.js" */
/**@import {Node} from "./node.js" */

/**
 * @enum {number}
 */
const Positioning = {
      Absolute: 0,
      Relative: 1,
};

export class Style extends Shader {
      /**
       * @type {Positioning}
       */
      #position = Positioning.Relative;
      /**
       * @type {OverflowStrategy}
       */
      #overflowStrategy = OverflowStrategy.get();
      #positionStrategy = PositioningStrategy.get();
      boundingBox = new BoundingBoxComponent();

      content = '';

      left = 0;
      top = 0;

      paddingLeft = 0;
      paddingTop = 0;
      paddingRight = 0;
      paddingBottom = 0;

      width = -1;
      height = -1;

      // variables used to 
      // create an offset dependant
      // on parent-child relationship. 
      // they are ignored in case of absolute positioning
      $offsetX = 0
      $offsetY = 0;

      /**
       * @type {HexColor}
       */
      color = '#FFF';
      /**
       * @type {HexColor}
       */
      backgroundColor = 'none';
      /**
       * @type {BorderComponent}
       * @readonly
       */
      border = new BorderComponent();
      zIndex = 1;

      rowGap = 0;
      columnGap = 0;

      get paddingX() {
            return this.paddingLeft == this.paddingRight ? this.paddingLeft: 0;
      }
      set paddingX(value) {
            this.paddingLeft = value;
            this.paddingRight = value;
      }

      get gap() {
            return this.rowGap == this.columnGap ? this.rowGap: 0;
      }
      set gap(value) {
            this.rowGap = value;
            this.columnGap = value;
      }

      get paddingY() {
            return this.paddingTop == this.paddingBottom ? this.paddingTop: 0;
      }
      set paddingY(value) {
            this.paddingBottom = value;
            this.paddingTop = value;
      }

      get positioningStrategy() {
            return this.#positionStrategy;
      }

      get position() {
            switch (this.#position) {
                  case Positioning.Absolute: return 'absolute';
                  case Positioning.Relative: return 'relative';
            }
      }
      set position(value) {
            switch (value) {
                  case "absolute": this.#position = Positioning.Absolute;
                        break;
                  case "relative": this.#position = Positioning.Relative;
                        break;
            }
      }

      get flexDirection() {
            return this.#positionStrategy.Id;
      }

      set flexDirection(value) {
            switch (value) {
                  case PositioningStrategy.Id: this.#positionStrategy = PositioningStrategy.get();
                        break;
                  case VerticalPositioningStrategy.Id: this.#positionStrategy = VerticalPositioningStrategy.get();
                        break;
                  case HorizontalPositioningStrategy.Id: this.#positionStrategy = HorizontalPositioningStrategy.get();
                        break;
            }
      }

      get overflow() {
            switch (this.#overflowStrategy.Id) {
                  case OverflowStrategy.Id: return 'show';
                  case OverflowHiddenStrategy.Id: return 'hidden';
            }
      }
      set overflow(value) {
            switch (value) {
                  case "hidden": this.#overflowStrategy = OverflowHiddenStrategy.get();
                        break;
                  case "show": this.#overflowStrategy = OverflowStrategy.get();
                        break;
            }
      }

      #initWidthAndHeight() {
            if (this.width < 0) {
                  this.width = this.content.length + this.paddingLeft + this.paddingRight;
            }
            if (this.height < 0) {
                  this.height = 1 + this.paddingTop + this.paddingBottom;
            }
            return this;
      }
      getTopLeftCorner() {
            const x = this.left + (this.#position == Positioning.Relative ? this.$offsetX: 0);
            const y = this.top + (this.#position == Positioning.Relative ? this.$offsetY: 0);

            return [x,y];
      }
      /**
       * 
       * @param {Node} child 
       */
      clip(child) {
            const [x,y] = this.getTopLeftCorner();
            this.#overflowStrategy.clip(child, x, y, this.width + this.paddingLeft + this.paddingRight, this.height + this.paddingTop + this.paddingBottom);
      }
      /**
       * 
       * @param {Screen} screen 
       */
      draw(screen) {
            const [x,y] = this.getTopLeftCorner();

            this.#initWidthAndHeight();
            

            for (let i = 0; i < this.width; i++) {
                  for (let j = 0; j < this.height; j++) {
                        if (!this.boundingBox.isInBoundingBox(x + i, y + j)) {
                              continue;
                        }
                        screen.set({
                              color: this.color,
                              background: this.backgroundColor,
                              char: j == 0 && i < this.content.length ? this.content[i]: ' ',
                              x: x + i,
                              y: y + j,
                              z: this.zIndex,
                        });
                  }
            }

            this.border.x = x;
            this.border.y = y - 1;
            this.border.z = this.zIndex;
            this.border.draw(
                  screen, 
                  this.width, 
                  this.height + 1, 
                  this.boundingBox
            );
      }     
}