//bgImg preloading (效果有限)
var img = new Image();

function preloader() {
    var images = ["./image/bg2.jpg", "./image/bg1.jpg", "./image/bg3.jpg"];
    // start preloading
    for (var i = 1; i < images.length; i++) {
        img.src = images[i];
        // console.log(i);
    }
};

$(document).ready(function() { //載入後做版面調整處理
    $("#menuFooter").hide(); //hide order page footer
    preloader();
    // startChangeBG(); 
    if (localStorage.length > 0) {
        recoverBill();
        $("#workStatus").text("載入歷史帳單:" + billCount + "筆");
    }
});
var bgCount = 1;

function changeBGimg() {
    switch (bgCount) {
        case 0:
            $("#welcomePage.ui-page").css({
                "background": "url(./image/bg2.jpg) no-repeat fixed",
                "background-position": "center",
                "background-size": "cover"
            });
            $("#welcomeText").text("餓了嗎?想吃點什麼嗎?");
            bgCount++;
            console.log("refresh BG Img1");
            break;
        case 1:
            $("#welcomePage.ui-page").css({
                "background": "url(./image/bg1.jpg) no-repeat fixed",
                "background-position": "center",
                "background-size": "cover"
            });
            $("#welcomeText").text("快來看看今天的餐點!");
            bgCount++;
            console.log("refresh BG Img2");
            break;
        case 2:
            $("#welcomePage.ui-page").css({
                "background": "url(./image/bg3.jpg) no-repeat fixed",
                "background-position": "center",
                "background-size": "cover"
            });
            $("#welcomeText").text("想好要吃什麼了嗎?");
            bgCount = 0;
            console.log("refresh BG Img3");
    }
};
// var autoChangeBG; (loading ng 先停用)
// function startChangeBG() {
//     autoChangeBG = self.setInterval("changeBGimg()", 10000);
//     console.log("start setInterval");
// }

// function stopChangeBG() {
//     clearInterval(autoChangeBG);
//     console.log("stop setInterval");
// };

// $("#btnEnter").click(function() {
//     stopChangeBG();
// });

$("#toHome1").click(function() {
    changeBGimg();
});
$("#toHome2").click(function() {
    changeBGimg();
});

$("#toHome3").click(function() {
    changeBGimg();
});

//JSON菜單資料物件
var titleArray = [
    { "title": "主食 (每份附泡菜、糖心蛋)" },
    { "title": "串燒 (每份兩串)" },
    { "title": "自家小點" },
    { "title": "飲物 (每罐)" }
];

var menuData0 = [
    { "name": "招牌燒肉飯", "price": 100, "unit": "" },
    { "name": "極炙雞腿飯", "price": 110, "unit": "" },
    { "name": "究極雙拼飯", "price": 160, "unit": "" },
    { "name": "純手工起司牛肉堡飯", "price": 130, "unit": "" }
];

var menuData1 = [
    { "name": "炙燒牛肋串", "price": 70, "unit": "" },
    { "name": "泡菜牛五花", "price": 70, "unit": "" },
    { "name": "鹽烤松阪豬", "price": 60, "unit": "" },
    { "name": "雞肉腿串", "price": 60, "unit": "" },
    { "name": "培根杏鮑菇", "price": 60, "unit": "" },
    { "name": "杏鮑菇", "price": 50, "unit": "" }
];

var menuData2 = [
    { "name": "鹽烤雞翅", "price": 100, "unit": "(一份六支)" },
    { "name": "手工黃金泡菜", "price": 40, "unit": "(一盤)" },
    { "name": "手工黃金泡菜", "price": 200, "unit": "(一罐)" },
    { "name": "糖心蛋", "price": 20, "unit": "(一顆)" },
    { "name": "白飯", "price": 15, "unit": "(一碗)" },
];

var menuData3 = [
    { "name": "可樂", "price": 25, "unit": "" },
    { "name": "檸檬汽水", "price": 25, "unit": "" },
    { "name": "TREETOP蘋果汁", "price": 35, "unit": "" },
    { "name": "金牌啤酒", "price": 40, "unit": "" },
    { "name": "海尼根", "price": 50, "unit": "" },
    { "name": "KIRIN一番榨", "price": 50, "unit": "" }
];

var menuDataGrop = [menuData0, menuData1, menuData2, menuData3];

// listview欄位範例
// <li data-role="list-divider">A</li> titleArray[i].title
// <li><a href="#">A1<span class="ui-li-count">Price</span></a><a href="#addPopup" data-icon="plus" id="smenu_" data-rel="popup" data-transition="slide">Some Text</a></li>

