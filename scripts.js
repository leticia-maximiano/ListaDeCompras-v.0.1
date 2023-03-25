
let itens = JSON.parse(localStorage.getItem("itens")) || []

function createList(){
  let productsList = document.getElementById ("products");

  productsList.innerHTML=""

  itens.forEach(function(item){
    createItemElement(item)
  })
}

function saveProduct () {
  let inputText = document.getElementById ("product-name");

  itens.push({
    id: Number(new Date()),
    name:inputText.value, 
    finished: false 
  })
  saveInLocalStorages()
  createList()
}

function createItemElement(item) {
  let productsList = document.getElementById ("products");
  let listItem= document.createElement ("li")
  let itemInput= document.createElement ("input")
  let itemSpan= document.createElement ("span")
  let itemButton= document.createElement ("button")

  itemSpan.innerHTML = " " + item.name + " ";
  itemSpan.style.textDecoration= item.finished ? "line-through": ""
  itemInput.setAttribute("type", "checkbox")
  itemInput.checked=item.finished 
  itemInput.onchange=function(){
    let itemToChange = itens.filter (function(item1){
      return item1.id == item.id
    })

    let itensToSave = filterItem(item)
    
    itemToChange[0].finished = !itemToChange[0].finished
    itensToSave.push(itemToChange[0])

    reloadList(itensToSave)
  }
  itemButton.innerHTML = "X"
  itemButton.onclick = function(){
    let itensToSave = filterItem(item)
    
    reloadList(itensToSave)
  }

  listItem.appendChild (itemInput)
  listItem.appendChild (itemSpan)
  listItem.appendChild (itemButton)
  productsList.appendChild (listItem)
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