export interface ListItem{
    id: number,
    title: string;
    status: string;
    desc: string;
}

export interface List{
    id: number;
    name: string;
    listItems: Array<ListItem>;
}