import htm from "../vendor/htm.mjs";

const html = htm.bind(React.createElement);

export default class PoetForm extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: null,
      last_name: null,
      birth_year: null,
    };
  }

  onSubmit(e) {
    alert(this.state);
    e.preventDefault();
  }

  createForm() {
    return html` <h3>Please enter a poet:</h3>
      <form action="/api/poet" method="post">
        <div class="input">
          <label>First name</label><br />
          <input
            type="text"
            name="first_name"
            value=${this.state.first_name}
            onInput=${(e) => this.setState({ first_name: e.target.value })}
            required
          /><br />
        </div>
        <div class="input">
          <label>Last name</label><br />
          <input
            type="text"
            name="last_name"
            value=${this.state.last_name}
            onInput=${(e) => this.setState({ last_name: e.target.value })}
            required
          /><br />
        </div>

        <div class="input">
          <label>Birth year</label><br />
          <input
            type="number"
            name="birth_year"
            value=${this.state.birth_year}
            onInput=${(e) => this.setState({ birth_year: e.target.value })}
            required
          />
        </div>
        <br /><br />
        <input type="submit" value="Send" />
      </form>`;
  }

  render() {
    return html`${this.createForm()}`;
  }
}
