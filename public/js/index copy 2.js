(function (win, doc) {
    'use strict';

    class SvgCarac {
        constructor(idSvg, corLinha, corFundo, exibirHint = false, hintAtributo = 'id', onSelect = null, onDeselect = null) {
            this.idSvg = idSvg;
            this.corLinha = corLinha;
            this.corFundo = corFundo;
            this.exibirHint = exibirHint; // Mostrar hint
            this.hintAtributo = hintAtributo; // Qual atributo exibir no hint
            this.onSelect = onSelect; // Callback para seleção
            this.onDeselect = onDeselect; // Callback para desmarcação
        }
    }

    class SvgPath {
        constructor(svgCarac) {
            this.FCOLOR = svgCarac.corFundo;
            this.FCOLOR_CLICK = "rgb(26, 50, 73)";
            this.svg = doc.querySelector(svgCarac.idSvg);
            this.svg.style.stroke = svgCarac.corLinha;
            this.svg.style.fill = this.FCOLOR;

            this.listaElementos = [];

            this.addUnique = (array, value) => {
                if (!array.includes(value)) {
                    array.push(value);
                }
                return value;
            };

            this.removeItem = (array, value) => {
                const index = array.indexOf(value);
                if (index > -1) {
                    array.splice(index, 1);
                }
                return value;
            };

            // Criar o hint, se habilitado
            if (svgCarac.exibirHint) {
                this.hintElement = doc.createElement('div');
                this.hintElement.style.position = 'absolute';
                this.hintElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                this.hintElement.style.color = 'white';
                this.hintElement.style.padding = '5px';
                this.hintElement.style.borderRadius = '5px';
                this.hintElement.style.pointerEvents = 'none';
                this.hintElement.style.display = 'none';
                this.hintElement.style.fontSize = '12px';
                doc.body.appendChild(this.hintElement);

                // Evento de mousemove para exibir o hint
                this.svg.addEventListener('mousemove', (e) => {
                    const tgt = e.target;
                    const id = tgt.id;
                    if (id === this.svg.id || !tgt.hasAttribute(svgCarac.hintAtributo)) {
                        this.hintElement.style.display = 'none';
                        return;
                    }
                    const valorHint = tgt.getAttribute(svgCarac.hintAtributo);
                    this.hintElement.textContent = valorHint;
                    this.hintElement.style.display = 'block';
                    this.hintElement.style.top = `${e.pageY + 10}px`;
                    this.hintElement.style.left = `${e.pageX + 10}px`;
                });

                // Ocultar o hint ao sair
                this.svg.addEventListener('mouseleave', () => {
                    this.hintElement.style.display = 'none';
                });
            }

            // Evento de clique para seleção/desmarcação
            this.svg.addEventListener('click', (e) => {
                let tgt = this.addUnique(this.listaElementos, e.target);
                let id = tgt.id;
                if (id === this.svg.id) {
                    return;
                }

                if (tgt.style.fill === this.FCOLOR || tgt.style.fill === '') {
                    // Marcar o elemento
                    tgt.style.fill = this.FCOLOR_CLICK;
                    tgt.objAnexo = { p1: "teste", clicado: true };
                    if (svgCarac.onSelect) svgCarac.onSelect(id); // Callback de seleção
                } else {
                    // Confirmar desmarcar
                    const confirmUnselect = confirm(`Deseja realmente desmarcar o item ${id}?`);
                    if (confirmUnselect) {
                        tgt.style.fill = this.FCOLOR;
                        tgt.objAnexo.clicado = false;
                        this.removeItem(this.listaElementos, tgt);
                        if (svgCarac.onDeselect) svgCarac.onDeselect(id); // Callback de desmarcação
                    }
                }
            });
        }
    }
 

    // Exemplo de uso
    let obj = new SvgPath(
        new SvgCarac(
            "#mpBrasil",
            "rgb(14, 13, 13)",
            "rgb(252, 252, 252)",
            true, // Ativar hint
            'nome', // Mostrar o atributo 'nome' no hint
            (id) => console.log(`Selecionado: ${id}`),
            (id) => console.log(`Desmarcado: ${id}`)
        )
    );
    console.log(obj);

})(window, document);
