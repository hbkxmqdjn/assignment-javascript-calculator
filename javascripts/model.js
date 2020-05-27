/* 
 * Constructor for Model class
 */
function Model(){
    /* All properties TBD, these may change or be added to */
    this.memorydisplay = "There's nothing saved in memory"; //data for memory function
    this.prevResult = 0; //previous result from evaluation
    this.display = "0"; //current primary display
    this.upperdisplay = "";
    this.color = "darkgray"; //Current theme
    this.ansGiven = false; //flag to determine whether the current display is an answer to an evaluation
}

/* Evaluates display following order of operations. Gives error if bad string of ops
 * Uses recursive descent parsing for evaluating parentheses. Makes a recursive call on finding
 * a "(", stops parsing on finding a ")"
 * Requires that evalArray contains a valid string to evaluate.
 * PARAMS:
 *  evalArray: the array of numbers, operations, and parentheses to evaluate
 *  start: first index of array to start evaluation
 *  end: last index (inclusive) to end evaluation
 * 
 * RETURNS: {ans, length} 
 *  ans: evaluated expression (string rep of some number or error message)
 *  length: number of entries in evalArray used to find ans (tells how much of evalArray
 *      to delete when splicing in the answer after a recursive call)
 */
Model.prototype.evaluate = function(evalArray, start, end){
    //set ansGiven flag to true
    this.ansGiven = true;

    //Evaluates π and e
    for (var j = start; j <= end; j++){
        if (evalArray[j] != undefined && (evalArray[j].includes("π") || evalArray[j].includes("e"))){
            var πOccur = evalArray[j].split("π").length - 1;
            var eOccur = evalArray[j].split("e").length - 1;
            evalArray[j] = Math.max(evalArray[j].replace(/π|e/g,""),1) * Math.pow(Math.PI,πOccur)* Math.pow(Math.E,eOccur);
        }
    }

    if (evalArray.length == 1){
        this.ansGiven = true;
        return {ans: evalArray[start], length: 1};
    }else if(evalArray[0].isNaN){
        return {ans: "Input error"};
    }

    //Loop that handles parentheses
    var i = start;
    while(i <= end){
        //find first opening parentheses
        if(evalArray[i] == "("){
            //evaluate subarray of evalArray starting at i+1
            evalArray.splice(i,1); //delete "("
            end--; //decrement after deleting an entry
            var result = this.evaluate(evalArray,i,end);
            //splice answer into original evalArray, overwriting opening "("
            end -= (result.length);
        }
        /*find closing parentheses. after recursive calls, first ")" should be matching */
        if(evalArray[i] == ")"){
            evalArray.splice(i,1); //delete ")"
            end = i-1; //set new end for this recursive call's evaluation
            break;
        }
        i++;
    }

    //Loop that handles factorials and percents
    i = start;
    while (i <= end) {
        var product = 1;
        if (evalArray[i] == "!") {
            if (evalArray[i-1] == "0"){
                evalArray.splice(i-1,3,1);
                i--;
            }
            else {
                for (j = 1; j <= evalArray[i-1]; j++){
                    product *= j;
                }
                evalArray.splice(i-1,3,product);
                i--;
            }
            end--; //update end after making evalArray shorter
        }else if (evalArray[i] == "%") {
            evalArray.splice(i-1,3,evalArray[i-1]/100);
            end--; //update end after making evalArray shorter
            i--;

        }
        i++;
    }

    //Loop that handles exponents
    i = start;
    while (i <= end){
        if(evalArray[i] == "^"){
            evalArray.splice(i-1,3,Math.pow(Number(evalArray[i-1]),Number(evalArray[i+1])));
            end-= 2; //update end after making evalArray shorter
            i--;
        }
        i++;
    }

    //Loop that handles multiplication and division
    i = start;
    while (i <= end){
        if(evalArray[i] == "*"){
            evalArray.splice(i-1,3,evalArray[i-1] * evalArray[i+1]);
            end-= 2; //update end after making evalArray shorter
            i--;
        }else if (evalArray[i] == "/"){
            if (evalArray[i+1] == "0") {
                return {ans: "Divide by 0 error"};
            }else {
                evalArray.splice(i-1,3,evalArray[i-1] / evalArray[i+1]);
                end-= 2; //update end after making evalArray shorter
                i--;
            }
        }
        i++;
    }

    //Loop that handles addition and subtraction
    i = start;
    while (i <= end){
        if(evalArray[i] == "+"){
            evalArray.splice(i-1,3,Number(evalArray[i-1]) + Number(evalArray[i+1]));
            end-= 2; //update end after making evalArray shorter
            i--;
        }else if (evalArray[i] == "-"){
            evalArray.splice(i-1,3,evalArray[i-1] - evalArray[i+1]);
            end-= 2; //update end after making evalArray shorter
            i--;
        }
        i++;
    }

    //If the result is not a number the input was incorrect, otherwise set the display
    if(isNaN(evalArray[start])){
        this.upperdisplay = "";
        return {ans: "Input error"};
    }else {
        return {ans: evalArray[start], length: end - start + 1};
    }

};

/* Function should add the op given by opID to the end of display
 * If display already has an operation at the end, overwrite it.
 * If they don't have an operation at the end, append the new op.
 */
