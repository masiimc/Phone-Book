const addBtn = document.querySelector('#add');
const _name = document.querySelector('#name');
const _number = document.querySelector('#no');

const nameError =  document.querySelector('.name-error');
const noError = document.querySelector('.no-error');

const _ul = document.querySelector('.list>ul');

document.addEventListener('DOMContentLoaded',function (){
  if(localStorage.getItem('concat') === null){ 
    contacts =[]
  }else{
    contacts = JSON.parse(localStorage.getItem('concat'))
  }

  contacts.forEach(val=>{
    let _li = document.createElement('li');
    _li.innerHTML = `   
      <div class="info">
        <div class="name"> ${val.name}</div>
        <div class="number">${val.no}</div>
      </div>
      <div class="icon-container">
        <span onclick='_close(this)' ><i class="bi bi-trash"></i></span>
      </div>`;
    _ul.appendChild(_li);
  })
});


addBtn.addEventListener('click',function (){
    let inp1=_name.value;
    let inp2=_number.value;
    let count = 0;
    if(!inp1 ||
        Number(inp1) == 0||
        inp1[0]==' ' ||
        /<script/i.test(inp1) ||
        inp1.indexOf(' ') > 0
        ){
            _name.style.borderColor = 'red';
            nameError.innerHTML = 'The name should not contain sensitive words, <script, empty space';
            count++;
    }else{
            _name.style.borderColor = 'green';
            nameError.innerHTML = '';
            count--;
    }

    if(
        !inp2 ||
        Number(inp2) == 0||
        inp2[0]==' ' ||
        /<script/i.test(inp2) ||
        inp2.indexOf(' ') > 0 ||
        /[a-z]/i.test(inp2) ||
        !(inp2.length == 11)
    ){
        _number.style.borderColor = 'red';
        noError.innerHTML = 'The number must contain numbers and 11 digits';
        count++;
    }else{
            _number.style.borderColor = 'green';
            noError.innerHTML = '';
            count--;
    }

    if(count<0){
        _name.style.borderColor = '#ddd';
        _number.style.borderColor = '#ddd';
        add(inp1,inp2);
        _name.value = '';
        _number.value = '';
    }
});


function add(str1,str2){
    let _li = document.createElement('li');
    _li.innerHTML = `   
      <div class="info">
        <div class="name"> ${str1}</div>
        <div class="number">${str2}</div>
      </div>
      <div class="icon-container">
   
        <span onclick='_close(this)' ><i class="bi bi-trash"></i></span>
      </div>`;

      let person = {
        name : str1,
        no : str2,
        type : document.querySelector('#memory').value
      }
    _ul.appendChild(_li);
    _saveToLocal(person);    
}


function _close(self){
  ((self.parentElement).parentElement).remove();
  removeFromLacal(self);
}




function _saveToLocal(obj){
  if(obj.type == 'Permanent'){
    _set(obj);
  }
  
}

function _set(contact){
  let contacts;
  if(localStorage.getItem('concat') === null){
    
    contacts =[]
  }else{
    contacts = JSON.parse(localStorage.getItem('concat'))
  }
  contacts.push(contact);
  localStorage.setItem('concat',JSON.stringify(contacts));
}

function removeFromLacal(contact){
  let contacts;
  if(localStorage.getItem('concat') === null){  
    contacts =[]
  }else{
    contacts = JSON.parse(localStorage.getItem('concat'))
  }
  let _parent = ((contact.parentElement).parentElement).children[0].children[1];
  let number = _parent.innerHTML;
  const indx = contacts.findIndex((val)=> val.no === number);
  contacts.splice(indx,1);
  localStorage.setItem('concat',JSON.stringify(contacts));
}

// localStorage.clear()