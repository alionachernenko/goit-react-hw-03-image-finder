import { Component } from "react";
import { Gallery } from "./ImageGallery.styled";
import PropTypes from 'prop-types';

import { ImageGalleryItem, Modal} from "components";

export class ImageGallery extends Component {

    static propTypes = {
        images: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired
        })).isRequired
    }

    state = {
        showModal: false,
        showLikes: false,
        activeIndex: 0,
    }

    toggleModal = () => {
        this.setState(({showModal}) => ({
            showModal: !showModal
        }))
    }

    changeActiveIndex = (index) => {
        this.setState({
            activeIndex: index
        })
    }

    render () {
    const {images} = this.props
    const {activeIndex, showModal} = this.state
    const currentImage = images[activeIndex]

        return (
            <>
                {<Gallery className="gallery"> 
                    {images.map(({id, webformatURL, tags}, index) => {
                        return <ImageGalleryItem key={id} link={webformatURL} tag={tags} onClick={() => { 
                                    this.toggleModal()
                                    this.changeActiveIndex(index)
                                }}/>
                               
                    })}
                </Gallery>}
                {showModal && <Modal image={currentImage.largeImageURL} tags={currentImage.tags} onClose={this.toggleModal}/>}
            </>
        )
    }
}



