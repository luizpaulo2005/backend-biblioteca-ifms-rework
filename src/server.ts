import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";

const app = express();
const port = process.env.PORT || 3000;

app.set("views", __dirname + "/views");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rotas

app.get("/", (req, res) => {
  res.render("index");
});

// Rotas GET comuns

app.get("/campus", async (req, res) => {
  try {
    const select = await prisma.campus.findMany();
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/cursos", async (req, res) => {
  try {
    const select = await prisma.curso.findMany();
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/discentes", async (req, res) => {
  try {
    const select = await prisma.discente.findMany();
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/docentes", async (req, res) => {
  try {
    const select = await prisma.docente.findMany();
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/matriculas", async (req, res) => {
  try {
    const select = await prisma.matricula.findMany();
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/pesquisas", async (req, res) => {
  try {
    const select = await prisma.pesquisa.findMany();
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

// Rotas GET com JOIN

app.get("/campus/all", async (req, res) => {
  try {
    const select = await prisma.campus.findMany({
      include: {
        cursos: true,
      },
    });
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/cursos/all", async (req, res) => {
  try {
    const select = await prisma.curso.findMany({
      include: {
        pesquisas: true,
      },
    });
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/discentes/all", async (req, res) => {
  try {
    const select = await prisma.discente.findMany({
      include: {
        pesquisas: {
          select: {
            pesquisa: true,
          },
        },
      },
    });
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/docentes/all", async (req, res) => {
  try {
    const select = await prisma.docente.findMany({
      include: {
        pesquisas: {
          select: {
            pesquisa: true,
          },
        },
      },
    });
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/matriculas/all", async (req, res) => {
  try {
    const select = await prisma.matricula.findMany({
      include: {
        discente: true,
      },
    });
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/pesquisas/all", async (req, res) => {
  try {
    const select = await prisma.pesquisa.findMany({
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
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

// Rotas GET específicas

app.get("/campus/:id", async (req, res) => {
  try {
    const select = await prisma.campus.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        cursos: true,
      },
    });
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/curso/:id", async (req, res) => {
  try {
    const select = await prisma.curso.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        campus: true,
        matriculas: true,
        pesquisas: true,
      },
    });
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/discente/:id", async (req, res) => {
  try {
    const select = await prisma.discente.findUnique({
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
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/docente/:id", async (req, res) => {
  try {
    const select = await prisma.docente.findUnique({
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
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/matricula/:id", async (req, res) => {
  try {
    const select = await prisma.matricula.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        discente: true,
      },
    });
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.get("/pesquisa/:id", async (req, res) => {
  try {
    const select = await prisma.pesquisa.findUnique({
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
    res.json(select);
  } catch (error) {
    res.send(error).status(500);
  }
});

// Rota de Sumário

app.get("/pesquisas/sumario", async (req, res) => {
  try {
    const select = await prisma.pesquisa.findMany({
      orderBy: {
        data_apresentacao: "desc",
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
      take: 10,
    });
    res.json(select);
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

app.post("/curso", async (req, res) => {
  const create = await prisma.curso.create({
    data: {
      nome: req.body.nome,
      grade: req.body.grade.parseInt(),
      duracao: req.body.duracao,
      campus_id: req.body.campus_id,
    },
  });
  res.json(create);
});

app.post("/discente", async (req, res) => {
  var data = new Date(req.body.data_nascimento);

  try {
    const create = await prisma.discente.create({
      data: {
        nome: req.body.nome,
        matricula_id: req.body.matricula_id,
        email: req.body.email,
        data_nascimento: data,
        cpf: req.body.cpf,
      },
    });
    res.json(create);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.post("/docente", async (req, res) => {
  var data = new Date(req.body.data_nascimento);

  try {
    const create = await prisma.docente.create({
      data: {
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_nascimento: data,
        siape: req.body.siape,
        email: req.body.email,
        formacao: req.body.formacao,
      },
    });
    res.json(create);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.post("/matricula", async (req, res) => {
  var data = new Date(req.body.data_inicio);

  try {
    const create = await prisma.matricula.create({
      data: {
        id: req.body.id,
        data_inicio: data,
        curso_id: req.body.curso_id,
      },
    });
    res.json(create);
  } catch (error) {
    var data = new Date(req.body.data_nascimento);
  }
});

app.post("/pesquisa", async (req, res) => {});

// Put

app.put("/campus/:id", async (req, res) => {});
app.put("/curso/:id", async (req, res) => {});
app.put("/discente/:id", async (req, res) => {});
app.put("/docente/:id", async (req, res) => {});
app.put("/matricula/:id", async (req, res) => {});
app.put("/pesquisa/:id", async (req, res) => {});

// Delete

app.delete("/campus/:id", async (req, res) => {
  try {
    const del = await prisma.campus.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json(del);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.delete("/curso/:id", async (req, res) => {
  try {
    const del = await prisma.curso.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json(del);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.delete("/discente/:id", async (req, res) => {
  try {
    const del = await prisma.discente.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json(del);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.delete("/docente/:id", async (req, res) => {
  try {
    const del = await prisma.docente.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json(del);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.delete("/matricula/:id", async (req, res) => {
  try {
    const del = await prisma.matricula.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json(del);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.delete("/pesquisa/:id", async (req, res) => {
  try {
    const del = await prisma.pesquisa.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json(del);
  } catch (error) {
    res.send(error).status(500);
  }
});

// Listen

app.listen(port, () => {
  console.log("Servidor executando em http://localhost:" + port);
});