//id變化用計數物件
var menuDivider = 0;
var menuListView = 0;
//排列list-divider &　listview
function sortDivider(titleArray, menuDataGrop) {
    for (var i = 0; i < titleArray.length; i++) {
        createDivider(titleArray[i].title);
        for (var j = 0; j < menuDataGrop[i].length; j++) {
            createLisView(
                menuDataGrop[i][j].name,
                menuDataGrop[i][j].price,
                menuDataGrop[i][j].unit,
                i,
                j
            );
        }
    }
};

//list-divider欄位產生程式
function createDivider(title) {
    var $li = $("<li>"); //new Control
    $li.attr("data-role", "list-divider"); //Set property
    $li.attr("id", "menu" + menuDivider++); //Set id
    $li.attr("data-theme", "b"); //Set color
    $li.text(title); //Set title word
    $("#searchMenu").append($li);
};

//listview欄位產生程式
function createLisView(menuDataName, menuDataPrice, menuDataUnit, i, j) {
    var $list = $("<li>"); //new Control
    var $a1 = $("<a>"); //new Control
    $a1.text(menuDataName + " " + menuDataUnit);
    var $span = $("<span>"); //new Control
    $span.addClass('ui-li-count'); //set Count Bubbles 
    $span.text(menuDataPrice);
    $a1.append($span);
    var $a2 = $("<a>"); //new Control
    $a2.attr("data-icon", "plus"); //Set property
    var iIndex;
    var jIndex;
    // console.log(i);
    // console.log(j);
    var re0 = /^\d$/;　 // RegExp [0-9]
    if (re0.test(i)) {
        iIndex = ("0" + i)
    } else {
        iIndex = "" + i;
    }
    // console.log(iIndex);
    if (re0.test(j)) {
        jIndex = "0" + j;
    } else {
        jIndex = "" + j;
    }
    // console.log(jIndex);
    $a2.attr("id", "smenu" + iIndex + "_" + jIndex); //Set id record menudata index and order
    $a2.attr("href", "#addPopup"); //Set for Popup
    $a2.attr("data-rel", "popup"); //Set for Popup
    $a2.attr("data-transition", "slide"); //Set for Popup
    $a2.addClass("addOrder"); //Set for check active
    $list.append($a1); //add to parent
    $list.append($a2); //add to parent
    $("#searchMenu").append($list);
    menuListView++;
};

//產生菜單
sortDivider(titleArray, menuDataGrop);

//取得點選菜單+號的id,並由id取出陣列索引值,目前設計可容納100類別各100筆菜單
var menuDataOrder;
var menuDataIndex;
$(".addOrder").click(function() {
    menuDataOrder = Number(this.id.substr(5, 2));
    menuDataIndex = Number(this.id.substr(8, 2));
});

//進行收集點餐數量與新增訂單動作
var re = /^[1-9]\d*$/; //檢查是否為大於0正整數 RegExp
$("#joinOrder").click(function() {
    var orderNumber = Number($("#orderNumber").val()); //取得點餐數量值
    if (re.test(orderNumber)) {
        newOrderItem(menuDataOrder, menuDataIndex, orderNumber);
        $("#alertText").text((menuDataGrop[menuDataOrder][menuDataIndex].name) + " 訂單加入成功!");
        $("#menuFooter").show('fast').hide(1500);
    } else {
        console.log('worng input');
        $("#alertText").text("輸入錯誤,訂單入失敗!");
        $("#menuFooter").show(0).hide(3000);
    }
    $("#orderNumber").val("1"); //確認後將表單數量改回預設值1
});

//取消表單數量改回預設值1  
$("#cancelOrder").on(
    "click",
    function() {
        $("#orderNumber").val("1");
    });

