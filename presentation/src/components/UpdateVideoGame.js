import React from 'react';
//grabs the environment variable for the API_URL from the process.
const API_URL = process.env.REACT_APP_API_URL;

class UpdateVideoGame extends React.Component {
    constructor(props) {
        super(props);
        const { game } = props;
        this.state = {
            name: game.name,
            type: game.type,
            genre: game.genre,
            release: game.release,
            players: game.players,
            consoles: game.consoles,
            owned: game.owned
        }
    }
    addConsole = () => {
        const newConsoles = this.state.consoles.map(x => x);
        newConsoles.push("");
        this.setState({ consoles: newConsoles });
    }
    removeConsole = (index) => {
        const newConsoles = this.state.consoles.map(x => x);
        newConsoles.splice(index, 1);
        this.setState({ consoles: newConsoles });
    }
    handleConsoleChange = (value, index) => {
        const newConsoles = this.state.consoles.map(x => x);
        newConsoles[index] = value;
        this.setState({ consoles: newConsoles });
    }
    handleChange = ({ target }) => {
        console.log(target.value);
        let value = target.type === 'checkbox' ? target.checked : target.value;
        value = target.type === 'number' ? parseInt(value) : value;
        this.setState({ [target.name]: value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${API_URL}/video-games/${this.props.game._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then(this.props.refresh)
            .then(this.props.close)
    }
    render() {
        const displayConsoles = this.state.consoles.map((console, index) => {
            return (
                <div key={index + 3000}>
                    <select
                        value={this.state.consoles[index]}
                        className="dropdown"
                        onChange={({ target }) => this.handleConsoleChange(target.value, index)}
                    >
                        <option value="">Select a Console</option>
                        <option value="PS1">PlayStation 1</option>
                        <option value="PS2">PlayStation 2</option>
                        <option value="PS3">PlayStation 3</option>
                        <option value="PS4">PlayStation 4</option>
                        <option value="PS5">PlayStation 5</option>
                        <option value="XBOX">XBOX</option>
                        <option value="XBOX 360">XBOX 360</option>
                        <option value="XBOX 1">XBOX 1</option>
                        <option value="NES">NES</option>
                        <option value="N64">Nintendo 64</option>
                        <option value="GC">Game Cube</option>
                        <option value="SWITCH">SWITCH</option>
                        <option value="PC">PC</option>
                    </select>
                    <input className="del-btn"
                        type="button"
                        value="X"
                        onClick={() => this.removeConsole(index)}
                    />
                </div>
            )
        })
        return (
            <form className="update" onSubmit={this.handleSubmit}>
                <input name="name"
                    type="text"
                    placeholder="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <input name="type"
                    type="text"
                    placeholder="Game type"
                    value={this.state.type}
                    onChange={this.handleChange}
                />
                <input name="genre"
                    type="text"
                    placeholder="Game genre"
                    value={this.state.genre}
                    onChange={this.handleChange}
                />
                {displayConsoles}
                <input type="button"
                    value="Add console"
                    onClick={this.addConsole}
                />
                <div>
                    <label htmlFor="release">First Released</label>
                    <input name="release"
                        type="date"
                        value={this.state.release}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="players">Number of Players</label>
                    <input name="players"
                        type="number"
                        value={this.state.players}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="owned">Owned</label>
                    <input name="owned"
                        type="checkbox"
                        checked={this.state.owned}
                        onChange={this.handleChange}
                    />
                </div>
                <button>Update Game</button>
            </form>
        )
    }
}

export default UpdateVideoGame;