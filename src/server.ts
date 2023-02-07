import express from "express";
import { prisma } from "./lib/prisma";

const app = express();
const port = process.env.PORT || 3000;

app.set("views", __dirname + "/views");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas

app.get("/", (req, res) => {
  res.render("index");
});

// Rotas GET comuns

app.get("/campus", async (req, res) => {
  try {
    const visualizar = await prisma.campus.findMany();
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/cursos", async (req, res) => {
  try {
    const visualizar = await prisma.curso.findMany();
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/discentes", async (req, res) => {
  try {
    const visualizar = await prisma.discente.findMany();
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/docentes", async (req, res) => {
  try {
    const visualizar = await prisma.docente.findMany();
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/matriculas", async (req, res) => {
  try {
    const visualizar = await prisma.matricula.findMany();
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/pesquisas", async (req, res) => {
  try {
    const visualizar = await prisma.pesquisa.findMany();
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

// Rotas GET com JOIN

app.get("/campus/all", async (req, res) => {
  try {
    const visualizar = await prisma.campus.findMany({
      include: {
        cursos: true,
      },
    });
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/cursos/all", async (req, res) => {
  try {
    const visualizar = await prisma.curso.findMany({
      include: {
        pesquisas: true,
      },
    });
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/discentes/all", async (req, res) => {
  try {
    const visualizar = await prisma.discente.findMany({
      include: {
        pesquisas: {
          select: {
            pesquisa: true,
          },
        },
      },
    });
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/docentes/all", async (req, res) => {
  try {
    const visualizar = await prisma.docente.findMany({
      include: {
        pesquisas: {
          select: {
            pesquisa: true,
          },
        },
      },
    });
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/matriculas/all", async (req, res) => {
  try {
    const visualizar = await prisma.matricula.findMany({
      include: {
        discente: true
      }
    })
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500)
  }
})

app.get("/pesquisas/all", async (req, res) => {
  try {
    const visualizar = await prisma.pesquisa.findMany({
      include: {
        discentes: {
          select: {
            discente: true
            }
          },
          docentes: {
            select: {
              docente: true
            }
          }
        }
    })
    res.json(visualizar);
  } catch (error) {
    
  }
})

// Rotas GET específicas


// Listen

app.listen(port, () => {
  console.log("Servidor executando em http://localhost:" + port);
});