//新增訂單欄位方法 新版
var idN = 1;
var orderCollect = []; //收集訂單頁暫存
var showPriceSum; //價錢合計暫存器
function initializeOrderCollect() {
    orderCollect[0] = [null, null, 0, 0]; //[0]位置保留做資料處理緩衝區域
};
initializeOrderCollect(); //第一次初始化OrderCollect   
function newOrderItem(menuDataOrder, menuDataIndex, orderNumber) {
    initializeOrderCollect();
    var price = (menuDataGrop[menuDataOrder][menuDataIndex].price); //每樣單價
    var priceSum = (price * orderNumber); //每樣單價*數量小計

    var $h3 = $("<h3>"); //new Control
    $h3.text(menuDataGrop[menuDataOrder][menuDataIndex].name + price + "元 x " + orderNumber); //Set property

    var $div1 = $("<div>"); //摺疊區切成三欄
    $div1.addClass("ui-grid-b");

    var $div2 = $("<div>");
    $div2.addClass("ui-block-a");

    var $p1 = $("<p>"); //new Control
    $p1.text("數量:" + orderNumber + "份"); //Set property
    var $p2 = $("<p>"); //new Control
    $p2.text("小計:" + priceSum + " 元"); //Set property

    $div2.append($p1);
    $div2.append($p2);

    var $div3 = $("<div>");
    $div3.addClass("ui-block-b");

    var $div4 = $("<div>");
    $div4.addClass("ui-block-c");

    var $btn = $("<button>"); //new Control (delete button)
    $btn.addClass("btnDelete ui-btn ui-corner-all ui-shadow ui-icon-delete ui-btn-icon-left ui-mini");
    $btn.attr("id", "set" + idN);
    $btn.text("刪除訂單");
    $div4.append($btn); //add to parent
    $div1.append($div2); //add to parent
    $div1.append($div3); //add to parent
    $div1.append($div4); //add to parent

    var $div5 = $("<div>"); //new Control
    $div5.attr("data-role", "collapsible"); //Set property
    $div5.attr("id", "set" + idN); //Set id
    // $div5.attr("data-collapsed", "false"); // collapsible expand
    $div5.attr("data-iconpos", "right"); //icon right
    $div5.attr("data-collapsed-icon", "carat-d"); //icon right
    $div5.attr("data-expanded-icon", "carat-u"); //icon right
    $div5.attr("data-theme", "b"); //set color
    $div5.addClass('orderList');
    $div5.append($h3); //add to parent
    $div5.append($div1); //add to parent
    $div5.collapsible(); //set collapsible

    $("#set0").after($div5); //add new collapsible after set0

    //存放訂單數字資料到暫存區&訂單計數
    orderCollect[idN] = [menuDataOrder, menuDataIndex, orderNumber, priceSum];
    idN++;

    showPriceSum = 0 //重新計算總價
    for (var k = 1; k < orderCollect.length; k++) {
        showPriceSum += orderCollect[k][3];
    }
    $("#showPriceSum").text("合計金額: " + showPriceSum + "元");
};


//綁定訂單頁所有按鈕都有刪除所屬表單功能(id "orderContent" 標籤內所有<button>)
$("#orderContent").delegate("button", "click", function() {
    var whichOrder = $(this).prop('id'); //取得按下刪除鍵時該訂單id
    showPriceSum -= orderCollect[whichOrder.substr(3)][3]; //[whichOrder.substr(3)] 由訂單id欄解析出單號,並減去對應金額
    orderCollect[whichOrder.substr(3)] = [null, null, 0, 0]; //清除訂單數字資料暫存區對應值
    $(this).closest('.orderList').remove(); //移除該表單
    $("#showPriceSum").text("合計金額: " + showPriceSum + "元"); //更新總計數字
});

//刪除全部訂單方法
function deleteOrder() {
    $("#orderContent").children('.orderList').remove(); //取得orderContent以下所有.orderList obj
    showPriceSum = 0; //清除總計金額值
    $("#showPriceSum").text("合計金額: " + showPriceSum + "元"); //更新總計數字
    idN = 1 //還原idN 訂單編號起始值為1
    orderCollect.length = 0; //將訂單暫存矩陣歸0
    console.log("clear all order and showPriceSum array");
    initializeOrderCollect();
    $("#showPriceSum").text("訂單已清除");
}
$("#btnClearOrder").click(function() {
    $("#set0 h3").text("您點選的訂單如下:").hide("fast").show("slow");
    deleteOrder();
}); //點下刪除按鈕訂單

//檢視陣列元素方法
function viewOrder(item, index) {
    console.log("index:[" + index + "]:" + item);
};

//排序訂單收集陣列
function sortArray() {
    orderCollect.sort();
};

var bill = new Array(); //帳單資料暫存陣列
//合併陣列方法 (ok)
var n;
var m;

function mergeOrder() {
    bill.length = 0;
    bill.push(orderCollect[0]);
    n = 0;
    for (m = 1; m < orderCollect.length; m++) {
        if (bill[n][0] === orderCollect[m][0] && bill[n][1] === orderCollect[m][1]) {
            bill[n][2] += orderCollect[m][2];
            bill[n][3] += orderCollect[m][3];
        } else {
            bill.push(orderCollect[m]);
            n++;
        }
    }
};

