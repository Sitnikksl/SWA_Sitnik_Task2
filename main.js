let data; //объявляем переменную, в которую потом передадим JSON
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
}