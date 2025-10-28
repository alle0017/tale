import { Border, } from "../../src/index.js";
import { Vertical, Horizontal, Button, Canvas } from "../../src/layout.js";
import { Canvas as CanvasComponent } from "../../src/rendering/shaders/layout/canvas.js";
import { ColorPicker } from "../components/color-picker.js";
import { useActiveButton, usePen, useCanvasSupport } from "./hooks/editor.js";
/**@import { Asset } from "./hooks/editor.js";*/

/**
 * 
 * @param {{ onSave?: (data: Asset) => void }} param0 
 * @returns 
 */
export default function Editor({ onSave }) {
      const CVS_WIDTH = 32;
      const CVS_HEIGHT = 32;
      const pen = usePen();
      const support = useCanvasSupport(CVS_WIDTH, CVS_HEIGHT);
      const setActive = useActiveButton();


      return Horizontal({},
            Canvas({
                  height: CVS_HEIGHT,
                  width: CVS_WIDTH*2,
                  onDrag({ x, y, target }) {
                        const cvs = /**@type {CanvasComponent} */(target);
                        cvs.setChar(x, y,'', '#000', pen.getColor());
                        cvs.setChar(x%2 ? x - 1: x + 1, y,'', '#000', pen.getColor());
                        support.setPixel(pen.isErasing() ? undefined: pen.getColor(), x, y)
                  },
                  onClick({ x, y, target }) {
                        const cvs = /**@type {CanvasComponent} */(target);
                        cvs.setChar(x, y,'', '#000', pen.getColor());
                        cvs.setChar(x%2 ? x - 1: x + 1, y,'', '#000', pen.getColor());
                        support.setPixel(pen.isErasing() ? undefined: pen.getColor(), x, y)
                  }
            }),
            Vertical({gap: 5},
                  ColorPicker({ 
                        onClick: color => { 
                              pen.write(color);
                        } 
                  }),
                  Horizontal({ gap: 5 },
                        Button({ 
                              label: 'pen', 
                              width: 13, 
                              height: 2, 
                              border: Border.SolidRound, 
                              onClick: ({ target }) => {
                                    pen.write();
                                    setActive(target);
                              },
                        }),
                        Button({ 
                              label: 'erase', 
                              width: 13, 
                              height: 2, 
                              border: Border.SolidRound,
                              onClick: ({ target }) => {
                                    pen.erase();
                                    setActive(target);
                              } 
                        }),
                  ),
                  Horizontal({ gap: 5 },
                        Button({ 
                              label: 'save', 
                              width: 13, 
                              height: 2, 
                              border: Border.SolidRound, 
                              onClick: (e) => {
                                    /**
                                     * @type {Asset}
                                     */
                                    const asset = support.toAsset();
                                    onSave?.(asset);
                              },
                        }),
                  )
            )
      );
}