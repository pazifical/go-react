import htm from "../vendor/htm.mjs";

const html = htm.bind(React.createElement);

export default class PoetList extends React.Component {
  constructor() {
    super();
    this.state = {
      poets: [],
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

  createList() {
    return html`<h3>Poets in the database:</h3>
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
    return html`${this.createList()}`;
  }
}
