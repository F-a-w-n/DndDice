
const Button = ({image, clickEvent}) => {

  return (
  <div className="btn" onClick={clickEvent}>
    <img src={image}></img>
  </div>
  );
}

export default Button;