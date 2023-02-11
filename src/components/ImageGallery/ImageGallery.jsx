import axios from "axios";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Component } from "react";
import { RevolvingDot } from "react-loader-spinner";
import { Button } from "components/Button/Button";
import { toast } from "react-toastify";

export class ImageGallery extends Component {

    state = {
        images: [],
        status: 'idle',
        page: 1
    }

    onNextPage = () => {
        this.setState((prevState) => ({
            page: prevState.page += 1
        }))
    }

    async componentDidUpdate(prevProps, prevState) {
        const {searchQuery} = this.props
        const {page} = this.state
        const isQueryNew = prevProps.searchQuery !== this.props.searchQuery
        const isPageNew = prevState.page !== this.state.page
        
        if(isQueryNew || isPageNew) 
        {this.setState({ status: 'pending' });
        

        const response = await axios.get(`https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=32346607-2f4a4184af58487b859814685&image_type=photo&orientation=horizontal&per_page=12`)
        const images = response.data.hits

        if(isQueryNew || isPageNew) {
            if(images.length === 0) {
                    this.setState({
                    status: 'rejected',
                })
                    toast('No matches')
            }
        
            if (isQueryNew) {
                this.setState({
                status: 'resolved',
                images,
                page: 1
            })
            }
            
            if (isPageNew) {
                this.setState({
                    status: 'resolved',
                    images
                })
            }
        }
        }
}
    
    render () {
        const {images, status} = this.state
        console.log('state', this.state.page)
        console.log('props', this.props.page)

        if (status === 'pending') {
            return <RevolvingDot/> 
        }

        if (status === 'resolved') {
            return (
            <>
                <ul className="gallery"> 
                    {images.map(({id, webformatURL, tags}) => {
                        return <ImageGalleryItem key={id} link={webformatURL} tag={tags}/>
                    })}
                </ul>
                <Button onClick={this.onNextPage}/>
            </>)
        }
    }
}







// async componentDidUpdate(prevProps) {
//     const {searchQuery} = this.props
//     const {page} = this.state
//     const isQueryNew = prevProps.searchQuery !== this.props.searchQuery
    
//     if(isQueryNew) this.setState({ isLoading: true });

//     const response = await axios.get(`https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=32346607-2f4a4184af58487b859814685&image_type=photo&orientation=horizontal&per_page=12`)
//     const images = response.data.hits

//     if(isQueryNew) {
//         if(images.length === 0) {
//                 this.setState({
//                 isLoading: false,
//             })
//                 toast('No matches')
//         }
    
//         this.setState({
//             isLoading: false,
//             images
//         })
//     }
// }


// const {searchQuery} = this.props
//         const {page} = this.state

//         if(prevState.page !== this.state.page || prevProps.searchQuery !== this.props.searchQuery) {
//             this.setState({ status: 'pending' })

//         if(prevProps.searchQuery !== this.props.searchQuery) {
//             this.setState({page: 1 })
//         }
            
//             fetch(`https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=32346607-2f4a4184af58487b859814685&image_type=photo&orientation=horizontal&per_page=12`)
//             .then(res => res.json())
//             .then(data => {
//                 const images = data.hits
//                 console.log(data.hits)
            
//                 if (prevProps.searchQuery !== this.props.searchQuery) {
//                     this.setState({
//                         images: images
//                     })
//                 }

//                 if(images.length === 0) {
//                     this.setState({
//                         status: 'idle'
//                     })
//                     toast('No matches')
//                     return
//                 }

//                 if(prevState.page !== this.state.page) {
                    
//                 }
//                     this.setState({
//                         status: 'resolved',
//                         images: images
//                     })
//             })
//         }