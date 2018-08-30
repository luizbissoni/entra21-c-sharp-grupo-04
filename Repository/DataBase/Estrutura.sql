
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
    [id_cartoes]       INT          NULL,
    [numero_cartao]    VARCHAR (50) NULL,
    [numero_conta]     VARCHAR (50) NULL,
    [numero_seguranca] INT          NULL,
    [data_vencimento]  DATE         NULL,
    [bandeira]         VARCHAR (50) NULL,
    [banco]            VARCHAR (50) NULL,
    FOREIGN KEY ([id_cartoes]) REFERENCES [dbo].[pessoas] ([Id])
);

CREATE TABLE [dbo].[categorias] (
    [Id]                INT            IDENTITY (1, 1) NOT NULL,
    [id_categoria]      INT            NULL,
    [nome]           VARCHAR(150) NULL,
    
    FOREIGN KEY ([id_categoria]) REFERENCES [dbo].[pessoas] ([Id])
);

CREATE TABLE [dbo].[gastos] (
    [Id]              INT            IDENTITY (1, 1) NOT NULL,
    [id_gastos]       INT             NULL,
    [valor_gastos]    DECIMAL (7, 2)  NULL,
    [data_entrada]    DATE            NULL,
    [data_vencimento] DATE            NULL,
    [descricao]       VARCHAR (50)    NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([id_gastos]) REFERENCES [dbo].[pessoas] ([Id])
);

CREATE TABLE [dbo].[login] (
    [Id]       INT          IDENTITY (1, 1) NOT NULL,
    [id_login] INT           NULL,
    [usuario]  VARCHAR (50)  NULL,
    [senha]    VARCHAR (50)  NULL,
    [email]    VARCHAR (50)  NULL,
    FOREIGN KEY ([id_login]) REFERENCES [dbo].[pessoas] ([Id])
);

CREATE TABLE [dbo].[recebimentos] (
    [Id]               INT            IDENTITY (1, 1) NOT NULL,
    [id_recebimento]   INT            NULL,
    [valor_recebido]   DECIMAL (7, 2) NULL,
    [data_recebimento] DATE           NULL,
    [descricao]        VARCHAR (50)   NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([id_recebimento]) REFERENCES [dbo].[pessoas] ([Id])
);


INSERT INTO pessoas (nome, idade, sexo, cpf,data_nascimento) VALUES 
('João da Silva', 18, 'M', '123.456.789-98', '1998-06-05'),
('Rute da Silva', 52, 'F', '987.654.321-98', '1945-12-01');

INSERT INTO [login] (usuario, senha, email) VALUES ('admin', '123', 'admin@admin.com'),('nene','123','neneNanight@lele.com.br');

SELECT * FROM pessoas;