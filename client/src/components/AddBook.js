import React, { useState, useEffect } from 'react';
import {gql} from 'apollo-boost';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {getAuthorsQuery,addBookMutation,getBooksQuery} from '../queries/queries';


const AddBook = () => {
    const [bookName,setBookName] = useState("");
    const [genre,setGenre] = useState("");
    const [authorid,setAuthorId] = useState("");
    const authorRes = useQuery(getAuthorsQuery);
    const bookMutation = useMutation(addBookMutation);
    const bookMutate = bookMutation[0];
    const bookMutateData = bookMutation[1];
    //console.log(bookMutateData)
    const handleBookName = (e) => {
        setBookName(e.target.value);
    }
    const handleGenre = (e) => {
        setGenre(e.target.value);
    }
    const handleSubmit = (e) => {
        console.log(`Book Name: ${bookName} Genre: ${genre} Author name: ${authorid}`)

        // mutation

        bookMutate({
            variables: {
                name: bookName,
                genre: genre,
                authorid: authorid
            },
            refetchQueries: [{query: getBooksQuery}]
        })

        e.preventDefault();
    }
    const getAuthors = () => {
        if(authorRes.loading){
            return <option disabled>Loading Authors</option>
        }else{
            return authorRes.data.authors.map((author) => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            })
        }
    }

    // for component life cycle

    useEffect(() => {

    })

    return(
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label>Book Name</label>
                <input type="text" value={bookName} onChange={handleBookName}/>
            </div>
            <div className="field">
                <label>Genre</label>
                <input type="text" value={genre} onChange={handleGenre} />
            </div>
            <div className="field">
                <label>Author Name</label>
                <select value={authorid} onChange={(e)=>{setAuthorId(e.target.value)}}>
                    <option>Select Author</option>
                    {getAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default AddBook;