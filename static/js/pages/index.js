import htm from "../vendor/htm.mjs";
import NavBar from "../components/navbar.js";
import PoetList from "../components/list.js";
import PoetForm from "../components/form.js";
import PoetTable from "../components/table.js";

const html = htm.bind(React.createElement);

function App() {
  return html`<${NavBar} />
    <div class="container">
      <h1>React without a build step is awesome!</h1>
      <div class="card">
        <div class="card">
          <${PoetForm} />
        </div>
        <div class="card">
          <${PoetList} />
        </div>
        <div class="card">
          <${PoetTable} />
        </div>
      </div>
    </div>`;
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(App());
