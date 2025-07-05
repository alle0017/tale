import EntityTab from "./components/tabs/EntityTab.js";
import Router from "./fw/lib/router/Router.js";
import { createContext } from "./fw/index.js";

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
            route: 'Components',
            tab: EntityTab,
            icon: './icons/component.svg',
      },
];

export const Routes = [

];

export const useRouter = createContext({
      router: new Router({
            '/editor':  {
                  route: undefined,
                  protected: false,
            },
            '/canvas':  {
                  route: undefined,
                  protected: false,
            }
      }, () => true)
});