export default function HeadlineElements(vessel) {
  const unit = 'm';
  const { title, maxDepth, length=null, wingspan=null } = vessel;
  const header = document.createElement("div");
  const subheadWrapper = document.createElement("div");
  const headline = document.createElement("h1");
  const headlineText = document.createTextNode(title);
  const depthSubhead = subhead({ label: 'Depth', value: maxDepth });
  const lengthSubhead = subhead({
    unit,
    label: length ? 'Length' : 'Wingspan',
    value: length ? length : wingspan
  });

  header.classList.add('modalHeader');
  subheadWrapper.classList.add('subheadWrapper');
  headline.appendChild(headlineText);
  subheadWrapper.appendChild(depthSubhead);
  subheadWrapper.appendChild(lengthSubhead);
  header.appendChild(headline);
  header.appendChild(subheadWrapper);
  return header;

  function subhead({ label, value, unit=null }) {
    const subhead = document.createElement("h2");
    const subheadLabel = document.createElement("span");
    const labelText = document.createTextNode(`${label}: `);
    const valueText = document.createTextNode(`${value}${ unit || '' }`);
    subheadLabel.classList.add('label');
    subheadLabel.appendChild(labelText);
    subhead.appendChild(subheadLabel);
    subhead.appendChild(valueText);
    return subhead;
  }
}
