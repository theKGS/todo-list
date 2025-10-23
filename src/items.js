class todo {
    name;
    description;
    date;
    children;
    minimized;
    id;
    edit;
    
    constructor(name, description, date) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.children = new Array();
        this.minimized = false;
        this.edit = false;
        this.id = crypto.randomUUID();
    }
}

export {todo};