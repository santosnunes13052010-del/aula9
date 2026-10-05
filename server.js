const express = require('express');
const cors = require('cors');
const app = express();
const PORT= process.env.PORT || 3000;

//Middleware essenciais
app.use(cors());//Permite que o frontend acesse este backend sem erros de CORS
app.use(express.json());//Permite que o Express entenda requisições com corpo em JSON

//Passo 1 memória ram do servidor 
let produtosEmMemoria = [
    {id:1, nome:'Teclado Mecânico RGB', preco:150.00},
    {id:2, nome:'Mouse Gamer 3200 DPI', preco:85.50}
];

//Rota GET
app.get('/produtos', (req, res) =>{
    console.log('[GET /produtos] Enviando produtos em memória...') 
    res.json(produtosEmMemoria);
});

//ROTA POST
app.post('/produtos', (req,res) =>{
    const {nome, preco} = req.body;

    if(!nome || !preco){
        return res.status(400).json({erro:'Nome e preço são obrigatórios!'});
    }

    const novoProduto = {
        id:Date.now(),//gera um id temporario baseado no timestamp
        nome, 
        preco: parseFloat(preco)
    };

    produtosEmMemoria.push(novoProduto);
    console.log(`[POST /produtos] Produto adicionado na RAM: ${novoProduto.nome}`);

    res.status(201).json(novoProduto);
});

//listen
app.listen(PORT, () =>{
    console.log(``);
    console.log(`Servidor Back-End rodando em http://localhost:${PORT}`);
    console.log(`Rota de produtos ativa em http://localhost:3000/produtos`);
    console.log(`Status: MODO MEMÓRIA RAM ATIVO`);
    console.log(``);
})