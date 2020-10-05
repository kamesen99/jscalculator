

class DigiButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tbd: ""
      }
    }
    render() {
      return(
      <button class="btn btn-primary col-xs-3" id={this.props.id} value={this.props.num} onClick={console.log("hi")}>{this.props.num}</button>
      )
    }
  }