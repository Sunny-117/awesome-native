function Poker(color, number) {
    this.color = color;
    this.number = number;
}

Poker.prototype.toString = function () {
    var str = "";
    //花色：♣、♥、♦、♠
    if (this.color === 1) {
        str = "♣"
    }
    else if (this.color === 2) {
        str = "♥";
    }
    else if (this.color === 3) {
        str = "♦";
    }
    else {
        str = "♠"
    }
    //牌面
    if (this.number >= 2 && this.number <= 10) {
        str += this.number;
    }
    else if (this.number === 1) {
        str += "A";
    }
    else if (this.number === 11) {
        str += "J";
    }
    else if (this.number === 12) {
        str += "Q";
    }
    else if (this.number === 13) {
        str += "K";
    }
    else if (this.number === 14) {
        str = "joker";
    }
    else if (this.number === 15) {
        str = "JOKER";
    }
    return str;
}

module.exports = Poker;