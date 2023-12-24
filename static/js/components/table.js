import htm from "../vendor/htm.mjs";

const html = htm.bind(React.createElement);

export default class PoetTable extends React.Component {
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

  async handleDelete(poet) {
    console.log("delete", poet);
    const response = await fetch("/api/poet", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(poet),
    });
  }

  createTable() {
    return html`<h3>Poets in the database:</h3>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Birth Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${this.state.poets.map(
            (poet) =>
              html`<tr>
                <td>${poet.first_name}</td>
                <td>${poet.last_name}</td>
                <td>${poet.birth_year}</td>
                <td>
                  <button onClick=${() => this.handleDelete(poet)}>
                    Delete
                  </button>
                </td>
              </tr>`
          )}
        </tbody>
      </table>`;
  }

  render() {
    return html`${this.createTable()}`;
  }
}
