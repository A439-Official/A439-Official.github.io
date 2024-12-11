var nav = document.createElement("div");
nav.setAttribute("class", "nav");

var logo = document.createElement("img");
logo.setAttribute("src", "https://a439-owo.github.io/img/A439.png");
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
a1.setAttribute("href", "https://a439-owo.github.io/");
a1.appendChild(document.createTextNode("Home"));
li1.appendChild(a1);
ul.appendChild(li1);

nav.appendChild(ul);

var header = document.getElementsByClassName("header")[0];
header.appendChild(nav);