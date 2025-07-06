import type {Position} from "../../../lib/index.js"
export class Camera {
    /**
     * @param {WebGLRenderingContext} gl
     */
    constructor(gl: WebGLRenderingContext);
    focus: number;
    x: number;
    y: number;
    rotation: number;
    /**
     * bind the camera to the specified program.
     * @param {WebGLProgram} program - program to bound
     * @param {string} name - name of the uniform used inside the program
     * to represent the camera
     */
    bind(program: WebGLProgram, name: string): void;
    /**
     * follow a position onto the screen
     * @param {Position} position
     */
    follow(position: Position): void;
    #private;
}
//# sourceMappingURL=Camera.d.ts.map