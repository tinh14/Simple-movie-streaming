const base_url = window.location.href;
const root = document.getElementById("root");
var offset = 0;
var account;
var user;
const movies_list = new Map();
var page;

window.onload = function(){
	console.log("VÀO ĐÂY LÀM CÁI GÌ ?");
	// renderAdminPage();
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
	renderMovies("getFirst18MoviesById", {});
	let messageId = showMessage("Bạn đang ở trang chủ", "success");
	clearMessage(3, messageId);
}

function renderWatchlist(event){
	page = "watchlist";
	if (event != null && event.target.parentElement.parentElement.id == "watchlist-btn"){
		document.getElementById("watchlist-btn").firstElementChild.classList.add("active");
		document.getElementById("home-btn").firstElementChild.classList.remove("active");
		let messageId = showMessage("Bạn đang ở danh sách theo dõi", "success");
		clearMessage(3, messageId);
	}
	const method = "POST";
	const func = "getFirst18Watchlist";
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

function showMessage(content, type){
	const messages = document.getElementsByClassName("message-container")[0];
	const message = document.createElement("div");
	const messageContent = document.createElement("strong");

	messageContent.innerText = content;
	message.classList.add("alert");
	message.classList.add("alert-" + type);
	message.id = messages.childElementCount;
	message.appendChild(messageContent);
	messages.appendChild(message);

	return message.id;
}

function clearMessage(seconds, id){
	let sec = seconds * 1000;
	setTimeout(function(){
		const message = document.getElementById(id).remove();
	}, sec);
}

function login(){
	const method = "POST";
	const url = base_url + "Server/Controller.php?func=login";
	const contentType = "json";
	const username = document.getElementById("input-username").value;
	const password = document.getElementById("input-password").value;
	account = new Account(username, password);

	const login_btn = document.getElementById("login-btn");
	login_btn.innerText = "";
	login_btn.insertAdjacentHTML("beforeend", "<i class='glyphicon glyphicon-refresh spinning'></i>");
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(account), function(xhttp){
		const response = JSON.parse(xhttp.responseText);
		if (typeof response === "object"){
			if (Object.keys(response).length == 1){
				renderAdminPage();
				return;
			}
			user = response;
			setTimeout(function(){
				setUpMoviesContainer();
				renderHome();
			}, 1000);
		}else {
			setTimeout(function(){
				login_btn.innerText = "Đăng nhập";
				let messageId = showMessage(response, "danger");
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
			let messageId = showMessage("Đăng ký thành công, vui lòng đăng nhập lại!", "success");
			clearMessage(3, messageId);
			renderLoginForm();
		}else {
			let messageId = showMessage(message, "danger");
			clearMessage(3, messageId);
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
		let messageId = showMessage(mess, "success");
		clearMessage(3, messageId);
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
		let messageId = showMessage(mess, "success");
		clearMessage(3, messageId);
	});
}

function search(){
	const searchForm = document.getElementById("searchForm");
	const searchMode = document.getElementById("searchMode");
	const keyword = searchForm.value;
	const mode = searchMode.value;
	const func = "getFirst18MoviesBy" + mode;
	const data = {
		name: keyword
	};
	offset = 0;
	const search_btn = document.getElementById("searchBtn");
	const i = search_btn.firstElementChild;
	i.className = "glyphicon glyphicon-refresh spinning";
	setTimeout(function(){
		i.className = "glyphicon glyphicon-search";
		let messageId = showMessage("Tìm kiếm thành công!", "success");
		clearMessage(3, messageId);
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
	
	user.firstname = firstname;
	user.lastname = lastname;
	user.email = email;
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(user), function(xhttp){
		$('#user-info-dialog').modal('hide');
		let messageId = showMessage("Cập nhật thành công", "success");
		clearMessage(3, messageId);
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
		let messageId = showMessage("Cập nhật thất bại, mật khẩu cũ nhập không chính xác", "danger");
		clearMessage(3, messageId);
		return;
	}

	account.pwd = document.getElementById("input-password").value;
	func = "changeUserPassword";
	url = base_url + "Server/Controller.php?func=" + func;
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(account), function(xhttp){
		$('#change-password-dialog').modal('hide');
		let messageId = showMessage("Cập nhật thành công", "success");
		clearMessage(3, messageId);
	});
}

function renderReview(event){
	const btn = event.target;
	btn.innerHTML = "<i class='glyphicon glyphicon-refresh spinning'></i>";
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
		let evaluation = response.evaluation.evaluation;
		if (!evaluation){
			evaluation = "Chưa có";
		} 
		const parameters = {
			id: key,
			img_src: movie.avatar,
			evaluation: evaluation,
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
		 	document.getElementById("home-btn").firstElementChild.classList.remove("active");
		});
	});
}

function changeStarsStatus(event){
	const stars = event.currentTarget.stars;
	const i = event.currentTarget.i;
	stars[i].style = "cursor: pointer";
	for (let j = 0; j < stars.length; j++){
		if (j <= i){
			stars[j].src = "Assets/images/star-on.png";
		}else {
			stars[j].src = "Assets/images/star-off.png";
		}
	}
}

function evaluateMovie(event){
	const score = event.currentTarget.score;
	const movieId = event.currentTarget.id;
	const stars = event.currentTarget.stars;
	const method = "POST";
	const func = "evaluate";
	const url = base_url + "Server/Controller.php?func=" + func;
	const contentType = "json";

	const data = {
		username: account.username,
		movieId: movieId,
		score: score
	};
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(data), function(xhttp){
		let messageId = showMessage("Đánh giá thành công", "success");
		clearMessage(3, messageId);
		for (let j = 0; j < stars.length; j++){
			stars[j].style = "cursor: default";
			stars[j].removeEventListener("mouseover", changeStarsStatus);
			stars[j].removeEventListener("click", evaluateMovie);
		}
	});
}

