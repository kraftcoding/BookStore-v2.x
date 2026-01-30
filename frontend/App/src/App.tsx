import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Cart from './pages/cart/Cart';
import Home from './pages/home/Home';
import Loan from './pages/loan/Loan';
import Book from './pages/book/Book';
import Profile from './pages/user-forms/profile/Profile';
import Blog from './pages/blog/Blog';
import About from './pages/about/About';
import NotFound from './pages/not-found/NotFound';
import Category from './pages/category/Category';
import Footer from './components/footer/Footer';
import Register from './pages/user-forms/register/Register';
import Login from './pages/user-forms/login/Login';
import Favorite from './pages/favorite/Favorite';
import EditBook from './pages/content-forms/books/BookEdit';
import BookListComponent from './pages/content-forms/books/BookList';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route path="" element={<Home />} />
            <Route path=":category">
              <Route path="" element={<Category />} />
              <Route path=":name" element={<Book />} />
            </Route>
          </Route>
          <Route path="/loan">
            <Route path="" element={<Loan />} />
            <Route path=":category">
              <Route path="" element={<Category />} />
              <Route path=":name" element={<Book />} />
            </Route>
          </Route>
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/content/book/:id" element={<EditBook />} />
          <Route path="/content/book-list" element={<BookListComponent />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
