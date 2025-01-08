class SvgCollection {
    constructor(items) {
        this.items = items;

    }

    static get() {
        return new SvgCollection(document.querySelectorAll("path"));
    };
    find(index) {
        return new SvgPath(this.items[index]);
    }
    findId(id) {
        for (let index = 0; index < this.items.length; index++) {
            const element = this.items[index];
            if (element.id == id) {
                return new SvgPath(element);
            }
        }

    }
}

class SvgPath {
    constructor(element) {
        this.element = element;
        this.isClicked = false;
        this.fill = this.fill;
        console.log('Criou');
        this.element.onclick = function (event) {
            const element = event.target;
            let color = 'red';
            if (  this.isClicked ){
           
           
                 color = 'gray';  
            }
            SvgCollection.get().findId(element.id).fill(color);
            //console.log(this);
            this.isClicked = !this.isClicked ;
          //  console.log(element);
        }
    }
    fill(color) {
        this.element.setAttribute("fill", color);
    }

    static findById(id) {
        return new SvgPath(document.getElementById(id))
    }
}
SvgPath.findById("mpBrasil").fill("gray");
//SvgPath.findById("BR-AC").fill("red");
//console.log(SvgCollection.get().find(3));
//SvgCollection.get().find(3).fill("red");
//console.log(SvgCollection.get().findId("BR-AP"));
//SvgCollection.get().findId("BR-AP").fill("green");