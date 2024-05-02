
import { Link } from 'react-router-dom';
const HomeScreen = () => {
  return (
    <>
      <div className="relative h-screen bg-center bg-cover" style={{ backgroundImage: "url('/images/blaack.jpg')" }}>
        <div className="absolute inset-0 flex flex-col items-center justify-between m-5 bg-black bg-opacity-50">
        
          <div className="flex flex-col items-center mt-8 rounded-md bg-neutral-800 bg-opacity-80 lg:w-6/12">
            <br />
            <br />
            <br />
            <Link to="/">
            <h1 className="mb-4 text-4xl font-bold text-white">Mern Authentication</h1>
            </Link>
            <br />  <br />
            <br />  <br />
            <p className="mb-8 text-lg text-white">This is my mern authencation with jwt </p>
            <br />  <br />
            <br />  <br />
           
            {/* <div className="flex mt-8">
            <Link to="/signup">
            <button className="px-4 py-2 mr-4 text-white bg-black">Sign Up</button>
          </Link>

          <Link to="/login">
            <button className="px-4 py-2 text-black bg-white">Login</button>
          </Link>
             
            </div> */}
            <br />  <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
