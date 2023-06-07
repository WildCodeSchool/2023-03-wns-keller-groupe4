const HomePage = () => {
  return (
    <div className="bg-main text-center">
      <p className="text-3xl font-bold underline text-second">Home Page</p>
      <div>
          <a href="/product/1">Product 1</a> | 
          <a href="/product/2">Product 2</a> |  
          <a href="/product/3">Product 3</a> |   
          <a href="/product/4">Product 4</a>
      </div>
    </div>
  );
};

export default HomePage;
