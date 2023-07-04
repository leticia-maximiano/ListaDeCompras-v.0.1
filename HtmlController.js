class HtmlController {
  constructor (element, existingElement= false) {
    this.element = existingElement ? document.getElementById(element) : document.createElement(element)
  }

  addInnerHtml(text) {
    this.element.innerHTML = text ;

    return this;
  }

  addOnChange (func) {
    this.element.onchange = func

    return this;
  }

  setValue(text) {
    this.element.value=text

    return this;
  }

  addEventListener(event,func) {
    this.element.addEventListener(event,func)

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
    this.element.style.fontStyle = finished ? "italic" : "";

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
