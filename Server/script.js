const base_url = window.location.href;
const root = document.getElementById("root");
var offset = 0;
var account;
var user;
const movies_list = new Map();
var page;

window.onload = function(){
	renderHeader();
	renderContent();
	renderFooter();
}

function ajax(method, url, callback){
	const xhttp = new XMLHttpRequest();
	xhttp.open(method, url);
	xhttp.onload = function(){
		callback(this);
	}
	xhttp.send();
}

function ajaxHasReqHeader(method, url, contentType, data, callback){
	const xhttp = new XMLHttpRequest();
	xhttp.open(method, url, false);
	xhttp.setRequestHeader("Content-Type", "application/" + contentType);
	xhttp.onload = function(){
		callback(this);
	}
	xhttp.send(data);
}

function getTemplate(responseText){
	const doc = new DOMParser().parseFromString(responseText, "text/html");
	const template = doc.getElementById("template").innerHTML;
	return template;
}

function getTemplateWithHandlebars(responseText, parameter){
	const template = getTemplate(responseText);
	const compiled_template = Handlebars.compile(template);
	const html = compiled_template(parameter);
	return html;
}

function renderHeader(){
	const method = "POST";
	const url = base_url + "Templates/header.html";
	ajax(method, url, function(xhttp){
		const html = getTemplate(xhttp.responseText);
		root.insertAdjacentHTML("beforeend", html);
		const header = document.getElementsByClassName("header")[0];
		const list = header.getElementsByClassName("col-sm-2");
		for (let i = 0; i < list.length; i++){
			list[i].style = "visibility: hidden";
		}
		header.getElementsByClassName("col-sm-1")[3].style = "visibility: hidden";
		header.getElementsByClassName("col-sm-4")[0].style = "visibility:hidden";
	});
}

function renderContent(){
	const method = "POST";
	const url = base_url + "Templates/content.html";
	ajax(method, url, function(xhttp){
		const html = getTemplate(xhttp.responseText);
		root.insertAdjacentHTML("beforeend", html);
	});
}

function renderFooter(){
	const method = "POST";
	const url = base_url + "Templates/footer.html";
	ajax(method, url, function(xhttp){
		const html = getTemplate(xhttp.responseText);
		root.insertAdjacentHTML("beforeend", html);
	});
}

function renderLoginForm(){
	const method = "POST";
	const url = base_url + "Templates/login.html";
	ajax(method, url, function(xhttp){
		const html = getTemplate(xhttp.responseText);
		const content = document.getElementsByClassName("content")[0];
		const main_content = content.getElementsByClassName("main-content")[0];
		content.removeChild(main_content);
		content.insertAdjacentHTML("afterbegin", html);
	});
	const header_login_btn = document.getElementById("header-login-btn");
	header_login_btn.style = "visibility: hidden";
}

function renderRegisterForm(){
	const method = "POST";
	const url = base_url + "Templates/register.html";
	ajax(method, url, function(xhttp){
		const html = getTemplate(xhttp.responseText);
		const content = document.getElementsByClassName("content")[0];
		const main_content = content.getElementsByClassName("main-content")[0];
		content.removeChild(main_content);
		content.insertAdjacentHTML("afterbegin", html);
	});
	const header_login_btn = document.getElementById("header-login-btn");
	header_login_btn.style.visibility = "hidden";
}

function setUpMoviesContainer(){
	const footer = document.getElementsByClassName("footer")[0];
	footer.style = "visibility: hidden";

	const header = document.getElementsByClassName("header")[0];
	const list = header.getElementsByClassName("col-sm-2");
	for (let i = 0; i < list.length; i++){
		list[i].style = "visibility: visible";
	}
	header.getElementsByClassName("col-sm-1")[3].style = "visibility: visible";
	header.getElementsByClassName("col-sm-4")[0].style = "visibility: visible";
	const content = document.getElementsByClassName("content")[0];
	content.removeChild(content.firstElementChild);
}

