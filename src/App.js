import React from 'react';
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./App.styles";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      last: "",
      total: "0",
      sub: "",
      operator: "",
      error: "Message"
    }
  }
  handleChange(e) { }

  equals() {
    let ans = eval(this.state.total);
    this.setState({
      total: ans
    })
  }

  clear() {
    //console.log("Clear")
    this.setState({
      last: this.state.total,
      total: "0",
      sub: "",
      error: "Message",
      operator: ""
    })
  }

  handleClickDecimal(e) {
    var dec = true;
    this.handleClickDigit(e, dec);
  }

  handleClickSymbol(e) {
    //console.log("clicked a symbol");
    var symbol = true;
    var dec = false;
    this.setState({
      operator: e.target.value,
      sub: ""
    })
    //console.log(this.state.operator)
    this.handleClickDigit(e, dec, symbol);
  }

  //Simplify this by passing a prop which tells the function what type of character I'm passing?
  handleClickDigit = (e, dec, symbol) => {
    const digit = e.target.value;
    const endsWithOperator = /[*+/-]$/;
    const endsWithNegativeSign = /.*[*/+]-$/;

    //console.log(e.target.value)
    if (this.state.total === "0") {
      this.setState({
        last: e.target.value,
        total: e.target.value,
        sub: e.target.value
      })
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
      //const isOperator = /[/+‑\*]/
      //console.log("symbol = true")
      //console.log(e.target.value)
      //console.log(this.state.total.slice(-1))
      //console.log(isOperator.test(this.state.total.slice(-1)))
      // was last character an operator?

      if (!endsWithOperator.test(this.state.total)) {
        //console.log("does not end with operator")
        //console.log(this.state.total)
        this.setState({
          last: this.state.total,
          total: this.state.total + e.target.value
        });
        //
      } else if (!endsWithNegativeSign.test(this.state.total)) {
        //console.log(this.state.total)
        //console.log(e.target.value)
        //console.log(this.state.total + e.target.value)
        //console.log(endsWithNegativeSign.test(this.state.total + e.target.value))
        //console.log("does not end with negative sign")
        //console.log(endsWithNegativeSign.test(this.state.total + e.target.value))
        this.setState({
          total: (endsWithNegativeSign.test(this.state.total + e.target.value)
            ? this.state.total : this.state.last) + e.target.value
        });
      } else if (e.target.value !== '‑') {
        //console.log("input is not (-)")
        this.setState({
          total: this.state.last + e.target.value
        });
      } else {
        //console.log("hit exception")
      }
    }

    //just a digit being passed
    else {
      //console.log("hit exception, just a digit")
      //console.log(this.state.sub)
      this.setState({
        last: e.target.value,
        total: this.state.total.concat(e.target.value)
        //sub: this.state.sub.concat(e.target.value)
      })
    }
    //console.log(this.state)
  }

  renderCalculatorButton = val => {
    return (
      <Button color="primary" value={val} id={val} onClick={this.handleClickDigit}>{val}</Button>
    )
  }

  render() {
    //console.log(this.state.operator);
    const { classes } = this.props;

    return (
      <div className={classes.calcContainer}>
        <div className={classes.headerRow}>
          <h3 className={classes.informationDisplay} id="display">{this.state.total}</h3>
        </div>
        <div className={classes.row}>
          <Button color="primary" variant="contained" className={classes.numberButton} value="1" id="one" onClick={this.handleClickDigit}>1</Button>
          <Button color="primary" variant="contained" className={classes.numberButton} value="2" id="two" onClick={this.handleClickDigit}>2</Button>
          <Button color="primary" variant="contained" className={classes.numberButton} value="3" id="three" onClick={this.handleClickDigit}>3</Button>
          <Button color="default" variant="contained" className={classes.operatorButton} id="add" value="+" onClick={this.handleClickSymbol}>+</Button>
        </div>
        <div className={classes.row}>
          <Button color="primary" variant="contained" className={classes.numberButton} value="4" id="four" onClick={this.handleClickDigit}>4</Button>
          <Button color="primary" variant="contained" className={classes.numberButton} value="5" id="five" onClick={this.handleClickDigit}>5</Button>
          <Button color="primary" variant="contained" className={classes.numberButton} value="6" id="six" onClick={this.handleClickDigit}>6</Button>
          <Button id="subtract" color="default" variant="contained" value="-" className={classes.operatorButton} onClick={this.handleClickSymbol}>-</Button>
        </div>
        <div className={classes.row}>
          <Button color="primary" variant="contained" className={classes.numberButton} value="7" id="seven" onClick={this.handleClickDigit}>7</Button>
          <Button color="primary" variant="contained" className={classes.numberButton} value="8" id="eight" onClick={this.handleClickDigit}>8</Button>
          <Button color="primary" variant="contained" className={classes.numberButton} value="9" id="nine" onClick={this.handleClickDigit}>9</Button>
          <Button id="multiply" color="default" variant="contained" value="*" className={classes.operatorButton} onClick={this.handleClickSymbol}>*</Button>
        </div>
        <div className={classes.row}>
          <Button id="decimal" color="default" variant="contained" className={classes.operatorButton} value="." onClick={this.handleClickDecimal}>.</Button>
          <Button id="zero" color="primary" variant="contained" className={classes.numberButton} value="0" onClick={this.handleClickDigit}>0</Button>
          <Button id="equals" color="default" variant="contained" className={classes.operatorButton} onClick={this.equals}>=</Button>
          <Button id="divide" color="default" variant="contained" className={classes.operatorButton} value="/" onClick={this.handleClickSymbol}>/</Button>
        </div>
        <div className={classes.row}>
          <div className={classes.numberButton} />
          <div className={classes.numberButton} />
          <div className={classes.numberButton} />
          <Button color="secondary" variant="contained" id="clear" className={classes.numberButton} onClick={this.clear}>C</Button>
        </div>
        <div className={classes.row}>
          <h5 className="text-left">Status: {this.state.error}</h5>
        </div>

        <div id="test">

        </div>
      </div >
    )
  }
}

export default withStyles(styles)(App);