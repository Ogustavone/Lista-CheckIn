let participantes = [
  {
    nome: 'João Silva',
    email: 'joao.silva@gmail.com',
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    nome: 'Joana Silva',
    email: 'joana.silva@gmail.com',
    dataInscricao: new Date(2024, 2, 23, 10, 15),
    dataCheckIn: null
  },
  {
    nome: 'Pedro Santos',
    email: 'pedro.santos@gmail.com',
    dataInscricao: new Date(2024, 2, 24, 14, 45),
    dataCheckIn: null
  },
  {
    nome: 'Ana Oliveira',
    email: 'ana.oliveira@gmail.com',
    dataInscricao: new Date(2024, 2, 25, 9, 30),
    dataCheckIn: new Date(2024, 2, 25, 18, 30)
  },
  {
    nome: 'Carlos Pereira',
    email: 'carlos.pereira@gmail.com',
    dataInscricao: new Date(2024, 2, 25, 13, 20),
    dataCheckIn: new Date(2024, 2, 25, 19, 45)
  },
  {
    nome: 'Mariana Costa',
    email: 'mariana.costa@gmail.com',
    dataInscricao: new Date(2024, 2, 26, 11, 10),
    dataCheckIn: null
  },
  {
    nome: 'Ricardo Oliveira',
    email: 'ricardo.oliveira@gmail.com',
    dataInscricao: new Date(2024, 2, 27, 15, 45),
    dataCheckIn: new Date(2024, 2, 28, 10, 15)
  },
  {
    nome: 'Patrícia Fernandes',
    email: 'patricia.fernandes@gmail.com',
    dataInscricao: new Date(2024, 2, 28, 8, 0),
    dataCheckIn: new Date(2024, 2, 28, 19, 30)
  },
  {
    nome: 'Luís Martins',
    email: 'luis.martins@gmail.com',
    dataInscricao: new Date(2024, 2, 29, 10, 30),
    dataCheckIn: new Date(2024, 2, 29, 17, 45)
  },
  {
    nome: 'Sofia Sousa',
    email: 'sofia.sousa@gmail.com',
    dataInscricao: new Date(2024, 2, 29, 14, 15),
    dataCheckIn: new Date(2024, 2, 30, 9, 0)
  }
]

// Função criar participante
const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if (participante.dataCheckIn == null){
    dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
    Confirmar check-in
    </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)


const adicionarParticipante = (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)
  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }


  // verifica se participante existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )
  if(participanteExiste){
    alert('Email já cadastrado!')
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)


  //limpar placeholder
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // Confirmação do check-in
  const mensagem = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagem)==false){
    return
  }

  // encontrar part na lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  // atualizar checkin
  participante.dataCheckIn = new Date()
  // atualizar lista
  atualizarLista(participantes)
}
