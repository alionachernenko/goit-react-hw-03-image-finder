import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {

  state = {
    searchValue: '',
  }

  onSubmit = (value) => {
    this.setState({
      searchValue: value
    })
  }

  render() {
    return (
      <div>
        <Searchbar/>
      </div>
  );
  }
  
};
