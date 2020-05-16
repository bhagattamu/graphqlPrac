import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {getBookQuery} from '../queries/queries'

const BookDetail = (props) => {
    const bookDetailRes = useQuery(getBookQuery,{
        variables: {
            id: props.bookid
        }
    });

    const displayDetail = () => {
        if(bookDetailRes.loading){
            return <div>Loading</div>
        }
        if(!bookDetailRes.data){
            return <div>No Book Selected</div>
        }
        //console.log(bookDetailRes.data)
        return(
            <div>
                <h2>Book Name: {bookDetailRes.data.book.name}</h2>
                <p>Genre: {bookDetailRes.data.book.genre}</p>
                <p>Author Name: {bookDetailRes.data.book.author.name}</p>  
                <p>Age: {bookDetailRes.data.book.author.age}</p> 
                <p>Books by same author are:</p>
                <ul>
                    {bookDetailRes.data.book.author.books.map((book)=>{
                        return <li key={book.id}>{book.name}</li>
                    })}
                </ul>
            </div>
        )
    }
    return(
        <div id="book-details">
            {displayDetail()}
        </div>
    )
}

export default BookDetail;