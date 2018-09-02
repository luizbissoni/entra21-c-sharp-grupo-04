
CREATE TABLE [dbo].[pessoas] (
    [Id_pessoa]              INT          IDENTITY (1, 1) NOT NULL,
    [nome]            VARCHAR (100)   NOT NULL,
    [sexo]            CHAR         NOT NULL,
    [cpf]             VARCHAR (20) NOT NULL,
    [nascimento]	  DATE         NOT NULL,
    [telefone]        VARCHAR(50)          NULL,
    [cep]             VARCHAR(50)         NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [dbo].[cartoes] (
    [id_cartao]               INT          IDENTITY (1, 1) NOT NULL,
    [id_pessoas]       INT          NULL,
    [numero]		   VARCHAR (50) NULL,
    [conta]			   VARCHAR (50) NULL, 
    [bandeira]         VARCHAR (50) NULL,
    [banco]            VARCHAR (50) NULL,
    FOREIGN KEY ([id_pessoas]) REFERENCES [dbo].[pessoas] ([Id])
);

CREATE TABLE [dbo].[categorias] (
    [Id_categoria]				INT            IDENTITY (1, 1) NOT NULL,
    [id_gastos]			INT             NULL,
	[id_recebimentos]	INT				NULL,
    [nome]              VARCHAR(150) NULL,
    
    FOREIGN KEY ([id_gastos]) REFERENCES [dbo].[cartoes] ([Id]),
	FOREIGN KEY ([id_recebimentos]) REFERENCES [dbo].[recebimentos] ([Id])
);

CREATE TABLE [dbo].[gastos] (
    [Id_gasto]              INT            IDENTITY (1, 1) NOT NULL,
    [id_cartao]       INT             NULL,
    [valor]			 DECIMAL (7, 2)  NULL,
    [entrada]		 DATE            NULL,
    [vencimento]	 DATE            NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([id_cartao]) REFERENCES [dbo].[cartoes] ([Id])
);

CREATE TABLE [dbo].[login] (
    [Id]			INT          IDENTITY (1, 1) NOT NULL,
    [id_pessoa]		INT           NULL,
    [usuario]		 VARCHAR (50)  NULL,
    [senha]		 VARCHAR (50)  NULL,
    [email]		 VARCHAR (50)  NULL,
    FOREIGN KEY ([id_pessoa]) REFERENCES [dbo].[pessoas] ([Id])
);

CREATE TABLE [dbo].[recebimentos] (
    [Id_recebimento]            INT            IDENTITY (1, 1) NOT NULL,
    [id_pessoas]	INT            NULL,
    [valor]		   	DECIMAL (7, 2) NULL,
    [data]			 DATE           NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([id_pessoas]) REFERENCES [dbo].[pessoas] ([Id])
);


INSERT INTO pessoas (nome, idade, sexo, cpf, data_nascimento) VALUES 
('João da Silva', 18, 'M', '123.456.789-98', '1998-06-05'),
('Rute da Silva', 52, 'F', '987.654.321-98', '1945-12-01');

--INSERT INTO cartoes (id_pessoas, numero, conta, bandeira, banco) values((SELECT id_pessoa FROM pessoas WHERE id_pessoa = id_cartao), '123456', '123456', 'VISA', 'BRADESCO');


INSERT INTO [login] (usuario, senha, email) VALUES ('admin', '123', 'admin@admin.com'),('nene','123','neneNanight@lele.com.br');

SELECT * FROM pessoas;