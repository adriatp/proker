function sendPost(url, funcToGetData, funcToExecuteAfter, contentType) {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", contentType);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			if (this.responseText != null && this.responseText.localeCompare("") != 0) {
				var received = JSON.parse(this.responseText);
				funcToExecuteAfter(received);
			}
		}
	};
	if (funcToGetData != null) {
		var data = JSON.stringify(funcToGetData());
		xhr.send(data);
	}
	else {
		xhr.send();
	}
}