function renderVideo(event){
	const card = event.target.parentElement.parentElement.parentElement;
	const key = parseInt(card.id);
	const movie = movies_list.get(key);
	
	const method = "POST";
	const func = "getEvaluation";
	let url = base_url + "Server/Controller.php?func=" + func;
	const contentType = "json";
	const data = {
		username: account.username,
		movieId: movie.id
	};

	const btn = event.target;
	btn.innerHTML = "<i class='glyphicon glyphicon-refresh spinning'></i>";
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(data), function(xhttp){
		let response = JSON.parse(xhttp.responseText);
		let score;
		if (!response){
			score = 0;
		}else {
			score = response.score;
		}

		const evaluation = [];
		for (let i = 1; i <= 10; i++){
			let src = "Assets/images/";
			if (i <= score){
				src += "star-on.png";
			}else {
				src += "star-off.png";
			}
			let obj = {
				src: src,
				alt: i
			};
			evaluation.push(obj);
		}

		url = base_url  + "Templates/watch-movie.html";
		const parameters = {
			src: movie.video,
			evaluation: evaluation
		};
		ajax(method, url, function(xhttp){
			setTimeout(function(){
				const html = getTemplateWithHandlebars(xhttp.responseText, parameters);
				document.getElementsByClassName("review-container")[0].remove();
				document.getElementsByClassName("content")[0].insertAdjacentHTML("afterbegin", html);
				const video = document.getElementsByClassName("video-container")[0];
				const stars = document.getElementsByClassName("star");
				for (let i = 0; i < stars.length; i++){
					stars[i].stars = stars;
					stars[i].i = i;
					stars[i].score = i + 1;
					stars[i].id = key;
					stars[i].addEventListener("mouseover", changeStarsStatus);
					stars[i].addEventListener("click", evaluateMovie);
				}
			}, 1000);
		});
	});
}


let allMovies = [];
let cur_page = 0;
let num_pages;

function renderTable(parameters, filename){
	let method = "GET";
	let url = base_url + "Templates/Admin/" + filename;
	ajax(method, url, function(xhttp){
		const html = getTemplateWithHandlebars(xhttp.responseText, parameters);
		const table_container = document.getElementById("table-container");
		if (table_container.childElementCount == 1){
			table_container.firstElementChild.remove();
		}
		table_container.insertAdjacentHTML("beforeend", html);
		if (cur_page == num_pages - 1){
			let rem = 6 - (allMovies.length % 6);
			const trs = document.querySelectorAll("tbody tr");
			let index = trs.length - 1;
			while (rem){
				trs[index--].style = "visibility: hidden";
				rem--;
			}
		}
	});
}

