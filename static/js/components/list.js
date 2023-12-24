import htm from "../vendor/htm.mjs";

const html = htm.bind(React.createElement);

export default class PoetList extends React.Component {
  constructor() {
    super();
    this.state = {
      poets: [],
      first_name: null,
      last_name: null,
      birth_year: null,
    };
  }

  async fetchData() {
    const response = await fetch("/api/poet");
    const poets = await response.json();
    this.setState({ poets: poets });
  }

  componentDidMount() {
    this.timer = setInterval(() => this.fetchData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onSubmit(e) {
    alert(this.state);
    e.preventDefault();
  }

  createForm() {
    return html` <h3>Please enter a poet:</h3>
      <form action="/api/poet" method="post">
        <label>First name</label><br />
        <input
          type="text"
          name="first_name"
          value=${this.state.first_name}
          onInput=${(e) => this.setState({ first_name: e.target.value })}
          required
        /><br />
        <label>Last name</label><br />
        <input
          type="text"
          name="last_name"
          value=${this.state.last_name}
          onInput=${(e) => this.setState({ last_name: e.target.value })}
          required
        /><br />
        <label>Birth year</label><br />
        <input
          type="number"
          name="birth_year"
          value=${this.state.birth_year}
          onInput=${(e) => this.setState({ birth_year: e.target.value })}
          required
        /><br /><br />
        <input type="submit" value="Send" />
      </form>`;
  }

  createList() {
    return html` <h3>Poets in the database:</h3>
      <ul>
        ${this.state.poets.map(
          (poet) =>
            html`<li>
              ${poet.first_name} ${poet.last_name} (*${poet.birth_year})
            </li>`
        )}
      </ul>`;
  }

  render() {
    return html`${this.createForm()} <br />
      <br />
      ${this.createList()}`;
  }
}
