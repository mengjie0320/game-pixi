import * as PIXI from 'pixi.js'
// TODO -mj：Type 待抽离 、pixi.js type for v4 ? 、
export interface Position {
    x: number | null;
    y: number | null;
}
export interface SavePosition {
    lastPosition: Position | null;
    curPosition: Position | null;
    brushColor: string;
    brushSize: number;
    brushOpacity: number;
}

export class DrawBoard {
    // attrs
    brushColor: string = '0x000000'; // 画笔颜色：16进制管理，初始黑色
    lastBrushColor: string = '0x000000'; // 记录切换状态之前的画笔颜色，初始黑色
    brushSize: number = 1; // 粗细
    brushOpacity: number = 1; // 透明度
    isEarser: boolean = false;
    isPaint: boolean = false; // ?
    // TODO -mj：pos class
    lastPosition: Position = { x: null, y: null};
    curPosition: Position = { x: null, y: null};
    savePositionList: Array<SavePosition> = [];
    app: any = null; // TODO -mj：类型明确
    graphics: any = null;
    canvasObj: any = null;

    // constructor
    constructor() {}

    // func
    init() {
        if(!(document.querySelector("#canvas") as HTMLElement)) {
            console.log('不存在画板属性id-canvas');
            return;
        }
        this.app = new PIXI.Application({
            width: 640,
            height: 360,
            backgroundColor: "#fff",
            // TODO - mj：消除锯齿未生效
            antialias: true,     // 消除锯齿
            // transparent: false,  // 背景不透明
            // resolution: resolution,       // 像素设置  模糊的处理
            autoDensity: true // 这属性很关键 模糊的处理
        });
        this.app.renderer.view.style.border = '1px solid #000';
        // this.app.renderer.view.style.borderRadius = '10px'; // TODO -mj：border-radius
        this.app.stage.interactive = true;

        // 创建container
        const container = new PIXI.Container();
        console.log('container', container);
        container.interactive = true;
        this.app.stage.addChild(container);

        // 添加画板
        this.graphics = new PIXI.Graphics();
        container.addChild(this.graphics);

        this.canvasObj = (document.querySelector("#canvas") as HTMLElement);
        this.canvasObj.appendChild(this.app.view);

        this.bindCanvasEvent();
    }

    bindCanvasEvent() {
        const mouseUp = (event: MouseEvent) => {
            if (!this.isPaint) return;
            this.isPaint = false;
            // 重置位置，不用划线
            this.lastPosition = { x: null, y: null};
            this.curPosition = { x: null, y: null};
        }
        
        const mouseMove = (event: MouseEvent) => {
            if (!this.isPaint) return;

            const localXY = {
                x: event.clientX - this.canvasObj.getBoundingClientRect().left,
                y: event.clientY - this.canvasObj.getBoundingClientRect().top
            }
        
            console.log('mouseMove', 'localXY', localXY.x, localXY.y);
        
            this.curPosition.x = localXY.x;
            this.curPosition.y = localXY.y;
            this.savePositionList.push({
                lastPosition: JSON.parse(JSON.stringify(this.lastPosition)),
                curPosition: JSON.parse(JSON.stringify(this.curPosition)),
                brushColor: this.brushColor,
                brushSize: this.brushSize,
                brushOpacity: this.brushOpacity
            });
            if (this.lastPosition.x && this.lastPosition.y) {
                console.log('lastPosition', JSON.stringify(this.lastPosition));
                this.graphics.moveTo(this.lastPosition.x, this.lastPosition.y);
            }
            if (this.curPosition.x && this.curPosition.y) {
                console.log('curPosition', JSON.stringify(this.curPosition));
                this.graphics.lineTo(this.curPosition.x, this.curPosition.y);
                this.lastPosition.x = this.curPosition.x;
                this.lastPosition.y = this.curPosition.y;
            }
        
            
        
            this.app.view.addEventListener("pointerup", mouseUp);
        };
        
        const mouseDown = (event: MouseEvent) => {

            const localXY = {
                x: event.clientX - this.canvasObj.getBoundingClientRect().left,
                y: event.clientY - this.canvasObj.getBoundingClientRect().top
            }
            console.log('mouseDown', 'localXY', localXY.x, localXY.y);
            // this.graphics.beginFill(0xFF3300);
            this.graphics.lineStyle(this.brushSize, this.brushColor, this.brushOpacity); // (width, color, alpha, alignment, native)
            this.lastPosition.x = localXY.x;
            this.lastPosition.y = localXY.y;
        
            this.isPaint = true;
            // this.graphics.moveTo(localXY.x, localXY.y);
        
            this.app.view.addEventListener("pointermove", mouseMove);
        };
        
        this.app.view.addEventListener("pointerdown", mouseDown);
    }
    // 画笔大小调整
    setBrushSize() {
        const fontSize = document.querySelector("#fontSize") as HTMLInputElement;
        // console.log('fontSize', fontSize);
        if(!fontSize) return;
        this.brushSize = Number(fontSize.value);

        (document.querySelector("#lineNum") as HTMLElement).innerText = this.brushSize.toString();
        
    };
    // 画笔颜色调整
    setBrushColor() {
        const fontColor = document.querySelector("#fontColor") as HTMLInputElement;
        // console.log('fontColor', fontColor);
        if(!fontColor) return;
        this.brushColor = fontColor.value.replace('#', '0x');
        console.log('brushColor', this.brushColor);
    };
    // 调整画笔、橡皮擦状态
    changeBrushType() {
        this.isEarser = !this.isEarser;
        if(this.isEarser){
            (document.querySelector("#brushType") as HTMLElement).innerText = '画笔';
            this.lastBrushColor = this.brushColor;
            this.brushColor = '0xffffff'; // 同背景色相同作为橡皮擦的颜色
        }else{
            (document.querySelector("#brushType") as HTMLElement).innerText = '橡皮擦';
            this.brushColor = this.lastBrushColor;
        }
    };
    // 重绘
    async replay() {
        // console.log('replay', JSON.stringify(savePositionList));
        console.log('replay 1', 1);
        this.graphics.clear();
        for(let i = 0; i < this.savePositionList.length; i++) {
            const { lastPosition, curPosition, brushColor, brushSize, brushOpacity } = this.savePositionList[i];
            this.graphics.lineStyle(brushSize, brushColor, brushOpacity);
            // console.log('replay, lastPosition', JSON.stringify(lastPosition), 'curPosition', JSON.stringify(curPosition));
            if (this.lastPosition.x && this.lastPosition.y) {
                this.graphics.moveTo(this.lastPosition.x, this.lastPosition.y);
            }
            if (this.curPosition.x && this.curPosition.y) {
                this.graphics.lineTo(this.curPosition.x, this.curPosition.y);
                this.lastPosition.x = this.curPosition.x;
                this.lastPosition.y = this.curPosition.y;
            }
            await this.delay();
        }
        // this.savePositionList = [];
    };
    delay(time = 10) {
        return new Promise((res,rej)=>{
            setTimeout(function(){
                res('随便什么数据');
            }, time);
        })
    }
    // TODO -mj：上一步、下一步
}