function renderMoviePage(){
	let index = cur_page * 6;
	page = "Movie";
	num_pages = Math.ceil(allMovies.length / 6);
	document.getElementById("num-page").value = ((cur_page + 1) + "/" + num_pages); 

	const obj = [];
	for (let i = 0; i < 6;  i++){
		obj.push(allMovies[index++]);
	}
	renderTable(obj, "movies.html");
}

function renderGenrePage(){
	let index = cur_page * 6;
	page = "Genre";
	num_pages = Math.ceil(allMovies.length / 6);
	document.getElementById("num-page").value = ((cur_page + 1) + "/" + num_pages); 

	const obj = [];
	for (let i = 0; i < 6;  i++){
		obj.push(allMovies[index++]);
	}
	renderTable(obj, "movies.html");
}

function destroyModal(modalId){
	document.getElementById(modalId).remove();
	const modal_backdrop = document.getElementsByClassName("modal-backdrop in")[0];
	if (modal_backdrop){
		modal_backdrop.remove();
	}
}

function showInfo(event, pos){
	const tr = event.target.parentElement.parentElement;
	const id = parseInt(tr.id.split("_")[1]);
	let index;
	for (let i = 0; i < allMovies.length; i++){
		if (allMovies[i].id == id){
			index = i;
			break;			
		}
	}

	let filename;
	let method = "GET";
	let url;
	let parameters = {};
	console.log(allMovies);
	switch (pos){
		case 1:
			filename = "description-dialog";
			parameters = {
				description: allMovies[index].description
			};
			break;
		case 2:
			filename = "avatar-dialog";
			parameters = {
				avatar: allMovies[index].avatar
			};
			break;
		case 3:
			filename = "trailer-dialog";
			parameters = {
				trailer: allMovies[index].trailer
			};
			break;
		case 4:
			filename = "video-dialog";
			parameters = {
				video: allMovies[index].video
			};
			break;
		case 5:
			filename = "genre-dialog";
			parameters = allMovies[index].genres;
			break;
		case 6:
			filename = "actor-dialog";
			parameters = allMovies[index].actors;
			console.log(parameters);
			break;
	}

	url = base_url + "Templates/Admin/" + filename + ".html";
	ajax(method, url, function(xhttp){
		const html = getTemplateWithHandlebars(xhttp.responseText, parameters);
		root.insertAdjacentHTML("beforeend", html);
		$('#' + filename).modal('show');
	});
}

function chooseGenre(){
	let method = "GET";
	let func = "getAllGenres";
	let url = base_url + "Server/AdminController.php?func=" + func; 
	const contentType = "json";
	let data = {};
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(data), function(xhttp){
		let parameters = JSON.parse(xhttp.responseText);		
		url = base_url + "Templates/Admin/choose-genre-dialog.html";
		ajax(method, url, function(xhttp){
			const html = getTemplateWithHandlebars(xhttp.responseText, parameters);
			root.insertAdjacentHTML("beforeend", html);
			$('#add-movie-dialog').modal('hide');
			$('#choose-genre-dialog').modal('show');
		});
	});
}

function chooseActor(){
	let method = "GET";
	let func = "getAllActors";
	let url = base_url + "Server/AdminController.php?func=" + func; 
	const contentType = "json";
	let data = {};
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(data), function(xhttp){
		let parameters = JSON.parse(xhttp.responseText);		
		url = base_url + "Templates/Admin/choose-actor-dialog.html";
		ajax(method, url, function(xhttp){
			const html = getTemplateWithHandlebars(xhttp.responseText, parameters);
			root.insertAdjacentHTML("beforeend", html);
			$('#add-movie-dialog').modal('hide');
			$('#choose-actor-dialog').modal('show');
		});
	});
}


function getBase64(file, callback) {
	let reader = new FileReader();
	reader.onload = callback;
    reader.readAsDataURL(file);
}

