let listOfProjects = null;

function render(projectList) {
    if (listOfProjects === null) {
        listOfProjects = projectList;
    }

    const base = document.querySelector("#container");
    base.replaceChildren(renderProjects(listOfProjects));
}

function projectToElement(project) {
    const minimizeEvent = (e) => {
        project.minimized = project.minimized ? false : true;
        console.log(project.minimized);
        render(listOfProjects);
    }

    const maximizeEvent = (e) => {
        project.minimized = project.minimized ? false : true;
        console.log(project.minimized);
        render(listOfProjects);
    }

    const base = document.createElement("div");
    base.classList.add('item');
    if (project.minimized === true) {
        const label = document.createElement("div");
        label.classList.add('item-name');
        label.textContent = project.name;
        label.addEventListener('click', maximizeEvent);
        base.appendChild(label);
        return base;
    } else {
        const label = document.createElement("div");
        label.classList.add('item-name');
        label.textContent = project.name;
        label.addEventListener('click', minimizeEvent);
        const description = document.createElement("div");
        description.classList.add('item-description');
        description.textContent = project.description;
        const date = document.createElement("div");
        date.classList.add('item-date');
        date.textContent = project.date;

        const list = document.createElement("ul");
        list.classList.add('list');

        base.appendChild(label);
        base.appendChild(description);
        base.appendChild(date);
        base.appendChild(list);

        for (const e of project.children) {
            list.appendChild(projectToElement(e));
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

    return base;
}

export { render };