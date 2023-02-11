import { Component } from "react";

export class Searchbar extends Component {
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
        return (
            <header className="searchbar">
                <form className="form" onSubmit={(e) => this.props.onSubmit(e, this.state.inputValue.trim())}>
                    <button type="submit" className="button">
                    <span className="button-label">Search</span>
                    </button>

                    <input
                    value={this.state.inputValue}
                    onChange={this.onInputChange}
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}