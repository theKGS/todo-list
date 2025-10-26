import { todo } from "./items";
import { updateStorage } from "./storage";

let listOfProjects = null;

const createNewProject = () => {
    listOfProjects.push(new todo("project name", "description", new Date()));
    updateStorage(listOfProjects);
    render(listOfProjects);
}

function render(projectList) {
    if (listOfProjects === null) {
        listOfProjects = projectList;
    }

    const base = document.querySelector("#container");
    base.replaceChildren(renderProjects(listOfProjects));
}

function deleteItem(id) {
    listOfProjects = listOfProjects.filter((i) => i.id !== id);

    let brz = [];
    for (let i = 0; i < listOfProjects.length; i++) {
        brz = [];
        brz.push([[], listOfProjects[i]]);
        while (brz.length > 0) {
            let curItem, curParent;
            [curParent, curItem] = brz.pop();
            for (const item of curItem.children) {
                brz.push([curItem, item]);
            }

            if (curItem.id === id) {
                curParent.children = curParent.children.filter((i) => i.id !== id);
            }
        }
    }
}

function makeLabel(name, minimized, minEvent, maxEvent, delEvent) {
    const labelRegion = document.createElement("div");
    if (!minimized) {
        labelRegion.classList.add('item-label-region-big');
    } else {
        labelRegion.classList.add('item-label-region-small');
    }

    const label = document.createElement("div");
    label.textContent = name;
    label.classList.add('item-name')
    labelRegion.appendChild(label);

    if (!minimized) {
        const minButton = document.createElement("div");
        minButton.classList.add('item-minimize');
        minButton.addEventListener('click', minEvent);
        labelRegion.appendChild(minButton);
    } else {
        const maxButton = document.createElement("div");
        maxButton.classList.add('item-maximize');
        maxButton.addEventListener('click', maxEvent);
        labelRegion.appendChild(maxButton);
    }

    const delButton = document.createElement("div");
    delButton.classList.add('item-delete');
    delButton.addEventListener('click', delEvent);
    labelRegion.appendChild(delButton);

    return labelRegion;
}

function focusComponent(id) {
    const createdElement = document.querySelector(`#a${id}`);
    createdElement.focus();
}

function projectToElement(project) {
    const minimizeEvent = () => {
        project.minimized = true;
        updateStorage(listOfProjects);
        render(listOfProjects);
    }

    const maximizeEvent = () => {
        project.minimized = false;
        updateStorage(listOfProjects);
        render(listOfProjects);
    }

    const deleteEvent = () => {
        deleteItem(project.id);
        updateStorage(listOfProjects);
        render(listOfProjects);
    }

    const editDescriptionEvent = () => {
        project.editDescription = true;
        updateStorage(listOfProjects);
        render(listOfProjects);
        focusComponent(project.id);
    }

    const closeEditDescriptionEvent = (e) => {
        project.description = e.target.value;
        project.editDescription = false;
        updateStorage(listOfProjects);
        render(listOfProjects);
    }

    const editDateEvent = () => {
        project.editDate = true;
        updateStorage(listOfProjects);
        render(listOfProjects);
        focusComponent(project.id);
    }

    const closeEditDateEvent = (e) => {
        project.editDate = false;
        project.date = new Date(e.target.value);
        updateStorage(listOfProjects);
        render(listOfProjects);
    };

    const createNewTodo = () => {
        project.children.push(new todo("name", "description", new Date()));
        updateStorage(listOfProjects);
        render(listOfProjects);
    }

    const dragStartEvent = () => {
        console.log('drag start');
    }

    const dragEndEvent = () => {
        console.log('drag end');
    }

    const base = document.createElement("div");
    base.classList.add('item');

    base.addEventListener('dragstart', dragStartEvent);
    base.addEventListener('dragsend', dragEndEvent);

    base.draggable = 'true';

    if (project.minimized === true) {
        // Render it minimized
        const label = makeLabel(project.name, project.minimized, minimizeEvent, maximizeEvent, deleteEvent);
        base.appendChild(label);
        return base;
    } else {
        // Render it normally
        const label = makeLabel(project.name, project.minimized, minimizeEvent, maximizeEvent, deleteEvent);
        base.appendChild(label);

        let description = null;
        if (project.editDescription === true) {
            description = document.createElement("textarea");
            description.classList.add('item-description-edit');
            description.textContent = project.description;
            description.addEventListener('blur', closeEditDescriptionEvent);
            description.id = `a${project.id}`;
        } else {
            description = document.createElement("div");
            description.classList.add('item-description');
            description.textContent = project.description;
            description.addEventListener('dblclick', editDescriptionEvent);
        }
        base.appendChild(description);

        let date = null;
        if (project.editDate === true) {
            date = document.createElement("textarea");
            date.classList.add('item-date-edit');
            date.textContent = project.date;
            date.addEventListener('blur', closeEditDateEvent);
            date.id = `a${project.id}`;
        } else {
            date = document.createElement("div");
            date.classList.add('item-date');
            date.textContent = project.date;
            date.addEventListener('dblclick', editDateEvent);
        }
        base.appendChild(date);

        const list = document.createElement("ul");
        list.classList.add('list');
        base.appendChild(list);

        for (const e of project.children) {
            list.appendChild(projectToElement(e));
        }

        if (project.minimized === false) {
            const addTodo = document.createElement("div");
            addTodo.classList.add('add-new-todo');
            addTodo.addEventListener('click', createNewTodo);
            list.appendChild(addTodo);
        }

        return base;
    }
}

function renderProjects(list) {
    const base = document.createElement("ul");
    base.classList.add('list');

    for (const e of list) {
        base.appendChild(projectToElement(e));
    }

    const addTodo = document.createElement("div");
    addTodo.classList.add('add-new-project');
    addTodo.addEventListener('click', createNewProject);
    base.appendChild(addTodo);

    return base;
}

export { render };