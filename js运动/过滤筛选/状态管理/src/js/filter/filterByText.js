function filterByText (filterText, arr) {
    // 'btn mBtn'
    if (!filterText) {//空的
        return arr;
    }else {//非空
        return arr.filter(function (ele, index) {
        	// indexOf：判断是不是属于字符串
            return ele.name.indexOf(filterText) != -1;
            // 本句是个简写
            
            // if(ele.name.indexOf(filterText) != -1){
            // 	return true;
            // }else{
            // 	return false;
            // }
        });
    }
}
