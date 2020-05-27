/* 
 * Constructor for Controller class
 */
function Controller(model, display, upperdisplay, memorydisplay){
    this.model = model; //link to model object
    this.display = display; //ref to display DOM node
    this.upperdisplay = upperdisplay;
    this.memorydisplay = memorydisplay;
}

/* 
 * processDigitClick method
 * Processes digit button press based on buttonID (0-9)
 */
Controller.prototype.processDigitClick = function(buttonID){
    console.log("button press " + buttonID);    
    if(this.model.display == "Divide by 0 error" || this.model.display == "Input error" || this.model.display == "Overflow"){
        this.model.display = "0";
        this.upperdisplay.innerHTML = "";
    }
    if(!this.overflow()){ 
        this.model.appendDigit(buttonID);
        this.display.innerHTML = this.model.display;
        this.upperdisplay.innerHTML = this.model.upperdisplay;
    }
};

/*
 * Process what happens when you click on delete
 */
Controller.prototype.processBackspace = function(){
    if(this.model.display == "Divide by 0 error" || this.model.display == "Input error"){
        this.model.display = "0";
        this.upperdisplay.innerHTML = "";
    }
    this.model.backspace();
    this.display.innerHTML = this.model.display;
};

/*
 * Processes what happens when you click an operation(add,subtract,multiply,divide,exponent,factorial)
 */
Controller.prototype.processOpClick = function(buttonID){
    console.log("button press " + buttonID);
    if(this.model.display == "Divide by 0 error" || this.model.display == "Input error"){
        this.model.display = "0";
        this.upperdisplay.innerHTML = "";
    }
    this.model.appendOp(buttonID);
    this.display.innerHTML = this.model.display;
    this.upperdisplay.innerHTML = this.model.upperdisplay;
};

/*
 * Processes what happens when you click square root
 */
Controller.prototype.processRootClick = function(){
    console.log("Square Root");
    if(this.model.display == "Divide by 0 error" || this.model.display == "Input error"){
        this.model.display = "0";
        this.upperdisplay.innerHTML = "";
    }
    //compute the root
    this.model.Root();
    this.display.innerHTML = this.model.display;
    this.upperdisplay.innerHTML = this.model.upperdisplay;
};

/*
 * Processes what happens when you click natural log
 */
Controller.prototype.processLnClick = function(){
    console.log("Natural Log");
    if(this.model.display == "Divide by 0 error" || this.model.display == "Input error"){
        this.model.display = "0";
        this.upperdisplay.innerHTML = "";
    }
    //compute the LN
    this.model.Ln();
    this.upperdisplay.innerHTML = this.model.upperdisplay;
    this.display.innerHTML = this.model.display;
};

/* 
 * Processes a parentheses event.
 * PARAMS: input: either "(" or ")" depending on button pressed
 */
Controller.prototype.processParenClick = function(input){
    console.log("Parentheses");
    //prevents adjacent terms like ()() without op between
    if(input == "(" && this.model.upperdisplay.slice(-2) != ") "){
        if(this.model.upperdisplay.slice(-1) != " "){
            this.model.upperdisplay += " ";
        }
        this.model.upperdisplay += "( ";
    }else if(input == ")"){
        if(this.model.display != ""){
            this.model.upperdisplay += this.model.display + " ) ";
        }else{
            this.model.upperdisplay += ") ";
        }
        this.model.display = "";
    }
    this.upperdisplay.innerHTML = this.model.upperdisplay;
    this.display.innerHTML = this.model.display;
};

/*
 * Processes what happens when you click memory clear.
 */
Controller.prototype.processMemoryClear = function(){
    console.log("Memory clear");
    this.model.memoryClear();
    this.memorydisplay.innerHTML = "There's nothing saved in memory";
};

/*
 * Processes what happens when you click memory recall.
 */
Controller.prototype.processMemoryRecall = function(){
    console.log("Memory recall");
    this.model.memoryRecall();
    this.display.innerHTML = this.model.display;
};

/*
 * Processes what happens when you click memory store.
 */
Controller.prototype.processMemoryStore = function(){
    console.log("Memory store");
    this.model.memoryStore();
    this.memorydisplay.innerHTML = this.model.memorydisplay;
};

/*
 * Processes what happens when you click memory plus.
 */
Controller.prototype.processMemoryPlus = function(){
    console.log("Memory plus");
    this.model.memoryPlus();
    this.memorydisplay.innerHTML = this.model.memorydisplay;
};

/*
 * Processes what happens when you click memory minus.
 */
Controller.prototype.processMemoryMinus = function(){
    console.log("Memory minus");
    this.model.memoryMinus();
    this.memorydisplay.innerHTML = this.model.memorydisplay;
};

/*
 * Processes what happens when you click equals
 */
Controller.prototype.processEvaluate = function() {
    console.log("Evaluated");
    if(!this.model.ansGiven){
        this.model.upperdisplay += this.model.display;
        this.model.upperdisplay = this.model.upperdisplay.trim();
        var problem = this.model.upperdisplay.split(" ");
        var result = this.model.evaluate(problem,0,problem.length-1);
        this.model.display = result.ans;
        this.upperdisplay.innerHTML = this.model.upperdisplay + " =";
        this.display.innerHTML = this.model.display;
    }
};

Controller.prototype.processClearOp = function(){
    console.log("button press C");
    this.model.clearOp();
    this.display.innerHTML = this.model.display;
    this.upperdisplay.innerHTML = this.model.upperdisplay;
};

/*
 * Changes the theme
 */
Controller.prototype.processTheme = function(){
    console.log("Theme changed");
    this.model.theme();
};


/*
 * Adds a point or period
 */
Controller.prototype.processPoint = function(){
    console.log("button press '.'");
    if(this.model.display == "Divide by 0 error" || this.model.display == "Input error"){
        this.model.display = "0";
        this.upperdisplay.innerHTML = "";
    }
    this.model.point();
    this.display.innerHTML = this.model.display;
};


/*
 * Implements negate function
 */
Controller.prototype.processNegate = function(){
    console.log("button press +/-");
    if(this.model.display == "Divide by 0 error" || this.model.display == "Input error" || this.model.display == "Overflow"){
        this.model.display = "0";
        this.upperdisplay.innerHTML = "";
    }
    this.model.negate();
    this.display.innerHTML = this.model.display;
};


/*
 * Checks for overflow
 */
Controller.prototype.overflow = function(){
    console.log("checking overflow");
    if(this.model.display.length > 29){
        this.model.display = "Overflow";
        this.upperdisplay.innerHTML = "";
        this.display.innerHTML = this.model.display;
        return true;
    }
    return false;
};
