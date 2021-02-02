export function popOpen(_this,isOpen,close,icon,mainTitle,content,btnClick){
    let json = {
		isOpen: isOpen,
		close: close,
		icon: icon,
		mainTitle: mainTitle,
		content: content,
		// 单个按钮
		btnClick: btnClick,
		// 两个按钮
		// confirmClick: confirmClick,
		// closeClick: closeClick,
	}
	_this.popdata = json
}

