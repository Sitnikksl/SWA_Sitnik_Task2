$('#lool').mask("+7 (999) 999-99-99");
let data; //объявляем переменную, в которую потом передадим JSON
let objCount = 0; // счетчик объектов
function getFile (fileName) {
    var request = new XMLHttpRequest(); //создаем запрос
    request.open('GET', fileName); //описываем что делаем GET или POST и в дальнейшем сюда будем подавать путь до файла
    request.onloadend = function() {
        parse(request.responseText);// возвращает текст ответа от сервера на отправленный запрос
    }
    request.send();
}
let jFile = 'JSON/interview.js';
let singinBtn = document.querySelector('.signin');
singinBtn.onclick = function(){
    jFile = 'JSON/signin.js';
    
}
getFile(jFile);//в функцию подаем путь к файлу



function parse(obj) {
    data = JSON.parse(obj);
    console.log(data);
    
    let temp = document.createElement('form');// записали в переменную temp создание нового элемента
    temp.setAttribute('name', data.name);// установили атрибут форме
    temp.className = 'main-form';// установили класс для формы
    $('.hero').append(temp); // вставляем temp в секцию .hero

    let parseDataFields = function(){
        for(let key in data.fields){ //перебираем data.fields
            if(typeof(data.fields[key]) == 'object'){ // если внутри еще есть объекты, то
                let value = data.fields[key]; // создаем переменную, в которой запоминаем текущее значение
                let tempTag = Object.keys(data.fields[key]); // создаем переменную, в которой будут храниться ключи без значений
                for (let j in tempTag){ // проходимся по этой переменной
                    let tempTagName = tempTag[j]; // во временную переменную присваеваем один элемент массива, который должен являться названием тэга
                    let createTag = document.createElement(tempTagName); // создаем элемент 
                    $('.main-form').append(createTag); // вставляем новый элемент в <form>
                    if(tempTagName == 'label'){
                        let prop = value.label; // хранится значение текущего ключа
                        createTag.innerHTML = prop; // вставляем значенеие в HTML разметку
                    }else if (tempTagName == 'input'){
                        let temp = value.input; // записали во временную переменню объект input
                        for (z in temp){
                            if(z == 'colors'){
                                let createData = document.createElement('datalist');
                                createTag.className = 'color-input';
                                createTag.setAttribute('list', 'datalist-colors');
                                createTag.append(createData);
                                createData.id = 'datalist-colors';
                                createTag.setAttribute('value', temp.colors[0]);
                                for(i in temp.colors){
                                    let createOption = document.createElement('option');
                                    $('#datalist-colors').append(createOption);
                                    createOption.innerHTML = temp.colors[i];
                                }
                            }else if(z == 'checked'){
                                if(temp[z] == 'true'){
                                    createTag.setAttribute('checked', temp[z]);
                                }
                            }else if(z == 'mask'){
                                createTag.setAttribute('data-mask', temp[z]);
                                let createMaskedTag = $(createTag);
                                createTag.setAttribute('type', 'phone');
                                createMaskedTag.mask(temp[z]);
                            }else if(z == 'technologies'){
                                let createData = document.createElement('datalist');
                                createTag.append(createData);
                                createData.id = 'techs';
                                createTag.setAttribute('list', 'techs');
                                let tecArr = temp[z];
                                    for(q in tecArr){
                                        createOption = document.createElement('option');
                                        createData.append(createOption);
                                        createOption.className = 'tec';
                                        createOption.innerHTML = tecArr[q];
                                    }
                                    
                            }else if(z == 'filetype'){
                                let fileTypeArr = temp[z];
                                let aceptedFile = '';
                                let lastIndex = fileTypeArr.length-1;
                                for (y in fileTypeArr){
                                    aceptedFile+='image/'+ fileTypeArr[y];
                                    if(y !=lastIndex){
                                        aceptedFile += ', ';
                                    }
                                    createTag.setAttribute('accept', aceptedFile); 
                                } 
                            }
                            else{
                                createTag.setAttribute(z, temp[z]);
                            }
                        }
                    }
                }
            }
        }
    }
    parseDataFields();

    let parseDataReferences = function(){
        for(let key in data.references){ // перебираем references
            if(typeof(data.references[key]) == 'object'){
                console.log('Что сейчас хранится в референсес: ',data.references[key]); // просто чек
                let value = data.references[key]; // создаем переменную в которой хранится значение
                for (let j in value){ // перебираем 
                    let tempValue = value[j];
                    let createRef = document.createElement('a'),
                        createText = document.createElement('p');
                    if(j == 'input'){
                        let createInput = document.createElement(j);
                        for(x in tempValue){
                            if(x == 'checked'){
                                if(tempValue[x] == 'true'){
                                    createInput.setAttribute(x, tempValue);
                                }
                            }else{
                                createInput.setAttribute(x, tempValue[x]);
                            }
                            
                        }
                        $('.main-form').append(createInput);
                    }else if(j == 'text without ref'){
                        $('.main-form').append(createText);
                        createText.className = 'text-without';
                        createText.innerHTML = tempValue;
                    } else if(j == 'text'){ // если поле со значением ТЕКСТ, то создаем ссылку
                        $('.main-form').append(createRef);
                        createRef.className = "main-form__link";
                        createRef.innerHTML = tempValue;
                    }
                    else if(j == 'ref'){ // если там 'ref', то добавляем атриьбут
                        let container = document.getElementsByClassName('main-form__link');
                        if(container.length==1){
                            for (i in container){
                                container[i].href = tempValue;
                            }
                        }else{
                            container[key].href = tempValue;
                        }
                    }
                }
            }
        }
    }
    parseDataReferences();

    let parseDataButtons = function(){
        for(let key in data.buttons){ // перебираем buttons
            if(typeof(data.buttons[key]) == 'object'){ 
                let value = data.buttons[key];
                for (let j in value){
                    let tempKey = value[j], //создаем переменную, в которой хранится значение
                        createTag = document.createElement('button'); // создаем кнопку
                    $('.main-form').append(createTag); // вставляем эту кнопку
                    createTag.className = 'btn'; // даем ей класс
                    createTag.innerHTML = tempKey; //вставляем текст, который ранее сохранили в переменную
                }
            }
        }
    }
    parseDataButtons();
}
