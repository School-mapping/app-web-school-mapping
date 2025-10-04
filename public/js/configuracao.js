function getInfoUser() {
    var id = sessionStorage.ID_USUARIO;

    if (!id) {
        console.error("ID do usuário não definido no sessionStorage");
        return;
    }

    fetch(`/usuarios/getInfoUser/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(function (resposta) {
        console.log(resposta);

        if (resposta.ok) {
          console.log('Busquei informações do usuário', resposta)
          return resposta.json();
        } else {
          throw "Erro ao buscar dados no data base";
        }
    })
        .then(function (infoUser) {
            console.log(infoUser)
            bdUsuario.innerHTML = infoUser[0].usuario;
            bdEmail.innerHTML = infoUser[0].email;
            bdSenha.innerHTML = infoUser[0].senha;
            bdData.innerHTML = infoUser[0].criado_em;

    })
        .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}
