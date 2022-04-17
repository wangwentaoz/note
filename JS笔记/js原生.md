## 原生事件
1. onMouseEnter：鼠标移入
2. onMouseLeave：鼠标移出
3. onKeyUp：键盘按下
   1. event.keyCode：键盘按下的键盘按键
4. window.confirm('确定删除吗？')：原生事件，出来弹窗两个选项确定和取消。如果点击确定返回true

## 原生回调event
1. event.target：点击的标签，可以向上冒泡
2. event.target.value：输入框的value值
3. event.target.checked：输入框的type=checkbox时，是否勾选的值