class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i]== '' || this[i] == null) {
                return false
            }
        } return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) +1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        //Array das despesas
        let despesas = Array()
        
        let id = localStorage.getItem('id')
        //recupera todas as despesas cadastradas em locais storage
        for (let i = 1; i <= id; i++) {

             let despesa = JSON.parse(localStorage.getItem(i))

             if(despesa === null) {
                 continue
             }

            despesas.push(despesa)
        }

        return despesas
    }
}

let bd = new Bd()

function cadastrarDespesas() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    
    if(despesa.validarDados()) {

        bd.gravar(despesa)   
         
        document.getElementById('modal_titulo').innerHTML = 'Registro realizado com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso!'
        document.getElementById('modal_btn').innerHTML = 'voltar'
        document.getElementById('modal_btn').className = 'btn btn-sucess'

        $('#modalRegistroDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
        
    } else {
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão de registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
        document.getElementById('modal_btn').innerHTML = 'voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        $('#modalRegistroDespesa').modal('show')
    }
       
}

function carregaListaDespesas() {

    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()
    //Selecionando o Elemento TBody da tabela
    var listaDespesas = document.getElementById('listaDespesas')

    despesas.forEach(function(d) {
        
        //criando o TR

        let linha = listaDespesas.insertRow()

        //criando o TD 

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`


        //ajustar o tipo
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break     
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break     
            case '5': d.tipo = 'Transporte'
                break  
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}




