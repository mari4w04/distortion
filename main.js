"use strict"

window.addEventListener('load', init);
let stage, stage2, box, dot, x=0, line, chartBar, i, label, bg, text;


function init(){
    stage = new createjs.Stage("stage"); //id of the canvas
    stage2 = new createjs.Stage("stage2"); //id of the canvas
    getQueue();
};


let queueNumber, time;

function getQueue(){
    fetch("https://kea-alt-del.dk/kata-distortion/")
    .then(res=>res.json())
    .then(getQueueNumber);
}

function getQueueNumber(data){
    queueNumber = data.inQueue;
    time = data.loggedAt.substring(11);
    document.querySelector(".bar").style.width = queueNumber*50+"px";
    console.log("Queue number: "+queueNumber);
    if (queueNumber==1||queueNumber==2||queueNumber==3){
        document.querySelector(".q-number").textContent = "Just "+queueNumber;
    }else{
        document.querySelector(".q-number").textContent = queueNumber+" people in the queue";
    }
    //document.querySelector("progress").setAttribute("value", queueNumber);
    document.querySelector("#barname").textContent = "Live queue data for "+data.name;
    
    let element = document.querySelector("#queue");
    element.innerHTML="";

    for(i=1; i<=queueNumber; i++){
        

        // if (queueNumber<=0){
        //     let par = document.createElement("p");
        //     let text = par.createTextNode("There are no people in line");
        //     par.appendChild(text);
        //     element.appendChild(par);
            
        // }else{
            let person = document.createElement("img");

            person.setAttribute("src","person.svg");
            person.style.height = "100px";
            person.style.width = "50px";

            element.appendChild(person);
        // }
        
    }


    

    createjs.Ticker.framerate = 0.6;
    createjs.Ticker.addEventListener("tick", tock);
    // dot = new createjs.Shape();
    // line = new createjs.Shape();
    chartBar = new createjs.Shape();

    

    // dot.graphics.beginFill("red").drawCircle(x, queueNumber*10, 3);
    // line.graphics.moveTo(0,0).lineTo(x,queueNumber*10);
    chartBar.graphics.beginFill("#00db82").drawRect(x+5, 30, 40, queueNumber*10);
    
    label = new createjs.Container();
    // bg = new createjs.Shape();
    // bg.graphics.beginFill("red").drawRect(0, 10, 50, 40);
    text = new createjs.Text(time, "12px 'Sunflower'", "#00db82");
    text.x = 2;
    text.y = 10;
    text.textBaseline = "bottom";
    text.rotation = 180;
    text.scaleX = -1;
    
    //label.addChild(bg);
    label.addChild(text);

    label.x = x;
    label.y = 0
       
    // stage.addChild(dot);
    // stage.addChild(line);
    stage2.addChild(chartBar);
    stage2.addChild(label);
    x+=50;
    // createjs.Tween.get(chartBar).to({
    //     h: queueNumber*10
    // }, 1000, createjs.Ease.bounceOut);
}

setInterval(getQueue, 10000);



//     box = new createjs.Shape();
//     box.graphics.beginFill("red").beginStroke("red").setStrokeStyle(10, "round").drawRect(0,0,150,100);
//     stage.addChild(box);
// }

function tock(e){
    if(x>=600){
        
        stage2.clear();
        x=0;
        stage2.removeAllChildren();
        stage2.update();

    }
    
    
    console.log("X is: "+x);
    // stage.update(e);
    stage2.update(e);
}






