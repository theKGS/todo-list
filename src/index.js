import { renderProjects } from "./display";
import {todo} from "./items";
import "./styles.css";

const eventDeleteItem = (e) => {};

const proj = new todo('Some task', 'This is the description and it is, I think, ideally displayed in italics.', 'H');
proj.children.push(new todo('Build S', 'It is quite a conundrum this one', 'A'));
proj.children.push(new todo('Remodel P', 'Dunno what P is, really...', 'B'));
proj.children[0].children.push(new todo('Q', 'W', 'O'));
proj.children[0].children.push(new todo('Q', 'W', 'O'));
proj.children[1].minimized = true;

const projectList = [];
projectList.push(proj);

const base = document.querySelector("#container");
base.appendChild(renderProjects(projectList));
console.log("out!");