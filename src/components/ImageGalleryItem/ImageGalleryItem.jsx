import { Item } from "./ImageGalleryItem.styled"
import PropTypes from 'prop-types';


export const ImageGalleryItem = ({link, tag, onClick}) => {
    return (
        <Item className="gallery-item">
            <img src={link} alt={tag} onClick={onClick}/>
        </Item>)
}

ImageGalleryItem.propTypes = {
    link: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}