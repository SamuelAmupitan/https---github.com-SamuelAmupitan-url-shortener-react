import {Link} from "react-router-dom"
function Optimize() {
  return (
    <section className='optimize'>
      <h1>Revolutionizing Link Optimization</h1>
      <div className='optimize-btn'>
        <Link to="/register" className='btn btn-blue optimize-btn'>
          Get Started
      </Link>
      </div>
    </section>
  );
}

export default Optimize;
