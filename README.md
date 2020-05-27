### JavaScript Calculator
Author: Robynn Ding

### HOW TO RUN:
Open index.html in Firefox.

### HOW TO RUN TESTS:
Open runtests.html in Firefox. It will run the unit tests in your browser, using online JS libraries. You shouldn't have to install any dependencies.
If the tests don't immediately load, it means the unpkg.com servers hosting mocha.js and chai.js are slow. Wait, or restart Firefox and try again if it still won't load.

### CALCULATOR README / EXPECTED BEHAVIOR:
* Digits/DEL:
    Clicking digit buttons appends digits to the end of the number in the primary display.
    Clicking DEL will delete the last digit of the number in the primary display.
* Operations (* / + -):
    Clicking an operation button will load the number in the primary display and that operation into the upper display, clearing the primary display for the next number or a parentheses.
    Clicking an operation button again before entering a number or parentheses will change the previously entered operation.
* = button:
    Clicking the = button will load the last number or parenthes entered into the upper display and then evaluate the expression in the upper display.
    Clicking the = again will do nothing.
    Clicking a digit after clicking = will clear the display before appending the digit.
    Clicking an operation after clicking = will use the number in the primary display as the first argument for that operator.
* Functions:
    Clicking a function will evaluate the current expression (as if you clicked the = button) and then use the result as an argument for that function.
    For example, entering 2 + 2 then pressing sqrt(x) will result in sqrt(2 + 2) = 2.
    Successive function calls will continue operating the function on the number in the primary display.
* Parentheses:
    Clicking a parentheses will add a parentheses to the expression in the upper display. Parentheses shouldn't be adjacent to a number in the expression. For example, 2(3) or (3)2 is bad input. Use 2*(3) or (3)*2 instead. It is the responsibility of the user to use parentheses correctly or risk getting an error.
* Memory:
    Clicking a memory store will store the number in the lower display into the memory and display it in the memory display section.
    Clicking a memroy plus will add the current number in tne lower display to the number in the memory display section, and the answer will be shown in the memory.
    Clicking memory clear will clear the previous number stored in the memory display section.