$(document).ready(function () {
  $("#cep").blur(function () {
    const cep = $(this).val().replace(/\D/g, "");

    if (cep.length === 8) {
      $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
        if (!("erro" in data)) {
          $("#endereco").val(data.logradouro);
          $("#bairro").val(data.bairro);
          $("#municipio").val(data.localidade);
          $("#estado").val(data.uf);
        } else {
          alert("CEP não encontrado.");
        }
      });
    }
  });
});

function adicionarAnexoNaLista(nomeArquivo, blobUrl, sessionKey) {
  var attachmentsList = document.getElementById('attachmentsList');

  var row = document.createElement('div');
  row.classList.add('row');

  var verButton = document.createElement('button');
  verButton.classList.add('custom-button');
  verButton.innerHTML = '<i class="fas fa-eye"></i>';
  verButton.addEventListener('click', function () {
    var downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = nomeArquivo;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
  });

  var trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  trashButton.addEventListener('click', function () {
    row.remove();
    sessionStorage.removeItem(sessionKey); // Remover da memória
  });

  var fileNameElement = document.createElement('div');
  fileNameElement.classList.add('col-md-8');
  fileNameElement.textContent = nomeArquivo;

  row.appendChild(verButton);
  row.appendChild(trashButton);
  row.appendChild(fileNameElement);
  attachmentsList.appendChild(row);
}

function selecionarAnexo() {
  var fileInput = document.getElementById('attachmentFile');
  fileInput.click();
  fileInput.addEventListener('change', function () {
    var fileName = fileInput.files[0].name;

    var blob = new Blob([fileInput.files[0]], { type: fileInput.files[0].type });

    var blobUrl = URL.createObjectURL(blob);
    var sessionKey = 'attachment_' + Date.now();
    sessionStorage.setItem(sessionKey, JSON.stringify({ fileName: fileName, blobUrl: blobUrl }));

    adicionarAnexoNaLista(fileName, blobUrl, sessionKey);
  });
}

function salvarFornecedor() {
  var razaoSocial = document.getElementById('razaoSocial').value;
  var nomeFantasia = document.getElementById('nomeFantasia').value;
  var cnpj = document.getElementById('cnpj').value;
  var inscricaoEstadual = document.getElementById('inscricaoEstadual').value
  var inscricaoMunicipal = document.getElementById('inscricaoMunicipal').value
  var cep = document.getElementById('cep').value
  var endereco = document.getElementById('endereco').value
  var numero = document.getElementById('numero').value
  var complemento = document.getElementById('complemento').value
  var bairro = document.getElementById('bairro').value
  var municipio = document.getElementById('municipio').value 
  var estado = document.getElementById('estado').value 
  var nomeContato = document.getElementById('nomeContato').value
  var telefone = document.getElementById('telefone').value 
  var email = document.getElementById('email').value

  var produtos = [];
  for (var i = 1; i <= 1; i++) {
    var descricaoProduto = document.getElementById('produto' + i);
    var unidadeMedida = document.getElementById('unidadeMedida' + i);
    var qtdeEstoque = document.getElementById('qtdeEstoque' + i);
    var valorUnitario = document.getElementById('valorUnitario' + i);
    var valorTotal = document.getElementById('valorTotal' + i);
  
    if (descricaoProduto && unidadeMedida && qtdeEstoque && valorUnitario && valorTotal) {
      var produto = {
        indice: i,
        descricaoProduto: descricaoProduto.value,
        unidadeMedida: unidadeMedida.value,
        qtdeEstoque: qtdeEstoque.value,
        valorUnitario: valorUnitario.value,
        valorTotal: valorTotal.value,
      };
      produtos.push(produto);
    } else {
      console.error('Elemento não encontrado para o índice ' + i);
    }
  }

  var anexos = [];
  for (var i = 0; i <= 1; i++) {
    var key = sessionStorage.key(i);
    if (key.startsWith('attachment_')) {
      var blobInfo = JSON.parse(sessionStorage.getItem(key));
      anexos.push({
        indice: i,
        nomeArquivo: blobInfo.fileName,
        blobArquivo: blobInfo.blobUrl,
      });
    }
  }

  var jsonFornecedor = {
    razaoSocial: razaoSocial,
    nomeFantasia: nomeFantasia,
    cnpj: cnpj,
    inscricaoEstadual: inscricaoEstadual,
    inscricaoMunicipal: inscricaoMunicipal,
    cep: cep,
    endereco: endereco,
    numero: numero,
    complemento: complemento,
    bairro: bairro,
    municipio: municipio,
    estado: estado,
    nomeContato: nomeContato,
    telefone: telefone,
    email: email,
    produtos: produtos,
    anexos: anexos,
  };

  console.log(jsonFornecedor);
}

function excluirProduto(botaoExcluir) {
  $(botaoExcluir).closest('.productBox').remove();
}