import React, { useState, useEffect } from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';
import AddBook from './AddBook';
import BookDetail from './BookDetail';
import {getBooksQuery} from '../queries/queries';

const BookList = () => {
    //const [bookList,setBookList] = useState();
    const [book,setBook] = useState("");
    const {loading, error, data} = useQuery(getBooksQuery)
    const displayBooks = () => {
        if(error) throw error;
        if(loading){
            return <div>Loading</div>
        }else{
            return data.books.map((book) => {
                return <li key={book.id} onClick={(e) => setBook(book.id)}>{book.name}</li>
            })
        }
    }
    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetail bookid={book} />
            <AddBook />
        </div>
    )
};

export default BookList;