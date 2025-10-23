let listOfProjects = null;

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
                console.log('deleting');
                curParent.children = curParent.children.filter((i) => i.id !== id);
            }
        }
    }
}

function makeLabel(name, minimized, minEvent, maxEvent, delEvent) {
    const labelRegion = document.createElement("div");
    labelRegion.classList.add('item-label-region');
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

function projectToElement(project) {
    const minimizeEvent = () => {
        project.minimized = true;
        render(listOfProjects);
    }

    const maximizeEvent = () => {
        project.minimized = false;
        render(listOfProjects);
    }

    const deleteEvent = () => {
        deleteItem(project.id);
        render(listOfProjects);
    }

    const base = document.createElement("div");
    base.classList.add('item');
    if (project.minimized === true) {
        // Render it minimized
        const label = makeLabel(project.name, project.minimized, minimizeEvent, maximizeEvent, deleteEvent);
        base.appendChild(label);
        return base;
    } else {
        // Render it normally
        if (project.edit === true) {
            const label = makeLabel(project.name, project.minimized, minimizeEvent, maximizeEvent, deleteEvent);
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

        const label = makeLabel(project.name, project.minimized, minimizeEvent, maximizeEvent, deleteEvent);
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