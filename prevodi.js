
//sprememba # v URL za spremembo jezika in refresh
if (localStorage.getItem('jezik')=='#sl'){
  window.location.hash='#sl';
} else if (!window.location.hash){
  window.location.hash='#en'
}

const buttonEnElement=document.querySelector('.buttonEn')
buttonEnElement.addEventListener('click',()=>
  {window.location.hash='#en';
  localStorage.setItem('jezik','#en');
  location.reload(); 
  })
const buttonSlElement=document.querySelector('.buttonSl')
buttonSlElement.addEventListener('click',()=>
  {window.location.hash='#sl';
  localStorage.setItem('jezik','#sl');
  location.reload();  
  })

//slovar besed
let language ={
  en:{
    storitve:"SERVICES",
    oMeni:"ABOUT ME",
    kontakt:"CONTACT",
    poučniČlanki:"EDUCATIONAL ARTICLES",
    prvaStran: "FIRST PAGE"
  },
  sl:{
      storitve:"STORITVE",
      oMeni:"O MENI",
      kontakt:"KONTAKT",
      poučniČlanki:"POUČNI ČLANKI",
      prvaStran:"PRVA STRAN"
  }
};
//poglej hash in spremeni besedilo, označi gumbe za izbiro jezika pravilno
for (let textElement in language.sl){
  if (document.getElementById(textElement)==null){
    continue};
  if (window.location.hash === '#sl'){
    eval(textElement).textContent=language.sl[textElement];
    document.getElementById('buttonSl').classList.add('buttonEnSlSelected');
    document.getElementById('buttonEn').classList.remove('buttonEnSlSelected');
    } else {
      eval(textElement).textContent=language.en[textElement];
      document.getElementById('buttonEn').classList.add('buttonEnSlSelected');
      document.getElementById('buttonSl').classList.remove('buttonEnSlSelected');
    }  
}

