import React from 'react';
//import logo from './logo.svg';
import './App.css';

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
    this.handleClickDigit = this.handleClickDigit.bind(this);
    this.handleClickSymbol = this.handleClickSymbol.bind(this);
    this.handleClickDecimal = this.handleClickDecimal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.equals = this.equals.bind(this);
    this.clear = this.clear.bind(this);
  }
  handleChange(e) {}
  
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
  
  handleClickDecimal(e){
    var dec = true;
    this.handleClickDigit(e, dec);
  }
  
  handleClickSymbol(e){
    //console.log("clicked a symbol");
    var symbol =  true;
    var dec = false;
    this.setState({
      operator: e.target.value,
      sub: ""
    })
    //console.log(this.state.operator)
    this.handleClickDigit(e, dec, symbol);
  }
  
  //Simplify this by passing a prop which tells the function what type of character I'm passing?
  handleClickDigit(e, dec, symbol) {
    
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
      
      if(testRegex.test(testStr)) {
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

  render() {
    //console.log(this.state.operator);
    return(
      <div id="calculator">
        <h3 className="text-center" id="display">{this.state.total}</h3>
        <div id="button-container">
        <div className="row">
          <button className="btn btn-primary col-xs-3" value="1" id="one" onClick={this.handleClickDigit}>1</button>
          <button className="btn btn-primary col-xs-3" value="2" id="two" onClick={this.handleClickDigit}>2</button>
          <button className="btn btn-primary col-xs-3" value="3" id="three" onClick={this.handleClickDigit}>3</button>
          <button className="btn btn-info col-xs-3" id="add" value="+" onClick={this.handleClickSymbol}>+</button>
        </div>
        <div className="row">
          <button className="btn btn-primary col-xs-3" value="4" id="four" onClick={this.handleClickDigit}>4</button>
          <button className="btn btn-primary col-xs-3" value="5" id="five" onClick={this.handleClickDigit}>5</button>
          <button className="btn btn-primary col-xs-3" value="6" id="six" onClick={this.handleClickDigit}>6</button>
          <button className="btn btn-info col-xs-3" id="subtract" value="-" onClick={this.handleClickSymbol}>-</button>
        </div>
        <div className="row">
          <button className="btn btn-primary col-xs-3" value="7" id="seven" onClick={this.handleClickDigit}>7</button>
          <button className="btn btn-primary col-xs-3" value="8" id="eight" onClick={this.handleClickDigit}>8</button>
          <button className="btn btn-primary col-xs-3" value="9" id="nine" onClick={this.handleClickDigit}>9</button>
          <button className="btn btn-info col-xs-3" id="multiply" value="*" onClick={this.handleClickSymbol}>*</button>
        </div>
        <div className="row">
          <button className="btn btn-info col-xs-3" id="decimal" value="." onClick={this.handleClickDecimal}>.</button>
          <button className="btn btn-primary col-xs-3" value="0" id="zero" onClick={this.handleClickDigit}>0</button>
          <button className="btn btn-secondary col-xs-3" id="equals" onClick={this.equals}>=</button>
          <button className="btn btn-info col-xs-3" id="divide" value="/" onClick={this.handleClickSymbol}>/</button>
        </div>
        <div className="row">
          <button className="btn col-xs-3 blank"></button>
          <button className="btn col-xs-3 blank"></button>
          <button className="btn col-xs-3 blank"></button>
          <button className="btn btn-danger col-xs-3" id="clear" onClick={this.clear}>C</button>
        </div>
        </div>
        <h5 className="text-left">Status: {this.state.error}</h5>
        <div id="test">
          
        </div>
      </div>
    )
  }
}
export default App;
