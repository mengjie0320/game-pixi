import { DrawBoard } from "./draw-board";

// TODO -mj：1、html路由-组件化 2、多个项目打包
const container = document.querySelector('.draw-board');
// console.log('container');
console.log('paint-guess 1', 21);

const board = new DrawBoard();
board.init();

export interface FuncItem { 
  name: string;
  func: any;
  // func(): void; // TODO -mj 类型
}

export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object;
}

const funcList: Array<FuncItem> = [
  { 
    name: 'setBrushSize', 
    func: function() {
      console.log('setBrushSize', board);
      board && board.setBrushSize();
    },
  },
  { 
    name: 'replayGame', 
    func: function() {
      console.log(board);
      board && board.replay();
    },
  },
  // { 
  //   name: 'setBrushSize', 
  //   func: function() {
  //     console.log('setBrushSize', board);
  //     board && board.setBrushSize();
  //   },
  // }
]

// not work
// export const replay = () => {
//     board.replay();
// }
// work
// document.querySelector("#replay")?.addEventListener('click', () => {
//     console.log('111', 111);
//     board.replay();
// })
// window.replay = function() {
//   console.log(board);
//   board.replay();
// }

// 批量注册事件
funcList.forEach((item: FuncItem) => {
  window[item.name as any] = item.func;
})