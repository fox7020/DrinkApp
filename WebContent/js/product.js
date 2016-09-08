var titleArray = [
    { "title": "原味茶系列    M  /  L" },
    { "title": "鮮奶茶系列    M  /  L" },
    { "title": "拿鐵系列      M  /  L" },
    { "title": "美味抹茶系列  M  /  L" },
    { "title": "100%鮮果系列  M  /  L" }
];

var menuData0 = [
    { "name": "錫蘭紅茶", "price_large": 35, "price_medium": 30, "unit": "" },
    { "name": "四季春茶", "price_large": 30, "price_medium": 25, "unit": "" },
    { "name": "黃金麥茶", "price_large": 30, "price_medium": 25, "unit": "" },
    { "name": "茉莉綠茶", "price_large": 30, "price_medium": 25, "unit": "" },
    { "name": "阿里山冰茶", "price_large": 30, "price_medium": 25, "unit": "" },
    { "name": "凍頂烏龍", "price_large": 30, "price_medium": 25, "unit": "" }

];

var menuData1 = [
    { "name": "鮮奶茶", "price_large": 40, "price_medium": 35, "unit": "" },
    { "name": "伯爵鮮奶茶", "price_large": 35, "price_medium": 30, "unit": "" },
    { "name": "鮮奶綠", "price_large": 40, "price_medium": 35, "unit": "" },
    { "name": "珍珠鮮奶茶", "price_large": 40, "price_medium": 35, "unit": "" },
    { "name": "布丁鮮奶茶", "price_large": 45, "price_medium": 40, "unit": "" },
    { "name": "焦糖鮮奶茶", "price_large": 50, "price_medium": 45, "unit": "" }
];

var menuData2 = [
    { "name": "紅茶拿鐵", "price_large": 50, "price_medium": 45, "unit": "" },
    { "name": "冬瓜拿鐵", "price_large": 50, "price_medium": 45, "unit": "" },
    { "name": "玄米拿鐵", "price_large": 50, "price_medium": 45, "unit": "" },
    { "name": "焙茶拿鐵", "price_large": 50, "price_medium": 45, "unit": "" },
    { "name": "香草拿鐵", "price_large": 50, "price_medium": 45, "unit": "" },
    { "name": "焦糖拿鐵", "price_large": 50, "price_medium": 45, "unit": "" }
];

var menuData3 = [
    { "name": "抹茶拿鐵", "price_large": 55, "price_medium": 50, "unit": "" },
    { "name": "京都抹茶", "price_large": 55, "price_medium": 50, "unit": "" },
    { "name": "抹茶紅豆", "price_large": 60, "price_medium": 55, "unit": "" },
    { "name": "宇治抹茶", "price_large": 60, "price_medium": 55, "unit": "" },
    { "name": "宙治抹茶", "price_large": 60, "price_medium": 55, "unit": "" },
    { "name": "抹茶可可", "price_large": 50, "price_medium": 45, "unit": "" }
];
var menuData4 = [
    { "name": "新鮮水果茶 ", "price_large": 55, "price_medium": 50, "unit": "" },
    { "name": "柚子鮮茶 ", "price_large": 55, "price_medium": 50, "unit": "" },
    { "name": "葡萄柚綠 ", "price_large": 55, "price_medium": 50, "unit": "" },
    { "name": "凍頂檸檬 ", "price_large": 50, "price_medium": 45, "unit": "" },
    { "name": "百香果綠 ", "price_large": 50, "price_medium": 45, "unit": "" },
    { "name": "奇異果多多 ", "price_large": 50, "price_medium": 45, "unit": "" },
];

var menuDataGrop = [menuData0, menuData1, menuData2, menuData3, menuData4];


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
                menuDataGrop[i][j].price_large,
                menuDataGrop[i][j].price_medium,
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
function createLisView(menuDataName, menuDataLargePrice, menuDataMediumPrice, menuDataUnit, i, j) {
    var $list = $("<li>"); //new Control
    var $a1 = $("<a>"); //new Control
    $a1.text(menuDataName + " " + menuDataUnit);
    var $span = $("<span>"); //new Control
    $span.addClass('ui-li-count'); //set Count Bubbles 
    $span.text(menuDataLargePrice);
    $a1.append($span);

    var $span2 = $("<span>"); //new Control
    $span2.addClass('ui-li-count count-third'); //set Count Bubbles 
    $span2.text(menuDataMediumPrice);
    $a1.append($span2);

    var $spell = $("<span>");
    $spell.addClass('ui-li-aside count-second');
    $spell.text("/");
    $a1.append($spell);

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
    $a2.attr("id", "menu_selector" + iIndex + "_" + jIndex); //Set id record menudata index and order
    $a2.attr("href", "#addPopup"); //Set for Popup
    $a2.attr("data-rel", "popup"); //Set for Popup
    $a2.attr("data-transition", "slide"); //Set for Popup
    $a2.addClass("addOrder"); //Set for check active
    $list.append($a1); //add to parent
    $list.append($a2); //add to parent
    $("#searchMenu").append($list);
    menuListView++;
    // console.log($a1.html());
    // console.log($a2.attr("id"));
};


