const FormContainer = ({ children }) => {
    return (
      <div className="relative h-screen bg-center bg-cover" style={{ backgroundImage: "url('/images/blaack.jpg')" }}>
      
        <div className="flex justify-center">
      
         
          
            
              {children}
          
          
        </div>
      </div>
    );
  };
  
  export default FormContainer;