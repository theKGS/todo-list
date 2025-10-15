class todo {
    name;
    description;
    date;
    children;

    constructor(name, description, date) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.children = new Array();
    }
}

export {todo};