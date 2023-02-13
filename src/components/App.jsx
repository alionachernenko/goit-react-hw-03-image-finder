import { Component } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import { ImageFinder } from "./App.styled";

import { getData } from "services/images-api";
import { Button, Loader, ImageGallery, Searchbar } from "components";

export class App extends Component {

  state = {
    searchQuery: '',
    page: 1,
    showButton: false,
    images: [],
    isLoading: false
  }
  
  async componentDidUpdate(_, prevState) {
    const {page, searchQuery} = this.state
    
    const isQueryNew = prevState.searchQuery !== this.state.searchQuery
    const isPageNew = prevState.page !== this.state.page

    if(isQueryNew || isPageNew) {
        this.setState({ isLoading: true });

        try {

            const data = await getData(searchQuery, page)
            const {hits, totalHits} = data

            if(totalHits === 0) {
                this.setState({
                    status: 'rejected',
                })
                toast.info('🤷‍♂️ No matches found');
            }

            if(totalHits > 12 && hits.length >= 12) {
                this.setState({
                    showButton: true
                })
            }
            
            else{
                this.setState({
                    showButton: false
                })
            }

            if(isQueryNew) {
              this.setState({
              images: [...hits]
            })}
        
            if (isPageNew) {
                this.setState({
                    images: [...this.state.images, ...hits]
                })
            }
        }

        catch(error) {
            console.log(error)
            toast.error('Something went wrong')
        }

        finally {
          this.setState({ isLoading: false });
        }
    }
}

  onFormSubmit = (e, value) => {
    e.preventDefault()
    if(value.length === 0) {
      toast('Please enter something')
      return
    }
  
    this.setState({
      searchQuery: value,
      page: 1,
      images: []
    })
  }

  onNextPage = () => {
    this.setState(({page}) => ({
        page: page += 1,
    }))
}

  render() {
    const { showButton, images, isLoading } = this.state

    return (
      <ImageFinder>
        <Searchbar onSubmit={this.onFormSubmit}/>
        <ImageGallery  images={images}/>
        {isLoading && <Loader/>}
        {showButton && !isLoading && <Button onClick={this.onNextPage}/>}
        <ToastContainer autoClose={3000}/>
      </ImageFinder>
  );
  }
};
