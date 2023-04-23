class HtmlController {
  constructor (element) {
    this.element = document.createElement(element)
  }

  addInnerHtml(text) {
    this.element.innerHTML = " " + text + " ";

    return this;
  }

  addOnChange (func) {
    this.element.onchange = func

    return this;
  }

  addOnClick(func) {
    this.element.onclick = func

    return this;
  }

  addChild(element) {
    this.element.appendChild(element.getElement())

    return this; 
  }

  changeStyle (finished) {
    this.element.style.textDecoration = finished ? "line-through": "";

    return this;
  }

  setElementAttribute (attribute,value,raw=false) {
    if (raw) {
      this.setElementAttributeRaw(attribute,value)
    } else {
      this.element.setAttribute(attribute,value)
    }

    return this;
  }

  setElementAttributeRaw (attribute,value) {
    eval(`this.element.${attribute} = ${value}`)
  }

  getElement () {
    return this.element 
  }
}
