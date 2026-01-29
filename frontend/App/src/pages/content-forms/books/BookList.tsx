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
        navigate(`/edit/book/${id}`);
        //this.props.history.push(`/edit/book/${id}`);
  }

  function  addBook() {
        //navigate(`/edit/book/${isbn}`);
        //this.props.history.push(`/edit/book/${id}`);
  }
  
  return (
    <div>
      <h2 className="text-center">Users List</h2>
      <div className = "row">
        <button className="btn btn-primary" onClick={ () => addBook()}> Add Book</button>
        </div>
        <br></br>
        <div className = "row">
          <table className = "table table-striped table-bordered">
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
                        <button onClick={ () => editBook(book.isbn)} className="btn btn-info">Update </button>
                        <button style={{marginLeft: "10px"}} onClick={ () => deleteBook(book.isbn)} className="btn btn-danger">Delete </button>
                        <button style={{marginLeft: "10px"}} onClick={ () => viewBook(book.isbn)} className="btn btn-info">View </button>
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