function insertMovie(){
	let id = parseInt(document.getElementById("input-id").value);
	let name = document.getElementById("input-name").value;
	let anotherName = document.getElementById("input-anotherName").value;
	let releaseYear = document.getElementById("input-releaseYear").value;
	const select = document.getElementById("input-select");
	let country = parseInt(select.options[select.selectedIndex].value);
	let trailer = document.getElementById("input-trailer").value;
	let description = document.getElementById("input-description").value;
	let avatar = document.getElementById("input-avatar").files[0];
	let video = document.getElementById("input-video").files[0];
	
	getBase64(avatar, function(e){
		avatar = e.currentTarget.result;
		getBase64(video, function(e){
			video = e.currentTarget.result;
			const chooseGenreDialog = document.getElementById("choose-genre-dialog");
			const genreInputs = chooseGenreDialog.getElementsByTagName("input");
			let genres = [];
			for (let i = 0; i < genreInputs.length; i++){
				if (genreInputs[i].checked){
					genres.push({
						movieId: id,
						genreId: genreInputs[i].value
					});
				}
			}
			const chooseActorDialog = document.getElementById("choose-actor-dialog");
			const actorInputs = chooseActorDialog.getElementsByTagName("input");
			let actors = [];
			for (let i = 0; i < actorInputs.length; i++){
				if (actorInputs[i].checked){
					actors.push({
						movieId: id,
						actorId: actorInputs[i].value
					});
				}
			}

			const movie = {
				id: id,
				name: name,
				anotherName: anotherName,
				releaseYear: releaseYear,
				description: description,
				trailer: trailer,
				avatar: avatar,
				video: video
			};

			const method = "POST";
			let func = "insertMovie";
			let url = base_url + "Server/AdminController.php?func=" + func;
			const contentType = "json";
			let data = {
				movie: movie,
				countryId: country,
				movieActors: actors,
				movieGenres: genres
			};

			ajaxHasReqHeader(method, url, contentType, JSON.stringify(data), function(xhttp){
				let response = JSON.parse(xhttp.responseText);
				if (response == true){
					updateTable();
					renderMoviePage();
				}
			});
			destroyModal('choose-genre-dialog');
			destroyModal('choose-actor-dialog');
		});
	});
}

function renderAddMovieDialog(){
	let method = "GET";
	let func = "getAllCountries";
	let url = base_url + "Server/AdminController.php?func=" + func;
	let contentType = "json";
	let data = {};
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(data), function(xhttp){
		const parameters = JSON.parse(xhttp.responseText);
		url = base_url + "Templates/Admin/add-movie-dialog.html";
		ajax(method, url, function(xhttp){
			const html = getTemplateWithHandlebars(xhttp.responseText, parameters);
			root.insertAdjacentHTML("beforeend", html);
			$('#add-movie-dialog').modal('show');
		});
	});
}

function updateTable(){
	let method = "GET";
	let func = "getAllMovies";
	let url = base_url + "Server/AdminController.php?func=" + func;
	let contentType = "json";
	let data = {};
	ajaxHasReqHeader(method, url, contentType, JSON.stringify(data), function(xhttp){
		let response = JSON.parse(xhttp.responseText);
		if (response == null){
			return;
		}
		allMovies = [];
		response.forEach(function(movie){
			allMovies.push(movie);
		});
	});
}

function renderAdminPage(){
	root.innerHTML = "";
	updateTable();
	let method = "GET";
	let	url = base_url + "Templates/Admin/admin-page.html";
	ajax(method, url, function(xhttp){
		const html = getTemplate(xhttp.responseText);
		root.insertAdjacentHTML("beforeend", html);
		document.getElementById("first-btn").addEventListener("click", function(){
			cur_page = 0;
			if (page == "Movie")
				renderMoviePage();
			else if (page == "Genre")
				renderGenrePage();
		});
		document.getElementById("last-btn").addEventListener("click", function(){
			cur_page = num_pages - 1;
			if (page == "Movie")
				renderMoviePage();
			else if (page == "Genre")
				renderGenrePage();
		});;
		document.getElementById("next-btn").addEventListener("click", function(){
			if (cur_page < num_pages - 1){
				cur_page++;
				if (page == "Movie")
					renderMoviePage();
				else if (page == "Genre")
					renderGenrePage();
			}
		});;
		document.getElementById("previous-btn").addEventListener("click", function(){
			if (cur_page > 0){
				cur_page--;
				if (page == "Movie")
					renderMoviePage();
				else if (page == "Genre")
					renderGenrePage();
			}
		});;
		renderMoviePage();
	});
}