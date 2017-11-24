var access_token = 'YOUR_TOKEN_HERE';

function ajax(params) {
	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				params.success(this.responseText);
			} else {
				console.error(new Error('Response returned with error code.'));
				console.error(this.responseText);
			}
		}
	};

	request.open(params.type, params.url, true);
	params.beforeSend(request);
	request.send();
}

ajax({
	type: 'POST',
	beforeSend: function(request) {
		request.setRequestHeader('Content-Type', 'application/octet-stream');
		request.setRequestHeader('Authorization', `Bearer ${access_token}`);
		request.setRequestHeader('Dropbox-API-Arg', '{"import_format":"markdown"}');
	},
	url: 'https://api.dropboxapi.com/2/paper/docs/create',
	success: function(resp) {
		var data = JSON.parse(resp);
		window.location = `https://paper.dropbox.com/doc/${data.doc_id}`;
	},
});
