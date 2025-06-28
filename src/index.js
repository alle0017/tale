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