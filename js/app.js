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
    title: "Untitled list",
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

    bodyRef.on("click", "[data-js-add-list-item]", function(){
        let newID = Date.now();
        let newListItem = {
            uuid: newID,
            title: "",
            desc: "",
            status: "to_do",
        }
        list.listItems.push(newListItem);
        makeListItemUI(newListItem);

    });

    bodyRef.on("change", "#listTitle", function(){
        console.log($(this).val())
        list.title = $(this).val();
    });

    bodyRef.on("change", ".list_ctr__item select, .list_ctr__item input, .list_ctr__item textarea", function(){
        let uuid = parseInt($(this).closest("[data-js-list-item]").data("js-list-item"));
        let listAttr = $(this).data("js-change-prop");
        console.log(uuid)
        let listItem = findItemInList(list, uuid);
        listItem[listAttr] = $(this).val();
        findItemInList(list, uuid);
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

function makeListItemUI(item){
    let newItemUI = $(`
        <div class="list_ctr__item" data-js-list-item="${item.uuid}">
            <select name="itemStatus" data-js-change-prop="status" id="itemStatus${item.uuid}">
                <option value="to_do">To do</option>
                <option value="in_progress">In progress</option>
                <option value="on_hold">On hold</option>
                <option value="completed">Completed!</option>
            </select>
            <input type="text" data-js-change-prop="title" id="itemTitle${item.uuid}" placeholder="new list item">
            <button data-js-delete-list-item="${item.uuid}">delete item</button>
            <textarea data-js-change-prop="desc" placeholder="description"></textarea>
        </div>
    `)
    newItemUI.find(`option[value=${item.status}`).attr("selected", "true");
    $(".list_ctr__items").append(newItemUI);
}

function findItemInList(list, id){
    let targetItem = list.listItems.find((el)=>{return el.uuid === id});
    console.log(targetItem)
    return targetItem;
}
