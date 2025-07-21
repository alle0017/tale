import EntityTab from "./components/tabs/EntityTab.js";
import Router from "./fw/lib/router/Router.js";
import { createContext } from "./fw/index.js";
import Editor from "./components/editor/Editor.js";
import Canvas from "./components/Canvas.js";
import AssetsTab from "./components/tabs/AssetsTab.js";
import Image from "./components/Image.js";

export const Menu = [
      {
            route: 'Scenes',
            tab: EntityTab,
            icon: './icons/scene.svg',
      },
      {
            route: 'Entities',
            tab: EntityTab,
            icon: './icons/entity.svg',
      },
      {
            route: 'Assets',
            tab: AssetsTab,
            icon: './icons/assets.svg',
      },
];

export const useRouter = createContext({
      router: new Router({
            '/editor':  {
                  route: Editor,
                  protected: false,
            },
            '/canvas':  {
                  route: Canvas,
                  protected: false,
            },
            '/asset': {
                  route: Image,
                  protected: false,
            }
      }, () => true)
});