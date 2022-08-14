
let div;
let title;
let des;
let boxCont;
let options;
let rate;
let icon;
let point;
let pointNum = 0;
let level;
let thisLevel = 1;
let menuCont;

function* questionGen(){
    yield questionMaker("what is the biggest country in the world?","Russia", "China", "United States", "Russia", "Canada", "India", "Saudi Arabia")
    yield questionMaker("Who discovered the electricity?","Benjamin Franklin", "Nikola Tesla", "Isaac Newton","Albert Einstein", "Benjamin Franklin")
    yield questionMaker("Who is the discoverer of gravity?","Isaac Newton", "Albert Einstein", "Isaac Newton", "Nikola Tesla")
    yield questionMaker("What is the largest animal in the world?","Blue Whale", "Saltwater Crocodile", "Komodo Dragon", "Blue Whale")
    yield questionMaker("What is the largest continent in the world?","Asia", "Asia", "Africa", "North America")
    yield questionMaker("What is the fastest animal?","Peregrine Falcon", "Cheetah", "Peregrine Falcon", "Golden Eagle")
    yield questionMaker("Who invented the theory of relativity?","Albert Einstein", "Isaac Newton", "Albert Einstein", "Nikola Tesla")
    yield questionMaker("Who discovered black holes?","Stephen Hawking", "Albert Einstein", "Stephen Hawking", "Benjamin Franklin")
    yield last();
}

let = generator = questionGen();
generator.next()


function questionMaker(theAns ,rightAns , ...optionsText) {
    div = document.querySelector(".app-content")
    title = document.createElement("h3");
    title.classList.add("title");
    title.appendChild(document.createTextNode(theAns));
    div.appendChild(title);
    des = document.createElement("p");
    des.classList.add("des");
    des.appendChild(document.createTextNode("Choosse The Correct Answare"));
    div.appendChild(des);


    boxCont = document.createElement("div");
    boxCont.classList.add("box-cont");
    options = []
    for(let i = 0; i < optionsText.length; i++){
        options.push(document.createElement("span"))
        options[i].classList.add("option")
        options[i].appendChild(document.createTextNode(optionsText[i]))
        boxCont.appendChild(options[i])
    };
    div.appendChild(boxCont);
    
    rate = document.createElement("span");
    rate.classList.add("rate")
    icon = document.createElement("i");
    icon.classList.add("fa-solid")
    div.appendChild(rate)
    menuCont = document.querySelector(".menu-cont")
    let menu = document.createElement("div")
    menu.classList.add("menu")
    point = document.createElement("p")
    point.classList.add("point")
    point.innerHTML = `Your Point Is: ${pointNum}`
    menu.appendChild(point)
    level = document.createElement("p")
    level.classList.add("level")
    menu.appendChild(level)
    level.innerHTML = `${thisLevel} / 8`
    menu.appendChild(level)
    menuCont.appendChild(menu)
    document.body.appendChild(menuCont)
    document.body.appendChild(div);
    choosse(rightAns);
}

function choosse(rightAns){
    let optionElements = document.querySelectorAll(".option")
    optionElements.forEach((el)=>{
    el.addEventListener("click", function(e){
        optionElements.forEach(el => {
            el.classList.remove("correct-opt")
            el.classList.remove("wrong-opt")
        })
        if(e.target.textContent === rightAns){
            e.target.classList.add("correct-opt")
            rate.innerHTML = "";
            rate.classList.remove("not-correct")
            rate.classList.add("correct");
            rate.appendChild(icon);
            icon.classList.remove("fa-circle-xmark")
            icon.classList.add("fa-circle-check")
            rate.appendChild(document.createTextNode("Correct Answare"));
            btnsCont = document.createElement("div")
            btnsCont.classList.add("buttons")
            nextBtn = document.createElement("button");
            nextBtn.appendChild(document.createTextNode("Next"))
            btnsCont.appendChild(nextBtn)
            div.appendChild(btnsCont)
            pointNum += 10;
            point.innerHTML = `Your Point Is: ${pointNum}`
            nextBtn.addEventListener("click", function(){
                menuCont.innerHTML = ""
                div.innerHTML = "";
                thisLevel++
                generator.next();
            })
        }else{
            e.target.classList.add("wrong-opt")
            rate.innerHTML = "";
            rate.classList.remove("correct")
            rate.classList.add("not-correct");
            rate.appendChild(icon);
            icon.classList.remove("fa-circle-check")
            icon.classList.add("fa-circle-xmark")
            rate.appendChild(document.createTextNode("Not Correct Answare"));
            setTimeout(function(){
                let overlay = document.createElement("div")
                overlay.classList.add("overlay");
                document.body.appendChild(overlay)
                let pop = document.createElement("div");
                pop.classList.add("pop");
                let popTitle = document.createElement("h2");
                popTitle.appendChild(document.createTextNode("Your Losse"))
                pop.appendChild(popTitle);
                let pointText =  document.createElement("span");
                pointText.appendChild(document.createTextNode("Your Point Is: "))
                pop.appendChild(pointText)
                let lastPointNum =  document.createElement("span");
                lastPointNum.appendChild(document.createTextNode(pointNum))
                pointText.appendChild(lastPointNum)
                let againBtn = document.createElement("button");
                againBtn.appendChild(document.createTextNode("Start Again"))
                pop.appendChild(againBtn)
                againBtn.addEventListener("click", function(){
                    window.location.reload()
                })
                document.body.appendChild(pop)
            }, 200)
        }
    })
    })
}

function last(){
    let lastPop = document.querySelector(".last")
    lastPop.style.display = "block";
    let overlay = document.createElement("div")
    overlay.classList.add("overlay")
    document.body.appendChild(overlay)
    let playAgBtn = document.querySelector(".last button")
    playAgBtn.onclick = function(){
        window.location.reload()
    }
}