export const ImageGalleryItem = ({link, tag}) => {
    return (<li className="gallery-item">
                <img src={link} alt={tag} />
            </li>)
}