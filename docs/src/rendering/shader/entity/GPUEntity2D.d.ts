/**@import GPUContext from "../../index" */
/**
 * @abstract
 */
export default class GPUEntity2D {
    x: number;
    y: number;
    scaleY: number;
    scaleX: number;
    rotation: number;
    light: number;
    /**
     * @abstract
     * @param {GPUContext} ctx
     */
    draw(ctx: GPUContext): void;
    /**
     * @abstract
     * @param {GPUContext} ctx
     */
    remove(ctx: GPUContext): void;
}
import GPUContext from "../..";
//# sourceMappingURL=GPUEntity2D.d.ts.map