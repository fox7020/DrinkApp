var issueUrl = "http://59.127.112.147:8080/DrinkApp/IssueSQL?id=";
function sendIssue(){
	if($("#issueName").val() == "" || $("#issueTel").val() == "" || $("#issueContent").val() == ""){
		$("#issueStatus").html("欄位不可為空白");
	}
	else{
		if(loginAccount != ""){
			$.ajax({
				async : false,
				type : 'POST',
				url : issueUrl + loginAccount + "&tel=" + $("#issueTel").val() + "&content=" + $("#issueContent").val(),
				success : function(data) {
					jsonCoordinate = JSON.parse(data);
					if(jsonCoordinate[0].isInsertIssue == "true"){
						$("#issueStatus").html("我們已收到您的寶貴意見，會火速為您處理，相關後續我們會已電話方式與您聯絡。");
						$("#issueName").val("");
						$("#issueTel").val("");
						$("#issueContent").val("");
					}
					else{
						$("#issueStatus").html("資料送出失敗，請檢查您的網路狀況是否已連線。");
					}
				}
			});
		}
		else{
			$.ajax({
				async : false,
				type : 'POST',
				url : issueUrl + $("#issueName").val() + "&tel=" + $("#issueTel").val() + "&content=" + $("#issueContent").val(),
				success : function(data) {
					jsonCoordinate = JSON.parse(data);
					if(jsonCoordinate[0].isInsertIssue == "true"){
						$("#issueStatus").html("我們已收到您的寶貴意見，會火速為您處理，相關後續我們會已電話方式與您聯絡。");
						$("#issueName").val("");
						$("#issueTel").val("");
						$("#issueContent").val("");
					}
					else{
						$("#issueStatus").html("資料送出失敗，請檢查您的網路狀況是否已連線。");
					}
				}
			});
		}
	}
}