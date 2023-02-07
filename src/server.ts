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
        Discente: true,
      },
    });
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/pesquisas/all", async (req, res) => {
  try {
    const visualizar = await prisma.pesquisa.findMany({
      include: {
        discentes: {
          select: {
            discente: true,
          },
        },
        docentes: {
          select: {
            docente: true,
          },
        },
      },
    });
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

// Rotas GET específicas

app.get("/campus/:id", async (req, res) => {
  try {
    const visualizar = await prisma.campus.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        cursos: true,
      },
    });
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/curso/:id", async (req, res) => {
  try {
    const visualizar = await prisma.curso.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        campus: true,
        matriculas: true,
        pesquisas: true,
      },
    });
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/discente/:id", async (req, res) => {
  try {
    const visualizar = await prisma.discente.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        matricula: true,
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

app.get("/docente/:id", async (req, res) => {
  try {
    const visualizar = await prisma.docente.findUnique({
      where: {
        id: req.params.id,
      },
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

app.get("/matricula/:id", async (req, res) => {
  try {
    const visualizar = await prisma.matricula.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        Discente: true,
      },
    });
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/pesquisa/:id", async (req, res) => {
  try {
    const visualizar = await prisma.pesquisa.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        discentes: {
          select: {
            discente: true,
          },
        },
        docentes: {
          select: {
            docente: true,
          },
        },
      },
    });
    res.json(visualizar);
  } catch (error) {
    res.send(error).status(500);
  }
});

// Rotas POST

app.post("/campus", async (req, res) => {
  try {
    const create = await prisma.campus.create({
      data: {
        nome: req.body.nome,
        cidade: req.body.cidade,
        estado: req.body.estado,
        email: req.body.email,
      },
    });
    res.json(create);
  } catch (error) {
    res.send(error).status(500);
  }
});

// Listen

app.listen(port, () => {
  console.log("Servidor executando em http://localhost:" + port);
});