//合併訂單陣列方法 將資料整理後倒回orderCollect
function reBulidOrder() {
    deleteOrder();
    orderCollect[0] = [null, null, 0, 0];
    for (n = 1; n < bill.length; n++) {
        orderCollect[n] = bill[n];
    }
};

// 合併陣列後輸出至螢幕做更新,顯示結帳資料
$("#btnConfirmOrder").click(function() {
    sortArray();
    mergeOrder();
    reBulidOrder();
    for (var o = 1; o < orderCollect.length; o++) {
        var menuDataOrderB = orderCollect[o][0];
        var menuDataIndexB = orderCollect[o][1];
        var orderNumberB = orderCollect[o][2];
        newOrderItem(menuDataOrderB, menuDataIndexB, orderNumberB);
    }
    $("#set0 h3").text("您的訂單整理如下:").hide("fast").show("slow");
    console.log("refresh Order list OK!");
});

//帳單建立方法
var billNumber;
var billCount = 0;
var billSum; //保留帳單總計價錢
function buildBillList() {
    billCount++;
    billSum = showPriceSum;
    var $listB = $("<ul>") //new Control
    $listB.attr("data-role", "listview"); //Set property
    $listB.attr("data-inset", "true"); //Set property
    $listB.attr("data-theme", "b");
    //test attr & class :
    // $listB.attr("data-shadow", "true"); //Set property
    // $listB.addClass("ui-listview ui-listview-inset ui-crner-all ui-shadow");

    var $collB = $("<li>"); //new Control
    $collB.attr("data-role", "collapsible"); //Set property
    $collB.attr("data-iconpos", "right"); //Set property
    $collB.attr("data-collapsed-icon", "carat-d"); //Set property
    $collB.attr("data-expanded-icon", "carat-u"); //Set property
    // $collB.attr("data-inset", "false"); //Set property
    // $collB.attr("data-collapsed", "false"); //Set property
    $collB.attr("data-theme", "b");
    $collB.addClass("outerBorder");
    var $h3B = $("<h3>");
    $h3B.addClass('class1');
    var $s01B = $("<span>");
    var $s02B = $("<span>");
    $s01B.attr("id", "billTextA" + billCount);
    $s02B.attr("id", "billTextB" + billCount);
    $s01B.text("訂單更新中");
    $s02B.text(" 合計:" + billSum + "元 待付款...");
    $h3B.append($s01B);
    $h3B.append($s02B);
    $collB.append($h3B); //add to parent

    var $olB = $("<ol>");
    $olB.attr("data-role", "listview");
    $olB.addClass("ui-listview");

    var nameB;
    var priceB;
    var amount;
    var priceSumB;
    for (var p = 1; p < bill.length; p++) {
        nameB = ((menuDataGrop[(bill[p][0])][(bill[p][1])]).name)
        priceB = ((menuDataGrop[(bill[p][0])][(bill[p][1])]).price); //每樣單價
        amount = bill[p][2]; //每樣數量
        priceSumB = bill[p][3]; //每樣小計
        var $liB = $("<li>");
        $liB.attr("data-theme", "a");
        var $s1B = $("<span>");
        $s1B.text(nameB + ":");
        $liB.append($s1B);
        var $brB = $("<br>");
        $liB.append($brB);
        var $s2B = $("<span>");
        $s2B.text("單價:" + priceB + "元 x" + amount + "份 小計:" + priceSumB + "元");
        $liB.append($s2B);
        var $spanB = $("<span>"); //new Control
        $spanB.addClass("ui-li-count"); //set Count Bubbles
        $spanB.text("等待中");
        $liB.append($spanB);
        $olB.append($liB);
    }
    $olB.listview();
    $collB.append($olB);
    $collB.collapsible();
    $listB.append($collB);
    $listB.listview();
    $("#billArea").append($listB);
    $(".outerBorder").addClass('class1');

};

//JSON物件處理方法
var billJsonObj;
var billJsonString;

