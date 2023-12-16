document.addEventListener('DOMContentLoaded', () => {
    const catalogo = new Catalogo();
    const carrinho = new Carrinho();

    // Seletores DOM
    const produtosListagemElement = document.getElementById('produtosListagem');
    const carrinhoElement = document.getElementById('carrinho');
    const totalCarrinhoElement = document.getElementById('totalCarrinho');
    const formProduto = document.getElementById('formProduto');

    // Evento de submissão do formulário para adicionar produtos
    formProduto.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(formProduto);
        const produto = new Produto(
            Date.now(), // ID gerado com base na hora atual
            formData.get('nome'),
            parseFloat(formData.get('preco')),
            formData.get('descricao')
        );
        catalogo.adicionarProduto(produto);
        formProduto.reset();
        atualizarListagemProdutos();
    });

    // Função para atualizar a listagem de produtos
    function atualizarListagemProdutos() {
        produtosListagemElement.innerHTML = ''; // Limpa a listagem atual
        catalogo.listarProdutos().forEach(produto => {
            const produtoElement = document.createElement('li');
            produtoElement.textContent = `${produto.nome} - ${produto.preco}`;
            produtosListagemElement.appendChild(produtoElement);
        });
    }

    // Evento de clique para adicionar produtos ao carrinho
    produtosListagemElement.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const produtoId = event.target.dataset.produtoId;
            const produto = catalogo.produtos.find(p => p.id === Number(produtoId));
            if (produto) {
                carrinho.adicionarAoCarrinho(produto, 1); // Adiciona 1 quantidade por padrão
                atualizarCarrinho();
            }
        }
    });

    // Função para atualizar o carrinho
    function atualizarCarrinho() {
        carrinhoElement.innerHTML = '';
        carrinho.listarItensDoCarrinho().forEach((item, index) => {
            const itemElement = document.createElement('li');
            itemElement.textContent = `${item.produto.nome} - Quantidade: ${item.quantidade}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.onclick = () => {
                carrinho.removerDoCarrinho(item.produto.id);
                atualizarCarrinho();
            };
            itemElement.appendChild(removeButton);
            carrinhoElement.appendChild(itemElement);
        });
        totalCarrinhoElement.textContent = `Total: R$${carrinho.calcularTotal().toFixed(2)}`;
    }

    // Evento de clique para finalizar a compra
    document.getElementById('finalizarCompra').addEventListener('click', () => {
        try {
            if (carrinho.itens.length === 0) {
                throw new Error('Seu carrinho está vazio.');
            }
            const total = carrinho.finalizarCompra();
            alert(`Compra finalizada com sucesso! Total pago: R$${total.toFixed(2)}`);
            atualizarCarrinho(); // Atualiza o carrinho, agora vazio
        } catch (error) {
            alert(error.message);
        }
    });
});