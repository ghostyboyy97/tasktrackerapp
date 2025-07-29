let activeList = false;
let allLists = [];

let list = {
    uuid: 0,
    title: "",
    listItems: [],
}

let listItem = {
    uuid: 0,
    title: "",
    desc: "",
    itemStatus: "to_do",
}

function main(){

    console.log("main working");

    activeList ? showList(activeList) : showAllLists();


}


function showList(activeList){

}

function showAllLists(){
    emptyListCtr();
    $("main").append(`
            <h2>Select a list below, or create a new one to get started!</h2>
            <div class="list_ctr">
                <div class="list_entry">
                    <div class="list_entry__icon">></div>
                    <div class="list_entry__title">Placeholder list 1</div>
                    <button class="list_entry__button">View list -></button>
                </div>
                <div class="list_entry">
                    <div class="list_entry__icon">></div>
                    <div class="list_entry__title">Placeholder list 2</div>
                    <button class="list_entry__button">View list -></button>
                </div>
                <div class="list_entry">
                    <div class="list_entry__icon">></div>
                    <div class="list_entry__title">Placeholder list 3</div>
                    <button class="list_entry__button">View list -></button>
                </div>
                <button class="list_entry add_list" data-js-add-list="">Make a new list</button>
            </div>
    `)
}

function emptyListCtr(){
    $("main").empty();
}