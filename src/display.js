let listOfProjects = null;

function render(projectList) {
    if (listOfProjects === null) {
        listOfProjects = projectList;
    }

    const base = document.querySelector("#container");
    base.replaceChildren(renderProjects(listOfProjects));
}

function makeLabel(name, minimized, minEvent, maxEvent) {
    const labelRegion = document.createElement("div");
    labelRegion.classList.add('item-label-region');
    const label = document.createElement("div");
    label.textContent = name;
    labelRegion.appendChild(label);

    if (!minimized) {
        const minButton = document.createElement("img");
        minButton.classList.add('item-minimize');
        minButton.addEventListener('click', minEvent);
        labelRegion.appendChild(minButton);
    } else {
        const maxButton = document.createElement("img");
        maxButton.classList.add('item-maximize');
        maxButton.addEventListener('click', maxEvent);
        labelRegion.appendChild(maxButton);
    }

    return labelRegion;
}

function projectToElement(project) {
    const minimizeEvent = () => {
        project.minimized = true;
        render(listOfProjects);
    }

    const maximizeEvent = () => {
        project.minimized = false;
        render(listOfProjects);
    }

    const base = document.createElement("div");
    base.classList.add('item');
    if (project.minimized === true) {
        // Render it minimized
        const label = makeLabel(project.name, project.minimized, minimizeEvent, maximizeEvent);
        base.appendChild(label);
        return base;
    } else {
        // Render it normally
        const label = makeLabel(project.name, project.minimized, minimizeEvent, maximizeEvent);
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