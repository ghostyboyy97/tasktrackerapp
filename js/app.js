let activeList = 0;
let allLists = [];
const LIST_STORAGE_KEY = "__tasktrackerapp_lists__";
const LIST_ACTIVE_STORAGE_KEY = "__tasktrackerapp_list_key__";
let bodyRef;
let animTimeout;

let list = {
    uuid: 0,
    title: "Untitled list",
    listItems: [],
}

let listItem = {
    uuid: 0,
    title: "",
    desc: "",
    itemStatus: "to_do",
}

function main(){

    $(window).on("resize", function(){
        resizeExtra();
    });
    resizeExtra();

    bodyRef = $("body");
    
    bodyRef.on("click", "[data-js-readme]", function(){
        window.open("https://github.com/ghostyboyy97/tasktrackerapp", "_blank");
    });

    bodyRef.on("click", "[data-js-return]", function(){
        saveList(list);
        activeList = false;
        showAllLists();
        makeAllLists();
    });

    bodyRef.on("click", "[data-js-add-list]", function(){
        let uuid = Date.now();
        activeList = uuid;
        list.uuid = uuid;
        showList(list);
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

    bodyRef.on("click", ".list_entry", function(){
        if ($(this).hasClass("add_list")){ return; }
        let uuid = parseInt($(this).data("js-list-id"));
        activeList = uuid;
        let listToShow = allLists.findIndex((el)=>{return el.uuid === uuid});
        list = allLists[listToShow];
        showList(list);
    });

    bodyRef.on("change", "#listTitle", function(){
        list.title = $(this).val();
    });

    bodyRef.on("change", ".list_ctr__item select, .list_ctr__item input, .list_ctr__item textarea", function(){
        let uuid = parseInt($(this).closest("[data-js-list-item]").data("js-list-item"));
        let listAttr = $(this).data("js-change-prop");
        let listItem = findItemInList(list, uuid);
        listItem[listAttr] = $(this).val();
        saveList(list);
    });

    bodyRef.on("click", "[data-js-delete-list-item]", function(){
        let uuid = $(this).data("js-delete-list-item");
        let idxToDelete = list.listItems.findIndex((el)=>{return el.uuid === uuid});
        list.listItems.splice(idxToDelete, 1);
        $(this).closest(`[data-js-list-item]`).remove();
        saveList(list);
    });



    loadLists();

    
}


function showList(list){
    emptyListCtr();

    $("main").append($(`<section class="list_ctr">
        <button class="list_ctr__back nav_button" data-js-return="">Back to list view</button>
        <input type="text" id="listTitle" placeholder="Add a list title" value="${list.title}">
        <div class="list_ctr__items"></div>
        <button class="nav_button" title="Add item to the task list" data-js-add-list-item=""><img src="./img/plus.svg"></button>
    </section>`));
    if (list.listItems.length > 0){

        list.listItems.forEach((item)=>{
            makeListItemUI(item);
        });
    }

    localStorage.setItem(LIST_ACTIVE_STORAGE_KEY, JSON.stringify(list.uuid));

    setRendered();
}

function makeListRow(list){
    return $(`<div class="list_entry" data-js-list-id=${list.uuid}>
        <div class="list_entry__icon"><img src="./img/carat.svg"></div>
        <div class="list_entry__title">${list.title}</div>
        <button class="list_entry__button">View list<img src="./img/arrow.svg"></button>
    </div>`);
}

function showAllLists(){
    emptyListCtr();
    $("main").append(`
            <h2>Select a list below, or create a new one to get started!</h2>
            <section class="all_lists__ctr">
                <button class="list_entry add_list nav_button" data-js-add-list="">Make a new list</button>
            </section>
    `)
}

function emptyListCtr(){
    $("main").empty().removeClass("rendered");
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
            <input type="text" data-js-change-prop="title" id="itemTitle${item.uuid}" placeholder="new list item" value="${item.title}">
            <button data-js-delete-list-item="${item.uuid}" title="Delete this entry"><img src="./img/trash.svg"></button>
            <textarea data-js-change-prop="desc" placeholder="description" rows="3">${item.desc}</textarea>
        </div>
    `);
    newItemUI.find(`option[value=${item.status}`).attr("selected", "true");
    $(".list_ctr__items").append(newItemUI);
}

function findItemInList(list, id){
    let targetItem = list.listItems.find((el)=>{return el.uuid === id});
    return targetItem;
}





function saveList(list){
    let listID = list.uuid;
    let listIdx = allLists.findIndex((el)=>{return el.uuid === listID});
    if (listIdx >= 0){ // -1 = no list exists
        allLists.splice(listIdx, 1, list); // replace it at that idx
    } else { // doesn't exist, new list saved
        allLists.push(list);
    }
    localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(allLists));
}

function loadLists(){
    let listsFromStorage = localStorage.getItem(LIST_STORAGE_KEY);
    if (listsFromStorage !== null){
        listsFromStorage = JSON.parse(listsFromStorage);
        allLists = listsFromStorage;

        let activeListKey = localStorage.getItem(LIST_ACTIVE_STORAGE_KEY);
        if (activeListKey !== null){
            activeListKey = parseInt(activeListKey);
            if (activeListKey != 0){
                let targetList = allLists.find((el)=>{return el.uuid === activeListKey});
                if (targetList){
                    showList(targetList);
                } else {
                    showAllLists();
                    makeAllLists();
                }
            } else {
                showAllLists();
                makeAllLists();
            }
        } else {
            showAllLists();
            makeAllLists();
        }
    } else {
        showAllLists();
        makeAllLists();
    }



}

function makeAllLists(){
    if (allLists.length > 0){
        allLists.forEach((list)=>{
            let newRow = makeListRow(list);
            $(".add_list").before(newRow);
        });
    }
    localStorage.setItem(LIST_ACTIVE_STORAGE_KEY, JSON.stringify(0));
    setRendered();
}

function setRendered(){
    clearTimeout(animTimeout);
    animTimeout = setTimeout(() => {
        $("main").addClass("rendered");
    }, 100);
}


let font = 100;
function resizeExtra(){
    let ws = window.innerWidth/1920;
    let hs = window.innerHeight/1080;
    let ratio = ws < hs ? ws : hs;
    font = 100 * ratio;
    $("html").css("font-size", `${font}px`);
}
