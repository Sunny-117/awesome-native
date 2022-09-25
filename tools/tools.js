//栈
function Stack() {
    var items = [];
    this.push = function (element) {
        items.push(element);
    }
    this.pop = function () {
        return items.pop();
    };
    this.peek = function () {
        return items[items.length - 1];
    };
    this.isEmpty = function () {
        return items.length === 0;
    };
    this.size = function () {
        return items.length;
    };
    this.clear = function () {
        items = [];
    };
    this.print = function () {
        console.log(items.toString());
    };
}
//队列
function Queue() {
    this.items = [];
    this.enqueue = function (element) {
        this.items.push(element);
    }
    this.dequeue = function () {
        return this.items.shift();
    }
    this.front = function () {
        return this.items[0];
    }
    this.isEmpty = function () {
        return this.items.length === 0;
    }
    this.clear = function () {
        this.items = [];
    }
    this.size = function () {
        return this.items.length;
    }
    this.print = function () {
        console.log(this.items.toString());
    }
}
//圣杯继承
var inherit = (function () {
    function F() { }
    return function (Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        Target.prototype.uber = Origin.prototype;
    };
})();
// 检测数据类型  不成熟
const type = o => {
    let str = Object.prototype.toString.call(o);
    return str.match(/\[object (.*)\]/)[1].toLowerCase(); // \代表中括号转译
}
//深层拷贝对象（不考虑函数）
function deepClone(origin, target) {
    var target = target || {},
        toStr = Object.prototype.toString,
        arrStr = '[object Array]';
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (typeof origin[prop] === 'object') {
                target[prop] = (toStr.call(origin[prop]) === arrStr) ? [] : {};
                deepClone(origin[prop], target[prop]);
            } else {
                target[prop] = origin[prop];
            }
        }

    }
    return target;
}
//数组去重
Array.prototype.unique = function () {
    var obj = {},
        arr = [],
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!obj[this[i]]) {
            obj[this[i]] = true;
            arr.push(this[i]);
        }
    }
    return arr;
}
//类属性
function classOf(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
}
//父节点的第几个元素节点
Element.prototype.eleIndex = function () {
    var index = 0,
        node = this;
    while (node = node.previousSibling) {
        if (node.nodeType == 1) {
            index++;
        }
    }
    return index;
}
//第n层祖先元素
Element.prototype.nthParentEle = function (n) {
    var node = this,
        n = n || 0;
    while (node && n--) {
        node = node.parentElement;
    }
    return node;
}
//第n个兄弟节点
Element.prototype.nthSiblingEle = function (n) {
    var node = this;
    while (node && n) {
        if (n > 0) {
            if (node.nextElementSibling) {
                node = node.nextElementSibling;
            } else {
                for (node = node.nextSibling; node && node.nodeType !== 1; node = node.nextSibling);
            }
            n--;
        } else {
            if (node.previousElementSibling) {
                node = node.previousElementSibling;
            } else {
                for (node = node.previousSibling; node && node.nodeType !== 1; node = node.previousSibling);
            }
            n++;
        }
    }
    return node;
}
//在某元素后插入元素
Element.prototype.insertAfter = function (targetNode, afterNode) {
    var siblingNode = afterNode.nextElementSibling;
    if (siblingNode) {
        this.insertBefore(targetNode, siblingNode);
    } else {
        this.appendChild(targetNode);
    }
    return targetNode;
}
//销毁元素节点自身
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
//目标节点内部的节点顺序逆序
Element.prototype.revChild = function () {
    var child = this.children,
        len = child.length;
    for (var i = len - 2; i >= 0; i--) {
        this.appendChild(child[i]);
    }
    return this;
}
//查看滚动轮滚动距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}
//查看浏览器视口尺寸
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else if (document.compatMode === "CSS1Compat") {
        return {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
        }
    } else {
        return {
            w: document.body.clientWidth,
            h: document.body.clientHeight
        }
    }
}
//求元素相对于文档的坐标
Element.prototype.getCoord = function () {
    var coordX = 0,
        coordY = 0,
        docEle = this;
    while (docEle) {
        coordX += docEle.offsetLeft;
        coordY += docEle.offsetTop;
        docEle = docEle.offsetParent;
    }
    return {
        x: coordX,
        y: coordY
    }
};
//获取样式
function getStyle(ele, style) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[style];
    } else {
        return ele.currentStyle[style];
    }
}
//添加事件
function addEvent(elem, type, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handler, false);
    } else if (elem.attachEvent) {
        elem['temp' + type + handler] = handler;
        elem['temp' + type] = function () {
            elem['temp' + type + handler].call(elem);
        }
        elem.attachEvent('on' + type, elem['temp' + type]);
    } else {
        elem['on' + type] = handler;
    }
}
//解除事件
function removeEvent(elem, type, handler) {
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handler, false);
    } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, elem['temp' + type]);
    } else {
        elem['on' + type] = null;
    }
}
//取消冒泡
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}
//阻止默认事件
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}
//拖拽元素
function drag(elem) {
    var disX;
    var disY;
    addEvent(elem, "mousedown", function (e) {
        var event = e || window.event;
        disX = event.clientX - parseInt(getStyle(this, "left"));
        disY = event.clientY - parseInt(getStyle(this, "top"));
        addEvent(document, "mousemove", mouseMove);
        addEvent(document, "mouseup", mouseUp);
    });
    function mouseMove(e) {
        var event = e || window.event;
        elem.style.left = event.pageX - disX + 'px';
        elem.style.top = event.pageY - disY + 'px';
    }
    function mouseUp() {
        removeEvent(document, "mousemove", mouseMove);
        removeEvent(document, "mouseup", mouseUp);
    }
}
//多物体多值链式运动框架
function startMove(elem, json, func) {
    clearInterval(elem.timer);
    var iSpeed;
    var iCur;
    var bStop;
    elem.timer = setInterval(function () {
        bStop = true;
        for (var attr in json) {
            iCur = attr === 'opacity' ? parseFloat(getStyle(elem, attr)) * 100 : parseInt(getStyle(elem, attr));
            iSpeed = attr === 'opacity' ? (parseFloat(json[attr]) * 100 - iCur) / 7 : (parseInt(json[attr]) - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            elem.style[attr] = attr === "opacity" ? (iCur + iSpeed) / 100 : iCur + iSpeed + 'px';
            if (iCur !== (attr === 'opacity' ? parseFloat(json[attr]) * 100 : parseInt(json[attr]))) {
                bStop = false;
            }
        }
        if (bStop) {
            clearInterval(elem.timer);
            if (func) {
                func();
            }
        }
    }, 30);
}
//按需异步加载script
function scriptLoaded(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "complete" || script.readyState == "loaded") {
                callback();
                script.onreadystatechange = null;
            }
        }
    } else {
        script.onload = function () {
            script.onload = null;
            callback();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}
//兼容getElementByClassName
Document.prototype.getByClassName = function (target) {
    var allEle = document.getElementsByTagName('*'),
        len = allEle.length,
        arr = [],
        classArr = [],
        classArrLen;
    for (var i = 0; i < len; i++) {
        classArr = allEle[i].className.myTrim().splice(' ');
        classArrLen = classArr.length;
        for (var j = 0; j < classArrLen; j++) {
            if (classArr[j] === target) {
                arr.push(allEle[i]);
                break;
            }
        }
    }
    return arr;
}
//兼容trim
String.prototype.myTrim = function () {
    var reg = /^\s*|\s*$/;
    return this.replace(reg, '');
}

// dom操作
window.dom = {

    // 增

    // 1.创建节点
    create(string) {
        let container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
        // (传入字符串形式的标签便可以直接创建元素，比如传入 "<div>" 或者 "<li>")
    },

    // 2.追加节点(在一个节点后面新增一个节点)
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
        // 找到node的父亲，父亲会将node2插入到node的下一个节点的前面(node为最后一个节点也功能也正常)
    },

    // 3.前置节点(在一个节点前面新增一个节点)
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
        // 找到node的父亲，父亲使用insertBefore将node2插入到子元素node的前面
    },

    // 4.新增子节点
    append(parent, node) {
        parent.appendChild(node)
        // parent节点中增加孩子节点node
    },

    // 5.在子节点外包裹父节点
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
        // 先将parent放到node前面，再将node放到parent里面
    },

    // 删

    // 1.删除节点
    remove(node) {
        node.parentNode.removeChild(node)
        return node
        // 让node的父亲删除node这个孩子
    },

    // 2.置空节点
    empty(node) {
        let childNodes = node.childNodes
        let array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
        // 利用while循环将node的所有子节点删除，首先将node的第一个孩子(如果有的话)赋给x，如果x存在就删除node第一个孩子，接着将x指向node最新的第一个孩子
        // 创建一个数组保存被删除的子节点并返回出去
    },

    // 改

    // 1.设置、读取属性
    attr(node, name, value) {
        if (arguments.length === 3) {
            return node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
        // 如果传入的参数个数为3，就设置node的新属性name，其值为value(写)。如果传入的参数个数为2，就读取node的属性name(读)。
    },


    // 2.设置新的文本
    text(node, string) {
        if (arguments.length === 2) {
            if ('textContent' in node) {
                node.textContent = string
            } else {
                node.innerText = string
            }
        } else if (arguments.length === 1) {
            if ('textContent' in node) {
                return node.textContent
            } else {
                return node.innerText
            }
        }
        // 在node节点中添加新的文本(string), 当前浏览器是IE时使用node.innerText ，不是则使用node.textContent
        // 如果传入的参数个数为2，就设置node的text为string(写)。如果传入的参数个数为1，就读取node的text(读)。
    },


    // 3.设置新的HTML
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
        // 与text方法几乎一致
    },

    // 4.设置、读取节点的style样式
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div,'border','1px solid red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div,'color')
                return node.style[name]
            } else if (name instanceof Object) {
                // dom.style(div, {color: 'red'})
                for (let key in name) {
                    node.style[key] = name[key]
                }
            }
        }
        // 如果传入的参数个数为3，将node节点的style样式中名字为name的值变更为value
        // 如果传入的参数个数为2且第二个参数为字符串类型，就返回node的style样式中名字为name的值(读)
        // 如果传入的参数个数为2且第二个参数为对象类型，就遍历这个对象并且将node的style样式名字为"key"的值修改为每个key在对象中对应的"value"
    },

    // 5.添加删除判断节点的class属性
    class: {
        add(node, className) {
            node.classList.add(className)
            // 在node上添加class类名，其值为className
        },
        remove(node, className) {
            node.classList.remove(className)
            // 在node上删除class类名，其值为className
        },
        has(node, className) {
            return node.classList.contains(className)
            // 在node上查询class类名，有返回true，无返回false
        }
    },

    // 6.添加事件
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
        // 在node上添加一个事件，eventName为事件名字，fn为事件处理函数
    },

    // 7.移除事件
    off(node, eventName, fn) {
        node.addEventListener(eventName, fn)
        // 在node上移除eventName的事件处理函数fn
    },

    // 查

    // 1.寻找节点
    find(selector, scoped) {
        return (scoped || document).querySelectorAll(selector)
        // 如果有scoped参数，就在scoped的范围里寻找选择器为selector的节点。没有就在全局寻找选择器为selector的节点(返回的都是一个数组)。scoped一般是一个标签元素，如 find(".name", div1): 在div1这个节点中寻找class为name的元素
    },

    // 2.寻找父节点
    parent(node) {
        return node.parentNode
        // 返回node节点的父节点
    },

    // 3.寻找子节点
    children(node) {
        return node.children
        // 返回node节点的子节点
    },

    // 4.寻找兄弟节点
    Sibling(node) {
        let arr = Array.from(node.parentNode.children)
        return arr.filter(n => n !== node)
        // 首先找到node节点的父节点的所有子节点，将其转换为一个数组，使用filter将node剔除出去只剩下兄弟
    },

    // 5.寻找弟弟节点(node的下一个节点)
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
        // 先让x等于node的下一个节点，如果x存在且是文本节点，那么x就再等于x的下一个节点(直到下一个节点不是文本节点或者不存在下一个节点就返回x)。x不存在就直接返回x
    },

    // 6.寻找哥哥节点(node的上一个节点)
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
        // 先让x等于node的上一个节点，如果x存在且是文本节点，那么x就再等于x的上一个节点(直到上一个节点不是文本节点或者不存在上一个节点就返回x)。x不存在就直接返回x
    },

    // 7.遍历节点列表中的的所有节点并进行操作
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
        // nodeList是节点列表，fn是传入的操作函数，对nodeList中的所有节点都执行fn函数
    },

    // 8.获取节点的排名
    index(node) {
        let list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
        // 找到节点的父亲，获取父亲中的所有孩子
        // 遍历所有孩子，并且每个孩子都与node做对比，如果相等就返回i，i就是node在所有孩子中的第几个
    }

}



