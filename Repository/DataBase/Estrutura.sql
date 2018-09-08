
CREATE TABLE [dbo].[pessoas] (
    [Id]              INT          IDENTITY (1, 1) NOT NULL,
    [nome]            VARCHAR (100)   NOT NULL,
    [sexo]            CHAR         NOT NULL,
    [cpf]             VARCHAR (20) NOT NULL,
    [nascimento]	  DATE         NOT NULL,
    [telefone]        VARCHAR(50)          NULL,
    [cep]             VARCHAR(50)         NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [dbo].[cartoes] (
    [Id]               INT          IDENTITY (1, 1) NOT NULL,
    [id_pessoas]       INT          NULL,
    [numero]		   VARCHAR (50) NULL,
    [conta]			   VARCHAR (50) NULL, 
    [bandeira]         VARCHAR (50) NULL,
    [banco]            VARCHAR (50) NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([id_pessoas]) REFERENCES [dbo].[pessoas] ([Id])
);

CREATE TABLE [dbo].[categorias] (
    [Id]				INT            IDENTITY (1, 1) NOT NULL,
    [nome]              VARCHAR(150) NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [dbo].[gastos] (
    [Id]              INT            IDENTITY (1, 1) NOT NULL,
    [id_cartao]		 INT             NULL,
	[id_categoria]	INT				NULL,
    [valor]			 DECIMAL (7, 2)  NULL,
    [entrada]		 DATE            NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([id_cartao]) REFERENCES [dbo].[cartoes] ([Id]),
	FOREIGN KEY ([id_categoria]) REFERENCES [dbo].[categorias] ([Id])
);

CREATE TABLE [dbo].[login] (
    [Id]			INT          IDENTITY (1, 1) NOT NULL,
    [id_pessoas]		INT           NULL,
    [usuario]		 VARCHAR (50)  NULL,
    [senha]		 VARCHAR (50)  NULL,
    [email]		 VARCHAR (50)  NULL,
	PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([id_pessoas]) REFERENCES [dbo].[pessoas] ([Id])
);

CREATE TABLE [dbo].[recebimentos] (
    [Id]            INT            IDENTITY (1, 1) NOT NULL,
    [id_pessoas]	INT            NULL,
	[id_categoria]	INT				NULL,
    [valor]		   	DECIMAL (7, 2) NULL,
    [data]			 DATE           NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([id_pessoas]) REFERENCES [dbo].[pessoas] ([Id]),
	FOREIGN KEY ([id_categoria]) REFERENCES [dbo].[categorias] ([Id])
);


INSERT INTO pessoas (nome, sexo, cpf, nascimento) VALUES 
('João da Silva', 'M', '123.456.789-98', '1998-06-05'),
('Rute da Silva', 'F', '987.654.321-98', '1945-12-01');

INSERT INTO cartoes (id_pessoas, numero, conta, bandeira, banco) values((SELECT Id FROM pessoas WHERE pessoas.nome = 'João da Silva'), '123456', '123456', 'VISA', 'BRADESCO');


INSERT INTO [login] (id_pessoas, usuario, senha, email) VALUES (1, 'admin', '123', 'admin@admin.com'),(2, 'nene','123','neneNanight@lele.com.br');

SELECT * FROM pessoas;
INSERT INTO categorias(nome) VALUES ('Condomínio'),('Salário'),('IPTU'),('Celular'),('TV Cabo'),('Cartão de Crédito'),('Luz'),('Gás'),('IPVA'),('Seguro carro'),('Energia'),('Aluguel'),('Vestuário'),('Alimento')
--INSERT INTO categorias (nome) VALUES('aluguel'),('vestuario'),('alimento')
--update login set id_pessoas = 2 where login.id = 2
--SELECT pessoas.Id, pessoas.nome, login.id_pessoas, login.usuario, login.email FROM login INNER JOIN pessoas ON login.id_pessoas = pessoas.Id
--update login set login.id_pessoas = 1 where login.usuario = 'admin';