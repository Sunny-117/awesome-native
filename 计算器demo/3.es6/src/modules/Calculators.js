import compute from "../lib/compute";
import { trimSpace, digitalize } from "../util/tools";
// class Calculator {

// }
// export { Calculator }; //解构赋值导出
@compute
export default class Calculator {
  constructor(el) {
    this.name = "Calculator";
    this.oResult = el.getElementsByClassName("result")[0];
    this.oBtnGroup = el.getElementsByClassName("btn-group")[0];
    this.oInputs = el.getElementsByClassName("num-input");
  }
  init() {
    this.bindEvent();
  }
  bindEvent() {
    this.oBtnGroup.addEventListener("click", this.onBtnClick.bind(this, false));
  }
  onBtnClick(ev) {
    const e = ev || window.event,
      tar = e.target || e.srcElement,
      tagName = tar.tagName.toLowerCase();
    // console.log(tagName);
    if (tagName === "button") {
      const method = tar.getAttribute("data-method"),
        // fVal = Number(this.oInputs[0].value.replace(/\s+/g, "")) || 0,
        // sVal = Number(this.oInputs[1].value.replace(/\s+/g, "")) || 0;
    const fVal = digitalize(trimSpace(this.oInputs[0].value))
    const sVal = digitalize(trimSpace(this.oInputs[1].value))
      //   this.oResult.innerText = this[method](fVal, sVal);//优化一下
      this.setResult(method, fVal, sVal);

      /*
        抽离
     switch (method) {
        case "plus":
          this.oResult.innerText = fVal + sVal;
          break;
        case "minus":
          this.oResult.innerText = fVal - sVal;
          break;
        case "mul":
          this.oResult.innerText = fVal * sVal;
          break;
        case "div":
          this.oResult.innerText = fVal / sVal;
          break;
        default:
          break;
      } */
    }
  }
  setResult(method, fVal, sVal) {
    this.oResult.innerText = this[method](fVal, sVal);
  }
}
