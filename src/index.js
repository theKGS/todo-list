import { render } from "./display";
import {todo} from "./items";
import "./styles.css";

const eventDeleteItem = (e) => {};

const proj1 = new todo('Some task', 'This is the description and it should be, I think, displayed in italics. I make it a bit longer than necessary to see if it wraps around.', new Date(2025, 12, 2));
proj1.children.push(new todo('Build S', 'It is quite a conundrum this one', new Date(2025, 12, 2)));
proj1.children.push(new todo('Remodel P', 'Dunno what P is, really...', new Date(2025, 12, 2)));
proj1.children[0].children.push(new todo('Task D', 'W', new Date(2025, 12, 2)));
proj1.children[0].children.push(new todo('Task E', 'W', new Date(2025, 12, 2)));

const proj2 = new todo('Unknown project', 'I have no idea what this is about...', new Date(2025, 10, 16));

const projectList = [];
projectList.push(proj1);
projectList.push(proj2);

render(projectList);