function renderNewMovies(func, data){
	const movies_container = document.getElementsByClassName("movies-container")[0];
	if (movies_container == null){
		return;
	}
	const row = movies_container.lastElementChild.previousElementSibling;
	const col = row.lastElementChild;

	if (col.childElementCount == 0){
		row.classList.add("text-center");	
		col.insertAdjacentHTML("beforeend", "<i class='glyphicon glyphicon-refresh spinning'></i>");
		row.appendChild(col);
	}

	setTimeout(function(){
		const method = "POST";
		let url = base_url + "Server/Controller.php?func=" + func;
		const contentType = "json";
		ajaxHasReqHeader(method, url, contentType, JSON.stringify(data), function(xhttp){
			let parameters = JSON.parse(xhttp.responseText);
			if (offset % 6 != 0){
				window.removeEventListener("scroll", checkScrollHeight, true);
				if (col.childElementCount != 0){
					col.removeChild(col.firstElementChild);
				}
				return;
			}
			parameters.forEach(function(obj){
				movies_list.set(obj.id, obj);
			});
			offset += parameters.length;
			url = base_url + "Templates/new-movies.html";
			ajax(method, url, function(xhttp){
				let template = xhttp.responseText;
				let html = getTemplateWithHandlebars(template, parameters);
				movies_container.removeChild(movies_container.lastElementChild);
				movies_container.removeChild(movies_container.lastElementChild);
				movies_container.insertAdjacentHTML("beforeend", html);
			});
		});
	}, 500);
}

function checkScrollHeight(event){
	const difference = document.documentElement.scrollHeight - window.innerHeight;
	const scrollposition = document.documentElement.scrollTop; 
	if (difference == scrollposition){
		renderNewMovies(event.currentTarget.func, event.currentTarget.data);
	}
}

function renderMovies(func, data){
	const content = document.getElementsByClassName("content")[0];
	if (content.childElementCount == 2){
		content.removeChild(content.firstElementChild);
	}
	const method = "POST";
	let url = base_url + "Server/Controller.php?func=" + func;
	const contentType = "json";

	ajaxHasReqHeader(method, url, contentType, JSON.stringify(data), function(xhttp){
		let parameters = JSON.parse(xhttp.responseText);
		if (parameters == null || parameters.length == 0){
			return;
		}
		parameters.forEach(function(parameter){
			parameter.forEach(function(obj){
				movies_list.set(obj.id, obj);
			});
		});
		offset = parameters[parameters.length - 1].length + ((parameters.length - 1) * 6);
		url = base_url + "Templates/movies.html";
		ajax(method, url, function(xhttp){
			const html = getTemplateWithHandlebars(xhttp.responseText, parameters);
			content.insertAdjacentHTML("afterbegin", html);
			window.func = "getNext6MoviesBy" + func.split("By")[1];
			if (page == "watchlist"){
				window.func = "getNext6Watchlist";
			}
			data.offset = offset;
			window.data = data;
			window.addEventListener("scroll", checkScrollHeight, true);
		});
	});
}

function renderHome(){
	page = "home";
	document.getElementById("home-btn").firstElementChild.classList.add("active");
	document.getElementById("watchlist-btn").firstElementChild.classList.remove("active");
	document.getElementsByClassName("header")[0].getElementsByClassName("col-sm-4")[0].style = "visibility: visible";
	renderMovies("get18FirstMoviesById", {});
	let messageId = showMessage("Bạn đang ở trang chủ", "success", 5);
	clearMessage(5, messageId);
}

function renderWatchlist(event){
	page = "watchlist";
	if (event != null && event.target.parentElement.parentElement.id == "watchlist-btn"){
		document.getElementById("watchlist-btn").firstElementChild.classList.add("active");
		document.getElementById("home-btn").firstElementChild.classList.remove("active");
		let messageId = showMessage("Bạn đang ở danh sách theo dõi", "success", 5);
		clearMessage(5, messageId);
	}
	const method = "POST";
	const func = "get18FirstWatchlist";
	movies_list.clear();
	offset = 0;
	document.getElementsByClassName("header")[0].getElementsByClassName("col-sm-4")[0].style = "visibility: hidden";
	renderMovies(func, account);
}

