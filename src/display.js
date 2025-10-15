function projectToElement(project) {
    const base = document.createElement("div");
    base.classList.add('item');
    if (project.minimized === true) {
        const label = document.createElement("div");
        label.classList.add('item-name');
        label.textContent = project.name;
        base.appendChild(label);
        return base;
    } else {
        const label = document.createElement("div");
        label.classList.add('item-name');
        label.textContent = project.name;
        const description = document.createElement("div");
        description.classList.add('item-description');
        description.textContent = project.description;
        const list = document.createElement("ul");
        list.classList.add('list');

        base.appendChild(label);
        base.appendChild(description);
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

export { renderProjects };