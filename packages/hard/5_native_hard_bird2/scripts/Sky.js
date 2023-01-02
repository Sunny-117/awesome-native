const skyDom = document.querySelector(".sky");
const skyStyles = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyles.width);
const skyHeight = parseFloat(skyStyles.height);

class Sky extends Rectangle {//天空是可移动矩形，需要继承
    constructor() {
        super(skyWidth, skyHeight, 0, 0, -50, 0, skyDom);
    }

    onMove() {
        if (this.left <= -skyWidth / 2) {
            this.left = 0;
        }
    }
}

// 天空和大地一样