const books=[]

function Book(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}
const addBookButton=document.querySelector('#addBook');
addBookButton.addEventListener('click',()=>{
    document.querySelector('dialog').classList.toggle('dialog');
    document.querySelector('.dialog').showModal();
})
const cancelButton=document.querySelector('#cancel');
cancelButton.addEventListener('click',()=>{
    document.querySelector('.dialog').close();
    document.querySelector('dialog').classList.toggle('dialog');
})
const addbutton=document.querySelector('#add');
addbutton.addEventListener('click',()=>
{
    AddBook();
})

function AddBook(){
    let title=document.querySelector('#title').value;
    let author=document.querySelector('#author').value;
    let pages=document.querySelector('#pages').value;
    let read=document.querySelector('#read').value;
    let book=new Book(title,author,pages,read);
    books.push(book);
    showBook();
}
const tbody=document.querySelector('table tbody');
function showBook(){
    const tr=document.createElement('tr');
    tr.setAttribute('data',`${books.length}`);
    const deleteButton=createDeleteButton();
    const readButton=createReadButton(books[books.length-1].read);
    let tds=[]
    for (let i = 0; i < 5; i++) {
        const td=document.createElement('td');
        tds.push(td);
        tr.appendChild(td);
    }
    tds[0].textContent=books[books.length-1].title;
    tds[1].textContent=books[books.length-1].author;
    tds[2].textContent=books[books.length-1].pages;
    tds[3].appendChild(readButton);
    tds[4].appendChild(deleteButton);
    tbody.appendChild(tr);
}
function createDeleteButton(){
    const deleteButton=document.createElement('button');
    deleteButton.className='button delete';
    deleteButton.setAttribute('data',`${books.length}`);
    deleteButton.textContent='Delete';
    deleteButton.addEventListener('click',()=>{
        deleteBook(deleteButton.getAttribute('data'));
    })
    return deleteButton;
}
function deleteBook(num){
    const tr=document.querySelector(`tbody tr:nth-child(${num})`);
    tr.remove();
    books.splice(num,1);
}
function toggleRead(button){
    if(button.textContent==='Yes'){
        button.textContent='No';
    }
    else{
        button.textContent='Yes';
    }
    books[button.getAttribute('data')-1].read=button.textContent;
}
function createReadButton(read){
    const readButton=document.createElement('button');
    readButton.className='button readButton';
    readButton.setAttribute('data',`${books.length}`);
    readButton.textContent=read;
    readButton.addEventListener('click',()=>{
        toggleRead(readButton);
    })
    return readButton;
}