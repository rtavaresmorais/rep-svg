(function (win, doc) {
    'use strict';

    class SvgCarac {
        constructor(idSvg, corLinha, corFundo, callbackClick = null) {
            this.idSvg = idSvg;
            this.corLinha = corLinha;
            this.corFundo = corFundo;
            this.FCOLOR = corFundo;
            this.FCOLOR_CLICK = "rgb(114, 139, 163)";

            this.svg = document.querySelector(idSvg);
            this.svg.style.stroke = corLinha;
            this.svg.style.fill = corFundo;

            this.selectedItems = {}; // Map para rastrear itens selecionados
            this.callbackClick = callbackClick; // Callback externo

            this.svg.addEventListener('click', (e) => this.handleClick(e));
        }

        handleClick(e) {
            const tgt = e.target;

            // Ignora cliques na área principal do SVG
            if (tgt.id === this.svg.id || !tgt.id) return;

            if (!this.selectedItems[tgt.id]) {
                // Marca o item como selecionado
                tgt.style.fill = this.FCOLOR_CLICK;
                this.selectedItems[tgt.id] = tgt;

                // Chama o callback para seleção
                if (this.callbackClick) {
                    this.callbackClick(tgt.id, true); // `true` indica seleção
                }
            } else {
                // Pergunta antes de desmarcar
                if (confirm(`Deseja realmente desmarcar o item ${tgt.id}?`)) {
                    // Remove a seleção
                    tgt.style.fill = this.FCOLOR;
                    delete this.selectedItems[tgt.id];

                    // Chama o callback para desmarcação
                    if (this.callbackClick) {
                        this.callbackClick(tgt.id, false); // `false` indica desmarcação
                    }
                }
            }
        }

        getSelectedItems() {
            return Object.keys(this.selectedItems); // Retorna IDs dos itens selecionados
        }
    }
    class PageControl {
        constructor(containerSelector) {
            this.container = doc.querySelector(containerSelector);
            this.tabsContainer = this.container.querySelector('.tabs');
            this.pagesContainer = this.container.querySelector('.pages');
            this.pages = {};
        }

        addPage(title, content) {
            if (this.pages[title]) return;

            const tab = doc.createElement('button');
            tab.textContent = title;
            tab.className = 'tab';
            tab.addEventListener('click', () => this.setActiveTab(tab, page));

            const page = doc.createElement('div');
            page.className = 'page';
            page.innerHTML = content;

            this.tabsContainer.appendChild(tab);
            this.pagesContainer.appendChild(page);

            this.pages[title] = { tab, page };
            this.setActiveTab(tab, page);
        }

        removePage(title) {
            const pageData = this.pages[title];
            if (!pageData) return;

            this.tabsContainer.removeChild(pageData.tab);
            this.pagesContainer.removeChild(pageData.page);

            delete this.pages[title];
        }

        setActiveTab(tab, page) {
            if (this.currentTab) {
                this.currentTab.tab.classList.remove('active');
                this.currentTab.page.classList.remove('active');
            }

            tab.classList.add('active');
            page.classList.add('active');
            this.currentTab = { tab, page };
        }
    }

    // Instância do PageControl
    const pageControl = new PageControl('.pagecontrol');

    // Instância do SvgCarac
    const svgCarac = new SvgCarac("#mpBrasil", "rgb(14, 13, 13)", "rgb(252, 252, 252)",
        (id, isSelected) => {
            if (isSelected) {
                // Cria uma página ao selecionar
                pageControl.addPage(`Item ${id}`, `<h1>Detalhes do ${id}</h1><p>Conteúdo gerado dinamicamente.</p>`);
            } else {
                // Remove a página ao desmarcar
                pageControl.removePage(`Item ${id}`);
            }
        });

    // Teste: Obter itens selecionados
    /* doc.querySelector('#mpBrasil').addEventListener('click', () => {
         console.log(`Itens selecionados: ${svgCarac.getSelectedItems().join(', ')}`);
     });*/

})(window, document);
