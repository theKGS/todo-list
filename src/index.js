import { renderProjects } from "./display";
import {todo} from "./items";
import "./styles.css";

const eventDeleteItem = (e) => {};

const proj = new todo('Some task', 'This is the description and it should be, I think, displayed in italics. I make it a bit longer than necessary to see if it wraps around.', new Date(2025, 12, 2));
proj.children.push(new todo('Build S', 'It is quite a conundrum this one', new Date(2025, 12, 2)));
proj.children.push(new todo('Remodel P', 'Dunno what P is, really...', new Date(2025, 12, 2)));
proj.children[0].children.push(new todo('Q', 'W', new Date(2025, 12, 2)));
proj.children[0].children.push(new todo('Q', 'W', new Date(2025, 12, 2)));
proj.children[1].minimized = true;

const projectList = [];
projectList.push(proj);

const base = document.querySelector("#container");
base.appendChild(renderProjects(projectList));
console.log("out!");