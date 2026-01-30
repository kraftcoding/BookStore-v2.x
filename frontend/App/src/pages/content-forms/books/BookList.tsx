import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';

const BookList = () => {
  const navigate = useNavigate();  
  const books = useAppSelector((state) => state.bookReducer.books);

  function deleteBook (id:number) {
       /* UserService.deleteBook(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });*/
  }
    
  function viewBook(id:number) {
        //this.props.history.push(`/view-user/${id}`);
  }

  function  editBook(id:number) {
        navigate(`/content/book/${id}`);
        //this.props.history.push(`/edit/book/${id}`);
  }

  function  addBook() {
        //navigate(`/edit/book/${isbn}`);
        //this.props.history.push(`/edit/book/${id}`);
  }
  
  return (
    <div>
      <h2 >Users List</h2>
      <div>
        <button onClick={ () => addBook()}> Add Book</button>
        </div>
        <br></br>
        <div >
          <table>
            <thead>
                <tr>
                  <th> Title</th>
                  <th> ISBN</th>
                  <th> Description</th>
                  <th> Author</th>
                  <th> Category</th>
                </tr>
            </thead>
            <tbody>
              {
                books.map(
                  book => 
                    <tr key = {book.isbn}>
                      <td> {book.title} </td>   
                      <td> {book.isbn}</td>
                      <td> {book.description}</td>
                      <td> {book.author}</td>
                      <td> {book.category}</td>
                      <td>
                        <button onClick={ () => editBook(book.isbn)} >Update </button>
                        <button style={{marginLeft: "10px"}} onClick={ () => deleteBook(book.isbn)} >Delete </button>
                        <button style={{marginLeft: "10px"}} onClick={ () => viewBook(book.isbn)} >View </button>
                      </td>
                    </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default BookList;
