import { render } from "./display";
import {todo} from "./items";
import "./styles.css";

const eventDeleteItem = (e) => {};

const proj1 = new todo('Build a Gizmo', 'It will take some time to do this one, I think.', new Date(2025, 12, 2));
proj1.children.push(new todo('Build Subcomponent', 'It is quite a conundrum this one', new Date(2025, 12, 2)));
proj1.children.push(new todo('Remodel P', 'Dunno what P is, really...', new Date(2025, 12, 2)));
proj1.children[0].children.push(new todo('Task D', 'W', new Date(2025, 12, 2)));
proj1.children[0].children.push(new todo('Task E', 'W', new Date(2025, 12, 2)));

const proj2 = new todo('Construct a Thing', 'I have no idea what this is about...', new Date(2025, 10, 16));

const projectList = [];
projectList.push(proj1);
projectList.push(proj2);

render(projectList);