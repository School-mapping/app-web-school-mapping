CREATE DATABASE SchoolMapping;
USE SchoolMapping;

/* INFOS_CREDENCIAIS */

CREATE TABLE TB_Empresas (
id INT PRIMARY KEY AUTO_INCREMENT,
razao_social VARCHAR(45) NOT NULL,
cnpj CHAR(14) NOT NULL,
email VARCHAR(45) NOT NULL,
telefone CHAR(11) NOT NULL
);

CREATE TABLE TB_Perfis (
id INT PRIMARY KEY AUTO_INCREMENT,
cargo VARCHAR(20) NOT NULL
);

CREATE TABLE TB_Usuarios (
id INT PRIMARY KEY AUTO_INCREMENT,
id_perfil INT NOT NULL,
id_empresa INT,
nome VARCHAR(60) NOT NULL,
email VARCHAR(45) NOT NULL,
senha VARCHAR(45) NOT NULL,
tipo VARCHAR(15) NOT NULL DEFAULT "Padrão", /*Da para colocar um ENUM*/ 
data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_perfil_tb_usuarios
		FOREIGN KEY (id_perfil) REFERENCES TB_Perfis(id),
	CONSTRAINT fk_empresa_tb_usuarios
		FOREIGN KEY (id_empresa) REFERENCES TB_Empresas(id)
);

CREATE TABLE TB_Tokens (
id INT PRIMARY KEY AUTO_INCREMENT,
id_empresa INT,
id_usuario INT,
token VARCHAR(45) NOT NULL,
ativo BOOLEAN NOT NULL,
	CONSTRAINT fk_token_tb_usuarios
		FOREIGN KEY (id_usuario) REFERENCES TB_Usuarios(id),
	CONSTRAINT fk_token_tb_empresas
		FOREIGN KEY (id_empresa) REFERENCES TB_Empresas(id),
	CONSTRAINT chk_empresa_ou_usuario
		CHECK (
			(id_usuario IS NOT NULL AND id_empresa IS NULL) OR
            (id_usuario IS NULL AND id_empresa IS NOT NULL)
		)
);

CREATE TABLE TB_Logs (
id INT PRIMARY KEY AUTO_INCREMENT,
data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
nivel VARCHAR(10) NOT NULL,
descricao VARCHAR(255) NOT NULL,
origem VARCHAR(40) NOT NULL
);

