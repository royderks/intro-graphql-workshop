function Character({ title, thumbnail, price }) {
  return (
    <div className='col-3'>
      <div className='card'>
        <img src={thumbnail} alt={title} className='card-img-top' />

        <div className='card-body'>
          <h3 className='card-title'>{title}</h3>
          <p>{`$ ${price}`}</p>
        </div>
      </div>
    </div>
  );
}

export default Character;
