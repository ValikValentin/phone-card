window.onload = function(){
	// Buttons
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	// Form Fields
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	var email = document.getElementById('email');
	// Divs etc.
	var addBookDiv = document.querySelector('.addbook');

	quickAddBtn.addEventListener("click", function(){
		// display the form div
		quickAddFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", removeEntry);

	// Storage Array
	var addressBook = [];

	//localStorage['addbook'] = '[{"fullname":"Sachin B","email":"sachin@frameboxx.in","phone":"93828292","address":"something","city":"Chandigarh"}]';

	function jsonStructure(fullname,phone,email){
		this.fullname = fullname;
		this.phone = phone;
		this.email = email;
	}

	function addToBook(){
		var isNull = fullname.value!='' && phone.value!='' && email.value!='';
		if(isNull){
			// format the input into a valid JSON structure
			var obj = new jsonStructure(fullname.value,phone.value,email.value);
			addressBook.push(obj);
			localStorage['addbook'] = JSON.stringify(addressBook);
			quickAddFormDiv.style.display = "none";
			clearForm();
			showAddressBook();
		}
	}



	function removeEntry(e){
		// Remove an entry from the addressbook
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBook = JSON.parse(localStorage['addbook']);
			// Loop over the array addressBook and insert into the page
			addBookDiv.innerHTML = '';
			for(var n in addressBook){
				var str = '<div class="entry">';
					str += '<div class="contact-info">';
					str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
					str += '<div class="info-phone">';
					str += '<span class="info">Tel:</span>';
					str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
					str += '</div>';
					str += '<div class="info-emeil">';
					str += '<span class="info">Email:</span>';
					str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
					str += '</div>';
					str += '</div>';
					str += '<div class="button-setting right">';
					str += '<div class="edit"><a href="#" class="editbutton" data-id="' + n + '">Edit</a></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Del</a></div>';
					str += '</div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	showAddressBook();

}

var lastResFind=""; // последний удачный результат
var copy_page=""; // копия страницы в ихсодном виде
function TrimStr(s) {
     s = s.replace( /^\s+/g, '');
  return s.replace( /\s+$/g, '');
}
function FindOnPage(inputId) {//ищет текст на странице, в параметр передается ID поля для ввода
  var obj = window.document.getElementById(inputId);
  var textToFind;
 
  if (obj) {
    textToFind = TrimStr(obj.value);//обрезаем пробелы
  } else {
    alert("No result");
    return;
  }
  if (textToFind == "") {
    alert("you did not take anything away");
    return;
  }
  
  if(document.body.innerHTML.indexOf(textToFind)=="-1")
  alert("Nothing was found, check the correctness of the input!");
  
  if(copy_page.length>0)
        document.body.innerHTML=copy_page;
  else copy_page=document.body.innerHTML;

  
  document.body.innerHTML = document.body.innerHTML.replace(eval("/name="+lastResFind+"/gi")," ");//стираем предыдущие якори для скрола
  document.body.innerHTML = document.body.innerHTML.replace(eval("/"+textToFind+"/gi"),"<a name="+textToFind+" style='background:red'>"+textToFind+"</a>"); //Заменяем найденный текст ссылками с якорем;
  lastResFind=textToFind; // сохраняем фразу для поиска, чтобы в дальнейшем по ней стереть все ссылки
  window.location = '#'+textToFind;//перемещаем скрол к последнему найденному совпадению
 }

