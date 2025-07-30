import { Listitem } from './listitem';

export interface List {
    uuid: number;
    title: string;
    items: Array<Listitem>;
}