Model.prototype.appendOp = function(opID){
    //case: operating on last answer given
    if(this.ansGiven && !this.display.isNaN){
        this.ansGiven = false;
        this.upperdisplay = this.display + " " + opID + " ";
    //case: performing op after closing parentheses
    }else if (this.upperdisplay.slice(-2) == ") " && this.display == ""){
        this.upperdisplay += opID + " ";  
    //case: replacing current operation
    }else if (this.upperdisplay.slice(-1) == " " && this.display == ""){
        this.upperdisplay = this.upperdisplay.slice(0,-2) + opID + " ";
    //case: general case for adding number to upperdisplay
    }else{
        this.upperdisplay += this.display + " " + opID + " ";
    }
    this.display = "";
};

/*
 * Function that appends a digit onto the display
 */
Model.prototype.appendDigit = function(digit){
    if(this.ansGiven){ //clear display of prev answer
        this.ansGiven = false;
        this.display = digit;
        this.upperdisplay = "";
    }else if(this.display == "0"){ //don't allow leading zeros
        this.display = digit;
    //don't allow ")" to be adjacent to a number without an operator between
    }else if(this.upperdisplay.slice(-2) != ") "){
        this.display += digit;
    }
};

/*
 * Finds the root after evaluating the current expression
 */
Model.prototype.Root = function(){
    if(!this.ansGiven){
        //set up evaluation
        this.upperdisplay += this.display;
        this.upperdisplay = this.upperdisplay.trim();
        var problem = this.upperdisplay.split(" ");
        //evaluate
        var result = this.evaluate(problem,0,problem.length-1);
        this.display = result.ans;
        this.upperdisplay = "sqrt( " + this.upperdisplay + " )";
    }else{
        this.upperdisplay = "sqrt( " + this.display + " )";
    }
    //compute root
    if (this.display < 0){
        this.display = "Imaginary number";
    }else{
        this.display = String(Math.sqrt(this.display));
    }
};

/*
 * Finds the natural log after evaluating the current expression
 */
Model.prototype.Ln = function(){
    if(!this.ansGiven){
        //set up evaluation
        this.upperdisplay += this.display;
        this.upperdisplay = this.upperdisplay.trim();
        var problem = this.upperdisplay.split(" ");
        //evaluate
        var result = this.evaluate(problem,0,problem.length-1);
        this.display = result.ans;
        this.upperdisplay = "ln( " + this.upperdisplay + " )";
    }else{
        this.upperdisplay = "ln( " + this.display + " )";
    }
    //compute LN
    this.display = String(Math.log(this.display));
};

/* 
 * Removes the last digit from this.display
 */
Model.prototype.backspace = function(){
    if(this.display.length == 2 && this.display[0] == "-"){
        this.display = "";
    }else{
        this.display = this.display.substring(0,this.display.length - 1);
    }
};


/* 
 * Clear memory and its display at the bottom of the page.
 */
Model.prototype.memoryClear = function(){
    this.memorydisplay = "There's nothing saved in memory";
};

/* 
 * Store the current display into memory.
 */
Model.prototype.memoryStore = function(){
    //need to check if this.display is a valid number
    if(/^-?\d*.?\d+$/.test(this.display)){
        this.memorydisplay  = this.display;
    }
    else{
        window.alert("Invalid Input in display.");
    }
};

/* 
 * Recalls the memory value to the display.
 */
Model.prototype.memoryRecall = function(){
    if(this.memorydisplay != "There's nothing saved in memory"){
        this.display = this.memorydisplay;
    }
    else{
        window.alert("Empty memory");
    }
};

/* 
 * Adds the display value to the memory value in memory.
 */
Model.prototype.memoryPlus = function(){
    if(this.memorydisplay != "There's nothing saved in memory"&&/^-?\d+.?\d+$/.test(this.display)){
        this.memorydisplay = parseFloat(this.memorydisplay) + parseFloat(this.display);
    }
    else{
        window.alert("Invalid input");
    }
};

/* 
 * Substracts the display value from the memory value.
 */
Model.prototype.memoryMinus = function(){
    if(this.memorydisplay != "There's nothing saved in memory"&&/^-?\d+.?\d+$/.test(this.display)){
        this.memorydisplay = parseFloat(this.memorydisplay) - parseFloat(this.display);
    }
    else{
        window.alert("Invalid input");
    }
};

/*
 * Function implements clear operation.
 * C clears all displays
 */
Model.prototype.clearOp = function(){
    this.ansGiven = false;
    this.display = "0";
    this.upperdisplay = "";
};

/*
 * Function adds a point to the end of the display
 */

Model.prototype.point = function(){
    if(this.display.slice(-1) == "."){
        return;
    }
    var latest = this.returnLatest();
    if(latest.includes(".")){
        return;
    }
    if(/\D/.exec(this.display.slice(-1))){
        return;
    }
    this.display += ".";
};


/* 
 * Returns a subset of this.display that is the latest valid numbers after last operator
 */
Model.prototype.returnLatest = function(){
    var evalArray = this.display.split(" ");
    return evalArray[evalArray.length-1];
};


/*
 * Function negate value in display
 */

Model.prototype.negate = function(){
    if(this.display == "0"){
        return;
    }
    if(this.display == "π"){
        this.display = Math.PI;
    }else if(this.display == "e"){
        this.display = Math.E;
    }
    this.display = String(this.display*-1);

};