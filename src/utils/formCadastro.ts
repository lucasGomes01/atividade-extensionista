const formCadastro = [{
  id: 1,
  titulo: 'Insira alguns dados básicos',
  entradaTexto: [
    {
      id: 1,
      label: 'Nome',
      placeholder: 'Digite seu nome completo',
    },
    {
      id: 2,
      label: 'Email',
      placeholder: 'Digite seu email',
    },
    {
      id: 3,
      label: 'Crie uma senha',
      placeholder: 'Insira sua senha',
      secureTextEntry: true,
    },
    {
      id: 4,
      label: 'Confirme sua senha',
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
      placeholder: 'Digite seu nome completo',
    },
    {
      id: 2,
      label: 'Descricao',
      placeholder: 'Digite seu email',
    },
    {
      id: 3,
      label: 'Telefone 1',
      placeholder: 'Insira sua senha',
      secureTextEntry: true,
    },
    {
      id: 4,
      label: 'Telefone 2',
      placeholder: 'Insira sua senha',
      secureTextEntry: true,
    }
  ],
  checkbox: []
},
]

export { formCadastro };