// 补充类型
interface NormalFun {
  (): void
}
interface Window {
  replayGame: NormalFun;
  setBrushSize: NormalFun;
}
// declare global {
//   interface Window {
//     replayGame: NormalFun;
//     setBrushSize: NormalFun;
//   }
// }