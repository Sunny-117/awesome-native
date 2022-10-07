/**
 * 窗口点击事件坐标值转换为画布上的坐标
 * 该方法不止是将canvas边界框的坐标从窗口坐标中减去
 * 而且在canvas元素大小与绘图元素大小不相符时，还对这两个坐标进行了缩放
 *
 *
 * @export
 * @param {Object} canvas 画布对象
 * @param {*} clientX event.clientX
 * @param {*} clientY event.clientY
 * @returns
 */
export function window2Canvas (canvas, clientX, clientY) {
  // 获取canvas元素的边界框，该边界框的坐标是相对于整个窗口的
  const box = canvas.getBoundingClientRect()
  const w_scale = canvas.width / box.width
  const h_scale = canvas.height / box.height

  return {
    x: (clientX - box.left) * w_scale,
    y: (clientY - box.top) * h_scale
  }
}

export function getPixelRatio (context) {
  // 浏览器在渲染canvas之前存储画布信息的像素比
  const devicePixelRatio = window.devicePixelRatio || 1
  const backingStoreRatio =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1
  return devicePixelRatio / backingStoreRatio
}

/**
 * 绘制圆角矩形
 *
 * @export
 * @param {Number} left 矩形左上角横坐标
 * @param {Number} top 矩形左上角纵坐标
 * @param {Number} width 矩形宽度
 * @param {Number} height 矩形高度
 * @param {Number} r 矩形圆角半径
 * @param {Object} ctx 画布对象
 */
export function drawRadiusRect (left, top, width, height, r, ctx) {
  const pi = Math.PI
  ctx.beginPath()
  ctx.arc(left + r, top + r, r, -pi, -pi / 2)
  ctx.arc(left + width - r, top + r, r, -pi / 2, 0)
  ctx.arc(left + width - r, top + height - r, r, 0, pi / 2)
  ctx.arc(left + r, top + height - r, r, pi / 2, pi)
  ctx.closePath()
}

export function clearRadiusRect (left, top, width, height, ctx) {
  ctx.clearRect(left, top, width, height)
}

export function drawCircle (x, y, r, ctx) {
  // var offset = 1;
  const pi = Math.PI
  ctx.beginPath()
  ctx.arc(x, y, r, 0, pi * 2, true)
  ctx.closePath()
}

export function drawCross (x, y, size, width, color, cap, ctx) {
  ctx.lineWidth = width
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(x - size / 2, y - size / 2)
  ctx.lineTo(x + size / 2, y + size / 2)
  ctx.lineCap = cap
  ctx.stroke()
  ctx.closePath()

  ctx.beginPath()
  ctx.moveTo(x + size / 2, y - size / 2)
  ctx.lineTo(x - size / 2, y + size / 2)
  ctx.lineCap = cap
  ctx.stroke()
  ctx.closePath()
}

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865/edit
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
export function occurrences (string, subString, allowOverlapping) {
  string += ''
  subString += ''
  if (subString.length <= 0) return string.length + 1

  var n = 0

  var pos = 0

  var step = allowOverlapping ? 1 : subString.length

  while (true) {
    pos = string.indexOf(subString, pos)
    if (pos >= 0) {
      ++n
      pos += step
    } else break
  }
  return n
}
