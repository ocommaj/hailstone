import { features } from '../../assets/wreckLocations.json';
import WreckGallery from '../modals';

const INPUT_ID = "topLevelSearchBar";

export default function SearchBar() {
  const searchWrapper = document.createElement('div')
  const searchBar = document.createElement('form');
  const searchInput = document.createElement('input');
  const matchContainer = document.createElement('div');

  const searchIcon = document.createElement('i');
  searchIcon.classList.add('fas', 'fa-binoculars');
  searchIcon.tabIndex = -1;

  let matches = [];

  searchWrapper.classList.add('searchWrapper');
  searchWrapper.classList.add('topControlElement');
  searchWrapper.tabIndex = -1;
  searchBar.classList.add('searchBar');
  searchBar.tabIndex = -1;

  matchContainer.classList.add('searchMatchesWrapper');

  searchInput.id = INPUT_ID;
  searchInput.type = 'text';
  searchInput.tabIndex = 0;
  searchInput.autocomplete="off";
  searchInput.placeholder = 'Search for a wreck...';
  searchInput.autofocus = true;

  searchInput.addEventListener('input', doSearchOnInput);
  searchInput.addEventListener('keydown', (e) => {
    if (!matches.length) return;
    keydownHandler(e)
  });

  searchBar.appendChild(searchIcon);
  searchBar.appendChild(searchInput);
  searchBar.appendChild(matchContainer);
  searchWrapper.appendChild(searchBar)

  document.addEventListener('click', clickOutside);
  return {
    searchBar: searchWrapper
  };

  function doSearchOnInput() {
    matches = searchWrecks(searchInput.value);
    renderMatchesHTML(matches, matchContainer)
      .then(matchContainer => {
        [...matchContainer.children].forEach(element => {
          element.addEventListener('mouseover', hoverMatchedElement)
          element.addEventListener('click',  ({currentTarget}) => {
            selectMatchedElement(currentTarget)
          })
        })
      });
  }
}

function searchWrecks(userInput) {
  if (!userInput.length) return []
  const matches = features.filter(feature => {
    const regex = userInput.length < 3
      ? new RegExp(`^${userInput}`, 'gi')
      : new RegExp(`${userInput}`, 'gi');
    return feature.properties.title.match(regex)
  });

  return matches;
}

function renderMatchesHTML(matchesFeatures, inContainer) {
  return new Promise(resolve => {

  const matchesHTML = matchesFeatures.map(feature => {
    let subtext = '';
    switch (feature.properties.vesselType) {
      case 'Cargo':
        subtext = `Cargo: ${feature.properties.cargo}`;
        break;
      case 'Aircraft':
        subtext = `${feature.properties.model}`;
        break;
      default:
        subtext = `${feature.properties.vesselType}`;
        break;
    }

    return `
      <div
        class="matchedElement"
        data-wreck_id='${feature.properties.id}'
        data-wreck_name='${feature.properties.title}'>
        <h3>${feature.properties.title}</h3>
        <p>${subtext}</p>
      </div>
    `
  }).join('')

  if (matchesHTML.length) {
    inContainer.style.opacity = 1;
    inContainer.innerHTML = matchesHTML;
    inContainer.classList.add('expanded')
  } else {
    inContainer.style.opacity = 0;
    inContainer.innerHTML = '';
    inContainer.classList.remove('expanded')
  }
  resolve(inContainer)
  })
}

function hoverMatchedElement(e) {
  const element = e.currentTarget;
  const currentHighlighted = document.querySelector('.highlighted');
  if (currentHighlighted && currentHighlighted === element) {
    return
  }
  if (currentHighlighted && currentHighlighted !== element) {
    currentHighlighted.classList.remove('highlighted')
  }
  element.classList.add('highlighted')
}

function selectMatchedElement(matchedElement) {
  const nextId = matchedElement.dataset.wreck_id;
  const wreckName = matchedElement.dataset.wreck_name;
  const matchesWrapper = matchedElement.parentElement;
  const searchInput = document.getElementById(INPUT_ID);
  searchInput.value = wreckName;
  searchInput.dataset.wreck_id = nextId;
  matchesWrapper.style.opacity = 0;
  matchesWrapper.innerHTML = '';

  flyToSelectedWreck(nextId)
}

function flyToSelectedWreck(wreckId) {
  const flyMap = window.mapCanvas.flyCamera;
  const {
    properties: wreck,
    geometry: { coordinates: center } } = features.find(ft => {
    return ft.properties.id === wreckId;
  });

  const target = { center }
  const onComplete = () => displayGalleryModal(wreck)

  flyMap({})
    .then(() => {
      flyMap({ target, id: wreckId })
        .then(() => onComplete())
      })
}

function displayGalleryModal(wreck) {
  const modal = new WreckGallery(wreck);
  const outgoingModal = window.activeModal;

  const center = [
    window.innerHeight/2,
    window.innerHeight/2
  ]

  if (!outgoingModal) {
    modal.reveal(center)
  } else {
    modal.replace(outgoingModal.element)
  }

  window.activeModal = modal;
}

function clickOutside(e) {
  const wrapperElement = document.querySelector('.searchWrapper');
  const matchContainer = document.querySelector('.searchMatchesWrapper');
  const searchInput = document.getElementById('topLevelSearchBar')
  if (!matchContainer.classList.contains('expanded')) return;
  if (!wrapperElement.contains(e.target)) {
    matchContainer.style.opacity = 0;
    matchContainer.innerHTML = '';
  }
}


function keydownHandler(e) {
  const matchContainer = document.querySelector('.searchMatchesWrapper');
  const matchedElements = matchContainer.children;
  const currentHighlighted = matchContainer.querySelector('.highlighted');
  const currentIdx = [...matchedElements].indexOf(currentHighlighted);

  switch (e.code) {
    case "ArrowDown":
      e.preventDefault();
      const nextOption = matchContainer.children.item(currentIdx+1);
      if (nextOption) nextOption.classList.toggle('highlighted');
      if (nextOption && currentHighlighted) {
        currentHighlighted.classList.toggle('highlighted')
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      const prevOption = matchContainer.children.item(currentIdx-1);
      if (prevOption) prevOption.classList.toggle('highlighted');
      if (prevOption && currentHighlighted) {
        currentHighlighted.classList.toggle('highlighted')
      }
      break;
    case "Enter":
    case "Tab":
      e.preventDefault();
      if (currentHighlighted) selectMatchedElement(currentHighlighted);
      break;
  }
}
