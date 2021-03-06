let content = document.querySelector('.tbody');

let books = [
    {
        id: 1,
        name: 'Война и мир',
        authorsName: 'Лев Толстой',
        yearPublishing: '1867',
        editionNames: ' М. Н. Каткова',
        numberPages: 1225,
    },

    {
        id: 2,
        name: 'Война и мир-2',
        authorsName: 'Лев Толстой',
        yearPublishing: '1867',
        editionNames: ' М. Н. Каткова',
        numberPages: 1225,
    },

    {
        id: 3,
        name: 'Глотнуть воздуха',
        authorsName: 'Оруэлл Джордж',
        yearPublishing: '1949',
        editionNames: ' Издательство АСТ',
        numberPages: 328,
    },

    {
        id: 4,
        name: 'Глотнуть воздуха',
        authorsName: 'Оруэлл Джордж',
        yearPublishing: '1949',
        editionNames: ' Издательство АСТ',
        numberPages: 328,
    }
];



function render(temp) {
    content.insertAdjacentHTML('beforeend', temp);
}

function getTemplate(book,index) {
    return `
        <tr class="content">
            <td class="li-all id">${index +1}</td>
            <td  class="input-all id hidden"><input type="text"></td>
            <td class="li-all name">${book.name}</td>
            <td class="input-all name hidden"><input class="input-name" type="text"></td>
            <td class="li-all authorsName">${book.authorsName}</td>
            <td class="input-all authorsName hidden"><input type="text"></td>
            <td class="li-all yearPublishing">${book.yearPublishing}</td>
            <td  class="input-all yearPublishing hidden"><input type="number"></td>
            <td class="li-all editionNames">${book.editionNames}</td>
            <td  class="input-all editionNames hidden"><input type="text"></td>
            <td class="li-all numberPages">${book.numberPages}</td>
            <td class="input-all numberPages hidden"><input type="number"></td>
            <td class="button-common">
            <button class="remove">Удалить</button>
            <button class="edit">Редактировать</button>
            <button class="save">Сохранить</button>
        </td>
        </tr>
    `;
}

function getAddTemplate() {
    return `
    <tr class="content add-temlate">
        <td class="input-all id"></td>
        <td class="input-all name"><input type="text"></td>
        <td class="input-all authorsName"><input type="text"></td>
        <td class="input-all yearPublishing"><input type="number"></td>
        <td class="input-all editionNames"><input type="text"></td>
        <td class="input-all numberPages"><input type="number"></td>
        <td class="button-common">
            <button class="remove">Удалить</button>
            <button class="edit">Редактировать</button>
            <button class="save">Сохранить</button>
        </td>
    </tr>`;
}

function booksRender() {
    content.innerHTML = '';
    
	books.forEach((book,index) => {
        let temp = getTemplate(book,index);
        render(temp);
    });
}
booksRender();

content.addEventListener('click', remove);
content.addEventListener('click', edit);
content.addEventListener('click', save);


function remove(event) {
    if( !event.target.classList.contains('remove') ) return;

    let id = event.target.closest('.content').querySelector('.id').innerHTML;    
    let index = books.findIndex((book) => book.id === +id);    

    books.splice(index, 1);

    booksRender();
}

function edit(event) {
    if( !event.target.classList.contains('edit') ) return;

    let liAll = event.target.closest('.content').querySelectorAll('.li-all');
    let liInputAll = event.target.closest('.content').querySelectorAll('.input-all');

    liAll.forEach((li, index) => {
        li.classList.add('hidden');

        let li2 = liInputAll[index];
        li2.classList.remove('hidden');

        let input = li2.querySelector('input');
        input.value = li.innerHTML;
    });
}

function save(event) {
    if ( !event.target.classList.contains('save') ) return;

    let content = event.target.closest('.content');
    let id = +content.querySelector('.id').innerHTML;

    let book = {
        name: content.querySelector('.input-all.name input').value,
        authorsName: content.querySelector('.input-all.authorsName input').value,
        yearPublishing: content.querySelector('.input-all.yearPublishing input').value,
        editionNames: content.querySelector('.input-all.editionNames input').value,
        numberPages: content.querySelector('.input-all.numberPages input').value
    };

    if( book.name == '') {
        alert('Поле не может быть пустым');
        return;
    }

    // if ( !book.name.match(/^[а-я]{2,20}$/i) ) {
    //     alert('Только текст и не более 20 символов, только русское название');
    //     let reg = content.querySelector('.name input');
    //     reg.classList.add('reg');
    //     return;
    // }

    // if( book.authorsName == '' ) {
    //     alert('Поле не может быть пустым');
    //     return;
    // }

    // if( book.yearPublishing == '' ) {
    //     alert('Поле не может быть пустым');
    //     return;
    // }

    // if( book.editionNames == '' ) {
    //     alert('Поле не может быть пустым');
    //     return;
    // }

    // if( book.numberPages == '' ) {
    //     alert('Поле не может быть пустым');
    //     return;
    // }



    // if ( !book.authorsName.match(/^[а-я]{2,20}$/i)) {
    //     alert('Только текст и не более 20 символов, только русское название');
    //     let reg = content.querySelector('.input-all.authorsName input');
    //     re.classList.add('reg');
    //     return;
    // }

    // if ( !book.editionNames.match(/^[а-я]{2,20}$/i)) {
    //     alert('Только текст и не более 20 символов, только русское название');
    //     let reg = content.querySelector('.input-all.editionNames input');
    //     r.classList.add('reg');
    //     return;
    // }


    if ( content.classList.contains('add-temlate') ) {
        books.push(book);

    } else {
        let index = books.findIndex((book) => book.id === +id);
        books.splice(index, 1, book);
    }

    booksRender();
}

document.querySelector('.add').addEventListener('click', add);

function add() {
   let tmpl = getAddTemplate();
   render(tmpl);
}


let serch = document.querySelector('.serch');
serch.addEventListener('click', serchButton);

function serchButton() {
    let poisk = document.querySelector('.poisk').value;
    books = books.filter((item) => {
        if( item.name.toLowerCase().includes( poisk.toLowerCase() )) {
            return true;
        }
    });
    booksRender();
}


// Поиск по Enter
  document.querySelector('.poisk').onkeypress = function(event) {

    if(event.keyCode === 13) {
        let poisk = document.querySelector('.poisk').value;
        books = books.filter((item) => {
            if( item.name.toLowerCase().includes( poisk.toLowerCase() )) {
                return true;
            }
        });
    }
    booksRender();

};





