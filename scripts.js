
let itens = JSON.parse(localStorage.getItem("itens")) || []

function createList() {
  let productsList = new HtmlController("products", true);
  let showUnfinished = new HtmlController ("showunfinished", true)

  showUnfinished.addOnChange(createList)

  productsList.addInnerHtml("")

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
    createItemElement(item,showUnfinished.getElement().checked)
  })
}

function saveProduct () {
  let inputText = new HtmlController ("product-name", true);
  let textValue= inputText.getElement().value.trim()

  if (!textValue) {
    alert("produto precisa de um nome")
    return false
  }

  itens.push({
    id: Number(new Date()),
    name:textValue, 
    finished: false 
  })
  saveInLocalStorages()
  createList()

  inputText.setValue("")
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

  let productsList = new HtmlController ("products", true);
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

  productsList.addChild (listItem)
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

new HtmlController("Form", true).addEventListener("submit", (event) => event.preventDefault())