let activeList = false;
let allLists = [];
let bodyRef;

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


    bodyRef = $("body");

    bodyRef.on("click", "[data-js-return]", function(){
        // TODO - save list
        showAllLists();
    });

    bodyRef.on("click", "[data-js-add-list]", function(){
        let uuid = Date.now();
        console.log(uuid);
        activeList = uuid;
        list.uuid = uuid;
        showList(activeList);
    });

    bodyRef.on("keyup", "#listTitle", function(){
        console.log($(this).val())
        list.title = $(this).val()
    });


    // turn back on to enable dynamic rendering once templating is done
    // activeList ? showList(activeList) : showAllLists();

    
}


function showList(activeList){
    emptyListCtr();
}

function showAllLists(){
    emptyListCtr();
    $("main").append(`
            <h2>Select a list below, or create a new one to get started!</h2>
            <section class="all_lists__ctr">
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
            </section>
    `)
}

function emptyListCtr(){
    $("main").empty();
}