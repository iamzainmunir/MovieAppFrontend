import Carousel from "react-elastic-carousel";

const HomePageContainer = ({ movies, onChange }) => {
    return (
      <div>
        {movies.length > 0 ? 
         <Carousel onChange={onChange} className="carouselContainer">
         {movies.map((movie) => (
           
           <div key={movie._id}>
             <img src={movie.photo} alt="movie image" className="image" />
             <h1>{movie.name}</h1>
             <p>{movie.description}</p>
             <p>Rating : {movie.rating} / 5</p>
             <p>Ticket Price : Rs. {movie.ticketPrice}</p>
             <p>Country : {movie.country}</p>
             <p>Genre: {movie.genre.toString()}</p>
           </div>
     
         ))}
       </Carousel>: <div className="errorContainer"><h1 className="errorHeading">NO MOVIE FOUND</h1></div> }
      </div>
     
    );

};

export default HomePageContainer;
