//-----------------------------------------------------
// Создайте массив tags с именами валидных тегов HTML5
// Теперь создайте массив classes с именами классов
// ( число элементов в массиве classes должно быть не меньше, чем число элементов массива tags )
// Создайте элемент style и вставьте его в head документа
// Добавьте контент элемента style с описанием классов, имена которых находятся в массиве classes
// Итерируйте массив tags, создавая соответствующие элементы и вставляя их на страницу, добавляя 
// каждому элементу класс из массива classes
//-----------------------------------------------------

//Вариант 1
var arrTags = ["section","header","img","div","h1"]
var classes = [
`.section {
     max-width: 800px;
     margin: 60px auto;
     font-family: sans-serif;
}`,
`.header {
     width: 100%;
     background-color: grey;
}`,
`.img {
     max-width: 100%;
}`,
`.div {
     width: 200px;
     height: 200px;
     border: solid 1px blue;
}`,
`.h1 {
     display: block;
     text-align: center;
     margin: 0;
}`
]
var style = document.createElement( 'style' )
document.head.appendChild( style )
for (var item of classes){
    style.appendChild( 
        document.createTextNode ( item )               
    )
}
var body = document.body
for (var item of arrTags){
    var nodeItem = document.createElement( item )
    body.appendChild( nodeItem )
    nodeItem.setAttribute("class", item)              
    
}

//Вариант 2
var style = document.createElement( 'style' )
document.head.appendChild( style )
// так как массивы имеют одинаковую длину, а связанные элементы этих массивов 
// имеют одинаковые индексы, то можем сделать один цикл
for ( var numItem in arrTags ){
    style.appendChild( document.createTextNode ( classes[numItem] ) )
    var nodeItem = document.createElement( arrTags[numItem] )
    document.body.appendChild( nodeItem )
    nodeItem.setAttribute("class", arrTags[numItem])       
}


//-----------------------------------------------------
// Результат должен быть аналогичен тому, что получится в предыдущем упражнении
// Однако исходный массив tags должен быть массивом объектов, каждый из которых
// содержит не только имя тега элемента, но и его атрибуты, а так же хотя бы один 
// обработчик события. Таким образом, массив classes нам уже не нужен, но кроме 
// стилизации элементов нужно еще добавить их контент, используя как атрибуты тегов, 
// так и свойства элементов DOM
//-----------------------------------------------------

var arrTags = [
{   tag: 'section',
    class: `.section {
     max-width: 800px;
     margin: 60px auto;
     font-family: sans-serif;
    }`  
},
{   tag: 'header',
    class: `.header {
     width: 100%;
     background-color: grey;
    }` 
},
{   tag: 'img',
    class: `.img {
     width: 200px;
     background-color: #00;
     position: absolute;
     margine: 100px 40px;

    }`,
    src: 'http://pluspng.com/img-png/logo-javascript-png-free-vector-logo-javascript-300.png',
    alt : 'logo',
    onclick : 'myClick()',
    id : 'image'
    
},
{   tag: 'div',
    class: `.div {
     width: 0px;
     height: 0px;
    }` 
},
{   tag: 'h1',
    class: `.h1 {
     display: block;
     text-align: left;
     margin: 0px 30px;
     position: absolute;
     display: block;
     top: 300px;
    }`,
    text: 'touch me!'
}]


var head = document.head
var body = document.body

// чистим страничку перед запуском
// var len = head.childNodes.length
// while (len > 0)   head.removeChild(head.childNodes[--len])  
// var len = body.childNodes.length
// while (len > 0) body.removeChild(body.childNodes[--len])
while (head.firstChild) head.removeChild(head.firstChild)
while (body.firstChild) body.removeChild(body.firstChild)

var style = document.createElement( 'style' )
head.appendChild( style )
for ( var item of arrTags ){
    for ( var prop in item){
//          console.log(`${prop}: ${item[prop]}`)     
        if (prop === 'tag'){   
            var nodeItem = document.createElement( item[prop] )     
            body.appendChild( nodeItem )
            nodeItem.setAttribute("class", item[prop]) 
            "text" in item 
                ? nodeItem.appendChild( document.createTextNode ( item["text"] ) )             
                    : null      
        } 
        else {  
            prop === 'class'
                ? style.appendChild( document.createTextNode ( item[prop] ) ) 
                    : prop !== 'text'
                        ? nodeItem.setAttribute(prop, item[prop])  
                            : null                                     
        }      
    }
}

var img = document.getElementById('image');
var num = '-'
function myClick(){
    num === '-' ? num = '+': num = '-'
    img.setAttribute('style',`transform:rotate(${num}360deg); transition-duration: 0.5s`);
    num === '-' 
      ? text["0"].innerText = '!!! EEEE BABY !!!' 
        : text["0"].innerText = '!!! O LA LA !!!'
}

var text = document.getElementsByClassName('h1')
img.onmouseover = img.onmouseout = myMouseOverOut;
function myMouseOverOut(event) {
  if (event.type == 'mouseover') {
    event.target.style.width = '210px'
    text["0"].innerText = 'YEAH!!!'
  }
  if (event.type == 'mouseout') {
    event.target.style.width = '200px'
    text["0"].innerText = 'touch me!'
  }
}
  
//-----------------------------------------------------
// Напилить код, который выбирает все элементы-потомки body ( :warning: кроме
// элементов script ) и добавляет им класc:
// .redBack {
//     background-color: red!important;
// }
// Альтернативный вариант - выбрать все заранее заданные элементы:
// var tags = [ "header", "footer", "main", "div", "p" ]
// Запустить код в консоли любой страницы
// Подсказка: используйте методы объекта classList
//-----------------------------------------------------

var classRedBack = `.redBack {
     background-color: red!important;
 }`
var style = document.createElement( 'style' )
document.head.appendChild( style )
style.appendChild( document.createTextNode ( classRedBack ) ) 

//Вариант 1
for (var item of document.body.getElementsByTagName ( '*' )  ) {
    item.localName !== "script" ? item.classList.add('redBack') : null       
}

//Вариант 2
var body = document.body
if (body.hasChildNodes()) {
  for (var i = 0; i < body.childNodes.length; ++i) {
      item = body.childNodes[i]
      'classList' in item 
        ? item.localName !== "script" 
          ? item.classList.add('redBack') 
          : null
        : null
  }
}
