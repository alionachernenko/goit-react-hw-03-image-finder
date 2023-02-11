import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {

  state = {
    searchValue: '',
  }

  handleSubmit = (e, value) => {
    e.preventDefault()
  
    this.setState({
      searchValue: value,
    })

  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit}/>
        <ImageGallery  searchQuery={this.state.searchValue}/>
        <ToastContainer autoClose={3000}/>
      </div>
  );
  }
  
};
