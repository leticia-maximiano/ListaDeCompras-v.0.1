class Animal {
  constructor(animal) {
    this.animal = animal
    this.andarPakas = () => console.log("Andou nesse caralho");
  }

  andar(){
    this.andarPakas();

    return this;
  }

  setAndarPakas(func) {
    this.andarPakas = func
  }

  rolar(){
    console.log("rolou nesse caralho");
  }
}

const tatu = new Animal("Tatu");

tatu.andar();

tatu.setAndarPakas(() => console.log("cansardo pakas"))

tatu.andar();

<div onchange="poweirpoewir"></div>