//產生菜單
sortDivider(titleArray, menuDataGrop);


//popup選單資訊
var poptitle = [
    {"name":"容量", "code":"capacity"},
    {"name":"甜度", "code":"sugar"},
    {"name":"冰塊", "code":"ice"}
];

var popCapacity = [
    {"name":"大杯", "code":"large"},
    {"name":"中杯", "code":"medium"}
];
var popSugar = [
    {"name":"正常", "code":"normal"},
    {"name":"少糖", "code":"less"},
    {"name":"半糖", "code":"half"},
    {"name":"微糖", "code":"micro"},
    {"name":"無糖", "code":"without"},
];
var popIce = [
    {"name":"正常", "code":"normal"},
    {"name":"少冰", "code":"less"},
    {"name":"去冰", "code":"without"},
    {"name":"常溫", "code":"room"},
    {"name":"溫", "code":"hot"},
];
var popCondition = [popCapacity, popSugar, popIce];

function createControlGroup(poptitle,popCondition){
    var $div = $("<div>");
    // console.log($div);
    $div.attr("data-role","controlgroup");
    $div.attr("data-type","horizontal");
    $div.attr("id","group_" + poptitle.code);
    $div.append("<p>" + poptitle.name + "</p>");
    for(var i = 0; i < popCondition.length;i++){
        var pop = createPopCondition (poptitle,popCondition[i]);
        $div.append(pop[0]).append(pop[1]);
    }
    // console.log($div.html());
    $("#popCondition").append($div);
}

function createPopCondition (poptitle,popCondition) {
     var $input = $("<input>");
     $input.attr("type", "radio");
     $input.attr("name", "radio-choice-"+ poptitle.code);
     $input.attr("id", $input.attr("name")+"-"+ popCondition.code);
     $input.attr("value", "on");
     $input.addClass("conditionSelector");
     var $label = $("<label>");
     $label.attr("for", $input.attr("id"));
     $label.text(popCondition.name);
     // console.log($input);
     var div = [$input,$label]
     return div;
}
function setPopCondition (poptitle,popCondition) {
     for(var i = 0; i < poptitle.length;i++){
        createControlGroup(poptitle[i],popCondition[i]);
     }
}
setPopCondition(poptitle,popCondition);


//popup結束後將表單初始化
$( "#addPopup" ).on( "popupafterclose", function( event, ui ) {
    $("#popCondition input").removeAttr("checked");
    $("#popCondition input").checkboxradio("refresh");//要refresh才有效果
    $("#orderNumber").val(1);
    // console.log($("#group_capacity input"));
});


$("#joinOrder").click(function () {
    var label_capacity = $('label[for="'+$("#group_capacity input:checked").attr('id')+'"]');
    var label_suger = $('label[for="'+$("#group_sugar input:checked").attr('id')+'"]');
    var label_ice = $('label[for="'+$("#group_ice input:checked").attr('id')+'"]');
    // console.log('容量 : ' + label_capacity.text() + ', 甜度 : ' + label_suger.text() + ', 冰塊 : ' + label_ice.text());    
    // console.log(re.test($("#orderNumber").val()));
    //檢查數量欄位
    var re = /^[1-9]\d*/;
    $("#joinOrder").attr("data-rel","back");
    if(!re.test($("#orderNumber").val())){
        console.log('請輸入正確的數量');
        $("#joinOrder").removeAttr("data-rel");
    }
    var labels = [
        {"name" : "容量", "value" :  label_capacity.text()},
        {"name" : "甜度", "value" :  label_suger.text()},
        {"name" : "冰塊", "value" :  label_ice.text()}
    ];
    var isCorrect = true;
    for(var i = 0; i < labels.length; i++){
        if(labels[i].value == ""){
            console.log('請選擇' + labels[i].name);
            $("#joinOrder").removeAttr("data-rel");
            isCorrect = false;
        }
    }
    if(isCorrect){
        //送出資料
    }
});
//取得所選的產品名稱
function getSelectItem () {
      
}
