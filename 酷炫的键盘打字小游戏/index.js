/* 
扩展运算符：将一个数组转为用逗号分隔的参数序列
 */
// function join(a, b, c) {
//   console.log(a + '-' + b + '-' + c)
// }
// join('a', 'b', 'c')
// var arr1 = ['a', 'b', 'c']
// join(...arr1)
// console.log(...arr1) // 只有函数调用的时候，才可以将扩展运算符方到小括号中
// (...arr1) // 报错
/* 0  25 */
// join(...'abc')
// console.log([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'])

var words = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']

/* 生成0到25之间随机数的函数 */
function getRandomNumber(min, max) {
  console.log(Math.random())
  var result = Math.floor(Math.random() * (max - min + 1)) + min
  console.log(result)
  return result
}
// getRandomNumber(0, 25)

/* 获取随机字母的函数 */
function getRandomWord() {
  var key = getRandomNumber(0, words.length - 1)
  var result = words[key]
  console.log(result)
  return result
}


/* 随机选择某个元素函数 */
function selectRandomElement() {
  var word = document.getElementById(getRandomWord())
  word.classList.add('selected')
}

/* 初始化函数 */
function init() {
  /* 初始化的时候，先选择一个元素 */
  selectRandomElement()
  document.addEventListener('keyup', function(event) {
    console.log(event.key)
    /* 按压的字母 */
    var pressWord = event.key.toUpperCase()
    /* 按压的字母对应页面的元素 */
    var pressElement = document.getElementById(pressWord)
    pressElement.classList.add('press')
    /* 监听当前按压动画的结束事件 */
    pressElement.addEventListener('animationend', function() {
      pressElement.classList.remove('press')
    })

    /* 当前在选中的状态的元素 */
    var selectedWord = document.querySelector('.selected')
    if(pressWord == selectedWord.innerHTML) {
      selectedWord.classList.remove('selected')
      selectRandomElement()
    }
  })
}
init()