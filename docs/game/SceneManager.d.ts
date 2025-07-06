export default class SceneManager {
    current: Scene;
    /**
     * @param {() => Scene} scene - scene builder.
     * @param {boolean} [resumable=true] - tells to the manager if the
     * scene could be later resumed instead of being recreated. this is useful
     * for stateful scenes like when you stop the game to open a menu and later
     * on resume it.
     * ## note
     * ---
     * is important the reuse of same builder,
     * because if you change it
     * the manager can't tell if the scene was already created and must
     * be resumed, so it creates new one instead.
     *
     * @example
     * ```javascript
     * ❌ NO
     * function MyScene() {...}
     * manager.use(() => MyScene())
     * manager.use(() => MyScene()) // not resumed
     *
     * ✅ OK
     * function MyScene() {...}
     * manager.use(MyScene)
     * manager.use(MyScene)
     * ```
     */
    use(scene: () => Scene, resumable?: boolean): void;
    #private;
}
import type Scene from "./Scene.js";
//# sourceMappingURL=SceneManager.d.ts.map