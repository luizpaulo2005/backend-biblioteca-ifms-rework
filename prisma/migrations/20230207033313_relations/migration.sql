-- CreateTable
CREATE TABLE "campus" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curso" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "duracao" TEXT NOT NULL,
    "campus_id" TEXT NOT NULL,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "docente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "siape" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "cpf" TEXT NOT NULL,
    "formacao" TEXT NOT NULL,

    CONSTRAINT "docente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "discente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matricula" (
    "id" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "curso_id" TEXT NOT NULL,

    CONSTRAINT "matricula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pesquisa" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "data_apresentacao" TIMESTAMP(3) NOT NULL,
    "resumo" TEXT NOT NULL,
    "palavras_chave" TEXT NOT NULL,
    "curso_id" TEXT NOT NULL,

    CONSTRAINT "pesquisa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discentes_pesquisa" (
    "pesquisa_id" TEXT NOT NULL,
    "discente_id" TEXT NOT NULL,

    CONSTRAINT "discentes_pesquisa_pkey" PRIMARY KEY ("pesquisa_id","discente_id")
);

-- CreateTable
CREATE TABLE "docentes_pesquisa" (
    "pesquisa_id" TEXT NOT NULL,
    "docente_id" TEXT NOT NULL,

    CONSTRAINT "docentes_pesquisa_pkey" PRIMARY KEY ("pesquisa_id","docente_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "discente_matricula_id_key" ON "discente"("matricula_id");

-- AddForeignKey
ALTER TABLE "curso" ADD CONSTRAINT "curso_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discente" ADD CONSTRAINT "discente_matricula_id_fkey" FOREIGN KEY ("matricula_id") REFERENCES "matricula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula" ADD CONSTRAINT "matricula_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pesquisa" ADD CONSTRAINT "pesquisa_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discentes_pesquisa" ADD CONSTRAINT "discentes_pesquisa_pesquisa_id_fkey" FOREIGN KEY ("pesquisa_id") REFERENCES "pesquisa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discentes_pesquisa" ADD CONSTRAINT "discentes_pesquisa_discente_id_fkey" FOREIGN KEY ("discente_id") REFERENCES "discente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "docentes_pesquisa" ADD CONSTRAINT "docentes_pesquisa_pesquisa_id_fkey" FOREIGN KEY ("pesquisa_id") REFERENCES "pesquisa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "docentes_pesquisa" ADD CONSTRAINT "docentes_pesquisa_docente_id_fkey" FOREIGN KEY ("docente_id") REFERENCES "docente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
