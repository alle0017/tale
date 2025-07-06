/**@import GPUContext from "../../index" */
export default class TextureEntity extends GPUEntity2D {
    /**
     * @type {string}
     */
    image: string;
    zIndex: number;
    textureCoords: number[];
    vertices: number[];
    indices: number[];
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    #private;
}
import GPUEntity2D from "./GPUEntity2D.js";
//# sourceMappingURL=Texture.d.ts.map