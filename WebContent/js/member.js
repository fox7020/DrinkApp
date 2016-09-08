var loginAccount;
var registerAccount;
var registerPassword1;
var registerPassword2;
var name;
var address;
var tel;
var isUniqueId;
var queryUniIdurl = "http://59.127.112.147:8080/DrinkApp/MemberSQL?id=";
var loginUrl = "http://59.127.112.147:8080/DrinkApp/LoginSQL?";
var registerUrl = "http://59.127.112.147:8080/DrinkApp/AddNewUser"
var orderDataUrl = "http://59.127.112.147:8080/DrinkApp/OrderDataSQL?id="
var userNameUrl = "http://59.127.112.147:8080/DrinkApp/UserNameSQL?id=";
var editMemberUrl = "http://59.127.112.147:8080/DrinkApp/EditMemberSQL?id=";
var checkPasswordUrl = "http://59.127.112.147:8080/DrinkApp/CheckPasswordSQL?password=";
function checkUniqueId(val) {
	if (val != "") {
		$.ajax({
			async : false,
			type : 'GET',
			url : queryUniIdurl + val,
			success : function(data) {
				jsonCoordinate = JSON.parse(data);
				isUniqueId = jsonCoordinate[0].unique;

			}
		});
		if (isUniqueId == "false") {
			$("#checkId").html("這個帳號已經註冊過!");

		} else {
			$("#checkId").html("這個帳號還沒註冊過，可以使用!");
		}
	} else {
		$("#checkId").html("請輸入一組帳號");
	}

}

function checkPassword() {
	password1 = $("#password1").val();
	password2 = $("#password2").val();
	if (password1 != password2) {
		$("#checkPassword").html("密碼不符");
		$("#password1").val("");
		$("#password2").val("");
		return false;

	} else {
		$("#checkPassword").html("密碼正確");
		return true;
	}

}

function login() {
	loginAccount = $("#loginAccount").val();
	var loginPassword = $("#loginPassword").val();
	$.ajax({
		async : false,
		type : 'GET',
		url : loginUrl + 'id=' + loginAccount + '&password=' + loginPassword,
		success : function(data) {
			jsonCoordinate = JSON.parse(data);
			var correctAccount = jsonCoordinate[0].correctAccount;
			if (correctAccount == "true") {
				$("#memberWelcomePage").hide();
				$("#memberDetail").show();
				window.location = "index.html#member";
				getUserName(loginAccount);
				getOrderData(loginAccount);
			} else {
				$("#loginCheck").html("帳號或密碼錯誤");
			}
		}
	});
}

function logOut(){
	$("#memberDetail").hide();
	$("#memberWelcomePage").show();
	$("#loginAccount").val("");
	$("#loginPassword").val("");
	window.location = "index.html#member";
	
}

function register() {
	registerAccount = $("#registerAccount").val();
	registerPassword1 = $("#password1").val();
	registerPassword2 = $("#password2").val();
	name = $("#registerName").val();
	address = $("#registerAddress").val();
	gender = $('input[name=registerGender]:checked').val()
	tel = $("#registerTel").val();
	if(registerAccount == ""||registerPassword1 == ""||registerPassword2 == "" || name == "" || address == "" || tel ==""){
		$("#registerStatus").html("欄位不可為空白");
	}else{
		if (isUniqueId == "true" && checkPassword() == true) {
			var isInsert;
			$.ajax({
				async : false,
				type : 'POST',
				url : registerUrl + '?password=' + registerPassword1 + '&name='
						+ name + '&address=' + address + '&gender=' + gender
						+ '&tel=' + tel + '&id=' + registerAccount,
				success : function(data) {
					jsonCoordinate = JSON.parse(data);
					isInsert = jsonCoordinate[0].InsertNewUser;
				}
			});
			if (isInsert == "true") {
				$("#registerStatus").html("註冊成功!三秒後將跳轉到登入畫面");
				setTimeout(function() {
					window.location = "index.html#login";
				}, 3000);
			} else {
				$("#registerStatus").html("註冊失敗");
			}
		}
	}
	
}

