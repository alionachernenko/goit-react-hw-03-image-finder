import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';


import { Overlay } from "./Modal.styled";
import { ModalWindow } from "./Modal.styled";

const modalRoot =  document.querySelector('#modal-root')

export class Modal extends Component {

    static propTypes = {
        image: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleEscapePress)
    }

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.handleEscapePress)
    }

    handleEscapePress = (e) => {
        const {onClose} = this.props

        if (e.code === 'Escape') onClose()
    }

    handleOverlayClick = (e) => {
        const {onClose} = this.props

        if (e.target === e.currentTarget) onClose()
    }

    render() {
        const {image, tags} = this.props

        return createPortal(
            <Overlay className="overlay" onClick={this.handleOverlayClick}>
                <ModalWindow className="modal">
                    <img src={image} alt={tags}/>
                </ModalWindow>
            </Overlay>, modalRoot
        )
    }
}