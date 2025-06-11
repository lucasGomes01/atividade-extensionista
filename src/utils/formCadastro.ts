const formCadastro = [{
  id: 1,
  titulo: 'Insira alguns dados básicos',
  entradaTexto: [
    {
      id: 1,
      label: 'Nome',
      value: 'nome',
      placeholder: 'Digite o nome completo',
      opcional: false,
      visible: true
    },
    {
      id: 2,
      label: 'Email',
      value: 'email',
      placeholder: 'Digite o email',
      opcional: false,
      visible: true,
      condicaoBloqueio: "data['uid'] != '' && key == 2",
      contextoBloqueio: (data) => ({
        data,
        key: 2
      }),
    },
    {
      id: 3,
      label: 'Crie uma senha',
      value: 'senha',
      placeholder: 'Insira sua senha',
      secureTextEntry: true,
      opcional: true,
      visible: false
    },
    {
      id: 4,
      label: 'Uid',
      value: 'uid',
      placeholder: '',
      secureTextEntry: true,
      opcional: true,
      visible: false
    },
    {
      id: 5,
      label: 'Mudar Senha?',
      value: 'mudarSenha',
      placeholder: '',
      opcional: true,
      visible: true,
      type: 'checkbox',
      condicaoBloqueio: "data['uid'] === '' && key == 5",
      contextoBloqueio: (data) => ({
        data,
        key: 5
      }),
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
      opcional: true,
      visible: false,
    },
    {
      id: 2,
      label: 'Nome',
      value: 'nome',
      placeholder: 'Nome Comercio',
      opcional: false
    },
    {
      id: 3,
      label: 'Descricao',
      value: 'descricao',
      placeholder: 'Descição dos serviços',
      opcional: false
    },
    {
      id: 4,
      label: 'Telefone 1',
      value: 'telefone1',
      placeholder: 'telefone',
      opcional: false,
      type: 'phone'
    },
    {
      id: 5,
      label: 'Telefone 2',
      value: 'telefone2',
      placeholder: 'telefone 2',
      opcional: true,
      visible: true,
      type: 'phone'
    },
    {
      id: 6,
      label: 'Horário Abertura',
      value: 'HorarioAbertura',
      placeholder: 'Horário de Abertura',
      opcional: false,
      visible: true,
      type: 'time'
    },
    {
      id: 7,
      label: 'Horário Fechamento',
      value: 'HorarioFechamento',
      placeholder: 'Horário de Fechamento',
      opcional: false,
      visible: true,
      type: 'time'
    },
    {
      id: 8,
      label: 'Pontuação no google',
      value: 'PontuacaoGoogle',
      placeholder: 'Pontuação no google 0 - 5',
      opcional: true,
      visible: true,
      type: 'numeric'
    },
    {
      id: 9,
      label: 'Endereço',
      value: 'endereco',
      placeholder: 'Endereço completo',
      opcional: false,
      visible: true
    },
    {
      id: 10,
      label: 'Categoria',
      value: 'categoria',
      placeholder: 'Categoria do comercio',
      opcional: false,
      visible: true,
      type: 'combox',
      colecao: "categoriaComercio"
    },
    {
      id: 11,
      label: 'facebook',
      value: 'facebook',
      placeholder: 'facebook',
      opcional: true,
      visible: true
    },
    {
      id: 12,
      label: 'instagram',
      value: 'instagram',
      placeholder: 'instagram',
      opcional: true,
      visible: true
    },
    {
      id: 13,
      label: 'Delivery',
      value: 'Delivery',
      placeholder: '',
      opcional: true,
      visible: true,
      type: 'checkbox'
    },
    {
      id: 14,
      label: 'Balcão',
      value: 'Balcao',
      placeholder: '',
      opcional: true,
      visible: true,
      type: 'checkbox'
    }
  ],
  checkbox: []
},
]

export { formCadastro };