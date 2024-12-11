var nav = document.createElement("div");
nav.setAttribute("class", "nav");

var logo = document.createElement("img");
logo.setAttribute("src", "/img/A439.png");
var myaccount = document.createElement("a");
myaccount.setAttribute("class", "logo");
myaccount.setAttribute("href", "https://space.bilibili.com/3493079245916811");
myaccount.setAttribute("target", "_blank");
myaccount.appendChild(logo);
nav.appendChild(myaccount);

var ul = document.createElement("ul");
ul.setAttribute("class", "linklist");

var li1 = document.createElement("li");
var a1 = document.createElement("a");
a1.setAttribute("href", "/");
a1.appendChild(document.createTextNode("Home"));
li1.appendChild(a1);
ul.appendChild(li1);

var li2 = document.createElement("li");
var a2 = document.createElement("a");
a2.setAttribute("href", "/note");
a2.appendChild(document.createTextNode("Note"));
li2.appendChild(a2);
ul.appendChild(li2);

nav.appendChild(ul);

var header = document.getElementsByClassName("header")[0];
header.appendChild(nav);