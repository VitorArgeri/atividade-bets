import { Router } from "express"

const suspeitosRoutes = Router()

let suspeitos = [
    {
        id: Math.floor(Math.random() * 1000000),
        nome: 'Lucas Paqueta',
        profissão: 'Jogador de Futebol',
        envolvimentoApostas: 'sim',
        nivelSuspeita: 'alto'
    }
]

// Rota para buscar todos os suspeitos
suspeitosRoutes.get("/", (req, res) => {
    return res.status(200)
    .send( suspeitos ) 
})


// Rota para cadastrar um suspeito
suspeitosRoutes.post("/", (req, res) => {

    const{ nome, profissão, envolvimentoApostas, nivelSuspeita } = req.body
        const novoSuspeito = {
        id: Math.floor(Math.random() * 1000000),
        nome: nome,
        profissão: profissão,
        envolvimentoApostas: envolvimentoApostas,
        nivelSuspeita: nivelSuspeita,
    }

    // Validação dos campos 
    if (!nome || !profissão || !envolvimentoApostas || !nivelSuspeita) {
        return res.status(400).send({
            message: 'Algum dos campos não foi preenchido'
        })
    }

    // Validação do campo de nivel de suspeita
    if(nivelSuspeita != 'baixo'  && nivelSuspeita != 'médio' && nivelSuspeita != 'alto') {
        return res.status(400).send({
            message: 'Nível de suspeita não especificado'
        })
    }
    
    suspeitos.push(novoSuspeito)
        return res.status(201)
        .json( novoSuspeito )

    })

// Rota para buscar um suspeito pelo id
suspeitosRoutes.get("/:id", (req, res) => {
    const {id} = req.params;
    // console.log(id)
    const suspeito = suspeitos.find((suspect) => suspect.id == id)

    if(!suspeito) {
        return res.status(404).send({
            message: "Suspeito não Encontrado!"
        });
    }

    return res.status(200).send({
        message: "Suspeito Encontrado!",
        suspeito,
    });
})

// Rota para atualizar por id
suspeitosRoutes.put('/:id', (req, res) => {
    const { id } = req.params;    

    const suspeito = suspeitos.find((suspect) => suspect.id == id)

    if(!suspeito) {
        return res.status(404).send({
            message: 'Suspeito não Encontrado!'
        });
    }

    const{ nome, profissão, envolvimentoApostas, nivelSuspeita } = req.body
    suspeito.nome = nome;
    suspeito.profissão = profissão;
    suspeito.envolvimentoApostas = envolvimentoApostas;
    suspeito.nivelSuspeita = nivelSuspeita;


    // Validação dos campos 
    if (!nome || !profissão || !envolvimentoApostas || !nivelSuspeita) {
        return res.status(400).send({
            message: 'Algum dos campos não foi preenchido'
        })
    }

    // Validação do campo de nivel de suspeita
    if(nivelSuspeita != 'baixo'  && nivelSuspeita != 'médio' && nivelSuspeita != 'alto') {
        return res.status(400).send({
            message: 'Nível de suspeita não especificado'
        })
    }

        else {
            return res.status(201).send({
                message: 'Candidato Atualizado!'
            })
        }
})

// Rota para deleter por id
suspeitosRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;

    const suspeito = suspeitos.find((suspect) => suspect.id == id)

    if(!suspeito) {
        return res.status(404).send({
            message: "Suspeito não Encontrado!"
        });
    }

    suspeitos = suspeitos.filter((suspect) => suspect.id != id)

    return res.status(200).send({
        message: 'Suspeito Deletado!',
    })
})

export default suspeitosRoutes
