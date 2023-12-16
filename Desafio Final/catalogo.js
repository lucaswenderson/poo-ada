class Catalogo {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
        if (this.#buscarProdutoPorId(produto.id)) {
            throw new Error('Produto com este ID já existe no catálogo.');
        }
        this.produtos.push(produto);
    }

    removerProduto(id) {
        this.produtos = this.produtos.filter(produto => produto.id !== id);
    }

    editarProduto(id, novosDados) {
        let produto = this.#buscarProdutoPorId(id);
        if (!produto) {
            throw new Error('Produto não encontrado para edição.');
        }
        produto.nome = novosDados.nome ?? produto.nome;
        produto.preco = novosDados.preco ?? produto.preco;
        produto.descricao = novosDados.descricao ?? produto.descricao;
    }

    listarProdutos() {
        return this.produtos;
    }

    #buscarProdutoPorId(id) {
        return this.produtos.find(produto => produto.id === id);
    }
}