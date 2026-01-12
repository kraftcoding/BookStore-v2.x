import React, { Component } from 'react'
import BookService from '../services/BookService';

class CreateBookComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            id: this.props.match.params.id,
            title: '',
            isbn: '',
            description: '',
            author: ''
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeIsbnHandler = this.changeIsbnHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
        this.saveOrUpdateBook = this.saveOrUpdateBook.bind(this);
    }

    componentDidMount() {
       
        if (this.state.id === '_add') {
            return
        } else {
            BookService.getBookById(this.state.id).then((res) => {
                let book = res.data;
                this.setState({
                    id: book.id,
                    title: book.title,
                    isbn: book.isbn,
                    description: book.description,
                    author: book.author
                });
            });
        }
    }
    
    saveOrUpdateBook = (e) => {
        e.preventDefault();
        
        let book = { title: this.state.title, 
                     isbn: this.state.isbn, 
                     description: this.state.description,
                     author: this.state.author };

        console.log('book => ' + JSON.stringify(book));
     
        if (this.state.id === '_add') {
            BookService.createBook(book).then(res => {
                this.props.history.push('/books');
            },err => this.setState({errorMessage: err.message}));
        } else {
            BookService.UpdateBook(user, this.state.id).then(res => {
                this.props.history.push('/books');
            },err => this.setState({errorMessage: err.message}));
        }
    }

    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    changeIsbnHandler = (event) => {
        this.setState({ isbn: event.target.value });
    }

    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }

    changeAuthorHandler = (event) => {
        this.setState({ author: event.target.value });
    }

    cancel() {
        this.props.history.push('/users');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Book</h3>
        } else {
            return <h3 className="text-center">Update Book</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Title: </label>
                                        <input placeholder="Title" name="Title" className="form-control"
                                            value={this.state.title} onChange={this.changeTitleHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> ISBN: </label>
                                        <input placeholder="ISBN" name="ISBN" className="form-control"
                                            value={this.state.isbn} onChange={this.changeIsbnHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Description: </label>
                                        <input placeholder="Description" name="description" className="form-control"
                                            value={this.state.description} onChange={this.changeDescriptionHandler} />
                                    </div>

                                     <div className="form-group">
                                        <label> Author: </label>
                                        <input placeholder="Author" name="author" className="form-control"
                                            value={this.state.author} onChange={this.changeAuthorHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateBook}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                    
                                    { this.state.errorMessage &&
                                    <h5 className="alert alert-danger"> 
                                    { this.state.errorMessage } </h5> }
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateBookComponent
