class ListController {
  constructor() {
    this.itens = this.loadList();

    new HtmlController("Form", true).addEventListener("submit", (event) => event.preventDefault());
    new HtmlController("search", true).addEventListener("input", (event) => this.search(event, this));

    this.createList();
  }

  loadList() {
    return JSON.parse(localStorage.getItem("itens")) || [];
  }

  search(event, _this) {
    const searchValue = event.target.value;
    let itens = _this.loadList();

    _this.clearList();

    if (searchValue.trim()){
      itens = itens.filter((item) => item.name.includes(event.target.value));
    }

    _this.createItemElements(itens);
  }

  clearList() {
    let productsList = new HtmlController("products", true);
    productsList.addInnerHtml("");
  }

  createList() {
    this.clearList();
    this.createItemElements(this.itens);
  }

  createItemElements(itens) {
    let showUnfinished = new HtmlController ("showunfinished", true);

    showUnfinished.addOnChange(this.createList);

    itens.sort((itemPrev, itemNext) => {
      if (itemPrev.id > itemNext.id) {
        return 1
      }

      if (itemPrev.id < itemNext.id) {
        return -1
      }

      return 0
    });

    itens.forEach((item) => {
      this.createItemElement(item, showUnfinished.getElement().checked);
    });
  }

  createItemElement(item, showUnfinished) {
    if (showUnfinished && item.finished) {
      return false
    }

    let productsList = new HtmlController("products", true);
    let listItem = new HtmlController("li");
    let itemInput= new HtmlController("input");
    let itemSpan = new HtmlController("span");
    let itemButton= new HtmlController("button");

    itemSpan
      .addInnerHtml(item.name)
      .changeStyle(item.finished);

    itemInput
      .setElementAttribute("type", "checkbox")
      .setElementAttribute("checked", item.finished, true)
      .addOnChange(this.onChangeItemInput.bind(this, item));

    itemButton
      .addInnerHtml("X")
      .addOnClick(this.onClickDeleteButton.bind(this, item));

    listItem
      .addChild(itemInput)
      .addChild(itemSpan)
      .addChild(itemButton);

    productsList.addChild(listItem);
  }

  onChangeItemInput(item) {
    let itemToChange = this.itens.filter((item1) => {
      return item1.id == item.id
    });

    let itensToSave = this.filterItem(item);

    itemToChange[0].finished = !itemToChange[0].finished;
    itensToSave.push(itemToChange[0]);

    this.reloadList(itensToSave);
  }

  onClickDeleteButton(item) {
    let itensToSave = this.filterItem(item);

    this.reloadList(itensToSave);
  }

  filterItem(item) {
    return this.itens.filter((item1) => {
      return item1.id !== item.id;
    });
  }

  reloadList(itensToSave) {
    this.itens=itensToSave;

    this.saveInLocalStorages();
    this.createList();
  }

  saveInLocalStorages() {
    localStorage.setItem("itens", JSON.stringify(this.itens));
  }

  saveProduct() {
    let inputText = new HtmlController("product-name", true);
    let textValue = inputText.getElement().value.trim();

    /* if (!textValue) {
      return alert("produto precisa de um nome");
    } */

    this.itens.push({
      id: Number(new Date()),
      name: textValue,
      finished: false
    })
    this.saveInLocalStorages();
    this.createList();

    inputText.setValue("")
  }
}

new ListController();