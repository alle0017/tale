import Codes from "../../rendering/rendering/codes.js";
import { Action, buildMouseString } from "./mouse.js";
/**
 * 
 * @param {(key: string) => void} hook 
 */
export function bootstrap(hook = undefined) {
      // track mouse events
      console.log(Codes.MouseEvt);
      //@ts-ignore
      process.stdin.setRawMode(true);
      //@ts-ignore
      process.stdin.resume();
      //@ts-ignore
      process.stdin.setEncoding("utf8");
      //@ts-ignore
      process.stdin.on("data", /**@param {string} key*/key => {
            if (key === "\u0003") {
                  teardown();
                  return;
            }

            if (key.toLowerCase().match(/\[<(\d+);(\d+);(\d+)m/ig)) {
                  key = key.toLowerCase();
                  const code = parseInt(
                              key
                              .match(/\[<\d+;/ig)[0]
                              .replace('[<', '')
                              .replace(';', '')
                        );
                  const x = parseInt(
                        key
                        .match(/;[0-9]+;/ig)[0]
                        .replaceAll(';', '')
                  ) - 1;
                  const y = parseInt(
                        key
                        .match(/[0-9]+m/ig)[0]
                        .replaceAll('m', '')
                  ) - 1;

                  let action = Action.Click;

                  switch (code) {
                        case 0: action = Action.Click;
                              break;
                        case 1: action = Action.MiddleClick;
                              break;
                        case 2: action = Action.RightClick;
                              break;
                        case 32: action = Action.Drag;
                              break;
                        case 33: action = Action.MiddleDrag;
                              break;
                        case 34: action = Action.RightDrag;
                              break;
                        case 35: action = Action.Hover;
                              break;
                        case 64: action = Action.SwipeDown;
                              break;
                        case 65: action = Action.SwipeUp;
                              break;
                  }
                  key = buildMouseString(action, x, y);
            }

            switch (key) {
                  case "\u001b[A": {
                        key = 'ArrowUp';
                  } break;
                  case "\u001b[B": {
                        key = 'ArrowDown';
                  } break;
                  case "\u001b[D": {
                        key = 'ArrowLeft';
                  } break;
                  case "\u001b[C": {
                        key = 'ArrowRight';
                  } break;
                  case '\r': {
                        key = 'Enter';
                  } break;
                  case '\t': {
                        key = 'Tab';
                  } break;
                  case '\x7f': {
                        key = 'Backspace';
                  } break;
            }
            hook?.(key);
      });
}

export function teardown() {
      console.log(Codes.ExitMouseEvt);
      //@ts-ignore
      process.stdin.setRawMode(false);
      //@ts-ignore
      process.exit();
}