CREATE TABLE TB_Config_Slack (
id INT PRIMARY KEY AUTO_INCREMENT,
canal_slack VARCHAR(45) NOT NULL,
intervalo_envio TIME NOT NULL,
parametro_notificacao VARCHAR(45) NOT NULL,
ativo BOOLEAN NOT NULL,
data_ultima_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

/* INFO_ESCOLARES*/

CREATE TABLE TB_Regioes (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(10) NOT NULL /*da para ser ENUM*/
);

CREATE TABLE TB_Enderecos (
id INT AUTO_INCREMENT,
id_regiao INT,
cep CHAR(9) NOT NULL, # Inserir com " - "
bairro VARCHAR(45) NOT NULL,
logradouro VARCHAR(45) NOT NULL,
numero VARCHAR(10) NOT NULL,
	CONSTRAINT fk_regiao_tb_enderecos
		FOREIGN KEY (id_regiao) REFERENCES TB_Regioes(id),
	CONSTRAINT pk_composta_tb_enderecos 
		PRIMARY KEY (id, id_regiao)
);

CREATE TABLE TB_Escolas (
id INT PRIMARY KEY AUTO_INCREMENT,
id_endereco INT,
nome VARCHAR(100) NOT NULL,
codigo_inep CHAR(8) NOT NULL,
subprefeitura VARCHAR(60),
	CONSTRAINT fk_endereco_tb_escolas
		FOREIGN KEY (id_endereco) REFERENCES TB_Enderecos(id)
);

CREATE TABLE TB_Ideb (
id INT PRIMARY KEY AUTO_INCREMENT,
id_escola INT NOT NULL,
nota DECIMAL (3,1) NOT NULL,
ano_emissao YEAR NOT NULL,
	CONSTRAINT fk_escola_tb_ideb
		FOREIGN KEY (id_escola) REFERENCES TB_Escolas(id)
);

CREATE TABLE TB_Verbas (
id INT PRIMARY KEY AUTO_INCREMENT,
id_escola INT NOT NULL,
ano YEAR NOT NULL,
portaria_sme VARCHAR(60) NOT NULL,
valor_primeira_parcela DECIMAL(12,2) NOT NULL,
valor_segunda_parcela DECIMAL(12,2),
valor_terceira_parcela DECIMAL(12,2),
valor_vulnerabilidade DECIMAL(12,2),
valor_extraordinario DECIMAL(12,2),
valor_gremio DECIMAL(12,2),
	CONSTRAINT fk_escola_tb_verbas
		FOREIGN KEY (id_escola) REFERENCES TB_Escolas(id)
);

INSERT INTO TB_Perfis (cargo) VALUES
('Comum'),
('Administrador');

INSERT INTO TB_Regioes (nome) VALUES
('Norte'),
('Leste'),
('Sul'),
('Centro'),
('Oeste');


SELECT * FROM TB_Escolas;
SELECT * FROM TB_Ideb;
SELECT * FROM TB_Regioes;
SELECT * FROM TB_Logs;

DELIMITER $$

CREATE PROCEDURE SP_CadastrarUsuario(
    IN p_nome VARCHAR(60),
    IN p_email VARCHAR(45),
    IN p_senha VARCHAR(45),
    IN p_id_perfil INT
)
BEGIN
    INSERT INTO TB_Usuarios (nome, email, senha, id_perfil)
    VALUES (p_nome, p_email, p_senha, p_id_perfil);

    SELECT LAST_INSERT_ID() AS id_usuario;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE SP_LogarUsuario(
    IN p_usuario VARCHAR(60),
    IN p_senha VARCHAR(45)
)
BEGIN
    SELECT 
        id AS id_usuario,
        nome,
        email
    FROM TB_Usuarios
    WHERE nome = p_usuario
      AND senha = p_senha
    LIMIT 1;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE SP_AtualizarEmail(
    IN p_id INT,
    IN p_email VARCHAR(45)
)
BEGIN
    UPDATE TB_Usuarios
    SET email = p_email
    WHERE id = p_id;

    SELECT ROW_COUNT() AS linhas_afetadas;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE SP_AtualizarSenha(
    IN p_id INT,
    IN p_senha VARCHAR(45)
)
BEGIN
    UPDATE TB_Usuarios
    SET senha = p_senha
    WHERE id = p_id;

    SELECT ROW_COUNT() AS linhas_afetadas;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE SP_DeletarUsuario(
    IN p_id INT
)
BEGIN
    DELETE FROM TB_Usuarios
    WHERE id = p_id;

    SELECT ROW_COUNT() AS linhas_afetadas;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE SP_CadastrarEmpresa(
    IN p_razao_social VARCHAR(45),
    IN p_cnpj CHAR(14),
    IN p_email VARCHAR(45),
    IN p_telefone CHAR(11)
)
BEGIN
    INSERT INTO TB_Empresas (razao_social, cnpj, email, telefone)
    VALUES (p_razao_social, p_cnpj, p_email, p_telefone);

    SELECT LAST_INSERT_ID() AS id_empresa;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE SP_CarregarEmpresas()
BEGIN
    SELECT * FROM TB_Empresas;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE SP_AtualizarEmpresa(
    IN p_id INT,
    IN p_razao_social VARCHAR(45),
    IN p_cnpj CHAR(14),
    IN p_email VARCHAR(45),
    IN p_telefone CHAR(11)
)
BEGIN
    UPDATE TB_Empresas
    SET razao_social = p_razao_social,
        cnpj = p_cnpj,
        email = p_email,
        telefone = p_telefone
    WHERE id = p_id;

    SELECT ROW_COUNT() AS linhas_afetadas;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE SP_DeletarEmpresa(
    IN p_id INT
)
BEGIN
    DELETE FROM TB_Empresas
    WHERE id = p_id;

    SELECT ROW_COUNT() AS linhas_afetadas;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE SP_CarregarPerfil(
	IN p_id INT
)
BEGIN
    SELECT id_perfil 
    FROM TB_Usuarios 
    WHERE id = p_id;
END $$

DELIMITER ;


SELECT * FROM TB_Usuarios;