function renderUserInfoDialog(event){
	const user_info_dialog = document.getElementById("user-info-dialog");
	if (user_info_dialog != null){
		document.getElementById("input-firstname").value = user.firstname;
		document.getElementById("input-lastname").value = user.lastname;
		document.getElementById("input-email").value = user.email;
		return;
	}
	const method = "POST";
	const url = base_url + "Templates/user-info-dialog.html";
	ajax(method, url, function(xhttp){
		const template = xhttp.responseText;
		const html = getTemplate(template);
		root.insertAdjacentHTML("beforeend", html);
	});
}

function renderChangePasswordDialog(event){
	const change_password_dialog = document.getElementById("change-password-dialog");
	if (change_password_dialog != null){
		document.getElementById("input-username").value = account.username;
		return;
	}
	const method = "POST";
	const url = base_url + "Templates/change-password-dialog.html";
	ajax(method, url, function(xhttp){
		const template = xhttp.responseText;
		const html = getTemplate(template);
		root.insertAdjacentHTML("beforeend", html);
	});
}

function checkAccount(event){
	const input = event.target;
	const inputValue = input.value;
	const span = input.parentNode.parentNode.getElementsByTagName("span")[1];
	let message = "";

	if (inputValue.length == 0){
		message = input.placeholder + " không được trống";
		span.innerText = message;
		return;
	}

	if (inputValue.search(" ") != -1){
		message = input.placeholder + " không được chứa khoảng trắng";
		span.innerText = message;
		return;
	}

	if (input.id == "input-username"){
		if (!(input.value.length >= 5 && input.value.length <= 36)){
			message = input.placeholder + " chứa từ 5 đến 36 ký tự";
			span.innerText = message;
			return;
		}
	}else if (input.id == "input-password"){
		if (!(input.value.length >= 5 && input.value.length <= 32)){
			message = input.placeholder + " chứa từ 5 đến 32 ký tự";
			span.innerText = message;
			return;
		}
	}

	message = "";
	span.innerText = message;
}

function checkConfirmPassword(event){
	const input = event.target;
	const confirmPassword = input.value;
	const password = document.getElementById("input-password").value;
	const span = input.parentNode.parentNode.getElementsByTagName("span")[1];
	let message = "";

	if (password != confirmPassword){
		message = "Mật khẩu không trùng khớp";
		span.innerText = message;
		return;
	}

	message = "";
	span.innerText = message;
}

function checkInfor(event){
	const input = event.target;
	const inputValue = input.value;
	const span = input.parentNode.parentNode.getElementsByTagName("span")[1];
	let message = "";
	if (inputValue == ""){
		message = input.placeholder + " không được rỗng";
		span.innerText = message;
		return;
	}
	if (!(inputValue.length >= 3 && inputValue.length <= 50)){
		message = input.placeholder + " chứa từ 3 đến 50 ký tự";
		span.innerText = message;
		return;
	}
	message = "";
	span.innerText = message;		
}

function checkEmail(event){
	const input = event.target;
	const inputValue = input.value;
	const span = input.parentNode.parentNode.getElementsByTagName("span")[1];
	let message = "";
	if (inputValue == ""){
		message = "Email không được rỗng";
		span.innerText = message;
		return;	
	}

	const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (!inputValue.match(re)){
		message = "Định dạng email không hợp lệ";
		span.innerText = message;
		return;
	}
	mesage = "";
	span.innerText = message;
}

function showMessage(content, type, initTime){
	const messages = document.getElementsByClassName("message-container")[0];
	const message = document.createElement("div");
	const messageContent = document.createElement("strong");
	const messageTime = document.createElement("span");

	messageContent.innerText = content;
	messageTime.innerText = " " + initTime;
	message.classList.add("alert");
	message.classList.add("alert-" + type);
	message.id = messages.childElementCount;
	message.appendChild(messageContent);
	message.appendChild(messageTime);

	messages.appendChild(message);

	return message.id;
}

