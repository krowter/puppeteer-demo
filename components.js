const itemStyle = `
	font-size: larger;
	margin: 2rem; 
	padding: 1rem;
	border: 1px solid black; 
	display: inline-block;
`;

const Item = ({ name, price, category }) =>
  `<div class="item" style="${itemStyle}">
		<span class="name">${name}</span><span> - </span><span class="price">${price}</span>
			<div>
				<img src="https://via.placeholder.com/100x100" />
			</div>
		<span class="category">${category}</span>
	</div>`;
