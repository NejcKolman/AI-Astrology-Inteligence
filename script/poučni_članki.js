import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFvar9GkDUGSRQkM2hueiyC-AskVS9TgM",
  authDomain: "astrology-intelligence.firebaseapp.com",
  projectId: "astrology-intelligence",
  storageBucket: "astrology-intelligence.firebasestorage.app",
  messagingSenderId: "912111736598",
  appId: "1:912111736598:web:0f09cb81839f1dfbb2a237",
};

//init  firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection ref
const colRef = collection(db, "articles");

//query
const q = query(colRef);

//real time collection data
onSnapshot(q, (snapshot) => {
  let articles = [];
  snapshot.docs.forEach((doc) => {
    articles.push({ ...doc.data(), id: doc.id });
  });
  console.log(articles);
  makeTableOfContent(articles);
});

//delete documents

//inputing the article

//making the right number of inputs
const articleInputField = document.querySelector(".articleInputField");
let allInputFields = [];
const addANewSubButton = document.querySelector(".addANewSubButton");
let numberOfSubtitles = 0;

addANewSubButton.addEventListener("click", () => {
  numberOfSubtitles += 1;
  allInputFields.push(`subtitle${numberOfSubtitles}`);
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `
        <div>
            Subtitle ${numberOfSubtitles}:
            <input type="text" id="subtitle${numberOfSubtitles}" required />
        </div>
        `;
  articleInputField.appendChild(newDiv);
  console.log(allInputFields);
});

const addANewParButton = document.querySelector(".addANewParButton");
let numberOfParagrafs = 0;

addANewParButton.addEventListener("click", () => {
  numberOfParagrafs += 1;
  allInputFields.push(`paragraf${numberOfParagrafs}`);
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `
        <div>
            Paragraf ${numberOfParagrafs}:
            <input type="text" id="paragraf${numberOfParagrafs}" required />
        </div>
        `;
  articleInputField.appendChild(newDiv);
  console.log(allInputFields);
});

//read what is in the inputs and adding the document
const addANewArtButton = document.querySelector(".addANewArtButton");
addANewArtButton.addEventListener("click", () => {
  let content = "";
  allInputFields.forEach((id) => {
    document.getElementById(id).value;
    if (id.includes("paragraf")) {
      content += "<p>" + document.getElementById(id).value + "</p>";
    } else {
      content += "<h3>" + document.getElementById(id).value + "</h3>";
    }
  });
  title = document.getElementById("title").value;
  addArticle(title, content);
});

let addArticle = (t, c) => {
  console.log(t, c, "help");
  addDoc(colRef, {
    title: t,
    content: c,
    createdAt: serverTimestamp(),
  });
};

//table of content

const tableOfContent = document.querySelector(".tableOfArticles");
let makeTableOfContent = (articles) => {
  tableOfContent.innerHTML = "";
  articles.forEach((article) => {
    let newDiv = document.createElement("div");

    let button = document.createElement("button");
    let delButton = document.createElement("button");

    delButton.classList.add("adminInputField");
    delButton.classList.add("delButton");
    button.classList.add("tableOfContentButton");

    button.textContent = article.title;
    delButton.textContent = "X";

    button.addEventListener("click", () => {
      displayArticle(article);
    });

    delButton.addEventListener("click", () => {
      const docRef = doc(db, "articles", article.id);
      deleteDoc(docRef);
    });

    newDiv.appendChild(button);
    newDiv.appendChild(delButton);

    tableOfContent.appendChild(newDiv);
  });
};

const selectedArticleContentText = document.querySelector(".selectedArticleContentText");
const displayArticle = (article) => {
  selectedArticleContentText.innerHTML = `<h1>${article.title}</h1>` + article.content;
};
//admin switch
let n = 0;
const adminSwitch = document.querySelector(".adminSwitch");
adminSwitch.addEventListener("click", () => {
  if (n == 0) {
    n = 1;
    document.getElementById("adminInputField").classList.remove("adminInputField");

    const buttons = document.querySelectorAll(".delButton");
    //console.log(buttons);
    buttons.forEach((button) => {
      //console.log(button);
      button.classList.remove("adminInputField");
    });
  } else {
    n = 0;
    document.getElementById("adminInputField").classList.add("adminInputField");
    const buttons = document.querySelectorAll(".delButton");
    buttons.forEach((button) => {
      button.classList.add("adminInputField");
    });
  }
});

//const docRef = doc(db, "articles", "2AQMPBNBGkYYNlT8Gcj3");
//deleteDoc(docRef);
