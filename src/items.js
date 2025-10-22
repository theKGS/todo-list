class todo {
    name;
    description;
    date;
    children;
    minimized;
    id;

    constructor(name, description, date) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.children = new Array();
        this.minimized = false;
    }
}

export {todo};