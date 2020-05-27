display = document.getElementById("display");
upperdisplay = document.getElementById("display-upper");
memorydisplay = document.getElementById("visualMemory");
digitButtons = {
    zero: document.getElementById("0"),
    one: document.getElementById("1"),
    two: document.getElementById("2"),
    three: document.getElementById("3"),
    four: document.getElementById("4"),
    five: document.getElementById("5"),
    six: document.getElementById("6"),
    seven: document.getElementById("7"),
    eight: document.getElementById("8"),
    nine: document.getElementById("9"),
};

opButtons = {
    add: document.getElementById("add"),
    subtract: document.getElementById("subtract"),
    multiply: document.getElementById("multiply"),
    divide: document.getElementById("divide"),
    equals: document.getElementById("equals"),
    exponent: document.getElementById("exponent"),
    root: document.getElementById("root"),
    factorial: document.getElementById("factorial"),
    percent: document.getElementById("percent"),
    ln: document.getElementById("ln"),
};


memoryOp = {
    memoryClear: document.getElementById("memory_clear"),
    memoryRecall: document.getElementById("memory_recall"),
    memoryStore: document.getElementById("memory_store"),
    memoryPlus: document.getElementById("memory_plus"),
    memoryMinus: document.getElementById("memory_minus"),
};

backspace = document.getElementById("DEL");

model = new Model();
controller = new Controller(model, display, upperdisplay, memorydisplay);

/* Add event listeners for digit buttons */
for(var p in digitButtons){
    (function(){
        var id = digitButtons[p].id;
        digitButtons[p].addEventListener("click", function(){controller.processDigitClick(id);}, false);
    }());
}

opButtons.add.addEventListener("click",function(){controller.processOpClick("+");},false);
opButtons.subtract.addEventListener("click",function(){controller.processOpClick("-");},false);
opButtons.multiply.addEventListener("click",function(){controller.processOpClick("*");},false);
opButtons.divide.addEventListener("click",function(){controller.processOpClick("/");},false);
opButtons.exponent.addEventListener("click",function(){controller.processOpClick("^");},false);
opButtons.root.addEventListener("click",function(){controller.processRootClick();},false);
opButtons.factorial.addEventListener("click",function(){controller.processOpClick("!");},false);
opButtons.percent.addEventListener("click",function(){controller.processOpClick("%");},false);
opButtons.ln.addEventListener("click",function(){controller.processLnClick();},false);
backspace.addEventListener("click",function(){controller.processBackspace();},false);

memoryOp.memoryClear.addEventListener("click", function(){controller.processMemoryClear();},false);
memoryOp.memoryRecall.addEventListener("click", function(){controller.processMemoryRecall();},false);
memoryOp.memoryStore.addEventListener("click", function(){controller.processMemoryStore();},false);
memoryOp.memoryPlus.addEventListener("click", function(){controller.processMemoryPlus();},false);
memoryOp.memoryMinus.addEventListener("click", function(){controller.processMemoryMinus();},false);

opButtons.equals.addEventListener("click",function(){controller.processEvaluate();},false);
document.getElementById("C").addEventListener("click",function(){controller.processClearOp();},false);
document.getElementById("theme").addEventListener("click",function(){controller.processTheme();},false);
document.getElementById("point").addEventListener("click",function(){controller.processPoint();},false);
document.getElementById("negate").addEventListener("click",function(){controller.processNegate();},false);
document.getElementById("lp").addEventListener("click", function(){controller.processParenClick("(");},false);
document.getElementById("rp").addEventListener("click", function(){controller.processParenClick(")");},false);
