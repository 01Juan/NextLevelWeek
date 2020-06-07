function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch(" https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then( res => res.json() )
        .then( states => {
            for ( const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = `<option value>Selecione a cidade</option>`
    citySelect.disabled = true

    fetch(url)
        .then( res => res.json() )
        .then( cities => {
            for ( const city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const items of itemsToCollect) {
    items.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com javascriot
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)

    // verificar se existem itens selecionados, se siim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => item == itemId )

    // se já estiver selecionado,
    if (alreadySelected >= 0) {
        // tiar da seleção
        const filteredItems = selectedItems.filter( item => item != itemId )
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)

    collectedItems.value = selectedItems
}