function clearMessage(seconds, id){
	let sec = seconds * 1000;
	let timerId = setInterval(function(){
		const messages = document.getElementsByClassName("message-container")[0];
		const message = document.getElementById(id);
		if (message == null){
			return;
		}
		const span = message.getElementsByTagName("span")[0];
		span.innerText = " " + --seconds;
	}, 1000);
	setTimeout(function(){
		const messages = document.getElementsByClassName("message-container")[0];
		const message = document.getElementById(id);
		messages.removeChild(message);
		clearInterval(timerId);
	}, sec);
}

function login(){
	const method = "POST";
	const url = base_url + "Server/Controller.php?func=login";
	const contentType = "json";
	const username = document.getElementById("input-username").value;
	const password = document.getElementById("input-password").value;
	account = new Account(username, password);

	ajaxHasReqHeader(method, url, contentType, JSON.stringify(account), function(xhttp){
		console.log(xhttp.responseText);
		const response = JSON.parse(xhttp.responseText);
		const login_btn = document.getElementById("login-btn");
		login_btn.innerText = "";
		login_btn.insertAdjacentHTML("beforeend", "<i class='glyphicon glyphicon-refresh spinning'></i>");
		if (typeof response === "object"){
			user = response;
			setTimeout(function(){
				setUpMoviesContainer();
				renderHome();
			}, 0);
		}else {
			setTimeout(function(){
				login_btn.innerText = "Đăng nhập";
				let messageId = showMessage(response, "danger", 5);
				clearMessage(5, messageId);
			}, 1000);
		}
	});
}

function logout(){
	for (var i = 1; i < 99999; i++){
        window.clearInterval(i);
	}
	root.innerHTML = "";
	renderHeader();
	renderContent();
	renderFooter();
	account = null;
	user = null;
	offset = 0;
	movies_list.clear();
	page = null;
}

function register(){
	const form = document.getElementById("register-form");
	const spans = form.getElementsByTagName("span");
	for (let i = 1; i < spans.length; i += 2){
		if (spans[i].textContent != ""){
			return;
		}
	}

	const method = "POST";
	const url = base_url + "Server/Controller.php?func=register";
	const contentType = "json";

	const data = {
		account: {
			username: document.getElementById("input-username").value,
			pwd: document.getElementById("input-password").value
		},
		user: {
			username: document.getElementById("input-username").value,
			firstname: document.getElementById("input-firstname").value,
			lastname: document.getElementById("input-lastname").value,
			email: document.getElementById("input-email").value,
			active: 1
		}
	};
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(data), function(xhttp){
		const message = JSON.parse(xhttp.responseText);
		if (message != null){
			let messageId = showMessage("Đăng ký thành công, vui lòng đăng nhập lại!", "success", 5);
			clearMessage(5, messageId);
			renderLoginForm();
		}else {
			let messageId = showMessage(message, "danger", 5);
			clearMessage(5, messageId);
		}
	});
}

function addToWatchlist(event){
	if (page == "watchlist"){
		removeFromWatchlist(event);
		return;
	}

	const method = "POST";
	const func = "addToWatchlist";
	const url = base_url + "Server/Controller.php?func=" + func;
	const contentType = "json";
	let key = event.target.parentElement.parentElement.parentElement.parentElement.id;
	key = parseInt(key.split("_")[1]);
	const data = {
		username: user.username,
		movieId: movies_list.get(key).id
	};
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(data), function(xhttp){
		let mess = "Thêm vào danh sách theo dõi thành công";
		let messageId = showMessage(mess, "success", 5);
		clearMessage(5, messageId);
	});
}

function removeFromWatchlist(event){
	const method = "POST";
	const func = "removeFromWatchlist";
	const url = base_url + "Server/Controller.php?func=" + func;
	const contentType = "json";
	let key = event.target.parentElement.parentElement.parentElement.parentElement.id;
	key = parseInt(key.split("_")[1]);
	const data = {
		username: user.username,
		movieId: movies_list.get(key).id
	};
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(data), function(xhttp){
		renderWatchlist(null);
		let mess = "Xóa khỏi danh sách theo dõi thành công";
		let messageId = showMessage(mess, "success", 5);
		clearMessage(5, messageId);
	});
}

