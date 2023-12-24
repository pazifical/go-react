import htm from "../vendor/htm.mjs";
import NavBar from "../components/navbar.js";
import PoetList from "../components/list.js";

const html = htm.bind(React.createElement);

function App() {
  return html`<${NavBar} />
    <div class="container">
      <h1>React without a build step is awesome!</h1>
      <${PoetList} />
    </div>`;
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(App());
