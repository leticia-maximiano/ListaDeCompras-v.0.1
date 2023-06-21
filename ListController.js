class ListController {
  constructor() {
    this.itens = JSON.parse(localStorage.getItem("itens")) || [];
  }

  createList() {
    let productsList = new HtmlController("products", true);
    let showUnfinished = new HtmlController ("showunfinished", true);

    showUnfinished.addOnChange(this.createList);

    productsList.addInnerHtml("");

    this.itens.sort((itemPrev, itemNext) => {
      if (itemPrev.id > itemNext.id) {
        return 1
      }

      if (itemPrev.id < itemNext.id) {
        return -1
      }

      return 0
    });

    this.itens.forEach((item) => {
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

    reloadList(itensToSave);
  }

  onClickDeleteButton(item) {
    let itensToSave = this.filterItem(item);

    reloadList(itensToSave);
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
}

new ListController().createList();