function addOrderItems() {
	var title = "<div data-role='collapsible'>"
	var appends = "<div data-role='collapsible'>";
	var orderNum = "";
	for (var i = 0; i < jsonCoordinate.length; i++) {

		if (orderNum != jsonCoordinate[i].orderNum) {
			appends += title;
			orderNum = jsonCoordinate[i].orderNum;
			appends += "<h1>" + orderNum + "</h1>";
		}
		appends += "<p>" + jsonCoordinate[i].productName + " 數量:"
				+ jsonCoordinate[i].qty + "</p>";
	}
	appends += "</div>";
	$("#orderItems").append(appends);
}

function getOrderData(account) {
	$.ajax({
		async : false,
		type : 'GET',
		url : orderDataUrl + account,
		success : function(data) {
			jsonCoordinate = JSON.parse(data);
			addOrderItems();
		}
	});

}

function getUserName(account) {
	$.ajax({
		async : false,
		type : 'GET',
		url : userNameUrl + account,
		success : function(data) {
			jsonCoordinate = JSON.parse(data);
			var memberName = jsonCoordinate[0].memberName;
			$("#memberName").html("你好:" + memberName);
		}
	});
}

function goToEditMember() {
	$.ajax({
		async : false,
		type : 'GET',
		url : editMemberUrl + loginAccount,
		success : function(data) {
			jsonCoordinate = JSON.parse(data);
			$("#editName").val(jsonCoordinate[0].memberName);
			$("#editAddress").val(jsonCoordinate[0].address);
			$("#editTel").val(jsonCoordinate[0].tel);
			if (jsonCoordinate[0].gender == "男") {
				$("#male").prop("checked", true);
			} else {

				$("#female").prop("checked", true);
			}
		}
	});
	$("#memberDetail").hide();
	$("#memberDataEdit").show();
}

function goTomemberDetail() {
	$("#memberDataEdit").hide();
	$("#memberDetail").show();
}

function editMemberData() {
	var oldPassword = null;
	var newPassword = null;
	oldPassword = $("#editOldPassword").val();
	newPassword = $("#editNewPassword").val();
	var name = $("#editName").val();
	var gender = $('input[name=editGender]:checked').val();
	var address = $("#editAddress").val();
	var tel = $("#editTel").val();
	if (name == "" || address == "" || tel == "") {
		$("#updateStatus").html("姓名、地址、電話欄位不可空白");
	} else {
		if (oldPassword == "" || newPassword == "") {
			$.ajax({
				async : false,
				type : 'POST',
				url : editMemberUrl + loginAccount + "&name=" + name
						+ "&gender=" + gender + "&address=" + address + "&tel="
						+ tel,
				success : function(data) {
					jsonCoordinate = JSON.parse(data);
					if (jsonCoordinate[0].UpdateMemberData == "true") {
						$("#updateStatus").html("更新成功");
						$("#editOldPassword").val("");
						$("#editNewPassword").val("");
					} else {
						$("#updateStatus").html("更新失敗");
						$("#editOldPassword").val("");
						$("#editNewPassword").val("");
					}

				}
			});
		} else {
			$.ajax({
				async : false,
				type : 'POST',
				url : checkPasswordUrl + oldPassword + "&id=" + loginAccount,
				success : function(data) {
					jsonCoordinate = JSON.parse(data);
					if(jsonCoordinate[0].isCorrectPassword == "true"){
						$.ajax({
							async : false,
							type : 'POST',
							url : editMemberUrl + loginAccount + "&name=" + name
									+ "&gender=" + gender + "&address=" + address + "&tel="
									+ tel + "&password=" + newPassword,
							success : function(data) {
								jsonCoordinate = JSON.parse(data);
								if (jsonCoordinate[0].UpdateMemberData == "true") {
									$("#updateStatus").html("更新成功");
									$("#editOldPassword").val("");
									$("#editNewPassword").val("");
								} else {
									$("#updateStatus").html("更新失敗");
									$("#editOldPassword").val("");
									$("#editNewPassword").val("");
								}
							}
						});
					}
					else{
						$("#editOldPassword").val("");
						$("#editNewPassword").val("");
						$("#updateStatus").html("密碼錯誤");
					}
				}
			});
		}
	}

}

