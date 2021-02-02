export default function CustomDropdown({
  id, labelText, options, required=false
}) {
  if (!required) {
    options.unshift({ ref: null, display: '(Optional)' })
  }

  const hiddenSelect = htmlSelectElement();
  const formattedOptions = getFormattedOptions();
  const fragment = document.createDocumentFragment();
  const topFormLabel = document.createElement('h3');
  const dropdownWrapper = document.createElement('div');
  const optionLabel = document.createElement('span');
  const optionsList = document.createElement('ul');

  let selectedOption = formattedOptions.find(option => option.selected);

  topFormLabel.classList.add('fileUploadFormLabel');
  topFormLabel.id = `${id}Label`;
  topFormLabel.innerHTML = labelText;

  optionLabel.addEventListener('click', () => {
    optionsList.classList.toggle('show')
  })

  dropdownWrapper.addEventListener('blur', () => {
    optionsList.classList.remove('show')
  })

  setupDropdown()
  setupOptions()
  fragment.appendChild(topFormLabel);
  fragment.appendChild(dropdownWrapper);
  return fragment;


  function htmlSelectElement() {
    const hiddenSelect = document.createElement('select');
    hiddenSelect.classList.add('hiddenSelect');
    options.forEach(option => {
      const selectOption = document.createElement('option');
      selectOption.value = option.ref;
      selectOption.label = option.display;
      hiddenSelect.add(selectOption);
    })
    hiddenSelect.style.display = "none";
    return hiddenSelect;
  }

  function getFormattedOptions() {
    const selectOptions = hiddenSelect.querySelectorAll('option');
    return [...selectOptions].map(option => {
      return {
        value: option.value,
        label: option.label,
        selected: option.selected,
        element: option
      }
    })
  }

  function selectValue(value) {
    const newOption = formattedOptions.find(option => option.value === value);
    const prevOption = selectedOption;
    prevOption.selected = false;
    prevOption.element.selected = false;
    newOption.selected = true;
    newOption.element.selected = true;
    optionLabel.innerText = newOption.label;
    selectedOption = newOption;
  }

  function setupDropdown() {
    dropdownWrapper.tabIndex = 0;
    dropdownWrapper.classList.add('custom-select-container');
    optionLabel.classList.add('custom-select-value');
    optionsList.classList.add('custom-select-options');
    optionLabel.innerText = selectedOption.label;
    dropdownWrapper.appendChild(hiddenSelect);
    dropdownWrapper.appendChild(optionLabel);
    dropdownWrapper.appendChild(optionsList);
  }

  function setupOptions() {
    formattedOptions.forEach(option => {
      const optionElement = document.createElement('li');
      optionElement.classList.add('custom-select-option');
      optionElement.classList.toggle('selected', option.selected);
      optionElement.innerText = option.label;
      optionElement.dataset.value = option.value;
      optionElement.addEventListener('click', () => {
        const outgoing = optionsList.querySelector('.selected');
        outgoing.classList.remove('selected');
        selectValue(option.value);
        optionElement.classList.add('selected')
        optionsList.classList.remove('show')
      });
      optionsList.appendChild(optionElement);
    })
  }
}
