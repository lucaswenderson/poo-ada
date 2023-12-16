class Carrinho {
    constructor() {
        this.itens = [];
    }

    adicionarAoCarrinho(produto, quantidade) {
        const itemIndex = this.itens.findIndex(item => item.produto.id === produto.id);
        if (itemIndex > -1) {
            this.itens[itemIndex].quantidade += quantidade;
        } else {
            this.itens.push({ produto, quantidade });
        }
    }

    removerDoCarrinho(produtoId) {
        const itemIndex = this.itens.findIndex(item => item.produto.id === produtoId);
        if (itemIndex > -1) {
            this.itens.splice(itemIndex, 1);
        } else {
            throw new Error('Produto não encontrado no carrinho.');
        }
    }

    calcularTotal() {
        return this.itens.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);
    }

    listarItensDoCarrinho() {
        return this.itens;
    }
}