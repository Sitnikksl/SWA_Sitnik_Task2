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
getFile('JSON/signin.js'); //в функцию подаем путь к файлу
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
                    }else{
                        let temp = value.input; // записали во временную переменню объект input
                        for (z in temp){
                            createTag.setAttribute(z, temp[z]);
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
                    let createRef = document.createElement('a');
                    if(j == 'text'){ // если поле со значением ТЕКСТ, то создаем ссылку
                        $('.main-form').append(createRef);
                        createRef.className = "main-form__link";
                        createRef.innerHTML = tempValue;
                    }else{ // если там 'ref', то добавляем атриьбут
                        let container = document.getElementsByClassName('main-form__link');
                        container[key].href = tempValue;
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

