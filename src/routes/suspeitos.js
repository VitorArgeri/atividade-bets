import { Router } from "express"

const suspeitosRoutes = Router()

let suspeitos = [
    
]

// Rota para buscar todos os candidatos
suspeitosRoutes.get("/", (req, res) => {
    return res.status(200)
    .send( suspeitos ) 
})