function search(){
	const searchForm = document.getElementById("searchForm");
	const searchMode = document.getElementById("searchMode");
	const keyword = searchForm.value;
	const mode = searchMode.value;
	const func = "get18FirstMoviesBy" + mode;
	const data = {
		name: keyword
	};
	offset = 0;
	const search_btn = document.getElementById("searchBtn");
	const i = search_btn.firstElementChild;
	i.className = "glyphicon glyphicon-refresh spinning";
	setTimeout(function(){
		i.className = "glyphicon glyphicon-search";
		let messageId = showMessage("Tìm kiếm thành công!", "success", 5);
		clearMessage(5, messageId);
		renderMovies(func, data);
	}, 0);
}

function updateUserInfo(){
	const user_info_dialog = document.getElementById("user-info-dialog");
	const spans = user_info_dialog.getElementsByTagName("span");

	for (let i = 0; i < spans.length; i++){
		if (spans[i].innerText != ""){
			return;
		}
	}

	const firstname = document.getElementById("input-firstname").value;
	const lastname = document.getElementById("input-lastname").value;
	const email = document.getElementById("input-email").value;
	const method = "POST";
	const func = "updateInformation";
	const url = base_url + "Server/Controller.php?func=" + func;
	const contentType = "json";
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(user), function(xhttp){
		console.log(xhttp.responseText);
		$('#user-info-dialog').modal('hide');
		let messageId = showMessage("Cập nhật thành công", "success", 5);
		clearMessage(5, messageId);
	});
}

function updateUserPassword(){
	const change_password_dialog = document.getElementById("change-password-dialog");
	const spans = change_password_dialog.getElementsByTagName("span");

	for (let i = 0; i < spans.length; i++){
		if (spans[i].innerText != ""){
			return;
		}
	}

	const old_password = document.getElementById("input-old-password").value;
	const method = "POST";
	let func = "login";
	let url = base_url + "Server/Controller.php?func=" + func;
	const contentType = "json";
	let is_valid_password = false;
	const temp_account = JSON.parse(JSON.stringify(account));
	temp_account.pwd = old_password;
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(temp_account), function(xhttp){
		const response = JSON.parse(xhttp.responseText);
		if (typeof response === "object"){
			is_valid_password = true;
		}
	});

	if (!is_valid_password){
		$('#change-password-dialog').modal('hide');
		let messageId = showMessage("Cập nhật thất bại, mật khẩu cũ nhập không chính xác", "danger", 5);
		clearMessage(5, messageId);
		return;
	}

	account.pwd = document.getElementById("input-password").value;
	func = "changeUserPassword";
	url = base_url + "Server/Controller.php?func=" + func;
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(account), function(xhttp){
		$('#change-password-dialog').modal('hide');
		let messageId = showMessage("Cập nhật thành công", "success", 5);
		clearMessage(5, messageId);
	});
}

function renderReview(event){
	const card = event.target.parentElement.parentElement.parentElement;
	const key = parseInt(card.id.split("_")[1]);
	const movie = movies_list.get(key);
	const method = "POST";
	const func = "getMovieDetails";
	let url = base_url + "Server/Controller.php?func=" + func;
	const contentType = "json";
	let data = {
		movieId: key
	};
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(data), function(xhttp){
		let response = JSON.parse(xhttp.responseText);
		const parameters = {
			img_src: movie.avatar,
			evaluation: response.evaluation.evaluation,
			genre: response.genre,
			country: response.country.name,
			releaseYear: movie.releaseYear,
			movie_name: movie.name,
			description: movie.description,
			actor: response.actor,
			trailer_src: movie.trailer
		};
		url = base_url + "Templates/review.html";
		ajax(method, url, function(xhttp){
			const html = getTemplateWithHandlebars(xhttp.responseText, parameters);
			const content = document.getElementsByClassName("content")[0];
			if (content.childElementCount == 2){
				content.removeChild(content.firstElementChild);
			}
			content.insertAdjacentHTML("afterbegin", html);
		});
	});
}