const formCadastro = [{
  id: 1,
  titulo: 'Insira alguns dados básicos',
  entradaTexto: [
    {
      id: 1,
      label: 'Nome',
      value: 'tes',
      placeholder: 'Digite seu nome completo',
    },
    {
      id: 2,
      label: 'Email',
      value: 'tes',
      placeholder: 'Digite seu email',
    },
    {
      id: 3,
      label: 'Crie uma senha',
      value: 'tes',
      placeholder: 'Insira sua senha',
      secureTextEntry: true,
    },
    {
      id: 4,
      label: 'Confirme sua senha',
      value: 'tes',
      placeholder: 'Insira sua senha',
      secureTextEntry: true,
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
      label: 'Nome',
      value: 'nome',
      placeholder: 'Digite seu nome completo',
    },
    {
      id: 2,
      label: 'Descricao',
      value: 'descricao',
      placeholder: 'Digite seu email',
    },
    {
      id: 3,
      label: 'Telefone 1',
      value: 'telefone1',
      placeholder: 'Insira sua senha',
      secureTextEntry: true,
    },
    {
      id: 4,
      label: 'Telefone 2',
      value: 'telefone2',
      placeholder: 'Insira sua senha',
      secureTextEntry: true,
    }
  ],
  checkbox: []
},
]

export { formCadastro };