const formCadastro = [{
  id: 1,
  titulo: 'Insira alguns dados básicos',
  entradaTexto: [
    {
      id: 1,
      label: 'Nome',
      value: 'nome',
      placeholder: 'Digite seu nome completo'
    },
    {
      id: 2,
      label: 'Email',
      value: 'email',
      placeholder: 'Digite seu email'
    },
    {
      id: 3,
      label: 'Crie uma senha',
      value: 'senha',
      placeholder: 'Insira sua senha',
      secureTextEntry: true
    },
    {
      id: 4,
      label: 'Confirme sua senha',
      value: 'senhaConfirmacao',
      placeholder: 'Insira sua senha',
      secureTextEntry: true
    },
    {
      id: 5,
      label: 'Uid',
      value: 'uid',
      placeholder: '',
      secureTextEntry: true,
      opcional: false,
      visible: false
    }
  ],
  checkbox: []
},
{
  id: 2,
  titulo: 'Insira alguns dados básicos',
  entradaTexto: [
    {
      id: 1,
      label: 'Url da imagem',
      value: 'urlImagem',
      placeholder: 'Url da imagem',
      opcional: true
    },
    {
      id: 2,
      label: 'Nome',
      value: 'nome',
      placeholder: 'Digite seu nome completo',
      opcional: false
    },
    {
      id: 3,
      label: 'Descricao',
      value: 'descricao',
      placeholder: 'Digite seu email',
      opcional: false
    },
    {
      id: 4,
      label: 'Telefone 1',
      value: 'telefone1',
      placeholder: 'telefone',
      opcional: false
    },
    {
      id: 5,
      label: 'Telefone 2',
      value: 'telefone2',
      placeholder: 'telefone 2',
      opcional: true,
      visible: true
    }
  ],
  checkbox: []
},
]

export { formCadastro };