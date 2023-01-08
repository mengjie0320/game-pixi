// TODO -mj：1、html路由-组件化 2、多个项目打包
const container = document.querySelector('.draw-board');
// console.log('container');
console.log('paint-guess 1', 21);
import { DrawBoard } from "./draw-board";
const board = new DrawBoard();
board.init();

// export const replay = () => {
//     board.replay();
// }
document.querySelector("#replay")?.addEventListener('click', () => {
    console.log('111', 111);
    board.replay();
})