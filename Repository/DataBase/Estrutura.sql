
CREATE TABLE [dbo].[pessoas] (
    [Id]              INT          IDENTITY (1, 1) NOT NULL,
    [nome]            NCHAR (100)   NOT NULL,
    [idade]           TINYINT      NOT NULL,
    [sexo]            CHAR         NOT NULL,
    [cpf]             VARCHAR (20) NOT NULL,
    [data_nascimento] DATE         NOT NULL,
    [telefone]        VARCHAR(50)          NULL,
    [cep]             VARCHAR(50)         NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [dbo].[cartoes] (
    [id]               INT          IDENTITY (1, 1) NOT NULL,
    [id_cartoes]       INT          NOT NULL,
    [numero_cartao]    VARCHAR (50) NOT NULL,
    [numero_conta]     VARCHAR (50) NOT NULL,
    [numero_seguranca] INT          NOT NULL,
    [data_vencimento]  DATE         NOT NULL,
    [bandeira]         VARCHAR (50) NOT NULL,
    [banco]            VARCHAR (50) NOT NULL,
    FOREIGN KEY ([id_cartoes]) REFERENCES [dbo].[pessoas] ([Id])
);

CREATE TABLE [dbo].[categorias] (
    [Id]                INT            IDENTITY (1, 1) NOT NULL,
    [id_categoria]      INT            NULL,
    [salario]           DECIMAL (4, 2) NULL,
    [contas]            DECIMAL (4, 2) NULL,
    [alimentacao]       DECIMAL (4, 2) NULL,
    [emprestimo]        DECIMAL (4, 2) NULL,
    [moradia]           DECIMAL (4, 2) NULL,
    [saude]             DECIMAL (4, 2) NULL,
    [impostos_taxas]    DECIMAL (4, 2) NULL,
    [roupas_acessorios] DECIMAL (4, 2) NULL,
    [veiculo]           DECIMAL (4, 2) NULL,
    [trasnporte]        DECIMAL (4, 2) NULL,
    [criancas]          DECIMAL (4, 2) NULL,
    [moveis]            DECIMAL (4, 2) NULL,
    [educacao]          DECIMAL (4, 2) NULL,
    FOREIGN KEY ([id_categoria]) REFERENCES [dbo].[pessoas] ([Id])
);

CREATE TABLE [dbo].[gastos] (
    [Id]              INT            IDENTITY (1, 1) NOT NULL,
    [id_gastos]       INT            NOT NULL,
    [valor_gastos]    DECIMAL (4, 2) NOT NULL,
    [data_entrada]    DATE           NOT NULL,
    [data_vencimento] DATE           NOT NULL,
    [descricao]       VARCHAR (50)   NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([id_gastos]) REFERENCES [dbo].[pessoas] ([Id])
);

CREATE TABLE [dbo].[login] (
    [Id]       INT          IDENTITY (1, 1) NOT NULL,
    [id_login] INT          NOT NULL,
    [usuario]  VARCHAR (50) NOT NULL,
    [senha]    VARCHAR (50) NOT NULL,
    [email]    VARCHAR (50) NOT NULL,
    FOREIGN KEY ([id_login]) REFERENCES [dbo].[pessoas] ([Id])
);

CREATE TABLE [dbo].[recebimentos] (
    [Id]               INT            IDENTITY (1, 1) NOT NULL,
    [id_recebimento]   INT            NOT NULL,
    [valor_recebido]   DECIMAL (4, 2) NOT NULL,
    [data_recebimento] DATE           NOT NULL,
    [descricao]        VARCHAR (50)   NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([id_recebimento]) REFERENCES [dbo].[pessoas] ([Id])
);


INSERT INTO pessoas (nome, idade, sexo, cpf,data_nascimento) VALUES 
('João da Silva', 18, 1, '123.456.789-98', '1998-06-05'),
('Rute da Silva', 52, 0, '987.654.321-98', '1945-12-01');

SELECT * FROM pessoas;