function arrayJSONformat() {
    bill[0][3] = billNumber; //轉換前寫入訂單流水號寫入bill陣列存放
    billJsonObj = [{
        finalbillNumber: bill[0][0],
        billSum: bill[0][1],
        confirmBillTime: bill[0][2],
        sortNumber: bill[0][3]
    }];
    for (var q = 1; q < bill.length; q++) {
        billJsonObj[q] = {
            menuDataOrder: bill[q][0],
            menuDataIndex: bill[q][1],
            orderNumber: bill[q][2],
            priceSum: bill[q][3]
        };
    }
    // 欄位順序對照[menuDataOrder, menuDataIndex, orderNumber, priceSum]
    billJsonString = JSON.stringify(billJsonObj); //轉成JSON字串
    console.log("JSON data:");
    console.log(billJsonString);
};

//c9.io server post
var serverUrl = "https://bubee-lab-bubee0515.c9users.io/";
var url;

function getSortNumber() {
    url = serverUrl + "ask";
    $.get(url, function(data) {
        billNumber = data;
        console.log("billNumber:" + billNumber);
        $("#billTextA" + billCount).text("訂單號:" + data + " 號");
        console.log("訂單號:" + data);
        $("#workStatus").text("訂單號已更新,請依訂單號付款");
    });
};

function postBillData() {
    console.log("post start");
    $("#workStatus").text("訂單送出，請等待訂單號進行付款");
    url = serverUrl + "check";
    $.post(url, billJsonString,
        function(data, status) {
            billJsonObj[0].finalbillNumber = data;
            localStorage.setItem((billCount - 1), JSON.stringify(billJsonObj));
            console.log("billJsonString save into localStorage");
            $("#billTextA" + billCount).text("取餐號:" + data + " 號");
            $("#billTextB" + billCount).text("  合計:" + billSum + "元");
            console.log("取餐號:" + data);
            console.log(status);
            $("#workStatus").text("確認付款，取餐號更新 ");
        });
};

$("#btnClearBill").click(function() {
    $("#billArea").children(".ui-listview").remove();
    localStorage.clear();
    console.log("cleared workPage billArea & localStorage!!");
    $("#workStatus").text("歷史帳單已清除");
});


$("#btnCheckPay").click(function() {
    if (orderCollect[1] == null) {
        console.log("無訂單資料:執行return");
        $("#workStatus").text("無訂單資料");
        return;
    }
    // billNumber = "更新中";
    getSortNumber(); //get訂單流水號
    console.log("get訂單流水號");
    $("#workStatus").text("正在取得訂單號...");
    bill[0][1] = showPriceSum; //訂單總價寫入bill陣列存放
    var d = new Date(); //紀錄建立訂單時間
    var billBuildTime = d.getTime();
    bill[0][2] = billBuildTime; //訂單時間寫入bill陣列存放
    buildBillList();
    // $(".outerBorder").trigger( "expand" );
    console.log("buildBillList done");
    delayPost(); //JSON字串post至伺服器,並取回帳單號
    console.log("delay Post 15s");
    deleteOrder();
    console.log("deleteOrder done");
});

$("#btnCancelPay").click(function() {
    $("#set0 h3").text("您點選的訂單如下:").hide("fast").show("slow");
});

//刻意delay post 時間15s 因為還沒設定非同步判斷機制
function delayPost() {
    setTimeout("arrayJSONformat()", 5000); //delay 5s進行JSON字串轉換
    setTimeout("postBillData()", 10000); // delay 10秒 JSON字串post至伺服器,並取回帳單號
};

$("#readLS").click(function() { recoverBill(); });

var billTemp = [];

function recoverBill() {
    var s = 0;
    while (s < localStorage.length) {
        // console.log(localStorage[s]);
        billTemp = JSON.parse(localStorage[s]);
        // console.log(Number(billTemp[0].finalbillNumber));
        // console.log(billTemp[0].billSum);
        // console.log(billTemp[0].confirmBillTime);
        // console.log(Number(billTemp[0]. sortNumber));
        s++;
        reverseJSONformat(billTemp);
        buildBillList();
        $("#billTextA" + billCount).text("取餐號:" + billTemp[0].finalbillNumber + " 號");
        $("#billTextB" + billCount).text("  合計:" + billTemp[0].billSum + "元");
    }
    // $(".outerBorder").trigger( "collapse" );
};

function reverseJSONformat(billTemp) {
    bill.length = 0
    bill[0] = [billTemp[0].finalbillNumbers, billTemp[0].billSum, billTemp[0].confirmBillTime, billTemp[0].sortNumber];
    for (var q = 0; q < billTemp.length; q++) {
        bill[q] = [billTemp[q].menuDataOrder, billTemp[q].menuDataIndex, billTemp[q].orderNumber, billTemp[q].priceSum];
    };

};
