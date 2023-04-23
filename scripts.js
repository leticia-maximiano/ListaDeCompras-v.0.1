
let itens = JSON.parse(localStorage.getItem("itens")) || []

function createList(){
  let productsList = document.getElementById ("products");
  let showUnfinished = document.getElementById ("showunfinished")

  showUnfinished.onchange = createList

  productsList.innerHTML=""

  itens.sort(function(itemPrev,itemNext){
    if (itemPrev.id > itemNext.id) {
      return 1
    }

    if (itemPrev.id < itemNext.id) {
      return -1
    }

    return 0
  })

  itens.forEach(function(item){
    createItemElement(item,showUnfinished.checked)
  })
}

function saveProduct () {
  let inputText = document.getElementById ("product-name");

  if (!inputText.value.trim()) {
    alert("produto precisa de um nome")
    return false
  }

  itens.push({
    id: Number(new Date()),
    name:inputText.value, 
    finished: false 
  })
  saveInLocalStorages()
  createList()
}

function onChangeItemInput (item) {
  let itemToChange = itens.filter (function(item1){
    return item1.id == item.id
  })

  let itensToSave = filterItem(item)

  itemToChange[0].finished = !itemToChange[0].finished
  itensToSave.push(itemToChange[0])

  reloadList(itensToSave)
}

function onClickDeleteButton (item){
  let itensToSave = filterItem(item)
    
  reloadList(itensToSave)
}


function createItemElement(item,showUnfinished) {
  if (showUnfinished && item.finished) {
    return false
  }

  let productsList = document.getElementById ("products");
  let listItem = new HtmlController("li")
  let itemInput= new HtmlController("input")
  let itemSpan = new HtmlController("span")
  let itemButton= new HtmlController("button")

  itemSpan
    .addInnerHtml(item.name)
    .changeStyle(item.finished)

  itemInput
    .setElementAttribute("type", "checkbox")
    .setElementAttribute("checked", item.finished,true)
    .addOnChange(onChangeItemInput.bind(null, item))

  itemButton
    .addInnerHtml("X")
    .addOnClick(onClickDeleteButton.bind(null,item))

  listItem
    .addChild(itemInput)
    .addChild(itemSpan)
    .addChild(itemButton)

  productsList.appendChild (listItem.getElement())
}

function filterItem(item){
  return itens.filter (function(item1){
    return item1.id !== item.id
  })
}

function reloadList(itensToSave){
  itens=itensToSave
    saveInLocalStorages()
    createList();
}

function saveInLocalStorages () {
  localStorage.setItem("itens",JSON.stringify(itens))
}
createList();

document.getElementById("Form").addEventListener("submit", (event) => event.preventDefault())