import React, { Component } from 'react'
import {store} from '../../../redux/store';

class BookListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                books: []
        }
        this.addUser = this.addUser.bind(this);
        this.editBook = this.editBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    deleteBook(id){
       /* UserService.deleteBook(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });*/
    }
    viewBook(id){
        this.props.history.push(`/view-user/${id}`);
    }
    editBook(id){
        //navigate(`/edit/book/${isbn}`);
        this.props.history.push(`/edit/book/${id}`);
    }

  componentDidMount(){

    var booksList = store.getState().bookReducer.books;

        
            if(booksList==null)
            {
                this.props.history.push('/add-user/_add');
            }
            this.setState({ books: booksList});
        
    }

    addUser(){
        this.props.history.push('/add-user/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Users List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addUser}> Add User</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> User First Name</th>
                                    <th> User Last Name</th>
                                    <th> User Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.books.map(
                                        book => 
                                        <tr key = {book.isbn}>
                                             <td> {book.title} </td>   
                                             <td> {book.isbn}</td>
                                             <td> {book.description}</td>
                                             <td>
                                                 <button onClick={ () => this.editBook(book.isbn)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBook(book.isbn)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewBook(book.isbn)} className="btn btn-info">View </button>
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

export default BookListComponent
