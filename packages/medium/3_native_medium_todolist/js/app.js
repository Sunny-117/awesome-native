window.onload = function () {
	// 1. 给一个假数据，让数据能在页面中以列表的形式展示出来

	// 1.1 假数据
	// var data = [
	// 	// 数组中存储的每一项就是一个代办项
	// 	{
	// 		id: 1,
	// 		todo: "抽烟",
	// 		done: false,
	// 	},
	// 	{
	// 		id: 2,
	// 		todo: "喝酒",
	// 		done: false,
	// 	},
	// 	{
	// 		id: 3,
	// 		todo: "烫头",
	// 		done: true,
	// 	},
	// ];
	// 页面刚一加载  就要去localStorage中读取数据
	var dataStr = localStorage.getItem("todoList");
	var data = [];
	if(dataStr){
		data = JSON.parse(dataStr);
	}

	// 1.2 将假数据渲染到页面中去
	var listContainer = document.querySelector(".todo-list");
	var toggleAll = document.querySelector("#toggle-all");
	var newTodo = document.querySelector(".new-todo");
	var todoCount = document.querySelector(".todo-count")
	var clearCompleted = document.querySelector(".clear-completed");

	function render(data) {

		var renderData = null;
		switch(location.hash){
			case "#/active":
				// 这边 renderData 就是 data 中所有 done 属性为 false 的元素
				renderData = data.filter(function(v){
					return !v.done;
				})
				break;
			case "#/completed":
				// 这边 renderData 就是 data 中所有 done 属性为 true 的元素
				renderData = data.filter(function(v){
					return v.done;
				})
				break;
			default:
				renderData = data;
		}

		// 遍历假数据数组，把所有的数据生成新的li标签放到页面的ul中去
		var html = "";
		for (var i = 0; i < renderData.length; i++) {
			html += `
					<li class="${renderData[i].done ? "completed" : ""}" data-id="${renderData[i].id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${renderData[i].done ? "checked" : ""}>
							<label>${renderData[i].todo}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="${renderData[i].todo}">
					</li>
			`;
		}
		listContainer.innerHTML = html;

		// 设置一下 剩余未完成的数量
		todoCount.innerHTML = `<strong>${leftCount()}</strong> item left`
	}

	render(data);

	// 2. 实现每个代办项完成的功能
	// 在用户选中复选框的时候，更改数据，重新渲染即可 （数据驱动：只要数据有变化，就重新渲染页面）

	// 由于复选框是动态生成的，直接注册事件不可行，而且在每次有新的内容产生的时候，都需要重新注册事件
	// 所以，我们选择使用如下的方式进行事件注册（事件委托）
	listContainer.addEventListener("click", function (e) {
		// alert("事件触发了")
		// 判断一下，触发事件的是不是checkbox，如果是，那就进行选中完成事件
		// 获取到当前li标签上data-id存储的唯一标识
		var id = e.target.parentElement.parentElement.getAttribute("data-id");
		// 用唯一标识找到假数据中对应的待办项
		var temp = data.find(function (value) {
			return value.id == id;
		});

		if (e.target.className == "toggle") {
			// alert("点击了复选框")
			// 在用户单击了当前元素的复选框的时候，我们需要修改当前元素对应的待办项的done属性
			// console.log(e.target.checked)
			// 修改这个待办项的done属性
			temp.done = e.target.checked;

			// 因为数据发生了变更，存储一下数据到localstorage中
			localStorage.setItem("todoList", JSON.stringify(data))

			// 修改一下全选状态
			// 判断：是否所有的事儿都完成了？如果都完成了，那么就是全选了
			// 如果有任何一个每完成，那么就不是全选
			var flag = data.every(function(value){
				return value.done == true;
			});
			if(flag){
				toggleAll.checked = true;
			}else{
				toggleAll.checked = false;
			}
			render(data);
		}

		// 判断一下，触发事件的是不是destroy按钮，如果是，那就进行删除事件
		if(e.target.className == "destroy"){
			// 找到当前按钮所在的li对应的待办项 上面已经找到了 就是temp
			// 找索引
			var index = data.indexOf(temp);
			// 删除元素
			data.splice(index, 1);

			// 因为数据发生了变更，存储一下数据到localstorage中
			localStorage.setItem("todoList", JSON.stringify(data))
			render(data);
		}

		// 判断一下，触发事件是不是 LABEL 标签， 如果是， 那就进行编辑
		if(e.target.tagName == "LABEL"){
			// 当用户单击当前待办项的时候，需要出现一个文本框用来编辑当前待办，只需要给当前的li加上一个editing类样式
			// 需要有排他 删掉其他li标签的 editing类样式
			for(var i = 0; i < listContainer.children.length; i ++){
				listContainer.children[i].classList.remove("editing");
			}

			e.target.parentElement.parentElement.classList.add("editing");

			// 让文本框自动获取焦点
			var input = e.target.parentElement.parentElement.querySelector(".edit");
			input.focus();
			// 调整光标位置到文字右边
			input.setSelectionRange(-1, -1);
		}
	});

	listContainer.addEventListener("keydown", function(e){
		// 获取到当前要编辑的待办项的id
		var id = e.target.parentElement.getAttribute("data-id");
		// 根据id找到待办项
		var temp = data.find(function(v){
			return v.id == id
		})

		// 如果在文本框中按下了回车键
		if(e.target.className == "edit" && e.keyCode == 13){
			temp.todo = e.target.value;
			// 因为数据发生了变更，存储一下数据到localstorage中
			localStorage.setItem("todoList", JSON.stringify(data))

			render(data);
		}
	})

	// 3. 实现待办项全选和反选的功能
	toggleAll.addEventListener("change", function (e) {
		// console.log("全选状态变化")
		// 如果当前全选的checkbox是选中状态，就让所有的待办项全部完成
		// 如果当前全选的checkbox是未选中转台，就让所有的待办项全部未完成
		// console.log(this.checked);

		// for(var i = 0; i < data.length; i ++){
		// 	data[i].done = this.checked;
		// }

		// data.forEach(function(value){
		// 	value.done = this.checked;
		// })

		data.forEach(v => v.done = this.checked);

		// 因为数据发生了变更，存储一下数据到localstorage中
		localStorage.setItem("todoList", JSON.stringify(data))

		render(data);
	});
	// 需要在改变下面checkbox状态的时候，同时修改全选状态

	// 4. 实现删除代办项的功能

	// 5. 实现待办项的添加功能
	newTodo.addEventListener("keydown", function(e){
		// 回车键的 keyCode == 13
		if(e.keyCode == 13 && this.value.trim() !== ""){
			// 用户按下回车键了
			// console.log("add");
			// 获取到用户的输入，新创建一个待办对象，将其存入数组
			var todo = {
				// 如果数组中没有元素，那么id就为1，如果数组中有元素，那么id就是数组最后一个元素的id+1
				id: data.length == 0 ? 1 : data[data.length - 1].id + 1,
				todo: this.value,
				done: false
			}

			data.push(todo);
			// 清空文本框
			this.value = "";

			// 因为数据发生了变更，存储一下数据到localstorage中
			localStorage.setItem("todoList", JSON.stringify(data))

			render(data);
		}
	})
	// 6. 实现剩余未完成数量功能
	function leftCount(){
		// 这个函数就是用来获取剩余多少个未完成的数量
		var sum = 0;
		data.forEach(function(v){
			// 如果待办项未完成，sum+1
			if(!v.done){
				sum += 1;
			}
		})
		return sum;
	}
	// 7. 实现三个按钮的过滤功能
	// onhashchange事件 会在 url地址 hash值发生变化的时候出发
	window.onhashchange = function(){
		// console.log(location.hash);
		// 修改一下三个过滤按钮的高亮装填
		var anchors = document.querySelector(".filters").querySelectorAll("a");
		for(var i = 0; i < anchors.length; i++){
			if(anchors[i].hash == location.hash){
				anchors[i].classList.add("selected");
			}else{
				anchors[i].classList.remove("selected");
			}
		}
		// 重新渲染数据
		render(data);
	}
	// 8. 实现清除所有已完成的待办项的功能
	clearCompleted.onclick = function(e){
		// 需要将数组中所有的已完成的项删除
		// 我们可以把data中所有未完成的找出来组成一个新数组，就相当于是把所有完成的删除了
		data = data.filter(function(v) {
			return !v.done;
		})

		render(data)
	};

	// 9. 实现双击编辑的功能
	// 当用户双击当前待办项的时候，需要出现一个文本框用来编辑当前待办，只需要给当前的li加上一个editing类样式
	// 双击被单击事件阻止了。

	// blur时间没法冒泡，focusout事件可以冒泡
	listContainer.addEventListener("focusout", function(e){
		if(e.target.className == "edit"){
			e.target.parentElement.classList.remove("editing");
		}
	})

	// 10. 实现本地化存储
	// 在所有修改数据的地方，我们把数据存储到localStorage中
	// 在所有需要获取数据的地方，我们直接从localStorage中获取

};
