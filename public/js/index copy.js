//
(function (win, doc) {
    'use strict';
    class SvgCarac {
        constructor(idSvg, corLinha, corFundo) {
            this.idSvg = idSvg;
            this.corLinha = corLinha;
            this.corFundo = corFundo;
        }
    }
    class SvgPath {
        constructor(svgCarac) {
            this.FCOLOR = svgCarac.corFundo;
            this.FCOLOR_CLICK = "rgb(26, 50, 73)";
            this.svg = doc.querySelector(svgCarac.idSvg)
            this.svg.style.stroke = svgCarac.corLinha;
            this.svg.style.fill = this.FCOLOR;

            this.listaElementos = [];
            this.addUnique = function (array, value) {
                if (!array.includes(value)) {
                    array.push(value);
                }
                return value;
            }
            this.svg.addEventListener('click', (e) => {
                let tgt = this.addUnique(this.listaElementos, e.target);
                let id = tgt.id;
                if (id == this.svg.id) {
                    return;
                }
                //console.log(tgt.getAttribute('nome'));
                if (tgt.style.fill == this.FCOLOR || tgt.style.fill == '') {
                    tgt.style.fill = this.FCOLOR_CLICK;
                    tgt.objAnexo = { p1: "teste", clicado: true };
                }
                else {
                    tgt.style.fill = this.FCOLOR;
                    tgt.objAnexo.clicado = false;
                }                
            })
        }
    }
    let obj = new SvgPath(new SvgCarac("#mpBrasil", "rgb(14, 13, 13)", "rgb(252, 252, 252)"));
    console.log(obj);

})(window, document)