var readlineSync = require('readline-sync');
var fs = require('fs');
var friends=[];
function loadData(){
	var contentFile = fs.readFileSync('./data.json');
		friends  = JSON.parse(contentFile);
}
function showMenu(){
    console.log('---------------');
	console.log('1.Hiển thị danh sách liên hệ');
	console.log('2. Tạo danh sách mới');
    console.log('3. Sửa danh sách liên hệ');
    console.log('4. Tìm danh sách liên hệ');
    console.log('5. Lưu và thoát danh sách liên hệ');
    console.log('6. Xóa liên hệ');
    console.log('---------------');
	var option  =  readlineSync.question('Nhap lua chon:');
	switch (option) {
		case '1':
			showStudent();
			showMenu();
			break;
		case'2':
			CreatStudent();
			//console.log(students);
			showMenu();
            break;
        case '3':
            ShowEdit();
            showMenu();
            break;
        case '4':
            showSearch();
            showMenu();
            break;
		case'5':
		    SaveandExit();
            break;
        case'6':
            DeleteContact();
            showMenu();
            break;
		default:
			// statements_def
			console.log('Wrong option');
			showMenu();
			break;
	}
}
function showStudent(){
	for(var friend of friends){
		console.log(friend.name,friend.number);
	}
}
function CreatStudent () {
	var name = readlineSync.question('Name :');
	var number = readlineSync.question('Number: ');
	var friend = {
		'name': name,
		'number' : parseInt(number),
	};
	friends.push(friend);
}
function ShowEdit(){
    var name = readlineSync.question('Name Edit:');
    for(var contact of friends){
        if(contact.name === name){
            var EditNumber = readlineSync.question('new number:')
            contact.number = EditNumber;
            console.log('chọn lưu và thoát');
        }
    }
}
function showSearch(){
    var seachValue = readlineSync.question('Tim ten lien he:');
    return friends.filter(function(item){
        if(item.name.includes(seachValue)){
            console.log("Name:"+ item.name  , "\nNumber:"+item.number)
        }

        
        
    });
}

function SaveandExit(){
	var content = JSON.stringify(friends);
    fs.writeFileSync('./data.json',content,{encoding:'utf8'});
}
function DeleteContact(){
    var name = readlineSync.question('delete name:');
    var listNew = friends.filter(function(item){
        return item.name !== name;
    });
    friends = listNew;
    console.log('chọn lưu và thoát');
}
function main(){
	loadData();
	showMenu();
}

main();

