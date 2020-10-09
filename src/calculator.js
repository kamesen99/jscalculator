import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./calculator.styles";

const Calculator = props => {
    const [total, setTotal] = useState("0");
    const [last, setLast] = useState("");
    const [sub, setSub] = useState("");
    const [operator, setOperator] = useState("");
    const [error, setError] = useState("Message");

    const {classes} = props;

    const handleEquals = () => {
        let ans = eval(total);
        setTotal(`${ans}`);
    }

    const clear = () => {
        setTotal(0);
        setLast("");
        setSub("");
        setError("Message");
        setOperator("");
    }

    const handleClickDecimal = e => {
        var dec = true;
        handleClickDigit(e, dec);
    }

    const handleClickSymbol = e =>{
        //console.log("clicked a symbol");
        var symbol = true;
        var dec = false;
        
        setOperator(e.target.innerText);
        setSub("");
        //console.log(this.state.operator)
        handleClickDigit(e, dec, symbol);
    }

    //Simplify this by passing a prop which tells the function what type of character I'm passing?
    const handleClickDigit = (e, dec, symbol) => {
        const digit = e.target.innerText;
        const endsWithOperator = /[*+/-]$/;
        const endsWithNegativeSign = /.*[*/+]-$/;

        //console.log(e.target.value)
        if (total === "0") {
            setLast(digit);
            setTotal(digit);
            setSub(digit);
        }

        else if (dec) { //If decimal, check for previous dec
            //console.log("DEC = true")
            let testRegex = /\.[^.]*\./;
            let testStr = this.state.sub.concat(e.target.value);

            if (testRegex.test(testStr)) {
                this.setState({
                    error: "Two decimal characters not allowed",
                    operator: "."
                })
            } else if (!testRegex.test(testStr)) {
                //console.log("passed double DEC test")
                this.setState({
                    total: this.state.total.concat(e.target.value),
                    sub: this.state.sub.concat(e.target.value),
                    last: e.target.value
                })
            }
        }

        else if (dec === false && symbol === false) {
            //console.log("DEC = false")
            //if the previous char was not an operator
            if (this.state.operator === "") {
                //console.log("operator is blank")
                this.setState({
                    last: e.target.value,
                    total: this.state.total.concat(e.target.value),
                    operator: e.target.value,
                    sub: ""
                })
            }

            else {
                //console.log("hit exception")
                //console.log(e.target.value)
                //console.log(this.state.total.slice(-1))
                //console.log(isOperator.test(this.state.total.slice(-1)))
                // this.setState({
                //     last: e.target.value,
                //     total: this.state.total.concat(e.target.value),
                //     sub: this.state.sub.concat(e.target.value)
                //   })
            }
        }

        else if (symbol === true && dec === false) {

            if (!endsWithOperator.test(total)) {
                setLast(total);
                setTotal(total + digit);
            } else if (!endsWithNegativeSign.test(total)) {
                this.setState({
                    total: (endsWithNegativeSign.test(this.state.total + e.target.value)
                        ? this.state.total : this.state.last) + e.target.value
                });
            } else if (e.target.value !== '‑') {
                setTotal(last, digit);
            } else {
            }
        }

        //just a digit being passed
        else {
            setLast(digit);
            setTotal(total.concat(digit));
        }
        //console.log(this.state)
    }


        return (
            <div className={classes.calcContainer}>
                <div className={classes.headerRow}>
                    <h3 className={classes.informationDisplay} id="display">{total}</h3>
                </div>
                <div className={classes.row}>
                    <Button color="primary" variant="contained" className={classes.numberButton} value="1" id="one" onClick={handleClickDigit}>1</Button>
                    <Button color="primary" variant="contained" className={classes.numberButton} value="2" id="two" onClick={handleClickDigit}>2</Button>
                    <Button color="primary" variant="contained" className={classes.numberButton} value="3" id="three" onClick={handleClickDigit}>3</Button>
                    <Button color="default" variant="contained" className={classes.operatorButton} id="add" value="+" onClick={handleClickSymbol}>+</Button>
                </div>
                <div className={classes.row}>
                    <Button color="primary" variant="contained" className={classes.numberButton} value="4" id="four" onClick={handleClickDigit}>4</Button>
                    <Button color="primary" variant="contained" className={classes.numberButton} value="5" id="five" onClick={handleClickDigit}>5</Button>
                    <Button color="primary" variant="contained" className={classes.numberButton} value="6" id="six" onClick={handleClickDigit}>6</Button>
                    <Button id="subtract" color="default" variant="contained" value="-" className={classes.operatorButton} onClick={handleClickSymbol}>-</Button>
                </div>
                <div className={classes.row}>
                    <Button color="primary" variant="contained" className={classes.numberButton} value="7" id="seven" onClick={handleClickDigit}>7</Button>
                    <Button color="primary" variant="contained" className={classes.numberButton} value="8" id="eight" onClick={handleClickDigit}>8</Button>
                    <Button color="primary" variant="contained" className={classes.numberButton} value="9" id="nine" onClick={handleClickDigit}>9</Button>
                    <Button id="multiply" color="default" variant="contained" value="*" className={classes.operatorButton} onClick={handleClickSymbol}>*</Button>
                </div>
                <div className={classes.row}>
                    <Button id="decimal" color="default" variant="contained" className={classes.operatorButton} value="." onClick={handleClickDecimal}>.</Button>
                    <Button id="zero" color="primary" variant="contained" className={classes.numberButton} value="0" onClick={handleClickDigit}>0</Button>
                    <Button id="equals" color="default" variant="contained" className={classes.operatorButton} onClick={handleEquals}>=</Button>
                    <Button id="divide" color="default" variant="contained" className={classes.operatorButton} value="/" onClick={handleClickSymbol}>/</Button>
                </div>
                <div className={classes.row}>
                    <div className={classes.numberButton} />
                    <div className={classes.numberButton} />
                    <div className={classes.numberButton} />
                    <Button color="secondary" variant="contained" id="clear" className={classes.numberButton} onClick={clear}>C</Button>
                </div>
                <div className={classes.row}>
                    <h5 className="text-left">Status: {error}</h5>
                </div>

                <div id="test">

                </div>
            </div >
        )
}

export default withStyles(styles)(Calculator);