import About from "./components/About"
import Categories from "./components/Categories"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Offers from "./components/Offers"
import Products from "./components/Products"


const App = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Products />
      <Categories />
      <Offers />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App