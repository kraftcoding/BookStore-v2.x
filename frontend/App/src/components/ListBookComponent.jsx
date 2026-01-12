import React, { Component } from 'react'
import BookService from '../services/BookService'

class ListBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                books: []
        }
        this.addBooks = this.addBook.bind(this);
        this.editBooks = this.editBook.bind(this);
        this.deleteBooks = this.deleteBook.bind(this);
    }

    deleteBook(id){
        UserService.deleteBook(id).then( res => {
            this.setState({books: this.state.books.filter(book => book.id !== id)});
        });
    }
    viewBook(id){
        this.props.history.push(`/view-book/${id}`);
    }
    editBook(id){
        this.props.history.push(`/add-book/${id}`);
    }

  componentDidMount(){
        BookService.getBooks().then((res) => {
            if(res.data==null)
            {
                this.props.history.push('/add-book/_add');
            }
            this.setState({ books: res.data});
        });
    }

    addBook(){
        this.props.history.push('/add-book/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Book List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addbook}> Add Book</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Id</th>
                                    <th> Title</th>
                                    <th> ISBN</th>
                                    <th> Description</th>
                                    <th> Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.books.map(
                                        book => 
                                        <tr key = {book.id}>
                                             <td> {book.title} </td>   
                                             <td> {book.isbn}</td>
                                             <td> {book.description}</td>
                                             <td> {book.author}</td>
                                             <td>
                                                 <button onClick={ () => this.editBook(book.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBook(book.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewBook(book.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListBookComponent
