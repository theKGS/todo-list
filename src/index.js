import { render } from "./display";
import { haveStorage } from "./storage";
import "./styles.css";

const storedProjects = (haveStorage) ? localStorage.getItem("todo-list") : null;
const projectList = (storedProjects === null) ? [] : JSON.parse(storedProjects);

render(projectList);