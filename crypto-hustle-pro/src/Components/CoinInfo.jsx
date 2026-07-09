const CoinInfo = ({ id, image, name, symbol, price }) => {
    return (
        <li className="main-list" key={id}>
            <img
                className="icons"
                src={image}
                alt={`Small icon for ${name} crypto coin`}
            />
            {name} <span className="tab"></span>
            {price && price.USD ? ` $${price.USD} USD` : null}
        </li>
    )
}

export default CoinInfo