import htm from "../vendor/htm.mjs";

const html = htm.bind(React.createElement);

export default class NavBar extends React.Component {
  render() {
    return html`<nav>
      <a href="/">Home</a>
      <a href="/components.html">Components</a>
    </nav>`;
  }
}
