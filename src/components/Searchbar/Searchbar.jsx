import { Component } from "react";
import {AiOutlineSearch} from 'react-icons/ai'
import PropTypes from 'prop-types';


import { Container, Form, Input, Button} from "./Searchbar.styled";

export class Searchbar extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }

    state = {
        inputValue: '',
    }

    onInputChange = (e) => {
        const {value} = e.target

        this.setState({
            inputValue: value
        })
    }

    render () {
        const {onSubmit} = this.props
        const {inputValue} = this.state
        
        return (
            <Container className="searchbar" >
                <Form className="form" onSubmit={(e) => onSubmit(e, inputValue.trim())}>
                    <Button type="submit" className="button">
                    <span className="button-label">Search</span>
                    <AiOutlineSearch size={20}/>
                    </Button>

                    <Input
                    value={inputValue}
                    onChange={this.onInputChange}
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    />
                </Form>
            </Container>
        )
    }
}