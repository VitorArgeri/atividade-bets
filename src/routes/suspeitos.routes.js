import { Router } from "express"

const suspeitosRoutes = Router()

let suspeitos = [
    
]

// Rota para buscar todos os suspeitos
suspeitosRoutes.get("/", (req, res) => {
    return res.status(200)
    .send( suspeitos ) 
})

suspeitosRoutes.post("/", (req, res) => {
    // Validação dos campos de nome e profissão

    const{ nome, profissão, envolvimentoApostas, nivelSuspeita } = req.body
        const novoSuspeito = {
        id: Math.floor(Math.random() * 1000000),
        nome: nome,
        profissão: profissão,
        envolvimentoApostas: envolvimentoApostas,
        nivelSuspeita: nivelSuspeita,
    }

    if (!nome || !profissão) {
        return res.status(400).send({
            message: 'O Nome ou o Profissão não foi preenchido'
        })
    }

    if(nivelSuspeita != 'baixo'  || nivelSuspeita != 'médio' || nivelSuspeita != 'alto') {
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