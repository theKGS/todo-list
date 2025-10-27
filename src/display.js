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

    let itemQueue = [];
    for (let i = 0; i < listOfProjects.length; i++) {
        itemQueue = [];
        itemQueue.push([[], listOfProjects[i]]);
        while (itemQueue.length > 0) {
            let curItem, curParent;
            [curParent, curItem] = itemQueue.pop();
            for (const item of curItem.children) {
                itemQueue.push([curItem, item]);
            }

            if (curItem.id === id) {
                curParent.children = curParent.children.filter((i) => i.id !== id);
            }
        }
    }
}

function getItem(id) {
    let itemQueue = [];
    for (let i = 0; i < listOfProjects.length; i++) {
        itemQueue = [];
        itemQueue.push(listOfProjects[i]);
        while (itemQueue.length > 0) {
            let curItem;
            curItem = itemQueue.pop();
            for (const item of curItem.children) {
                itemQueue.push(item);
            }

            if (curItem.id === id) {
                return curItem;
            }
        }
    }
}

function getParentId(id) {
    for (const item of listOfProjects) {
        if (item.id === id) {
            return null
        }
    }

    let itemQueue = [];
    for (let i = 0; i < listOfProjects.length; i++) {
        itemQueue = [];
        itemQueue.push([[], listOfProjects[i]]);
        while (itemQueue.length > 0) {
            let curItem, curParent;
            [curParent, curItem] = itemQueue.pop();
            for (const item of curItem.children) {
                itemQueue.push([curItem, item]);
            }

            if (curItem.id === id) {
                return curParent.id;
            }
        }
    }
}

function isParentOf(parentItem, childID) {
    let itemQueue = [];
    itemQueue.push(parentItem);
    while (itemQueue.length > 0) {
        let curItem = itemQueue.pop();
        for (const item of curItem.children) {
            itemQueue.push(item);
        }

        if (curItem.id === childID) {
            return true;
        }
    }
}

function makeLabelMinimized(project, maxEvent, delEvent, edEvent, stopEdEvent) {
    const labelRegion = document.createElement("div");
    labelRegion.classList.add('item-label-region-small');

    const label = document.createElement("div");
    label.textContent = project.name;
    label.classList.add('item-name')
    labelRegion.appendChild(label);
    label.addEventListener('dblclick', edEvent);

    const maxButton = document.createElement("div");
    maxButton.classList.add('item-maximize');
    maxButton.addEventListener('click', maxEvent);
    labelRegion.appendChild(maxButton);

    const delButton = document.createElement("div");
    delButton.classList.add('item-delete');
    delButton.addEventListener('click', delEvent);
    labelRegion.appendChild(delButton);

    return labelRegion;
}

function makeLabelMaximized(project, minEvent, delEvent, edEvent, stopEdEvent) {
    const labelRegion = document.createElement("div");
    labelRegion.classList.add('item-label-region-big');

    if (!project.editName) {
        const label = document.createElement("div");
        label.textContent = project.name;
        label.classList.add('item-name')
        label.addEventListener('dblclick', edEvent);
        labelRegion.appendChild(label)
    } else {
        const textarea = document.createElement("textarea");
        textarea.textContent = project.name;
        textarea.classList.add('item-name-edit')
        textarea.addEventListener('blur', stopEdEvent);
        textarea.id = `name-${project.id}`;
        labelRegion.appendChild(textarea);
    }

    const minButton = document.createElement("div");
    minButton.classList.add('item-minimize');
    minButton.addEventListener('click', minEvent);
    labelRegion.appendChild(minButton);

    const delButton = document.createElement("div");
    delButton.classList.add('item-delete');
    delButton.addEventListener('click', delEvent);
    labelRegion.appendChild(delButton);

    return labelRegion;
}


function focusComponent(prefix, id) {
    const createdElement = document.querySelector(`#${prefix}-${id}`);
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
        focusComponent('description', project.id);
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
        focusComponent('date', project.id);
    }

    const closeEditDateEvent = (e) => {
        project.editDate = false;
        project.date = new Date(e.target.value);
        updateStorage(listOfProjects);
        render(listOfProjects);
    };

    const editNameEvent = (e) => {
        project.editName = true;
        project.minimized = false;
        updateStorage(listOfProjects);
        render(listOfProjects);
        focusComponent('name', project.id);
    }

    const closeEditNameEvent = (e) => {
        project.name = e.target.value;
        project.editName = false;
        updateStorage(listOfProjects);
        render(listOfProjects);
    }

    const createNewTodo = () => {
        project.children.push(new todo("name", "description", new Date()));
        updateStorage(listOfProjects);
        render(listOfProjects);
    }

    const dragStartEvent = (e) => {
        e.stopPropagation();
        console.log('drag start');
        let id = e.currentTarget.dataset.id;
        e.dataTransfer.setData("text/plain", JSON.stringify(getItem(id)));
        e.dataTransfer.effectAllowed = "move";
    }

    const dragEndEvent = (e) => {
        console.log('drag end');
    }

    const dragOverEvent = (e) => {
        e.stopPropagation();
        console.log('drag over');
        e.preventDefault();
    }

    const dropEvent = (e) => {
        e.stopPropagation();
        let curId = e.currentTarget.dataset.id;
        const movedItem = JSON.parse(e.dataTransfer.getData("text/plain"));
        const idToRemove = movedItem.id;

        if (isParentOf(getItem(idToRemove), curId)) {
            console.log('Attempted to insert node into itself');
            return;
        }

        deleteItem(idToRemove);

        if (e.currentTarget instanceof HTMLUListElement) {
            const container = getItem(curId);
            container.children.push(movedItem);
            render();
        }

        if (e.currentTarget instanceof HTMLDivElement) {
            const parentId = getParentId(curId);

            if (parentId === null) {
                listOfProjects.push(movedItem);
            } else {
                const container = getItem(parentId);
                container.children.push(movedItem);
            }
            render();
        }

        console.log(e.currentTarget);
        console.log('drop');
    }

    const testClickEvent = (e) => {
        e.stopPropagation();
        let curId = e.currentTarget.dataset.id;
        console.log(curId);
    }

    const base = document.createElement("div");
    base.classList.add('item');
    base.addEventListener('dragstart', dragStartEvent);
    base.addEventListener('dragsend', dragEndEvent);
    base.addEventListener('dragover', dragOverEvent);
    base.addEventListener('drop', dropEvent);
    base.addEventListener('click', testClickEvent);
    base.draggable = 'true';
    base.dataset.id = project.id;

    if (project.minimized) {
        // Render it minimized
        const label = makeLabelMinimized(project, maximizeEvent, deleteEvent, editNameEvent, closeEditNameEvent);
        base.appendChild(label);
        return base;
    } else {
        // Render it normally
        const label = makeLabelMaximized(project, minimizeEvent, deleteEvent, editNameEvent, closeEditNameEvent);
        base.appendChild(label);

        let description = null;
        if (project.editDescription === true) {
            description = document.createElement("textarea");
            description.classList.add('item-description-edit');
            description.textContent = project.description;
            description.addEventListener('blur', closeEditDescriptionEvent);
            description.id = `description-${project.id}`;
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
            date.id = `date-${project.id}`;
        } else {
            date = document.createElement("div");
            date.classList.add('item-date');
            date.textContent = project.date;
            date.addEventListener('dblclick', editDateEvent);
        }
        base.appendChild(date);

        const list = document.createElement("ul");
        list.classList.add('list');
        list.dataset.id = project.id;
        list.addEventListener('drop', dropEvent);
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